const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const createDatabase = () => {
    // Create database connection
    const db = new Database(path.join(__dirname, '../database/app.db'));

    // Enable foreign keys
    db.pragma('foreign_keys = ON');

    // Check if any table exists
    const checkTables = db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name IN (
            'Roles', 'Permissions', 'Team', 'User', 
            'Competitions', 'Milestones', 'UserMilestones', 'UserActivity'
        )
    `).all();

    // If no tables exist, create all tables and indices
    if (checkTables.length === 0) {
        const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
        db.exec(schema);
    }

    return db;
};

module.exports = createDatabase;
