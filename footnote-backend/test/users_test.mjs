//Author: Lauren, Catherine

import * as assert from 'assert';
import {createUser, loginUser} from "../routes/auth/users.js";
import {clearTables, resetTables} from "../config/tables.js";
import app from '../app.js'
import session from 'supertest-session';

describe('Successful createUser', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    it('Handles creates user', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles case-insensitive usernames', async () => {
        const username = 'TeStUsEr';
        const password = 'testPassword';
        const confirmPassword = password;
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Created user testuser');
    });
});

describe('Handles empty username, password, or confirmPassword', () => {
    it('handles empty usernames', async () => {
        const username = '';
        const password = 'testPassword';
        const confirmPassword = password;
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Username is empty');
    });
    it('handles empty password', async () => {
        const username = 'testUser';
        const password = '';
        const confirmPassword = 'confirmPasswordTest';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Password or confirm password is empty');
    });
    it('handles empty confirmPassword', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = '';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Password or confirm password is empty');
    });
    // TODO: these tests fail but I'm unsure if they should or shouldn't fail
    it('handles space-filled password', async () => {
        const username = 'testUser';
        const password = '   ';
        const confirmPassword = 'confirmPassword';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Password or confirm password is empty');
    });
    it('handles space-filled confirmPassword', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = '   ';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Password or confirm password is empty');
    });
});

describe('Handles mismatched password or confirmPassword', () => {
    it('handles mismatched password', async () => {
        const username = 'testUser';
        const password = 'password1';
        const confirmPassword = 'password2';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, "Password and confirm password don't match");
    });
    it('handles different cased passwords', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = 'PasSwOrd';
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, "Password and confirm password don't match");
    });
});

describe('Handles Existing Users createUser', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    
    it('handles existing user', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const existingUserResult = await createUser(username, password, confirmPassword);
        assert.strictEqual(existingUserResult, 'Username already exists');
    });
    it('handles existing user with different passwords', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
        
        const newPassword = 'diffPassword'
        const newConfirmPassword = newPassword

        const existingUserResult = await createUser(username, newPassword, newConfirmPassword);
        assert.strictEqual(existingUserResult, 'Username already exists');
    });
    it('handles existing user with different passwords', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
        
        const newPassword = 'password'
        const newConfirmPassword = 'diffPassword'

        const existingUserResult = await createUser(username, newPassword, newConfirmPassword);
        assert.strictEqual(existingUserResult, "Password and confirm password don't match");
    });
});

describe('Successful login', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    it('handles existing user login', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const loginResult = await loginUser(username, password);
        assert.strictEqual(loginResult, "Login successful for user " + username.toLowerCase());
    });
    it('handles case-insensitive existing user login', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const caseUsername = 'TeSTusER';

        const loginResult = await loginUser(caseUsername, password);
        assert.strictEqual(loginResult, "Login successful for user " + username.toLowerCase());
    });
});

describe('empty username or password during login', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    it('empty username', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();

        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const expectedEmptyResult = "Username or password is empty";
        const emptyUsername = '';

        const loginResult = await loginUser(emptyUsername, password);
        assert.strictEqual(loginResult, expectedEmptyResult);
    });
    it('space filled username', async () => {
        const username = '     ';
        const password = 'password';
        const expectedResult = "Username or password is empty";

        const loginResult = await loginUser(username, password);
        assert.strictEqual(loginResult, expectedResult);
    });
    it('empty password', async () => {
        const username = 'testUser';
        const password = '';
        const expectedResult = "Username or password is empty";

        const loginResult = await loginUser(username, password);
        assert.strictEqual(loginResult, expectedResult);
    });
});

describe('user not existing during login', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    it('user not existing', async () => {
        const username = 'testUser';
        const password = 'password';
        const expectedResult = "Username doesn't exist";

        const loginResult = await loginUser(username, password);
        assert.strictEqual(loginResult, expectedResult);
    });
    it('user created, deleted, then not existing', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();

        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        await clearTables();
        await resetTables();

        const expectedExistResult = "Username doesn't exist";

        const loginResult = await loginUser(username, password);
        assert.strictEqual(loginResult, expectedExistResult);
    });
});

