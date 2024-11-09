//Author: Catherine

import * as assert from 'assert';
import {annotationCreate, annotationEdit, annotationSave, annotationDelete} from '../routes/api/annotation.js';
import {clearTables} from "../config/tables.js";

describe('Successful annotation creation', () => {
    beforeEach(async () => {
        await clearTables();
    });
    it('Handles basic creation', async () => {
        //create project first

        //dummy test
        assert.strictEqual("Hello, World!", "Hello, World!");
    });
});