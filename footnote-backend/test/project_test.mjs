//Author: Catherine

import * as assert from 'assert';
import request from 'supertest';
import app from '../app.js'

import {getProjects, deleteProject, loadProject} from '../routes/api/projects.js';
import {createUser} from "../routes/auth/users.js";
import {clearTables} from "../config/tables.js";

/* 
    TODO:

    Before Beta: 
    - create-project request
    - loadProject method
    - delete method
    - getProjects method
    - editProjectName method

    After Beta:
    - load homepage request (check that returns correct project list)
    - load-project request
    - edit-project-name request
    - delete request

*/

const videosURL = '/videos';
const projectsURL = '/projects';

describe('Successful create and get projects', () => {
    const username = 'dummyUser';
    const password = 'dummyPassword';

    before (async () =>  {
        await clearTables();

        //create account and new session to hold projects
    });
    after(async () => {
        await clearTables();
    });
    
    it('Handles basic create, get, and load', async () => {
        const response = await request(app)
            .get(projectsURL + '/create-project');

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.pid, 1);
    });
});

/* OLD TESTS: CREATE-PROJECT() NO LONGER USED

describe("Successful project creation", () => {
  const username = "dummyUser";
  const password = "dummyPassword";

  before(async () => {
    await clearTables();

    //create accounts to hold projects
    const confirmPassword = "dummyPassword";
    const userResult = await createUser(username, password, confirmPassword);
    assert.deepStrictEqual(
      userResult,
      "Created user " + username.toLowerCase()
    );
  });
  after(async () => {
    await clearTables();
  });

  it("Handles basic creation and video upload (1)", async () => {
    //project creation
    const projectName = "Project1";
    const createResult = await createProject(projectName, username);
    const expectedResult =
      "Created project " + projectName + "for user " + username.toLowerCase();
    assert.deepStrictEqual(createResult, expectedResult);

    //TODO: Add video upload (addUrl Tests)
  });

  it("Handles basic creation and video upload (2)", async () => {
    //project creation
    const projectName = "Insert Project Name Here";
    const createResult = await createProject(projectName, username);
    const expectedResult =
      "Created project " + projectName + "for user " + username.toLowerCase();
    assert.deepStrictEqual(createResult, expectedResult);

    //TODO: Add video upload (addUrl Tests)
  });
});

describe("Successful get projects", () => {
  const username = "dummyUser";
  const password = "dummyPassword";

  before(async () => {
    await clearTables();

    //create accounts to hold projects
    const confirmPassword = "dummyPassword";
    const userResult = await createUser(username, password, confirmPassword);
    assert.deepStrictEqual(
      userResult,
      "Created user " + username.toLowerCase()
    );
  });
  after(async () => {
    await clearTables();
  });
  it("Handles getting an empty project list", async () => {
    const expectedResult = [];
    const actualResult = await getProjects(username);
    assert.deepStrictEqual(actualResult, expectedResult);
  });
  it("Handles getting a project list of length 1", async () => {
    //create project
    const projectName = "Project1";
    const createResult = await createProject(projectName, username);
    const projectResult =
      "Created project " + projectName + "for user " + username.toLowerCase();
    assert.deepStrictEqual(createResult, projectResult);

    const expectedResult = [{ id: 1, title: "Project1" }];
    const actualResult = await getProjects(username);
    assert.deepStrictEqual(actualResult, expectedResult);
  });
  it("Handles getting a project list of length > 1", async () => {
    //create projects
    const project2 = "Project2";
    const create2 = await createProject(project2, username);
    const result2 =
      "Created project " + project2 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create2, result2);
    const project3 = "Project3";
    const create3 = await createProject(project3, username);
    const result3 =
      "Created project " + project3 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create3, result3);
    const project4 = "Project4";
    const create4 = await createProject(project4, username);
    const result4 =
      "Created project " + project4 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create4, result4);

    const expectedResult = [
      { id: 1, title: "Project1" },
      { id: 2, title: "Project2" },
      { id: 3, title: "Project3" },
      { id: 4, title: "Project4" },
    ];
    const actualResult = await getProjects(username);
    assert.deepStrictEqual(actualResult, expectedResult);
  });
});

describe("Create project failure", () => {
  const username = "dummyUser";
  const password = "dummyPassword";

  before(async () => {
    await clearTables();

    //create accounts to hold projects
    const confirmPassword = "dummyPassword";
    const userResult = await createUser(username, password, confirmPassword);
    assert.deepStrictEqual(
      userResult,
      "Created user " + username.toLowerCase()
    );
  });
  after(async () => {
    await clearTables();
  });

  it("Empty username should fail", async () => {
    const projectName = "Project1";
    const createResult = await createProject(projectName, "");
    const expectedResult = "Username is empty";
    assert.deepStrictEqual(createResult, expectedResult);
  });
  it("Empty username (space) should fail", async () => {
    const projectName = "ThisWillFail";
    const createResult = await createProject(projectName, " ");
    const expectedResult = "Username is empty";
    assert.deepStrictEqual(createResult, expectedResult);
  });
  it("Empty project name should fail", async () => {
    const projectName = "";
    const createResult = await createProject(projectName, username);
    const expectedResult = "Project name is empty";
    assert.deepStrictEqual(createResult, expectedResult);
  });
  it("Empty project name (space) should fail", async () => {
    const projectName = " ";
    const createResult = await createProject(projectName, username);
    const expectedResult = "Project name is empty";
    assert.deepStrictEqual(createResult, expectedResult);
  });
});

describe("Successful project deletion", () => {
  const username = "dummyUser";
  const password = "dummyPassword";

  beforeEach(async () => {
    await clearTables();

    //create accounts to hold projects
    const confirmPassword = "dummyPassword";
    const userResult = await createUser(username, password, confirmPassword);
    assert.deepStrictEqual(
      userResult,
      "Created user " + username.toLowerCase()
    );
  });
  afterEach(async () => {
    await clearTables();
  });
  it("Handles project creation and correct deletion (should not exist after)", async () => {
    //create project
    const projectName = "Project1";
    const createResult = await createProject(projectName, username);
    const projectResult =
      "Created project " + projectName + "for user " + username.toLowerCase();
    assert.deepStrictEqual(createResult, projectResult);

    //delete project
    const pid = 1;
    const expectedResult = "Deleted project with pid " + pid;
    const actualResult = await deleteProject(pid);
    assert.deepStrictEqual(expectedResult, actualResult);

    const getResult = await getProjects(username);
    const getExpected = [];
    assert.deepStrictEqual(getResult, getExpected);

    await clearTables();
  });
  it("Handles multiple projects created, one correctly deleted", async () => {
    //create projects
    const project1 = "Project1";
    const create1 = await createProject(project1, username);
    const expected1 =
      "Created project " + project1 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create1, expected1);
    const project2 = "Project2";
    const create2 = await createProject(project2, username);
    const result2 =
      "Created project " + project2 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create2, result2);
    const project3 = "Project3";
    const create3 = await createProject(project3, username);
    const result3 =
      "Created project " + project3 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create3, result3);
    const project4 = "Project4";
    const create4 = await createProject(project4, username);
    const result4 =
      "Created project " + project4 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create4, result4);
    const project5 = "Project5";
    const create5 = await createProject(project5, username);
    const result5 =
      "Created project " + project5 + "for user " + username.toLowerCase();
    assert.deepStrictEqual(create5, result5);

    //delete project
    const pid = 3;
    const expectedResult = "Deleted project with pid " + pid;
    const actualResult = await deleteProject(pid);
    assert.deepStrictEqual(expectedResult, actualResult);

    const getResult = await getProjects(username);
    const getExpected = [
      { id: 1, title: "Project1" },
      { id: 2, title: "Project2" },
      { id: 4, title: "Project4" },
      { id: 5, title: "Project5" },
    ];
    assert.deepStrictEqual(getResult, getExpected);
  });
});

describe("Failed project deletion", () => {
  const username = "dummyUser";
  const password = "dummyPassword";

  beforeEach(async () => {
    await clearTables();

        //create accounts to hold projects
        const confirmPassword = 'dummyPassword';
        const userResult = await(createUser(username, password, confirmPassword));
        assert.deepStrictEqual(userResult, 'Created user ' + username.toLowerCase());
    });
    afterEach(async () => {
        await clearTables();
    });
    
    it('Empty project ID should fail', async () => {
        const expectedResult = "Empty pid";
        const actualResult = await(deleteProject(""));
        assert.deepStrictEqual(actualResult, expectedResult);
    });
    it('Empty project ID should fail', async () => {
        const expectedResult = "Empty pid";
        const actualResult = await(deleteProject(null));
        assert.deepStrictEqual(actualResult, expectedResult);
    });

    it('Project ID that does not exist should fail', async () => {
        const pid = 1;
        const expectedResult = "No matching pid " + pid + " found in PROJECTS";
        const actualResult = await(deleteProject(pid));
        assert.deepStrictEqual(actualResult, expectedResult)
    });

    it('Project ID that does not exist should fail', async () => {
        const project1 = 'Project1';
        const create1 = await(createProject(project1, username));
        const expected1 = "Created project " + project1 + "for user " + username.toLowerCase();
        assert.deepStrictEqual(create1, expected1);
        const project2 = 'Project2'
        const create2 = await(createProject(project2, username));
        const result2 = "Created project " + project2 + "for user " + username.toLowerCase();
        assert.deepStrictEqual(create2, result2);
        const project3 = 'Project3'
        const create3 = await(createProject(project3, username));
        const result3 = "Created project " + project3 + "for user " + username.toLowerCase();
        assert.deepStrictEqual(create3, result3);

    const pid = 5;
    const expectedResult = "No matching pid " + pid + " found in PROJECTS";
    const actualResult = await deleteProject(pid);
    assert.deepStrictEqual(actualResult, expectedResult);
  });
});

*/