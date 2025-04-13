const express = require('express');
const router = express.Router();

// Create a new team -- Done    
router.post('/teams', async (req, res) => {
    try {
        const { name, captainId, members, competitionId } = req.body;
        const db = req.app.db;

        console.log('Creating team:', name, captainId, members, competitionId);
        
        // Validate input
        if (!name || !captainId || !members || !Array.isArray(members)) {
            return res.status(400).json({ 
                error: 'Team name, captain ID, and members array are required' 
            });
        }

        // Ensure captain is included in members array
        if (!members.includes(captainId)) {
            return res.status(400).json({ 
                error: 'Captain must be included in the members array' 
            });
        }

        // Check if captain exists
        const captainStmt = db.prepare('SELECT UserID FROM User WHERE UserID = ?');
        const captain = await captainStmt.get(captainId);
        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }

        // Check if all members exist
        const placeholders = members.map(() => '?').join(',');
        const memberCheck = await db.prepare(
            `SELECT UserID FROM User WHERE UserID IN (${placeholders})`
        ).all(members);
        if (memberCheck.length !== members.length) {
            return res.status(404).json({ error: 'One or more members not found' });
        }
        
        // Create team with initial points
        const stmt = db.prepare('INSERT INTO Team (TeamName, TeamCaptain, CompetitionID, Points) VALUES (?, ?, ?, 0)');
        const result = stmt.run(name, captainId, competitionId);
        
        const teamId = result.lastInsertRowid;
        
        // Update members' CurrentTeamID and TeamID
        const updateStmt = db.prepare(`
            UPDATE User 
            SET CurrentTeamID = ?, 
                TeamID = ? 
            WHERE UserID IN (${placeholders})
        `);
        updateStmt.run(teamId, teamId, ...members);
        
        res.status(201).json({ 
            message: 'Team created successfully',
            teamId 
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: 'Failed to create team' });
    }
});

// Edit team members -- Done
router.put('/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { action, memberId } = req.body;
        const db = req.app.db;
        
        if (!action || !memberId) {
            return res.status(400).json({ error: 'Invalid request data' });
        }
        
        // Check if team exists
        const teamStmt = db.prepare('SELECT TeamID FROM Team WHERE TeamID = ?');
        const team = await teamStmt.get(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        // Check if member exists
        const memberStmt = db.prepare('SELECT UserID FROM User WHERE UserID = ?');
        const member = await memberStmt.get(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        
        if (action === 'add') {
            // Add member to team
            const stmt = db.prepare(`
                UPDATE User 
                SET CurrentTeamID = ?, 
                    TeamID = ? 
                WHERE UserID = ?
            `);
            stmt.run(teamId, teamId, memberId);
        } else if (action === 'remove') {
            // Remove member from team
            const stmt = db.prepare(`
                UPDATE User 
                SET CurrentTeamID = NULL, 
                    TeamID = NULL 
                WHERE UserID = ? AND CurrentTeamID = ?
            `);
            stmt.run(memberId, teamId);
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }
        
        res.json({ message: 'Team updated successfully' });
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ error: 'Failed to update team' });
    }
});

// Create a new competition -- Done 
router.post('/competitions', async (req, res) => {
    try {
        const { name, startDate, endDate, weeklyTheme, emailParticipants, postToSlack, status } = req.body;
        const db = req.app.db;
        
        // Validate required fields
        if (!name || !startDate || !endDate) {
            return res.status(400).json({ 
                error: 'Competition name, start date, and end date are required' 
            });
        }

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ 
                error: 'Invalid date format. Please use ISO date format (YYYY-MM-DD)' 
            });
        }

        if (start >= end) {
            return res.status(400).json({ 
                error: 'End date must be after start date' 
            });
        }

        // Create competition
        const stmt = db.prepare(
            'INSERT INTO Competitions (CompetitionName, StartDate, EndDate, WeeklyTheme, EmailParticipants, PostToSlack, Status) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        const result = stmt.run(
            name, 
            startDate, 
            endDate, 
            weeklyTheme || null, 
            emailParticipants ? 1 : 0, 
            postToSlack ? 1 : 0, 
            status || 'Upcoming'
        );

        // Return the competition object    
        const competition = db.prepare('SELECT * FROM Competitions WHERE CompetitionID = ?').get(result.lastInsertRowid);
        
        res.status(201).json({ 
            message: 'Competition created successfully',
            competition
        });
    } catch (error) {
        console.error('Error creating competition:', error);
        res.status(500).json({ error: 'Failed to create competition' });
    }
});

// Update a competition
router.put('/competitions/:competitionId', async (req, res) => {
    try {
        const { competitionId } = req.params;
        const { CompetitionName, StartDate, EndDate, Status, WeeklyTheme } = req.body;
        const db = req.app.db;
        
        // Validate required fields
        if (!CompetitionName || !StartDate || !EndDate || !Status) {
            return res.status(400).json({ 
                error: 'Competition name, start date, end date, and status are required' 
            });
        }

        // Validate dates
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ 
                error: 'Invalid date format. Please use ISO date format (YYYY-MM-DD)' 
            });
        }

        if (start >= end) {
            return res.status(400).json({ 
                error: 'End date must be after start date' 
            });
        }

        // Validate status
        const validStatuses = ['Upcoming', 'Active', 'Completed'];
        if (!validStatuses.includes(Status)) {
            return res.status(400).json({ 
                error: 'Invalid status. Must be one of: Upcoming, Active, Completed' 
            });
        }

        // Update competition
        const stmt = db.prepare(`
            UPDATE Competitions 
            SET CompetitionName = ?, 
                StartDate = ?, 
                EndDate = ?, 
                Status = ?, 
                WeeklyTheme = ?
            WHERE CompetitionID = ?
        `);
        
        const result = stmt.run(
            CompetitionName,
            StartDate,
            EndDate,
            Status,
            WeeklyTheme || null,
            competitionId
        );

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Competition not found' });
        }

        // Return the competition object        
        const competition = db.prepare('SELECT * FROM Competitions WHERE CompetitionID = ?').get(competitionId);

        res.json({ 
            message: 'Competition updated successfully',
            competition
        });
    } catch (error) {
        console.error('Error updating competition:', error);
        res.status(500).json({ error: 'Failed to update competition' });
    }
});

// Get initial data
router.get('/initial-data', (req, res) => {
    const db = req.app.db;
    
    const competitions = db.prepare('SELECT * FROM Competitions').all();
    const teams = db.prepare('SELECT * FROM Team').all();
    const users = db.prepare('SELECT * FROM User').all();

    // Join team members with users
    const teamsWithMembers = teams.map(team => {
        const teamMembers = users.filter(user => user.CurrentTeamID === team.TeamID);
        const captain = users.find(user => user.UserID === team.TeamCaptain);
        return {
            ...team,
            members: teamMembers,
            TeamCaptain: captain
        };
    });

    res.json({ 
        competitions, 
        teams: teamsWithMembers, 
        users 
    });
});

module.exports = router; 