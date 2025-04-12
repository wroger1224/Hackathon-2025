const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { zodResponseFormat } = require('openai/helpers/zod');
const { z } = require('zod');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define the activity analysis schema
const ActivityAnalysis = z.object({
    time: z.number().int(),
    points: z.number().int()
});

// Helper function to get activity analysis from OpenAI
async function getActivityAnalysis(activity, userProfile) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Turn the user's input of their general activity into a JSON object with 'time' (int) and 'points' (int) fields. Also take into account the user's age, weight, and activity level to determine the time and points. The time should be in minutes and the points should be based on the intensity and duration of the activity. The time and points should be based on the user's input and the user's age, weight, and activity level. Points are from 1-100. Time should be the amount of time the user spent on the activity in minutes."
            },
            {
                role: "user",
                content: `Activity: ${activity}; User's Profile: ${userProfile}`
            }
        ],
        response_format: zodResponseFormat(ActivityAnalysis, "activity")
    });
    
    return completion.choices[0].message.content;
}

// Post daily activity
router.get('/activity', async (req, res) => {
    try {
        // const { userId, inputMessage } = req.body;

        // Get user profile from db
        // const userProfile = req.app.db.prepare(`
        //     SELECT age, weight, activityLevel 
        //     FROM User 
        //     WHERE UserID = ?
        // `).get(userId);

        // if (!userProfile) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        const userProfile = {
            age: 25,
            weight: 70,
            activityLevel: 'Moderate'
        }

        const inputMessage = "I went for a 30 minute walk and lifted weights for 20 minutes"

        // Get activity analysis from OpenAI
        const activityAnalysis = await getActivityAnalysis(inputMessage, userProfile);

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
router.post('/profile', async (req, res) => {
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
        
        // Validate activity level
        if (!['Sedentary', 'Moderate', 'High'].includes(activityLevel)) {
            return res.status(400).json({ error: 'Invalid activity level' });
        }

        const result = req.app.db.prepare(`
            INSERT INTO User (
                FirstName, LastName, Age, Weight, ActivityLevel, 
                HeightInInches, TeamID, RoleID
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            firstName, lastName, age, weight, activityLevel,
            heightInInches, teamId, roleId
        );
        
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
router.put('/profile/:userId', async (req, res) => {
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
router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = req.app.db.prepare(`
            SELECT u.*, t.TeamName, r.RoleName
            FROM User u
            LEFT JOIN Team t ON u.TeamID = t.TeamID
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
            WHERE u.UserID = ?
        `).get(userId);
        
        if (!user) {
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

// Update team message board message
router.put('/team/:teamId/message', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId, message } = req.body;
        
        const result = req.app.db.prepare(`
            INSERT INTO Message (Message, TeamID)
            VALUES (?, ?)
        `).run(message, teamId);
        
        res.json({ 
            messageId: result.lastInsertRowid,
            message,
            teamId,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating team message:', error);
        res.status(500).json({ error: 'Failed to update team message' });
    }
});

module.exports = router;
