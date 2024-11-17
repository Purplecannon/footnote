//Author: Catherine

import * as assert from 'assert';
//import request from 'supertest';
import app from '../app.js'
import session from 'supertest-session';

import {getProjects, deleteProject, loadProject} from '../routes/api/projects.js';
import {clearTables} from "../config/tables.js";

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

const usersURL = '/users';
const videosURL = '/videos';
const projectsURL = '/projects';

describe('Handles create and get projects', () => {
    let agent;

    beforeEach(() => {
        agent = session(app);
    });
    after(async () => {
        await clearTables();
    });

    it('create-project fails when not logged in', async () => {
        agent
            .get(projectsURL + '/create-project')
            .expect(401);
    });

    it('successful create and load projects when logged in', async() => {
        const username = "johndoe";
        const password = "0RTHU4";
        const userResponse = await agent
                                        .post(usersURL + '/create-user')
                                        .send({username: username, password: password, confirmPassword: password})
                                        .expect(200);
        assert.strictEqual(userResponse.text, "Created user " + username);

        const projectResponse = await agent
            .get(projectsURL + '/create-project')
            .expect(200);
        
        const pid = projectResponse._body.pid;
        assert.strictEqual(pid, 1);
        
        const loadResponse = await agent
                                        .get(projectsURL + "/load-project/:pid")
                                        .send({params: {pid: pid}})
                                        .expect(200);
        
        console.log(loadResponse);
        /*
        assert.strictEqual(loadResponse._body.pid, pid);
        assert.strictEqual(loadResponse._body.project_name, "Untitled");
        assert.strictEqual(loadResponse._body.username, username);
        */
    });
});

