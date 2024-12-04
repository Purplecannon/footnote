// //Author: Catherine

import * as assert from "assert";
import session from "supertest-session";
import app from "../app.js";

import { clearTables, resetTables } from "../config/tables.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersURL = "/users";
const videosURL = "/videos";
const projectsURL = "/projects";

describe("Handles video upload failure", () => {
  let agent;
  const username = "johndoe";
  const password = "0RTHU4";

  before(async () => {
    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(async () => {
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

  it("Empty pid and file should fail", async () => {
    const response = await agent
      .post(videosURL + "/upload-video")
      .field("pid", "")
      .attach("file", null)
      .expect(400);

    assert.strictEqual(response._body.error, "No file uploaded.");
  });

  it("Empty pid should fail", async () => {
    const videoPath = join(__dirname, "test-videos/test-video-1.mp4");
    assert.strictEqual(fs.existsSync(videoPath), true);

    const response = await agent
      .post(videosURL + "/upload-video")
      .field("pid", "")
      .attach("video", videoPath)
      .expect(400);

    assert.strictEqual(response._body.error, "Project ID (pid) is required.");
  });

  it("Empty file should fail", async () => {
    const response = await agent
      .post(videosURL + "/upload-video")
      .field("pid", 1)
      .attach("video", null)
      .expect(400);

    assert.strictEqual(response._body.error, "No file uploaded.");
  });
});

describe("Handles successful video upload and attachment to a project", () => {
  let agent;
  const username = "pikachic";
  const password = "password123456";

  before(async () => {
    agent = session(app);
    await agent
      .post(usersURL + "/create-user")
      .send({
        username: username,
        password: password,
        confirmPassword: password,
      })
      .expect(200);
  });
  beforeEach(async () => {
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

  /*

  it("Successful video upload and attachment to a project", async () => {
    const createResponse = await agent
      .get(projectsURL + "/create-project")
      .expect(200);

    const pid = createResponse._body.pid;
    const videoPath = join(__dirname, "test-videos/test-video-1.mp4");
    assert.strictEqual(fs.existsSync(videoPath), true);

    const uploadResponse = await agent
      .post(videosURL + "/upload-video")
      .field("pid", pid)
      .attach("video", videoPath)
      .expect(200);

    assert.strictEqual(
      uploadResponse._body.message,
      "Video uploaded successfully! Updated video URL for project with pid " +
        pid
    );
  });

  */
});

