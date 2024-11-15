// //Author: Catherine

import * as assert from 'assert';
import request from 'supertest';
import app from '../app.js'

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const videosURL = '/videos';
const projectsURL = '/projects';

describe('Video upload failure', () => {
    it('Empty pid and file should fail', async () => {
        const response = await request(app)
            .post(videosURL + '/upload-video')
            .field('pid', '')
            .attach('file', null);

         assert.strictEqual(response.status, 400);
    });

    it('Empty file should fail', async() => {
        const response = await request(app)
            .post(videosURL + '/upload-video')
            .field('pid', 1)
            .attach('video', null);

        assert.strictEqual(response.status, 400);
    });
});

// TODO: addURL tests

/* TODO: Reconfigure to add a project and pid

describe('Video upload success', () => {
    it('Non-empty file upload should succeed', async () => {
        const videoPath = join(__dirname, 'test-videos/test-video-1.mp4');
        assert.strictEqual(fs.existsSync(videoPath), true)

        const response = await request(app)
            .post(videosURL + '/upload-video')
            .attach('video', videoPath);

        assert.strictEqual(response.status, 200);
    });
})
*/