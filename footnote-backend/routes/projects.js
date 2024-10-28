// TODO: NEEDS A GLOBAL VARIABLE THAT KEEPS TRACK OF CURRENTLY LOGGED IN USERNAME

// Author: Mia
// file for project back end handling

const express = require('express');
const router = express.Router();

const conn = require('../services/database');

/*
PROJECTS(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  projectName VARCHAR(100),
  videoUrl VARCHAR(2083),
  username VARCHAR(100) NOT NULL,
  FOREIGN KEY (username) REFERENCES USERS(username)
)
*/

// TODO: Path is set up. Get username from front-end
router.get('/home', async(req, res) => {
  const username = 'footnote';

  try {
    const result = await getProjects(username);
    res.send(result);
  } catch (err) {
    console.log('Error retrieving existing projects: ', err);
    res.status(500).send('Error retrieving existing projects');
  }
});

// TODO: Path is set up. Get projectName and username from front-end
// TODO: Should definitely decouple the create project from the path:
// example: if someone refreshes, doing it this way creates a new project
router.get('/create-project', async(req, res) => {
  const projectName = 'eta newjeans';
  const username = 'footnote';

  try {
    const result = await createProject(projectName, username);
    res.send(result);
  } catch (err) {
    console.log('Error creating new project: ', err);
    res.status(500).send('Error creating new project');
  }
});

// TODO: Path is set up for testing purposes. Get pid and videoUrl from somewhere
router.get('/add-url', async(req, res) => {
  // TODO: FOR NOW, TO TEST, NEED TO MANUALLY SET THIS VALUE
  const pid = '1';
  const videoUrl = 'youtube.com';

  try {
    const result = await addUrl(pid, videoUrl);
    res.send(result);
  } catch (err) {
    console.log('Error adding video URL: ', err);
    res.status(500).send('Error adding video URL');
  }
});

// TODO: Path is set up for testing purposes. Get pid from somewhere
router.get('/delete-project', async(req, res) => {
  // TODO: FOR NOW, TO TEST, NEED TO MANUALLY SET THIS VALUE
  const pid = '1';

  try {
    const result = await deleteProject(pid);
    res.send(result);
  } catch (err) {
    console.log('Error deleting project: ', err);
    res.status(500).send('Error deleting project');
  }
});

// Retrieve the list of existing projects under the given username
// Returns an empty array (eg. []) or an array of strings (eg. ['Project A', 'Project B'])
async function getProjects(username) {
  // TODO: ENSURE WE CAN GET HERE ONLY AFTER LOGIN. IF NOT, NEED TO MAKE SURE USERNAME
  // EXIST IN DB BEFORE GETPORJECTS
  const getProjectsSql = 'SELECT projectName FROM PROJECTS WHERE username = ?';

  try {
    // TODO: case where user is not loged in?

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // retrieve projects under this username in database
    // rows hold the results, i.e., the first element of the two-element array returned by .query()
    // rows is either empty [] or of the following format (an array of objects):
    // [
    //   { projectName: 'project A' },
    //   { projectName: 'project B' }
    // ]
    const [rows] = await conn.promise().query(getProjectsSql, [usernameLower]);

    if (rows.length === 0) {
      return [];
    } else {
      // extract just the project names: ['project A', 'project B']
      return rows.map(row => row.projectName);
    }
  } catch (err) {
    console.error('Error during projects retrieval: ', err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

// Create a new project and insert a new tuple with (projectName, username)
// into the PROJECTS table. URL will be added later once the user uploads a video.
// pid (Project ID) is autoincremented. Same project name can exist since pid is
// the unique identifier.
async function createProject(projectName, username) {
  // TODO: ENSURE WE CAN GET HERE ONLY AFTER LOGIN. IF NOT, NEED TO MAKE SURE USERNAME
  // EXIST IN DB BEFORE GETPORJECTS
  // The foreign key constraint should automatically enforce us from inserting into
  // PROJECTS if there's no corresponding username in USERS

  const createProjectSql = 'INSERT INTO PROJECTS(projectName, username) VALUES(?, ?)';

  try {
    // check if projectName or username is empty
    if (!projectName || projectName.trim() === "") {
      return "Project name is empty";
    }

    if (!username || username.trim() === "") {
      return "Username is empty";
    }

    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    await conn.promise().query(createProjectSql, [projectName, usernameLower]);

    return "Created project " + projectName + "for user " + usernameLower + "\n";
  } catch (err) {
    console.error('Error during project creation: ', err);
    return 'Error during project creation';
  }
}

// Adds a video URL to a previously created project using the pid
// Returns error message if there is no existing matching pid in PROJECTS
async function addUrl(pid, videoUrl) {
  const addUrlSql = 'UPDATE PROJECTS SET videoUrl = ? WHERE pid = ?;';

  try {
    const [result] = await conn.promise().query(addUrlSql, [videoUrl, pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS \n";
    }

    return "Updated video URL for project with pid " + pid + "\n";
  } catch (err) {
    console.error('Error during URL insertion: ', err);
    return 'Error during URL insertion';
  }
}

// Deletes a project with a given pid
async function deleteProject(pid) {
  const deleteProjectSql = 'DELETE FROM PROJECTS WHERE pid = ?';

  try {
    const [result] = await conn.promise().query(deleteProjectSql, [pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS \n";
    }

    return "Deleted project with pid " + pid + "\n";
  } catch (err) {
    console.error('Error during project deletion: ', err);
    return 'Error during project deletion';
  }
}

// Exports
module.exports = router;
module.exports.getProjects = getProjects;
module.exports.createProject = createProject;
module.exports.addUrl = addUrl;
module.exports.deleteProject = deleteProject;

