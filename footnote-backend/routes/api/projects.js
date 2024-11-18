// Author: Mia
// file for project back end handling

const express = require("express");
const router = express.Router();
const conn = require("../../config/database");

// endpoint: GET "http://localhost:3000/projects/home"
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

// endpoint: GET "http://localhost:3000/projects/create-project"
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

// endpoint: GET "http://localhost:3000/projects/load-project/:pid"
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

// endpoint: "http://localhost:3000/projects/edit-project-name"
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
    const projectCheckSql = "SELECT username FROM PROJECTS WHERE pid = ?";
    const [rows] = await conn.promise().query(projectCheckSql, [pid]);
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

// endpoint: DELETE "http://localhost:3000/projects/delete-project"
// TODO: Path is set up for testing purposes. Get pid from somewhere
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

// Retrieve the list of existing projects (pid, project_name) under the given username
async function getProjects(username) {
  // TODO: ENSURE WE CAN GET HERE ONLY AFTER LOGIN. IF NOT, NEED TO MAKE SURE USERNAME
  // EXIST IN DB BEFORE GETPORJECTS
  const getProjectsSql =
    "SELECT pid, project_name FROM PROJECTS WHERE username = ?;";

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
      return rows.map((row) => ({
        projectID: row.pid, // return 'pid' as 'id' to match frontend model
        title: row.project_name, // return 'project_name' as 'title' to match frontend model
      }));
    }
  } catch (err) {
    console.error("Error during projects retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

// Retrieve a project id for a newly created project for the given username
async function getPid(username) {
  const insertPidSql = "INSERT INTO PROJECTS(username) VALUES(?);";

  try {
    const [result] = await conn.promise().query(insertPidSql, [username]);
    return result.insertId;
  } catch (err) {
    console.error("Error getting new pid ", err);
    return "Error getting new pid";
  }
}

async function loadProject(pid) {
  const loadProjectSql = "SELECT * FROM PROJECTS WHERE pid = ?;";

  try {
    const [rows] = await conn.promise().query(loadProjectSql, [pid]);
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

async function editProjectName(projectName, pid) {
  const editProjectNameSql =
    "UPDATE PROJECTS SET project_name = ? WHERE pid = ?;";

  try {
    const [result] = await conn
      .promise()
      .query(editProjectNameSql, [projectName, pid]);
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

async function deleteAllAnnotations(pid) {
  const deleteAnnotationSql = "DELETE FROM ANNOTATIONS WHERE pid = ?";

  try {
    await conn.promise().query(deleteAnnotationSql, pid);
  } catch (err) {
    console.error("Error deleting annotation: ", err);
    throw err;
  }
}

// Deletes a project with a given pid
async function deleteProject(pid) {
  await deleteAllAnnotations(pid);

  const deleteProjectSql = "DELETE FROM PROJECTS WHERE pid = ?";

  try {
    const [result] = await conn.promise().query(deleteProjectSql, pid);

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
