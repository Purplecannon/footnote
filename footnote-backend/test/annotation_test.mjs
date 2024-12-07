//Author: Catherine

import * as assert from 'assert';
//import {annotationCreate, annotationEdit, annotationSave, annotationDelete} from '../routes/api/annotation.js';
import { clearTables, resetTables } from "../config/tables.js";
import app from '../app.js'
import session from 'supertest-session';

const usersURL = "/users";
const projectsURL = "/projects";
const annotationURL = "/annotations";

describe('Annotation creation tests', () => {
     // { timestampStr, timestampNum, text, projectID }
    let agent;
    let pid = -1;
    const username = "pikachic";
    const password = "AAAAAAAAAAA";

    before(async() => {
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

        const projectResponse = await agent.get(projectsURL + "/create-project").expect(200);
        pid = projectResponse._body.pid;
        assert.notStrictEqual(pid, -1);
    });
    beforeEach(async() => {
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

    it('Annotation creation fails when not logged in', async() => {
        await agent.destroy();
        const response = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: '00:00', 
                timestampNum: 0, 
                text: "this should fail", 
                projectID: pid })
            .expect(401);
        assert.strictEqual(response.text, "Unauthorized, please log in");
    })
    /*
    it('Annotation creation fails when PID is missing', async() => {
        const response = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: '00:00', 
                timestampNum: 0, 
                text: "this should fail", 
                projectID: '' })
            .expect(400);
        assert.strictEqual(response.text, 'Missing field in annotation request');
    })
    it('Annotation creation fails when timestamp is missing', async() => {
        const response1 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: '', 
                timestampNum: 0, 
                text: "jump here", 
                projectID: pid })
            .expect(400);
        assert.strictEqual(response1.text, 'Missing field in annotation request');
        
        const response2 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: '00:00', 
                timestampNum: '', 
                text: "pause here", 
                projectID: pid })
            .expect(400);
        assert.strictEqual(response2.text, 'Missing field in annotation request');
    })*/
    it('Annotation creation fails when project does not exist or belong to user', async() => {
        await agent
        .post(annotationURL + '/add')
        .send({ 
            timestampStr: '00:00', 
            timestampNum: 0, 
            text: "egg", 
            projectID: 15 })
        .expect(500);
    })
    it('Handles annotation with zero timestamp when logged in', async () => {
        const timestampStr = '00:00';
        const timestampNum = 0;
        const text = "hold pose until beat drop";
        const response = await agent
        .post(annotationURL + '/add')
        .send({ 
            timestampStr: timestampStr, 
            timestampNum: timestampNum, 
            text: text, 
            projectID: pid })
        .expect(200);
        assert.strictEqual(response._body.timestampStr, timestampStr);
        assert.strictEqual(response._body.timestampNum, timestampNum);
        assert.strictEqual(response._body.text, text);
    });
    it('Handles nonzero timestamp when logged in', async () => {
        const timestampStr = '00:20';
        const timestampNum = 20;
        const text = "raise arms higher";
        const response = await agent
        .post(annotationURL + '/add')
        .send({ 
            timestampStr: timestampStr, 
            timestampNum: timestampNum, 
            text: text, 
            projectID: pid })
        .expect(200);
        assert.strictEqual(response._body.timestampStr, timestampStr);
        assert.strictEqual(response._body.timestampNum, timestampNum);
        assert.strictEqual(response._body.text, text);
    });
});

