//Author: Catherine

import * as assert from "assert";
//import request from 'supertest';
import app from "../app.js";
import session from "supertest-session";

import {
  getProjects,
  deleteProject,
  loadProject,
} from "../routes/api/projects.js";
import { clearTables, resetTables } from "../config/tables.js";

/*
    TODO Tests:
    - create-project request
    - loadProject method
    - delete method
    - getProjects method
    - editProjectName method
    - load homepage request (check that returns correct project list)
    - load-project request
    - edit-project-name request
    - delete request
*/

const usersURL = "/users";
const projectsURL = "/projects";

describe("Handles project creation", () => {
  let agent;
  const username = "johndoe";
  const password = "0RTHU4";

  before(async () => {
    await clearTables();
    await resetTables();

    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(() => {
    agent = session(app);
  });
  after(async () => {
    await agent.destroy();
    await clearTables();
    await resetTables();
  });

  it("create-project fails when not logged in", async () => {
    await agent.get(projectsURL + "/create-project").expect(401);
  });

  it("successful creates a project when logged in", async () => {
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);

    const projectResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);
    
    const pid = projectResponse._body.pid;
    assert.strictEqual(pid, 1);
  });

  it("successfully creates multiple projects", async () => {
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);

    await agent.get(projectsURL + "/create-project").expect(200);
    await agent.get(projectsURL + "/create-project").expect(200);
    await agent.get(projectsURL + "/create-project").expect(200);
    await agent.get(projectsURL + "/create-project").expect(200);
  
    const getResponse = await getProjects(username);
    assert.strictEqual(getResponse.length, 5);
  });
});

describe("Handles loading a project", () => {
  let agent;
  const username = "arthurle34";
  const password = "password123";

  before(async () => {
    await clearTables();
    await resetTables();

    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(() => {
    agent = session(app);
  });
  after(async () => {
    await agent.destroy();
    await clearTables();
    await resetTables();
  });

  it("successful load projects when logged in", async () => {
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);

    const projectResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = projectResponse._body.pid;
    assert.strictEqual(pid, 1);

    const loadResponse = await agent
      .get(projectsURL + "/load-project/" + pid)
      .expect(200);

    assert.strictEqual(loadResponse._body.projectID, pid);
    assert.strictEqual(loadResponse._body.title, "untitled");
    assert.strictEqual(loadResponse._body.username, username);
  });

  it("load-project fails when not logged in", async () => {
    const pid = 1;
    await agent
      .get(projectsURL + "/load-project/" + pid)
      .expect(401);
  });
  
  it("missing pid fails", async() => {
    await agent
      .get(projectsURL + '/load-project')
      .expect(404);

    await agent
      .get(projectsURL + '/load-project/')
      .expect(404);
  })
  /*
  it("loading a nonexistent project fails", async() => {
    await agent
      .post(usersURL + '/login-user')
      .send({username: username, password: password})
      .expect(200);

    const pid1 = 1;
    const pid2 = 2;
    const pid3 = 200;

    await agent
      .get(projectsURL + "/load-project/" + pid2)
      .expect(400);
    await agent
      .delete(projectsURL + '/delete-project/' + pid1)
      .expect(400);
    await agent
      .get(projectsURL + '/load-project/' + pid2)
      .expect(400);
    await agent
      .get(projectsURL + '/load-project/' + pid3)
      .expect(400);
  })*/
});

describe("Handles editing a project name", () => {
  let agent;
  const username = "mrjalapeno";
  const password = "p4ssw0rd";

  before(async () => {
    await clearTables();
    await resetTables();

    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(async () => {
    agent = session(app);
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);
  });
  after(async () => {
    await agent.destroy();
    await clearTables();
    await resetTables();
  });

  it("successful project name edit when logged in", async () => {
    const createResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = createResponse._body.pid;
    const projectName = "Dance Project 1";

    const editResponse = await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: projectName, pid: pid })
      .expect(200);
    assert.strictEqual(editResponse.text, "Project name edited successfully");

    const loadResponse = await agent
      .get(projectsURL + "/load-project/" + pid)
      .expect(200);

    assert.strictEqual(loadResponse._body.projectID, pid);
    assert.strictEqual(loadResponse._body.title, projectName);
    assert.strictEqual(loadResponse._body.username, username);
  });

  it("failed project name edit when not logged in", async () => {
    const pid = 1;
    const projectName = "Dance Project 1";

    await agent.destroy();
    await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: projectName, pid: pid })
      .expect(401);
  });

  it("failed project name edit when new name is too long", async () => {
    const createResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = createResponse._body.pid;

    const nameLen100 =
      "100charactersarerequiredforthispasswordsoimjustgonnakeeptypingyippeiamextremelytiredaaaaaaaaaaaaaaaa";
    const nameLen100plus =
      "jurgenleitnerstupididiotmothereffingjurgenleitnergoddangfoolbookcollectingdusteatingratoldmanstupididiotavatarofthewenchbiggestclowninthecircus";

    const response1 = await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: nameLen100, pid: pid })
      .expect(200);
    assert.strictEqual(response1.text, "Project name edited successfully");

    const response2 = await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: nameLen100plus, pid: pid })
      .expect(400);
    assert.strictEqual(response2._body.message, "Project name is longer than 100 characters");
  });
  
  /*
  it('failed project name edit when new name is empty', async() => {
      const pid = 1;
      await agent
          .put(projectsURL + '/edit-project-name')
          .send({projectName: "", pid: pid})
          .expect(400);
  });

  it('failed project name edit when new name is empty (space)', async() => {
      const pid = 1;
      await agent
          .put(projectsURL + '/edit-project-name')
          .send({projectName: " ", pid: pid})
          .expect(400);
  });

  it('failed project name edit when new name is empty (spaces)', async() => {
      const pid = 1;
      await agent
          .put(projectsURL + '/edit-project-name')
          .send({projectName: "     ", pid: pid})
          .expect(400);
  });
  */

  it('failed project name edit when the project does not exist within the user\'s account', async() => {
      const pid = 20;
      await agent
          .put(projectsURL + "/edit-project-name")
          .send({projectName: "This project doesn't exist", pid: pid})
          .expect(403);
  })

  it("failed project name edit when the project does not belong to the user", async () => {
    const createResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = createResponse._body.pid;

    agent.destroy();

    const username2 = "hatsunemiku";
    const password2 = "01";
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username2,
        password: password2,
        confirmPassword: password2,
      })
      .expect(200);

    agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: "projectname", pid: pid })
      .expect(403);
  });
});

