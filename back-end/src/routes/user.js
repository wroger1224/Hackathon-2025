const express = require('express');
const router = express.Router();
const llmService = require('../services/llmService');
const authMiddleware = require('../middleware/auth');

// Post daily activity
router.post('/activity', async (req, res) => {
    try {
        const { userId, inputMessage } = req.body;

        // Get user profile from db
        const userProfile = req.app.db.prepare(`
            SELECT age, weight, activityLevel 
            FROM User 
            WHERE UserID = ?
        `).get(userId);

        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get activity analysis from OpenAI
        const activityAnalysis = await llmService.getActivityAnalysis(inputMessage, userProfile);

        console.log(activityAnalysis);

        const result = req.app.db.prepare(`
            INSERT INTO Activities (UserID, InputMessage, Date, TimeSpent, NumberOfPoints)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            userId,
            inputMessage,
            new Date().toISOString(),
            activityAnalysis.time,
            activityAnalysis.points
        );
        
        res.status(201).json({ 
            activityId: result.lastInsertRowid,
            ...activityAnalysis 
        });
    } catch (error) {
        console.error('Error posting activity:', error);
        res.status(500).json({ error: 'Failed to post activity' });
    }
});

// Create user profile
router.post('/profile', authMiddleware, async (req, res) => {
    console.log(req.body);
    console.log('here');
    console.log(req.user);

    try {
        const { 
            firstName, 
            lastName, 
            age, 
            weight, 
            activityLevel, 
            heightInInches, 
            teamId, 
            roleId 
        } = req.body;

        const email = req.user.email;
        const userId = req.user.uid;
        // Validate activity level
        if (!['Sedentary', 'Moderate', 'High'].includes(activityLevel)) {
            console.log('invalid activity level');
            return res.status(400).json({ error: 'Invalid activity level' });
        }

        console.log(firstName, lastName, age, weight, activityLevel, heightInInches, teamId, roleId);

        const result = req.app.db.prepare(`
            INSERT INTO User (UserID, FirstName, LastName, Email, Age, Weight, ActivityLevel, 
                HeightInInches, TeamID, RoleID
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            userId, firstName, lastName, email, age, weight, activityLevel,
            heightInInches, teamId, roleId
        );

        console.log(result);
        
        res.status(201).json({ 
            userId: result.lastInsertRowid,
            firstName, lastName, age, weight, activityLevel,
            heightInInches, teamId, roleId
        });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// Update user profile
router.put('/profile/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const { 
            firstName, 
            lastName, 
            age, 
            weight, 
            activityLevel, 
            heightInInches, 
            teamId, 
            roleId 
        } = req.body;

        // Validate activity level if provided
        if (activityLevel && !['Sedentary', 'Moderate', 'High'].includes(activityLevel)) {
            return res.status(400).json({ error: 'Invalid activity level' });
        }
        
        const result = req.app.db.prepare(`
            UPDATE User SET
                FirstName = COALESCE(?, FirstName),
                LastName = COALESCE(?, LastName),
                Age = COALESCE(?, Age),
                Weight = COALESCE(?, Weight),
                ActivityLevel = COALESCE(?, ActivityLevel),
                HeightInInches = COALESCE(?, HeightInInches),
                TeamID = COALESCE(?, TeamID),
                RoleID = COALESCE(?, RoleID)
            WHERE UserID = ?
        `).run(
            firstName, lastName, age, weight, activityLevel,
            heightInInches, teamId, roleId, userId
        );
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ 
            userId,
            firstName, lastName, age, weight, activityLevel,
            heightInInches, teamId, roleId
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get user profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;

        console.log(userId);
        
        const user = req.app.db.prepare(`
            SELECT u.*, t.TeamName, r.RoleName
            FROM User u
            LEFT JOIN Team t ON u.TeamID = t.TeamID
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
            WHERE u.UserID = ?
        `).get(userId);
        
        if (!user) {
            console.log('user not found');
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = req.app.db.prepare(`
            SELECT u.*, t.TeamName, r.RoleName
            FROM User u
            LEFT JOIN Team t ON u.TeamID = t.TeamID
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
        `).all();
        
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// User Activity endpoints
router.post('/user-activity', authMiddleware, async (req, res) => {
    try {
        const { competitionId, userInput } = req.body;

        const userId = req.user.uid;

        // Get user profile for activity analysis
        const userProfile = req.app.db.prepare(`
            SELECT age, weight, activityLevel 
            FROM User 
            WHERE UserID = ?
        `).get(userId);

        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If competitionId not provided, get the active competition
        let activeCompetitionId = competitionId;
        if (!activeCompetitionId) {
            const activeCompetition = req.app.db.prepare(`
                SELECT CompetitionID 
                FROM Competitions 
                WHERE Status = 'Active'
                LIMIT 1
            `).get();
            
            if (!activeCompetition) {
                return res.status(400).json({ error: 'No active competition found' });
            }
            activeCompetitionId = activeCompetition.CompetitionID;
        }

        // Get activity analysis from LLM service
        const activityAnalysis = await llmService.getActivityAnalysis(userInput, userProfile);

        const result = req.app.db.prepare(`
            INSERT INTO UserActivity (UserID, CompetitionID, UserInput, TotalTime, TotalPoints)
            VALUES (?, ?, ?, ?, ?)
        `).run(userId, activeCompetitionId, userInput, activityAnalysis.time, activityAnalysis.points);

        // Return the user object (like in the / get route)
        const user = req.app.db.prepare(`
            SELECT 
                u.*, 
                t.TeamName, 
                r.RoleName,
                ua.TotalTime,
                ua.TotalPoints,
                ua.UserInput as lastActivity,
                ua.LastUpdated as lastActivityDate,
                GROUP_CONCAT(DISTINCT m.MilestoneName) as completedMilestones,
                (
                    SELECT json_group_array(json_object(
                        'userActivityID', ua2.UserActivityID,
                        'competitionID', ua2.CompetitionID,
                        'userInput', ua2.UserInput,
                        'totalTime', ua2.TotalTime,
                        'totalPoints', ua2.TotalPoints,
                        'lastUpdated', ua2.LastUpdated
                    ))
                    FROM UserActivity ua2
                    WHERE ua2.UserID = u.UserID
                    ORDER BY ua2.LastUpdated DESC
                ) as allActivities
            FROM User u
            LEFT JOIN Team t ON u.TeamID = t.TeamID
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
            LEFT JOIN UserActivity ua ON u.UserID = ua.UserID
            LEFT JOIN UserMilestones um ON u.UserID = um.UserID
            LEFT JOIN Milestones m ON um.MilestoneID = m.MilestoneID
            WHERE u.UserID = ?
            GROUP BY u.UserID
        `).get(userId);
        
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json({
            userData: user,
            points: activityAnalysis.points,
            motivationalResponse: activityAnalysis.motivationalResponse
        });
    } catch (error) {
        console.error('Error creating user activity:', error);
        res.status(500).json({ error: 'Failed to create user activity' });
    }
});

router.put('/user-activity/:activityId', authMiddleware, async (req, res) => {
    try {
        const { activityId } = req.params;
        const { competitionId, userInput, totalTime } = req.body;
        const userId = req.user.uid;

        // Calculate points based on time (1 point per 5 minutes)
        const totalPoints = Math.floor(totalTime / 5);

        const result = req.app.db.prepare(`
            UPDATE UserActivity 
            SET CompetitionID = ?, UserInput = ?, TotalTime = ?, TotalPoints = ?
            WHERE UserActivityID = ? AND UserID = ?
        `).run(competitionId, userInput, totalTime, totalPoints, activityId, userId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'User activity not found' });
        }

        res.json({
            id: activityId,
            userId,
            competitionId,
            userInput,
            totalTime,
            totalPoints
        });
    } catch (error) {
        console.error('Error updating user activity:', error);
        res.status(500).json({ error: 'Failed to update user activity' });
    }
});

router.delete('/user-activity/:activityId', authMiddleware, async (req, res) => {
    try {
        const { activityId } = req.params;
        const userId = req.user.uid;

        const result = req.app.db.prepare(`
            DELETE FROM UserActivity 
            WHERE UserActivityID = ? AND UserID = ?
        `).run(activityId, userId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'User activity not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting user activity:', error);
        res.status(500).json({ error: 'Failed to delete user activity' });
    }
});

router.get('/user-activity', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.uid;

        const activities = req.app.db.prepare(`
            SELECT * FROM UserActivity 
            WHERE UserID = ?
            ORDER BY LastUpdated DESC
        `).all(userId);

        res.json(activities);
    } catch (error) {
        console.error('Error fetching user activities:', error);
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
});    

// Get logged-in user's data
router.get('/', authMiddleware, async (req, res) => {
    try {

        console.log('Why is this not working');
        const userId = req.user.uid;
        
        const user = req.app.db.prepare(`
            SELECT 
                u.*, 
                t.TeamName, 
                r.RoleName,
                ua.TotalTime,
                ua.TotalPoints,
                ua.UserInput as lastActivity,
                ua.LastUpdated as lastActivityDate,
                GROUP_CONCAT(DISTINCT m.MilestoneName) as completedMilestones,
                (
                    SELECT json_group_array(json_object(
                        'userActivityID', ua2.UserActivityID,
                        'competitionID', ua2.CompetitionID,
                        'userInput', ua2.UserInput,
                        'totalTime', ua2.TotalTime,
                        'totalPoints', ua2.TotalPoints,
                        'lastUpdated', ua2.LastUpdated
                    ))
                    FROM UserActivity ua2
                    WHERE ua2.UserID = u.UserID
                    ORDER BY ua2.LastUpdated DESC
                ) as allActivities
            FROM User u
            LEFT JOIN Team t ON u.TeamID = t.TeamID
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
            LEFT JOIN UserActivity ua ON u.UserID = ua.UserID
            LEFT JOIN UserMilestones um ON u.UserID = um.UserID
            LEFT JOIN Milestones m ON um.MilestoneID = m.MilestoneID
            WHERE u.UserID = ?
            GROUP BY u.UserID
        `).get(userId);
        
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

module.exports = router;
