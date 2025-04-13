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

module.exports = router;