describe('incorrect password', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
        await resetTables();
    });
    it('incorrect password', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();

        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const wrongPassword = 'friedChicken';
        const expectedIncorrectResult = "Incorrect password";

        const loginResult = await loginUser(username, wrongPassword);
        assert.strictEqual(loginResult, expectedIncorrectResult);
    });
    it('incorrect case-sensitive password', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase();

        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const wrongPassword = 'PasSWoRd';
        const expectedIncorrectResult = "Incorrect password";

        const loginResult = await loginUser(username, wrongPassword);
        assert.strictEqual(loginResult, expectedIncorrectResult);
    });

});

//Tests added by Catherine

describe("HTTP /create-user tests", () => {
    let agent;
    const usersURL = "/users";

    before(async() => {
        await clearTables();
        await resetTables();
    })
    beforeEach(async () => {
        await clearTables();
        await resetTables();

        agent = session(app);
    });
    after(async () => {
        await clearTables();
        await resetTables();
    });

    it('Handles basic user creation - 200', async() => {
        const username = "johndoe";
        const password = "0RTHU4";
        const response = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: password, confirmPassword: password})
            .expect(200);
        assert.strictEqual(response.text, "Created user " + username);
    });
    it('Handles failed user creation (empty username)', async() => {
        const username = "";
        const password = "egg";
        const response = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: password, confirmPassword: password})
            .expect(401);
        assert.strictEqual(response._body.message, "Username is empty");
    });
    it('Handles failed user creation (empty password)', async() => {
        const username = "arthurlester34";
        const password = "password1234";
        const response = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: "", confirmPassword: password})
            .expect(401);
        assert.strictEqual(response._body.message, "Password or confirm password is empty");
    });
    it('Handles failed user creation (empty confirmPassword)', async() => {
        const username = "pikachic";
        const password = "iameepy";
        const response = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: password, confirmPassword: ""})
            .expect(401);
        assert.strictEqual(response._body.message, "Password or confirm password is empty");
    });
    it('Handles failed user creation (non-matching confirmPassword)', async() => {
        const username = "johndoe";
        const password = "0RTHU4";
        const confirmPassword = "Y3LL0W";
        const response = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: password, confirmPassword: confirmPassword})
            .expect(401);
        assert.strictEqual(response._body.message, "Password and confirm password don't match");
    });
});

describe("HTTP /login-user tests", () => {
    let agent;
    const usersURL = "/users";
    const username = "johndoe";
    const password = "ORTHU4";

    before(async() => {
        await clearTables();
        await resetTables();
    })
    beforeEach(async () => {
        agent = session(app);
        await agent.destroy();
    });
    after(async () => {
        await clearTables();
        await resetTables();
    });
    it('Handles basic login - 200', async() => {
        const createResponse = await agent
            .post(usersURL + '/create-user')
            .send({username: username, password: password, confirmPassword: password})
            .expect(200);

        assert.strictEqual(createResponse.text, "Created user " + username);
        
        await agent.destroy();

        const loginResponse = await agent
            .post(usersURL + '/login-user')
            .send({username: username, password: password})
            .expect(200);
        assert.strictEqual(loginResponse.text, "Login successful for user " + username);
    });
    it('Handles failed login (empty username)', async() => {
        const loginResponse = await agent
            .post(usersURL + '/login-user')
            .send({username: "", password: password})
            .expect(401);
        assert.strictEqual(loginResponse._body.message, "Username or password is empty");
    });
    it('Handles failed login (empty password)', async() => {
        const loginResponse = await agent
            .post(usersURL + '/login-user')
            .send({username: username, password: ""})
            .expect(401);
        assert.strictEqual(loginResponse._body.message, "Username or password is empty");
    });
    it('Handles failed login (incorrect password)', async() => {
        const badPassword = 'gardettos';
        const loginResponse = await agent
            .post(usersURL + '/login-user')
            .send({username: username, password: badPassword})
            .expect(401);
        assert.strictEqual(loginResponse._body.message, "Incorrect password");
    });
    it('Handles failed login (user does not exist)', async() => {
        const badUsername = "larson";
        const loginResponse = await agent
            .post(usersURL + '/login-user')
            .send({username: badUsername, password: password})
            .expect(401);
        assert.strictEqual(loginResponse._body.message, "Username doesn't exist");
    });
});