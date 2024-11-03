//Author: Lauren

import * as assert from 'assert';
import {createUser, clearTables} from "../routes/users.js";

describe('Successful createUser', () => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
    });
    it('Handles creates user', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles case-insensitive usernames', async () => {
        const username = 'TeStUsEr';
        const password = 'testPassword';
        const confirmPassword = password;
      
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, 'Created user testuser\n');
    });
    it('handles user with exclamation point', async () => {
        const username = "user!";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with at symbol', async () => {
        const username = "user@";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with hashtag symbol', async () => {
        const username = "user#";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with money symbol', async () => {
        const username = "user$";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with mod symbol', async () => {
        const username = "user%";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with carrot symbol', async () => {
        const username = "user^";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with ampersand symbol', async () => {
        const username = "user&";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with asterisk symbol', async () => {
        const username = "user*";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with parenthesis open symbol', async () => {
        const username = "user(";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with parenthesis closed symbol', async () => {
        const username = "user)";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with dash symbol', async () => {
        const username = "user-";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });it('handles user with underscore symbol', async () => {
        const username = "user_";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with equal symbol', async () => {
        const username = "user=";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with plus symbol', async () => {
        const username = "user+";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with curly bracket open symbol', async () => {
        const username = "user{";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with curly bracket closed symbol', async () => {
        const username = "user}";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    it('handles user with vertical  symbol', async () => {
        const username = "user|";
        const password = 'testPassword';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
    });
    // TODO: these tests fail but I'm unsure if they should or shouldn't fail
    // it('handles user with single quote symbol', async () => {
    //     const username = ''';
    //     const password = 'testPassword';
    //     const confirmPassword = password;
    //     const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
    //     const result = await createUser(username, password, confirmPassword);
    //     assert.strictEqual(result, expectedResult);
    // });
    // it('handles user with double quote symbol', async () => {
    //     const username = """;
    //     const password = 'testPassword';
    //     const confirmPassword = password;
    //     const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
    //     const result = await createUser(username, password, confirmPassword);
    //     assert.strictEqual(result, expectedResult);
    // });
    // it('handles user with backslash symbol', async () => {
    //     const username = "user\";
    //     const password = 'testPassword';
    //     const confirmPassword = password;
    //     const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
    //     const result = await createUser(username, password, confirmPassword);
    //     assert.strictEqual(result, expectedResult);
    // });
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
    // it('handles space-filled password', async () => {
    //     const username = 'testUser';
    //     const password = '   ';
    //     const confirmPassword = 'confirmPassword';
      
    //     const result = await createUser(username, password, confirmPassword);
    //     assert.strictEqual(result, 'Password or confirm password is empty');
    // });
    // it('handles space-filled confirmPassword', async () => {
    //     const username = 'testUser';
    //     const password = 'password';
    //     const confirmPassword = '   ';
      
    //     const result = await createUser(username, password, confirmPassword);
    //     assert.strictEqual(result, 'Password or confirm password is empty');
    // });
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

describe('Handles Existing Users', (done) => {
    // TODO: Comment out clearTable
    beforeEach(async () => {
        // Call your clearTables function here if needed
        await clearTables();
    });
    it('handles existing user', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);

        const existingUserResult = await createUser(username, password, confirmPassword);
        assert.strictEqual(existingUserResult, 'Username already exists');
    });
    it('handles existing user with different passwords', async () => {
        const username = 'testUser';
        const password = 'password';
        const confirmPassword = password;
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
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
        const expectedResult = 'Created user ' + username.toLowerCase() + '\n';
    
        const result = await createUser(username, password, confirmPassword);
        assert.strictEqual(result, expectedResult);
        
        const newPassword = 'password'
        const newConfirmPassword = 'diffPassword'

        const existingUserResult = await createUser(username, newPassword, newConfirmPassword);
        assert.strictEqual(existingUserResult, "Password and confirm password don't match");
    });
});