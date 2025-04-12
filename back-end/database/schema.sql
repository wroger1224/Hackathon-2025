-- Create Roles Table
CREATE TABLE Roles (
    RoleID INTEGER PRIMARY KEY,
    RoleName TEXT NOT NULL
);

-- Create Permissions Table
CREATE TABLE Permissions (
    RoleID INTEGER NOT NULL,
    AddUser BOOLEAN NOT NULL DEFAULT 0,
    EditUser BOOLEAN NOT NULL DEFAULT 0,
    RemoveUser BOOLEAN NOT NULL DEFAULT 0,
    DfnYrCmptnGlsndMlstns BOOLEAN NOT NULL DEFAULT 0,
    DfnYrsCmptnDts BOOLEAN NOT NULL DEFAULT 0,
    InputDailyActivity BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID) ON DELETE CASCADE,
    PRIMARY KEY (RoleID)
);

-- Create Team Table
CREATE TABLE Team (
    TeamID INTEGER PRIMARY KEY,
    TeamName TEXT NOT NULL,
    TeamCaptain TEXT NOT NULL,
    CompetitionID INTEGER,
    Points INTEGER DEFAULT 0,
    Rank INTEGER,
    FOREIGN KEY (CompetitionID) REFERENCES Competitions(CompetitionID) ON DELETE SET NULL
);

-- Create User Table
CREATE TABLE User (
    UserID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    OptInForMessages BOOLEAN NOT NULL DEFAULT 0,
    Age INTEGER,
    Weight REAL,
    ActivityLevel TEXT CHECK (ActivityLevel IN ('Sedentary', 'Moderate', 'High')),
    HeightInInches REAL,
    CurrentTeamID INTEGER,
    RoleID INTEGER,
    FOREIGN KEY (CurrentTeamID) REFERENCES Team(TeamID) ON DELETE SET NULL,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID) ON DELETE SET NULL
);

-- Create Message Table
CREATE TABLE Message (
    MessageID INTEGER PRIMARY KEY,
    Message TEXT NOT NULL,
    TeamID INTEGER,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID) ON DELETE CASCADE
);

-- Create Competitions Table
CREATE TABLE Competitions (
    CompetitionID INTEGER PRIMARY KEY,
    CompetitionName TEXT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status TEXT CHECK (Status IN ('Upcoming', 'Active', 'Completed')) DEFAULT 'Upcoming',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Milestones Table
CREATE TABLE Milestones (
    MilestoneID INTEGER PRIMARY KEY,
    CompetitionID INTEGER NOT NULL,
    MilestoneName TEXT NOT NULL,
    Description TEXT,
    Points INTEGER NOT NULL,
    DueDate DATE,
    Status TEXT CHECK (Status IN ('Pending', 'Completed')) DEFAULT 'Pending',
    FOREIGN KEY (CompetitionID) REFERENCES Competitions(CompetitionID) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX idx_user_team ON User(TeamID);
CREATE INDEX idx_user_role ON User(RoleID);
CREATE INDEX idx_message_team ON Message(TeamID); 