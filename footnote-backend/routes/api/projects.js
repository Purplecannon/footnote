/**
 * Author: Mia
 * File for project back end handling
 */

// Imports
const express = require("express");
const router = express.Router();
const conn = require("../../config/database");
const {
  CHECK_OWN_PROJECT,
  GET_PROJECTS_BY_USERNAME,
  INSERT_PROJECT,
  GET_PROJECT_BY_PID,
  UPDATE_PROJECTNAME,
  DELETE_PROJECT_BY_PID,
  DELETE_ANNOTATIONS_BY_PID,
} = require("../../queries/sqlConstants");

/**
 * Endpoint: GET http://localhost:3000/projects/home
 */
router.get("/home", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await getProjects(req.session.username);
    res.send(result);
  } catch (err) {
    console.log("Error retrieving existing projects: ", err);
    res.status(500).send("Error retrieving existing projects");
  }
});

/**
 * Endpoint: GET http://localhost:3000/projects/create-project
 */
router.get("/create-project", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const pid = await getPid(req.session.username);
    const title = "untitled";
    res.send({ pid, title });
  } catch (err) {
    console.log("Error getting new project id: ", err);
    res.status(500).send("Error getting new project id");
  }
});

/**
 * Endpoint: GET http://localhost:3000/projects/load-project/:pid
 */
router.get("/load-project/:pid", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const pid = req.params.pid; // Extract pid from route parameter

  try {
    const project = await loadProject(pid);
    res.status(200).send(project);
  } catch (err) {
    console.log("Error loading project: ", err);
    res.status(500).send("Error loading project");
  }
});

/**
 * Endpoint: PUT http://localhost:3000/projects/edit-project-name
 */
router.put("/edit-project-name", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { projectName, pid } = req.body;
  console.log(`PID = ${pid}`);

  // TODO: how about empty projectName?
  if (projectName.length > 100) {
    return res.status(400).send("Project name is longer than 100 characters");
  }

  try {
    // Check if the user owns the project
    const [rows] = await conn.promise().query(CHECK_OWN_PROJECT, [pid]);
    const project = rows[0];

    if (!project || project.username !== req.session.username) {
      return res
        .status(403)
        .send("Forbidden, you are not the owner of this project");
    }

    // Update project name
    const result = await editProjectName(projectName, pid);
    res.send(result);
  } catch (err) {
    console.log("Error editing project name: ", err);
    res.status(500).send("Error editing project name");
  }
});

/**
 * Endpoint: DELETE http://localhost:3000/projects/delete-project
 */
router.delete("/delete-project/:projectID", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const pid = req.params.projectID;

  try {
    const result = await deleteProject(pid);
    res.send(result);
  } catch (err) {
    console.log("Error deleting project: ", err);
    res.status(500).send("Error deleting project");
  }
});

/**
 * Retrieve the list of existing projects (pid, project_name) under the given username
 * @param {*} username
 * @returns
 */
async function getProjects(username) {
  try {
    // usernames are not case-sensitive
    const usernameLower = username.toLowerCase();

    // retrieve projects under this username in database
    // rows hold the results, i.e., the first element of the two-element array returned by .query()
    // rows is either empty [] or is an array of objects:
    const [rows] = await conn
      .promise()
      .query(GET_PROJECTS_BY_USERNAME, [usernameLower]);

    if (rows.length === 0) {
      return [];
    } else {
      // return an array of objects containing both pid and project_name
      return rows.map((row) => ({
        projectID: row.pid, // return 'pid' as 'id' to match frontend model
        title: row.project_name, // return 'project_name' as 'title' to match frontend model
        videoURL: row.video_url, // return 'video_url' as 'videoURL' to match frontend model
        thumbnailURL: row.thumbnail_url, // return 'thumbnail_url' as 'thumbnailURL' to match frontend model
      }));
    }
  } catch (err) {
    console.error("Error during projects retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

/**
 * Retrieve a project id for a newly created project for the given username
 * @param {*} username
 * @returns
 */
async function getPid(username) {
  try {
    const [result] = await conn.promise().query(INSERT_PROJECT, [username]);
    return result.insertId;
  } catch (err) {
    console.error("Error getting new pid ", err);
    return "Error getting new pid";
  }
}

/**
 *
 * @param {*} pid
 * @returns
 */
async function loadProject(pid) {
  try {
    const [rows] = await conn.promise().query(GET_PROJECT_BY_PID, [pid]);
    if (rows.length === 0) {
      return null; // no projects found
    } else {
      const row = rows[0];
      return {
        projectID: row.pid,
        title: row.project_name || "untitled",
        videoURL: row.video_url,
        thumbnailURL: row.thumbnail_url,
        username: row.username,
      };
    }
  } catch (err) {
    console.log("Error loading project", err);
    throw err;
  }
}

/**
 *
 * @param {*} projectName
 * @param {*} pid
 * @returns
 */
async function editProjectName(projectName, pid) {
  try {
    const [result] = await conn
      .promise()
      .query(UPDATE_PROJECTNAME, [projectName, pid]);
    if (result.affectedRows > 0) {
      return "Project name edited successfully";
    } else {
      throw new Error("Project name not edited or project ID not found");
    }
  } catch (err) {
    console.error("Error editing project name ", err);
    throw err;
  }
}

/**
 *
 * @param {*} pid
 */
async function deleteAllAnnotations(pid) {
  try {
    await conn.promise().query(DELETE_ANNOTATIONS_BY_PID, pid);
  } catch (err) {
    console.error("Error deleting annotation: ", err);
    throw err;
  }
}

/**
 * Deletes a project with a given pid
 * @param {*} pid
 * @returns
 */
async function deleteProject(pid) {
  await deleteAllAnnotations(pid);
  try {
    const [result] = await conn.promise().query(DELETE_PROJECT_BY_PID, pid);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Deleted project with pid " + pid;
  } catch (err) {
    console.error("Error deleting project: ", err);
    return "Error deleting project";
  }
}

// Exports
module.exports = router;
module.exports.getProjects = getProjects;
module.exports.deleteProject = deleteProject;
module.exports.loadProject = loadProject;
module.exports.editProjectName = editProjectName;
