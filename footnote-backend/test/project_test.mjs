//Author: Catherine
/*
import * as assert from 'assert';
import {getProjects, createProject, addUrl, deleteProject} from '../routes/api/projects.js';
import {createUser} from "../routes/auth/users.js";
import {clearTables} from "../config/tables.js";
import {router} from '../routes/api/videos.js';

//Local: http://localhost:5173/

describe('Successful project creation', () => {
    beforeEach(async () => {
        await clearTables();
    });
    it('Handles basic creation and video upload', async () => {
        //create accounts to hold projects
        //login not implemented as of now
        const username = 'dummyUser';
        const password = 'dummyPassword';
        const userResult = await(createUser(username, password));
        assert(userResult, 'Created user ' + username.toLowerCase() + '\n');

        //project creation
        const projectName = 'Project1'
        const createResult = await(createProject(projectName, username));
        const expectedResult = "Created project " + projectName + "for user " + username.toLowerCase() + "\n";
        assert(createResult, expectedResult);

        //video upload
        
    });
    it('Handles basic creation and video upload', async () => {
        
    });
});

describe('Successful get projects', () => {
    beforeEach(async () => {
        await clearTables();
    });
});

describe('Successful project deletion', () => {
    beforeEach(async () => {
        await clearTables();
    });
}); */
