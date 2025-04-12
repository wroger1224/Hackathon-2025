const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Post daily activity
router.post('/activity', async (req, res) => {
    try {
        const { userId, activityType, description, duration, date } = req.body;
        
        const activity = await prisma.activity.create({
            data: {
                userId,
                activityType,
                description,
                duration,
                date: new Date(date)
            }
        });
        
        res.status(201).json(activity);
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

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                age,
                weight,
                activityLevel,
                heightInInches,
                teamId,
                roleId
            }
        });
        
        res.status(201).json(user);
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
        
        const updatedUser = await prisma.user.update({
            where: { userId: parseInt(userId) },
            data: {
                firstName,
                lastName,
                age,
                weight,
                activityLevel,
                heightInInches,
                teamId,
                roleId
            }
        });
        
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await prisma.user.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                team: true,
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
        
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
        const users = await prisma.user.findMany({
            include: {
                team: true,
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
        
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
        
        const updatedMessage = await prisma.teamMessage.create({
            data: {
                teamId,
                userId,
                message,
                timestamp: new Date()
            }
        });
        
        res.json(updatedMessage);
    } catch (error) {
        console.error('Error updating team message:', error);
        res.status(500).json({ error: 'Failed to update team message' });
    }
});

module.exports = router;