describe("Handles project deletion", () => {
  let agent;
  const username = "pikachic";
  const password = "egg";

  before(async () => {
    await clearTables();
    await resetTables();

    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(() => {
    agent = session(app);
  });
  after(async () => {
    await agent.destroy();
    await clearTables();
    await resetTables();
  });

  it("successful project deletion when logged in", async () => {
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);

    const projectResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = projectResponse._body.pid;

    const response = await agent
      .delete(projectsURL + "/delete-project/" + pid)
      .expect(200);
    assert.strictEqual(response.text, "Deleted project with pid " + pid);

    const loadResponse = await agent
      .get(projectsURL + "/load-project/" + pid)
      .expect(200);

    assert.strictEqual(loadResponse._body, undefined);
  });

  it("delete-project fails when not logged in", async () => {
    await agent.destroy();
    const pid = 1;
    await agent
      .delete(projectsURL + "/delete-project/" + pid)
      .expect(401);
  });

  it("deletion of nonexistent project fails", async () => {
    const pid = 1;
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);
    const response = await agent
      .delete(projectsURL + "/delete-project/" + pid)
      .expect(400);
    assert.strictEqual(
      response.text,
      "No matching pid " + pid + " found in PROJECTS"
    );
  });

  it('delete-project fails when logged in and projectID is missing', async() => {
    await agent
      .post(usersURL + '/login-user')
      .send({username: username, password: password})
      .expect(200);

    await agent
      .delete(projectsURL + '/delete-project')
      .expect(404);

    await agent
      .delete(projectsURL + '/delete-project/')
      .expect(404);
  });
});

describe("Handles loading the homepage project list", () => {
  let agent;
  const username = "johndoe";
  const password = "0RTHU4";

  before(async () => {
    await clearTables();
    await resetTables;
    
    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(async () => {
    agent = session(app);
    await agent
      .post(usersURL + "/login-user")
      .send({ username: username, password: password })
      .expect(200);
  });
  after(async () => {
    await agent.destroy();
    await clearTables();
    await resetTables();
  });

  it("Fails when not logged in", async () => {
    agent.destroy();
    await agent.get(projectsURL + "/home").expect(401);
  });

  it("Empty project list", async () => {
    const response = await agent.get(projectsURL + "/home").expect(200);
    assert.deepStrictEqual(response._body, []);
  });

  it("Project list with one project", async () => {
    const p1Response = await agent
      .get(projectsURL + "/create-project")
      .expect(200);
    const pid1 = p1Response._body.pid;
    const projectName1 = "Project1";

    await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: projectName1, pid: pid1 })
      .expect(200);

    const response = await agent.get(projectsURL + "/home").expect(200);
    assert.deepStrictEqual(response._body, [
      { projectID: pid1, title: projectName1 },
    ]);
  });

  it("Project list with multiple projects", async () => {
    const pid1 = 1;
    const load1Response = await agent
      .get(projectsURL + "/load-project/" + pid1)
      .expect(200);
    const projectName1 = load1Response._body.title;

    const p2Response = await agent
      .get(projectsURL + "/create-project")
      .expect(200);
    const pid2 = p2Response._body.pid;
    const projectName2 = "Fight Song Choreo";

    await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: projectName2, pid: pid2 })
      .expect(200);

    const p3Response = await agent
      .get(projectsURL + "/create-project")
      .expect(200);
    const pid3 = p3Response._body.pid;
    const projectName3 = "CYC Opening Ceremony";

    await agent
      .put(projectsURL + "/edit-project-name")
      .send({ projectName: projectName3, pid: pid3 })
      .expect(200);

    const response = await agent.get(projectsURL + "/home").expect(200);

    assert.deepStrictEqual(response._body, [
      { projectID: pid1, title: projectName1 },
      { projectID: pid2, title: projectName2 },
      { projectID: pid3, title: projectName3 },
    ]);
  });
});