describe('Annotations retrieval tests', () => {
    let agent;
    let pid = -1;
    const username = "pikachic";
    const password = "AAAAAAAAAAA";

    before(async() => {
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

        const projectResponse = await agent.get(projectsURL + "/create-project").expect(200);
        pid = projectResponse._body.pid;
        assert.notStrictEqual(pid, -1);
    });
    beforeEach(async() => {
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

    it('Annotation retrieval fails when not logged in', async() => {
        await agent.destroy();
        const response = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid})
            .expect(401);
        assert.strictEqual(response.text, "Unauthorized, please log in");
    })
    it('Handles retrieval of empty list', async () => {
        const response = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);
        //console.log(response);
        assert.deepEqual(response._body, []);
    });
    it('Handles retrieval of nonempty list', async () => {
        const timestampStr1 = "00:00";
        const timestampNum1 = 0;
        const text1 = "group 1 enter";
        const addResponse1 = await agent
            .post(annotationURL + '/add')
            .send({
                timestampStr: timestampStr1, 
                timestampNum: timestampNum1, 
                text: text1, 
                projectID: pid})
            .expect(200);
        const aid1 = addResponse1._body.id;

        const getResponse1 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);

        assert.strictEqual(getResponse1._body[0].id, aid1);
        assert.strictEqual(getResponse1._body[0].timestampStr, timestampStr1);
        assert.strictEqual(getResponse1._body[0].timestampNum, timestampNum1);
        assert.strictEqual(getResponse1._body[0].text, text1);

        const timestampStr2 = "00:02";
        const timestampNum2 = 2;
        const text2 = "group 2 enter";
        const addResponse2 = await agent
            .post(annotationURL + '/add')
            .send({
                timestampStr: timestampStr2, 
                timestampNum: timestampNum2, 
                text: text2, 
                projectID: pid})
            .expect(200);
        const aid2 = addResponse2._body.id;

        const timestampStr3 = "00:10";
        const timestampNum3 = 10;
        const text3 = "group 3 enter";
        const addResponse3 = await agent
            .post(annotationURL + '/add')
            .send({
                timestampStr: timestampStr3, 
                timestampNum: timestampNum3, 
                text: text3, 
                projectID: pid})
            .expect(200);
        const aid3 = addResponse3._body.id;

        const getResponse3 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);
        assert.strictEqual(getResponse3._body.length, 3);

        assert.strictEqual(getResponse3._body[1].id, aid2);
        assert.strictEqual(getResponse3._body[1].timestampStr, timestampStr2);
        assert.strictEqual(getResponse3._body[1].timestampNum, timestampNum2);
        assert.strictEqual(getResponse3._body[1].text, text2);
        
        assert.strictEqual(getResponse3._body[2].id, aid3);
        assert.strictEqual(getResponse3._body[2].timestampStr, timestampStr3);
        assert.strictEqual(getResponse3._body[2].timestampNum, timestampNum3);
        assert.strictEqual(getResponse3._body[2].text, text3);
    });
});

describe('Annotation deletion tests', () => {
    let agent;
    let pid = -1;
    const username = "pikachic";
    const password = "AAAAAAAAAAA";

    before(async() => {
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

        const projectResponse = await agent.get(projectsURL + "/create-project").expect(200);
        pid = projectResponse._body.pid;
        assert.notStrictEqual(pid, -1);
    });
    beforeEach(async() => {
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

    it('Annotation deletion fails when not logged in', async() => {
        await agent.destroy();
        const response = await agent
            .delete(annotationURL + '/delete')
            .query({ id: 1 })
            .expect(401);
        assert.strictEqual(response.text, "Unauthorized, please log in");
    })
    it('Successful deletion (single project)', async () => {
        const timestampStr = '00:20';
        const timestampNum = 20;
        const text = "raise arms higher";
        const response = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr, 
                timestampNum: timestampNum, 
                text: text, 
                projectID: pid })
            .expect(200);

        const aid = response._body.id;

        const getResponse1 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);
        
        assert.strictEqual(getResponse1._body.length, 1);

        await agent
            .delete(annotationURL + '/delete')
            .send({ id: aid })
            .expect(200);
        
            const getResponse2 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);
        
        assert.strictEqual(getResponse2._body.length, 0);
        
    });
    it('Successful deletion (multiple projects)', async () => {
        const timestampStr1 = '00:20';
        const timestampNum1 = 20;
        const text1 = "raise arms higher";
        const response1 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr1, 
                timestampNum: timestampNum1, 
                text: text1, 
                projectID: pid })
            .expect(200);

        const aid1 = response1._body.id;

        const timestampStr2 = '00:10';
        const timestampNum2 = 10;
        const text2 = "come forward more";
        const response2 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr2, 
                timestampNum: timestampNum2, 
                text: text2, 
                projectID: pid })
            .expect(200);

        const aid2 = response2._body.id;

        const timestampStr3 = '00:10';
        const timestampNum3 = 10;
        const text3 = "come forward more";
        const response3 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr3, 
                timestampNum: timestampNum3, 
                text: text3, 
                projectID: pid })
            .expect(200);

        const aid3 = response3._body.id;

        const getResponse1 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);

        assert.deepEqual([ {id: aid1, timestampStr: timestampStr1, timestampNum: timestampNum1, text: text1}, 
            {id: aid2, timestampStr: timestampStr2, timestampNum: timestampNum2, text: text2},
            {id: aid3, timestampStr: timestampStr3, timestampNum: timestampNum3, text: text3} ], getResponse1._body);

        await agent
            .delete(annotationURL + '/delete')
            .send({ id: aid2 })
            .expect(200);
        
        const getResponse2 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);
        
        assert.deepEqual([ {id: aid1, timestampStr: timestampStr1, timestampNum: timestampNum1, text: text1}, 
            {id: aid3, timestampStr: timestampStr3, timestampNum: timestampNum3, text: text3} ], getResponse2._body);
    });
});

