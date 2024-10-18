import * as assert from 'assert';
import {login, create} from './users.js';

describe('users', function() {
    /* 
	    for login: return "Logged in as [username]\n" or "Login failed\n" 
	    for create: return "Created user [username]\n" or "Failed to create user\n"
    */
    it('createAccountTests', function() {
        assert.strictEqual("Created user nameLastname\n", create("nameLastname", "password"));
        assert.strictEqual("Created user myUsername\n", create("myUsername", "IMadeThisPasswordLonger"));
        assert.strictEqualEquals("Created user 098765\n", create("098765", "1234567"));
        assert.strictEqual("Created user 55543255247\n", create("55543255247", "66525432584"));
        assert.strictEqual("Created user nameLastname056\n", create("nameLastname056", "b3tt3rP4ssword"));
        assert.strictEqual("Created user annieXiao078765\n", create("annieXiao078765", "4nn13X14o"));
    });

    it('createAccountFailureTests', function() {
        //user already exists
        assert.strictEqual("Failed to create user\n", create("nameLastname", "password"));
        assert.strictEqual("Failed to create user\n", create("myUsername", "IMadeThisPasswordLonger"));
        assert.strictEqualEquals("Failed to create user\n", create("098765", "1234567"));
        assert.strictEqual("Failed to create user\n", create("55543255247", "differentPassword"));
        assert.strictEqual("Failed to create user\n", create("nameLastname056", "pasword123456"));
        assert.strictEqual("Failed to create user\n", create("annieXiao078765", "iameepy"));

        //symbol cases
        assert.strictEqual("Failed to create user\n", create("\"", "password"));
        assert.strictEqual("Failed to create user\n", create("\n", "password"));
        assert.strictEqual("Failed to create user\n", create("myUsername", "\""));
        assert.strictEqual("Failed to create user\n", create("username", "\n"));
        assert.strictEqual("Failed to create user\n", create("name\"LastName", "password"));
        assert.strictEqual("Failed to create user\n", create("nameLastname", "password^%$^"));
        assert.strictEqual("Failed to create user\n", create("annieXiao07", "4nn!3X!@o"));
        assert.strictEqual("Failed to create user\n", create("", "password"));
        assert.strictEqual("Failed to create user\n", create("myUsername", ""));
        assert.strictEqual("Failed to create user\n", create("", ""));
    });

    it('loginTests', function() {
        assert.strictEqual("Logged in as nameLastname\n", login("nameLastname", "password"));
        assert.strictEqual("Logged in as myUsername\n", login("myUsername", "IMadeThisPasswordLonger"));
        assert.strictEqualEquals("Logged in as 098765\n", login("098765", "1234567"));
        assert.strictEqual("Logged in as 55543255247\n", login("55543255247", "66525432584"));
        assert.strictEqual("Logged in as nameLastname056\n", login("nameLastname056", "b3tt3rP4ssword"));
        assert.strictEqual("Logged in as annieXiao078765\n", login("annieXiao078765", "4nn13X14o"));
    });

    it('loginFailureTests', function() {
        //incorrect password/credentials
        assert.strictEqual("Login failed\n", login("nameLastname", "incorrectPassword"));
        assert.strictEqual("Login failed\n", login("myUsername", "ThisLongerPasswordIsIncorrect"));
        assert.strictEqualEquals("Login failed\n", login("098765", "098765"));
        assert.strictEqual("Login failed\n", login("55543255247", "egg"));
        assert.strictEqual("Login failed\n", login("nameLastname056", "2plus2is10"));
        assert.strictEqual("Login failed\n", login("annieXiao078765", "1h4venos0ulhaveaniceday"));
        //symbol cases
        assert.strictEqual("Login failed\n", login("\"", "password"));
        assert.strictEqual("Login failed\n", login("\n", "password"));
        assert.strictEqual("Login failed\n", login("myUsername", "\""));
        assert.strictEqual("Login failed\n", login("username", "\n"));
        assert.strictEqual("Login failed\n", login("name\"LastName", "password"));
        assert.strictEqual("Login failed\n", login("nameLastname", "password^%$^"));
        assert.strictEqual("Login failed\n", login("annieXiao07", "4nn!3X!@o"));
        assert.strictEqual("Login failed\n", login("", "password"));
        assert.strictEqual("Login failed\n", login("myUsername", ""));
        assert.strictEqual("Login failed\n", login("", ""));
    });

    //TODO: ADD METHODS FOR CLEARING THE TESTCASES
});