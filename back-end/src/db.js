const Database = require('better-sqlite3');
const path = require('path');

const createDatabase = () => {
    // Create database connection
    const db = new Database(path.join(__dirname, '../database/app.db'));

    // Enable foreign keys
    db.pragma('foreign_keys = ON');

    return db;
};

module.exports = createDatabase;