// //Author: Catherine

// import * as assert from 'assert';
// import request from 'supertest';
// import express from 'express';
// import router from '../routes/api/videos.js';

// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const app = express();
// app.use('/', router);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// describe('Video upload failure', () => {
//     it('Empty file upload should fail', async () => {
//         const response = await request(app)
//             .post('/upload-video')
//             .send();

//         assert.strictEqual(response.status, 400);
//     });

//     it('Empty file upload should fail', async() => {
//         const response = await request(app)
//             .post('/upload-video')
//             .attach('video', null);

//         assert.strictEqual(response.status, 400);
//     });
// });

// describe('Video upload success', () => {
//     it('Non-empty file upload should succeed', async () => {
//         const videoPath = join(__dirname, 'test-videos/test-video-1.mp4');

//         assert.strictEqual(fs.existsSync(videoPath), true)

//         const response = await request(app)
//             .post('/upload-video')
//             .attach('video', videoPath);

//         assert.strictEqual(response.status, 200);
//     });
// })