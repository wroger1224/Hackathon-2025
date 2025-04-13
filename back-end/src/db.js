const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const createDatabase = () => {
    const dbPath = path.join(__dirname, '../database/app.db');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    
    // Check if database exists
    const dbExists = fs.existsSync(dbPath);
    
    // Create database connection
    const db = new Database(dbPath);

    // Enable foreign keys
    db.pragma('foreign_keys = ON');

    // If database didn't exist, run schema
    if (!dbExists) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema);
        console.log('Database initialized with schema');
    }

    return db;
};

module.exports = createDatabase;