const db = require('../database/db');

async function generateMemberActivityReport() {
    try {
        // Get the active competition
        const activeCompetition = await db.get(`
            SELECT CompetitionID, CompetitionName 
            FROM Competitions 
            WHERE Status = 'Active'
            LIMIT 1
        `);

        if (!activeCompetition) {
            throw new Error('No active competition found');
        }

        // Get all teams in the active competition with their members' activity
        const teamActivityReport = await db.all(`
            SELECT 
                t.TeamID,
                t.TeamName,
                COUNT(DISTINCT u.UserID) as totalMembers,
                COUNT(DISTINCT CASE WHEN ua.UserID IS NOT NULL THEN u.UserID END) as participatingMembers,
                COALESCE(SUM(ua.TotalTime), 0) as totalMinutes
            FROM Team t
            LEFT JOIN User u ON t.TeamID = u.CurrentTeamID
            LEFT JOIN UserActivity ua ON u.UserID = ua.UserID AND ua.CompetitionID = ?
            WHERE t.CompetitionID = ?
            GROUP BY t.TeamID, t.TeamName
            ORDER BY totalMinutes DESC
        `, [activeCompetition.CompetitionID, activeCompetition.CompetitionID]);

        return {
            competitionName: activeCompetition.CompetitionName,
            competitionID: activeCompetition.CompetitionID,
            teams: teamActivityReport
        };
    } catch (error) {
        console.error('Error generating member activity report:', error);
        throw error;
    }
}

module.exports = {
    generateMemberActivityReport
};
