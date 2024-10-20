-- All SQL setup statements are here.

-- SQL Rules:
-- 1. Each table should have 1 attribute that is a primary key

-- Relationships:
-- 1. USERS to PROJECTS: one-to-many relationship (one user can have many projects)
-- 2. PROJECTS to ANNOTATIONS: one-to-many relationship (one project can have
-- multiple annotations)

CREATE TABLE USERS(
  uid INT NOT NULL,
  username VARCHAR(100) PRIMARY KEY,
  hashedPassword VARBINARY(256) NOT NULL
);

INSERT INTO USERS VALUES(1, 'mia', 'pw');

-- pid: project id
-- pid INT PRIMARY KEY AUTO_INCREMENT,
CREATE TABLE PROJECTS(
  pid INT PRIMARY KEY,
  projectName VARCHAR(100),
  username VARCHAR(100) NOT NULL REFERENCES USERS(username)
);

-- aid: annotation id
-- timestamp: stored as an integer representing the number of seconds from the
-- start of the video
--   aid INT PRIMARY KEY AUTO_INCREMENT,
CREATE TABLE ANNOTATIONS(
  aid INT PRIMARY KEY,
  timestamp INT NOT NULL,
  note VARCHAR(2000),
  pid INT REFERENCES PROJECTS(pid)
);


