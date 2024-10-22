-- Author: Mia

-- All SQL setup statements are here.

-- SQL Rules:
-- 1. Each table should have 1 attribute that is a primary key

-- Relationships:
-- 1. USERS to PROJECTS: one-to-many relationship (one user can have many projects)
-- 2. PROJECTS to ANNOTATIONS: one-to-many relationship (one project can have
-- multiple annotations)

CREATE TABLE USERS(
  username VARCHAR(100) PRIMARY KEY,
  hashedPassword VARCHAR(256) NOT NULL
);

-- pid: project id
CREATE TABLE PROJECTS(
  pid INT PRIMARY KEY,
  projectName VARCHAR(100),
  username VARCHAR(100) NOT NULL,
  FOREIGN KEY (username) REFERENCES USERS(username)
);

-- aid: annotation id
-- timestamp: stored as an integer representing the number of seconds from the
-- start of the video
CREATE TABLE ANNOTATIONS(
  aid INT PRIMARY KEY,
  timestamp INT NOT NULL,
  note VARCHAR(2000),
  pid INT,
  FOREIGN KEY (pid) REFERENCES PROJECTS(pid)
);