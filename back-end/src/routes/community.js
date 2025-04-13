const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET /community - Get all community data
router.get('/', authMiddleware, async (req, res) => {
    // console.log('Fetching community data...');
    try {
        const db = req.app.db;
        
        // Get the active competition
        // console.log('Fetching active competition...');
        const activeCompetition = await db.prepare('SELECT * FROM Competitions WHERE Status = ?').get('Active');
        // console.log('Active competition:', activeCompetition);
        
        if (!activeCompetition) {
            console.log('No active competition found');
            return res.status(404).json({ error: 'No active competition found' });
        }

        // Get all teams for the active competition
        // console.log('Fetching teams for competition:', activeCompetition.CompetitionID);
        const teams = await db.prepare(`
            SELECT t.*, 
                   COUNT(DISTINCT u.UserID) as memberCount,
                   SUM(ua.TotalPoints) as totalTeamPoints
            FROM Team t
            LEFT JOIN User u ON t.TeamID = u.TeamID
            LEFT JOIN UserActivity ua ON u.UserID = ua.UserID AND ua.CompetitionID = ?
            WHERE t.CompetitionID = ?
            GROUP BY t.TeamID
        `).all(activeCompetition.CompetitionID, activeCompetition.CompetitionID);


        // Get all users on the teams with their activity and milestones
        // console.log('Fetching users for teams:', teams.map(team => team.TeamID));
        const users = await db.prepare(`
            SELECT 
                u.UserID,
                u.FirstName,
                u.LastName,
                u.Email,
                u.TeamID,
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
                ) as allActivities
            FROM User u
            LEFT JOIN UserActivity ua ON u.UserID = ua.UserID AND ua.CompetitionID = ?
            LEFT JOIN UserMilestones um ON u.UserID = um.UserID
            LEFT JOIN Milestones m ON um.MilestoneID = m.MilestoneID
            WHERE u.TeamID IN (${teams.map(() => '?').join(',')})
            GROUP BY u.UserID
        `).all(activeCompetition.CompetitionID, ...teams.map(team => team.TeamID));
        // console.log('Users found:', users.length);
        // console.log('User details:', users);

        // Get all milestones for the active competition

        const milestones = await db.prepare(`
            SELECT * FROM Milestones 
            WHERE CompetitionID = ?
        `).all(activeCompetition.CompetitionID);


        const response = {
            competition: {
                ...activeCompetition,
                totalTeams: teams.length,
                totalParticipants: users.length
            },
            teams,
            users,
            milestones
        };
        // console.log('Sending response with:', {
        //     totalTeams: response.competition.totalTeams,
        //     totalParticipants: response.competition.totalParticipants,
        //     teamsCount: response.teams.length,
        //     usersCount: response.users.length,
        //     milestonesCount: response.milestones.length
        // });
        // console.log('Response:', response);
        console.log('here');
        res.json(response);
    } catch (error) {
        console.error('Error in community route:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({ error: 'Failed to fetch community data' });
    }
});

module.exports = router; 