describe('Annotation edit tests', () => {
    let agent;
    let pid = -1;
    const username = "pikachic";
    const password = "AAAAAAAAAAA";

    before(async() => {
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

        const projectResponse = await agent.get(projectsURL + "/create-project").expect(200);
        pid = projectResponse._body.pid;
        assert.notStrictEqual(pid, -1);
    });
    beforeEach(async() => {
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


    it('Annotation edit fails when not logged in', async() => {
        await agent.destroy();
        const response = await agent
            .put(annotationURL + '/edit')
            .query({ id: 1 })
            .expect(401);
        assert.strictEqual(response.text, "Unauthorized, please log in");
    })
    it('Handles annotation edit', async () => {
        const timestampStr1 = '00:20';
        const timestampNum1 = 20;
        const text1 = "raise arms higher";
        const response1 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr1, 
                timestampNum: timestampNum1, 
                text: text1, 
                projectID: pid })
            .expect(200);

        const aid1 = response1._body.id;

        const timestampStr2 = '00:10';
        const timestampNum2 = 10;
        const text2 = "come forward more";
        const response2 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr2, 
                timestampNum: timestampNum2, 
                text: text2, 
                projectID: pid })
            .expect(200);

        const aid2 = response2._body.id;

        const timestampStr3 = '00:10';
        const timestampNum3 = 10;
        const text3 = "come forward more";
        const response3 = await agent
            .post(annotationURL + '/add')
            .send({ 
                timestampStr: timestampStr3, 
                timestampNum: timestampNum3, 
                text: text3, 
                projectID: pid })
            .expect(200);

        const aid3 = response3._body.id;

        const getResponse1 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid })
            .expect(200);

        assert.deepEqual( getResponse1._body, [ {id: aid1, timestampStr: timestampStr1, timestampNum: timestampNum1, text: text1}, 
            {id: aid2, timestampStr: timestampStr2, timestampNum: timestampNum2, text: text2},
            {id: aid3, timestampStr: timestampStr3, timestampNum: timestampNum3, text: text3} ]);
        
        const newText = "i'm going to pass out";
        await agent
            .put(annotationURL + '/edit')
            .send({ id: aid3, text: newText, projectID: pid })
            .expect(200);

        const getResponse2 = await agent
            .get(annotationURL + '/all')
            .query({ projectID: pid }) 
            .expect(200);
        
        assert.deepEqual(getResponse2._body, [ {id: aid1, timestampStr: timestampStr1, timestampNum: timestampNum1, text: text1}, 
            {id: aid2, timestampStr: timestampStr2, timestampNum: timestampNum2, text: text2},
            {id: aid3, timestampStr: timestampStr3, timestampNum: timestampNum3, text: newText} ]);
    
    });
});