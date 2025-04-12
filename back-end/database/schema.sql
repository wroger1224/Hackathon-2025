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
    TeamCaptain TEXT NOT NULL
);

-- Create User Table
CREATE TABLE User (
    UserID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Age INTEGER,
    Weight REAL,
    ActivityLevel TEXT CHECK (ActivityLevel IN ('Sedentary', 'Moderate', 'High')),
    HeightInInches REAL,
    TeamID INTEGER,
    RoleID INTEGER,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID) ON DELETE SET NULL,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID) ON DELETE SET NULL
);

-- Create Message Table
CREATE TABLE Message (
    MessageID INTEGER PRIMARY KEY,
    Message TEXT NOT NULL,
    TeamID INTEGER,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX idx_user_team ON User(TeamID);
CREATE INDEX idx_user_role ON User(RoleID);
CREATE INDEX idx_message_team ON Message(TeamID); 