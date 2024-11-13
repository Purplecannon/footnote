// Author: Mia
// file for project back end handling

const express = require('express');
const router = express.Router();
const conn = require('../../config/database');

// endpoint: "http://localhost:3000/projects/home"
router.get('/home', async(req, res) => {
  // session
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send('Unauthorized, please log in');
  }

  try {
    const result = await getProjects(req.session.username);
    res.send(result);
  } catch (err) {
    console.log('Error retrieving existing projects: ', err);
    res.status(500).send('Error retrieving existing projects');
  }
});

// TODO: Path is set up. Get projectName and username from front-end
// TODO: Should definitely decouple the create project from the path:
// example: if someone refreshes, doing it this way creates a new project
// endpoint: "http://localhost:3000/projects/create-project"
router.get('/create-project', async(req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send('Unauthorized, please log in');
  }

  try {
    const pid = await getPid(req.session.username);
    res.send({ pid });
  } catch (err) {
    console.log('Error getting new project id: ', err);
    res.status(500).send('Error getting new project id');
  }
});

// endpoint: "http://localhost:3000/projects/edit-project-name"
router.put("/edit-project-name", async(req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send('Unauthorized, please log in');
  }

  const { projectName, pid } = req.body;

  // TODO: how about empty projectName?
  if (projectName.length > 100) {
    return res.status(400).send('Project name is longer than 100 characters');
  }

  try {
    // Check if the user owns the project
    const projectCheckSql = 'SELECT username FROM PROJECTS WHERE pid = ?';
    const [rows] = await conn.promise().query(projectCheckSql, [pid]);
    const project = rows[0];

    if (!project || project.username !== req.session.username) {
      return res.status(403).send('Forbidden, you are not the owner of this project');
    }

    // Update project name
    const result = await editProjectName(projectName, pid);
    res.send(result);
  } catch (err) {
    console.log('Error editing project name: ', err);
    res.status(500).send('Error editing project name');
  }
});

// endpoint: "http://localhost:3000/projects/add-url"
// TODO: Path is set up for testing purposes. Get pid and videoUrl from somewhere
router.post('/add-url', async(req, res) => {
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

// endpoint: "http://localhost:3000/projects/delete-project"
// TODO: Path is set up for testing purposes. Get pid from somewhere
router.get('/delete-project', async(req, res) => {
  // session
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send('Unauthorized, please log in');
  }

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

// Retrieve the list of existing projects (pid, project_name) under the given username
async function getProjects(username) {
  // TODO: ENSURE WE CAN GET HERE ONLY AFTER LOGIN. IF NOT, NEED TO MAKE SURE USERNAME
  // EXIST IN DB BEFORE GETPORJECTS
  const getProjectsSql = 'SELECT pid, project_name FROM PROJECTS WHERE username = ?';

  try {
    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // retrieve projects under this username in database
    // rows hold the results, i.e., the first element of the two-element array returned by .query()
    // rows is either empty [] or is an array of objects:
    const [rows] = await conn.promise().query(getProjectsSql, [usernameLower]);

    if (rows.length === 0) {
      return [];
    } else {
      // return an array of objects containing both pid and project_name
      return rows.map(row => ({
        id: row.pid,         // return 'pid' as 'id' to match frontend model
        title: row.project_name // return 'project_name' as 'title' to match frontend model
      }));
    }
  } catch (err) {
    console.error('Error during projects retrieval: ', err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

// Retrieve a project id for a newly created project for the given username
async function getPid(username) {
  const insertPidSql = 'INSERT INTO PROJECTS(username) VALUES(?);';

  try {
    const [result] = await conn.promise().query(insertPidSql, [username]);
    return result.insertId;
  } catch (err) {
    console.error('Error getting new pid ', err);
    return 'Error getting new pid';
  }
}

async function editProjectName(projectName, pid) {
  const editProjectNameSql = 'UPDATE PROJECTS SET project_name = ? WHERE pid = ?;';

  try {
    const [result] = await conn.promise().query(editProjectNameSql, [projectName, pid]);
    if (result.affectedRows > 0) {
      return 'Project name edited successfully';
    } else {
      throw new Error('Project name not edited or project ID not found');
    }
  } catch (err) {
    console.error('Error editing project name ', err);
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

  const createProjectSql = 'INSERT INTO PROJECTS(project_name, username) VALUES(?, ?)';

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

    return "Created project " + projectName + "for user " + usernameLower;
  } catch (err) {
    console.error('Error during project creation: ', err);
    return 'Error during project creation';
  }
}

// Adds a video URL to a previously created project using the pid
// Returns error message if there is no existing matching pid in PROJECTS
async function addUrl(pid, videoUrl) {
  const addUrlSql = 'UPDATE PROJECTS SET video_url = ? WHERE pid = ?;';

  try {
    const [result] = await conn.promise().query(addUrlSql, [videoUrl, pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Updated video URL for project with pid " + pid;
  } catch (err) {
    console.error('Error during URL insertion: ', err);
    return 'Error during URL insertion';
  }
}

// Deletes a project with a given pid
async function deleteProject(pid) {
  const deleteProjectSql = 'DELETE FROM PROJECTS WHERE pid = ?';

  try {
    const [result] = await conn.promise().query(deleteProjectSql, pid);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Deleted project with pid " + pid;
  } catch (err) {
    console.error('Error deleting project: ', err);
    return 'Error deleting project';
  }
}

// Exports
module.exports = router;
module.exports.getProjects = getProjects;
module.exports.createProject = createProject;
module.exports.addUrl = addUrl;
module.exports.deleteProject = deleteProject;