const createDatabase = require('./db');
const db = createDatabase();

try {
    // Begin transaction
    db.exec('BEGIN TRANSACTION;');

    // Check if tables exist
    const checkTables = db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name IN (
            'Roles', 'Permissions', 'Team', 'User', 
            'Competitions', 'Milestones', 'UserMilestones', 'UserActivity'
        )
    `).all();

    // Only delete if tables exist
    if (checkTables.length > 0) {
        db.exec(`
            DELETE FROM UserMilestones;
            DELETE FROM UserActivity;
            DELETE FROM Milestones;
            DELETE FROM Team;
            DELETE FROM User;
            DELETE FROM Roles;
            DELETE FROM Competitions;
            DELETE FROM Permissions;
        `);
    }

    // 1. Insert Roles
    const insertRole = db.prepare(`
        INSERT INTO Roles (RoleID, RoleName) 
        VALUES (?, ?)
    `);
    insertRole.run(1, 'User');
    insertRole.run(2, 'Admin');

    // 2. Insert Permissions for Admin role
    const insertPermission = db.prepare(`
        INSERT INTO Permissions (
            RoleID, AddUser, EditUser, RemoveUser, 
            DfnYrCmptnGlsndMlstns, DfnYrsCmptnDts, InputDailyActivity
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    // Admin permissions (all true)
    insertPermission.run(2, 1, 1, 1, 1, 1, 1);
    // User permissions (only InputDailyActivity true)
    insertPermission.run(1, 0, 0, 0, 0, 0, 1);

    // 3. Insert Competition
    const insertCompetition = db.prepare(`
        INSERT INTO Competitions (CompetitionID, CompetitionName, StartDate, EndDate, Status)
        VALUES (?, ?, ?, ?, ?)
    `);
    insertCompetition.run(1, 'MAXX Heart Walk', '2024-04-01', '2024-04-30', 'Active');

    // 4. Insert Teams first (before users since users reference teams)
    const insertTeam = db.prepare(`
        INSERT INTO Team (TeamID, TeamName, TeamCaptain, CompetitionID, Points)
        VALUES (?, ?, ?, ?, ?)
    `);
    // Teams will be created with captain names
    insertTeam.run(1, 'Cardiac Crusaders', 'John Smith', 1, 0);
    insertTeam.run(2, 'Heart Heroes', 'Robert Anderson', 1, 0);
    insertTeam.run(3, 'Pulse Protectors', 'Charles Thompson', 1, 0);
    insertTeam.run(4, 'Beat Masters', 'Daniel Lewis', 1, 0);

    // 5. Insert Users (after teams exist)
    const insertUser = db.prepare(`
        INSERT INTO User (
            UserID, FirstName, LastName, Email, OptInForMessages, 
            Age, Weight, ActivityLevel, HeightInInches, CurrentTeamID, RoleID, TeamID
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Sample user data
    const users = [
        // Team 1 - Cardiac Crusaders
        { id: '1', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', teamId: 1, roleId: 2 }, // Admin
        { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@example.com', teamId: 1, roleId: 1 },
        { id: '3', firstName: 'Michael', lastName: 'Brown', email: 'michael.b@example.com', teamId: 1, roleId: 1 },
        { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily.d@example.com', teamId: 1, roleId: 1 },
        { id: '5', firstName: 'David', lastName: 'Wilson', email: 'david.w@example.com', teamId: 1, roleId: 1 },
        { id: '6', firstName: 'Jessica', lastName: 'Taylor', email: 'jessica.t@example.com', teamId: 1, roleId: 1 },

        // Team 2 - Heart Heroes
        { id: '7', firstName: 'Robert', lastName: 'Anderson', email: 'robert.a@example.com', teamId: 2, roleId: 2 }, // Admin
        { id: '8', firstName: 'Jennifer', lastName: 'Thomas', email: 'jennifer.t@example.com', teamId: 2, roleId: 1 },
        { id: '9', firstName: 'William', lastName: 'Jackson', email: 'william.j@example.com', teamId: 2, roleId: 1 },
        { id: '10', firstName: 'Elizabeth', lastName: 'White', email: 'elizabeth.w@example.com', teamId: 2, roleId: 1 },
        { id: '11', firstName: 'James', lastName: 'Harris', email: 'james.h@example.com', teamId: 2, roleId: 1 },
        { id: '12', firstName: 'Patricia', lastName: 'Martin', email: 'patricia.m@example.com', teamId: 2, roleId: 1 },

        // Team 3 - Pulse Protectors
        { id: '13', firstName: 'Charles', lastName: 'Thompson', email: 'charles.t@example.com', teamId: 3, roleId: 1 },
        { id: '14', firstName: 'Linda', lastName: 'Garcia', email: 'linda.g@example.com', teamId: 3, roleId: 1 },
        { id: '15', firstName: 'Joseph', lastName: 'Martinez', email: 'joseph.m@example.com', teamId: 3, roleId: 1 },
        { id: '16', firstName: 'Barbara', lastName: 'Robinson', email: 'barbara.r@example.com', teamId: 3, roleId: 1 },
        { id: '17', firstName: 'Thomas', lastName: 'Clark', email: 'thomas.c@example.com', teamId: 3, roleId: 1 },
        { id: '18', firstName: 'Margaret', lastName: 'Rodriguez', email: 'margaret.r@example.com', teamId: 3, roleId: 1 },

        // Team 4 - Beat Masters
        { id: '19', firstName: 'Daniel', lastName: 'Lewis', email: 'daniel.l@example.com', teamId: 4, roleId: 1 },
        { id: '20', firstName: 'Lisa', lastName: 'Lee', email: 'lisa.l@example.com', teamId: 4, roleId: 1 },
        { id: '21', firstName: 'Matthew', lastName: 'Walker', email: 'matthew.w@example.com', teamId: 4, roleId: 1 },
        { id: '22', firstName: 'Nancy', lastName: 'Hall', email: 'nancy.h@example.com', teamId: 4, roleId: 1 },
        { id: '23', firstName: 'Anthony', lastName: 'Allen', email: 'anthony.a@example.com', teamId: 4, roleId: 1 },
        { id: '24', firstName: 'Karen', lastName: 'Young', email: 'karen.y@example.com', teamId: 4, roleId: 1 },
        { id: '25', firstName: 'Mark', lastName: 'King', email: 'mark.k@example.com', teamId: 4, roleId: 1 }
    ];

    // Insert users with random activity levels and measurements
    users.forEach(user => {
        const activityLevels = ['Sedentary', 'Moderate', 'High'];
        const activityLevel = activityLevels[Math.floor(Math.random() * activityLevels.length)];
        const age = Math.floor(Math.random() * 30) + 20; // Random age between 20-50
        const weight = Math.floor(Math.random() * 50) + 120; // Random weight between 120-170
        const height = Math.floor(Math.random() * 12) + 60; // Random height between 60-72 inches

        insertUser.run(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            1, // OptInForMessages
            age,
            weight,
            activityLevel,
            height,
            null, // Set CurrentTeamID to null initially
            user.roleId,
            user.teamId // Set TeamID
        );
    });

    // 6. Update Users with their team IDs
    const updateUserTeam = db.prepare(`
        UPDATE User 
        SET CurrentTeamID = ? 
        WHERE UserID = ?
    `);

    // Assign users to teams
    users.forEach(user => {
        updateUserTeam.run(user.teamId, user.id);
    });

    // 7. Insert Milestones
    const insertMilestone = db.prepare(`
        INSERT INTO Milestones (MilestoneID, CompetitionID, MilestoneName, Description, TimeThreshold)
        VALUES (?, ?, ?, ?, ?)
    `);

    insertMilestone.run(1, 1, 'Bronze Heart', 'Complete 250 minutes of activity', 250);
    insertMilestone.run(2, 1, 'Silver Heart', 'Complete 500 minutes of activity', 500);
    insertMilestone.run(3, 1, 'Gold Heart', 'Complete 750 minutes of activity', 750);
    insertMilestone.run(4, 1, 'Platinum Heart', 'Complete 1000 minutes of activity', 1000);

    // 8. Insert User Activity
    const insertUserActivity = db.prepare(`
        INSERT INTO UserActivity (UserActivityID, UserID, CompetitionID, UserInput, TotalTime, TotalPoints)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(UserID, CompetitionID) DO UPDATE SET
        UserInput = UserInput || ', ' || excluded.UserInput,
        TotalTime = TotalTime + excluded.TotalTime,
        TotalPoints = TotalPoints + excluded.TotalPoints,
        LastUpdated = CURRENT_TIMESTAMP
    `);

    // Generate activity for each user
    let activityId = 1;
    users.forEach(user => {
        const activities = [
            'Walking in the park',
            'Running on treadmill',
            'Cycling around the neighborhood',
            'Swimming at the pool',
            'Hiking in the mountains',
            'Dancing class',
            'Yoga session',
            'Weight training',
            'Basketball game',
            'Tennis match'
        ];

        // Each user gets 3-5 activities
        const numActivities = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < numActivities; i++) {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const time = Math.floor(Math.random() * 120) + 30; // Random time between 30-150 minutes
            const points = Math.floor(time * 0.8); // Points are 80% of time

            insertUserActivity.run(
                activityId++,
                user.id, // Keep as TEXT to match User table
                1,
                activity,
                time,
                points
            );
        }
    });

    // 9. Insert User Milestones
    const insertUserMilestone = db.prepare(`
        INSERT INTO UserMilestones (UserMilestoneID, UserID, MilestoneID, CompletionDate)
        VALUES (?, ?, ?, ?)
    `);

    // Randomly assign milestones to users based on their total activity
    let milestoneId = 1;
    users.forEach(user => {
        const totalTime = db.prepare(`
            SELECT SUM(TotalTime) as total
            FROM UserActivity
            WHERE UserID = ?
        `).get(user.id).total; // Keep as TEXT to match User table

        if (totalTime >= 250) {
            insertUserMilestone.run(milestoneId++, user.id, 1, '2024-06-15');
        }
        if (totalTime >= 500) {
            insertUserMilestone.run(milestoneId++, user.id, 2, '2024-06-20');
        }
        if (totalTime >= 750) {
            insertUserMilestone.run(milestoneId++, user.id, 3, '2024-06-25');
        }
        if (totalTime >= 1000) {
            insertUserMilestone.run(milestoneId++, user.id, 4, '2024-06-30');
        }
    });

    // Commit transaction
    db.exec('COMMIT;');
    console.log('Successfully inserted dummy data');
} catch (error) {
    // Rollback transaction on error
    db.exec('ROLLBACK;');
    console.error('Error inserting dummy data:', error);
} finally {
    // Close database connection
    db.close();
} 