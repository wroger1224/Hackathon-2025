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
    TeamCaptainID INTEGER NOT NULL,
    CompetitionID INTEGER,
    Points INTEGER DEFAULT 0,
    Rank INTEGER,
    FOREIGN KEY (TeamCaptainID) REFERENCES User(UserID) ON DELETE CASCADE,
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
    TimeThreshold INTEGER NOT NULL, -- in minutes
    ImagePath TEXT, -- Path or URL to milestone image
    FOREIGN KEY (CompetitionID) REFERENCES Competitions(CompetitionID) ON DELETE CASCADE
);

-- Create UserMilestones Table
CREATE TABLE UserMilestones (
    UserMilestoneID INTEGER PRIMARY KEY,
    UserID INTEGER NOT NULL,
    MilestoneID INTEGER NOT NULL,
    CompletionDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (MilestoneID) REFERENCES Milestones(MilestoneID) ON DELETE CASCADE,
    UNIQUE (UserID, MilestoneID)
);

-- Create UserActivity Table
CREATE TABLE UserActivity (
    UserActivityID INTEGER PRIMARY KEY,
    UserID INTEGER NOT NULL,
    CompetitionID INTEGER NOT NULL,
    UserInput TEXT NOT NULL, -- The activity description submitted by the user
    TotalTime INTEGER NOT NULL DEFAULT 0, -- in minutes
    TotalPoints INTEGER NOT NULL DEFAULT 0,
    LastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CompetitionID) REFERENCES Competitions(CompetitionID) ON DELETE CASCADE,
    UNIQUE (UserID, CompetitionID)
);

-- Add indexes for performance
CREATE INDEX idx_team_competition ON Team(CompetitionID);
CREATE INDEX idx_team_captain ON Team(TeamCaptainID);
CREATE INDEX idx_user_team ON User(CurrentTeamID);
CREATE INDEX idx_user_role ON User(RoleID);
CREATE INDEX idx_milestones_competition ON Milestones(CompetitionID);
CREATE INDEX idx_user_milestones_user ON UserMilestones(UserID);
CREATE INDEX idx_user_milestones_milestone ON UserMilestones(MilestoneID);
CREATE INDEX idx_user_activity_user ON UserActivity(UserID);
CREATE INDEX idx_user_activity_competition ON UserActivity(CompetitionID);

-- Additional performance optimizations
-- Composite indexes for common join patterns
CREATE INDEX idx_user_activity_user_competition ON UserActivity(UserID, CompetitionID);
CREATE INDEX idx_user_milestones_user_milestone ON UserMilestones(UserID, MilestoneID);
CREATE INDEX idx_team_competition_points ON Team(CompetitionID, Points);

-- Indexes for frequently filtered/sorted columns
CREATE INDEX idx_competitions_status ON Competitions(Status);
CREATE INDEX idx_competitions_dates ON Competitions(StartDate, EndDate);
CREATE INDEX idx_user_activity_totals ON UserActivity(TotalTime, TotalPoints);
CREATE INDEX idx_milestones_threshold ON Milestones(TimeThreshold);
CREATE INDEX idx_user_opt_in ON User(OptInForMessages) WHERE OptInForMessages = 1; 