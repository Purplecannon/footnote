# Developer Guidelines

## How to obtain the source code

The source code of footnote can be found in its private [GitHub repository](https://github.com/miahuynhh/footnote).

If you are not currently a collaborator and want to obtain the source code, please email your request to <miahuynh@cs.washington.edu>.

## The layout of Footnote's directory structure

### Frontend

```
footnote-frontend
├── public # Reusable actions, e.g., navigating, opening, creating entities
├── pages # Website pages
├── components # Reusable React components across scenes
├── hooks # Reusable React hooks
└── routes # Route definitions
```

### Backend

```
footnote-backend
├── routes # All API routes
│ ├── api # API endpoints
│ └── auth # Authentication routes
├── config # Database configuration
├── services # Services (e.g., S3)
└── test # Test helpers
```

## How to build the software

1. Clone the remote repository by running this command on the command line:
   ```
   git clone git@github.com:miahuynhh/footnote.git
   ```
2. You should now see a local `footnote` directory. From that root `footnote` directory, run the following commands:
   ```
   npm run install-all  # to install all dependencies in the footnote, footnote-backend, and footnote-frontend folders
   npm run build        # to build the frontend; commonly used for deployment, can skip during development
   ```
3. For the backend to properly build, you will need to:
   1. Navigate to the `footnote-backend` directory and create a `.env` file
   2. Navigate to the `footnote-backend/config` directory and create a `ca-certificate.crt` file
   3. Email <miahuynh@cs.washington.edu> for the content of these secure files. Once you have the content, make sure to save, navigate back to the root `footnote` directory, and run:
   ```
   npm start  # to start the server (on port 3000) and the app (on port 5173) concurrently
   ```
4. If the build was successful, you should see a build log that looks something like this:

   ```
   > footnote@1.0.0 start
   > concurrently "npm start --prefix footnote-backend" "npm run dev --prefix footnote-frontend"

   [1]
   [1] > footnote-frontend@0.0.0 dev
   [1] > vite
   [1]
   [0]
   [0] > login@0.0.0 start
   [0] > node ./bin/www
   [0]
   [1]
   [1]   VITE v5.4.10  ready in 203 ms
   [1]
   [1]   ➜  Local:   http://localhost:5173/
   [1]   ➜  Network: use --host to expose
   [0] Connected to the database as 654106
   [0] USERS table created
   [0] PROJECTS table created
   [0] ANNOTATIONS table created
   [0] All tables initialized
   ```

5. Navigate to <http://localhost:5173/> on your browser with a working internet connection and interact with the Footnote app.
6. For any errors encountered during these steps, refer to the Troubleshooting section below.

## How to test the software

1. Follow the build steps as listed in the [How to build the software](../DeveloperGuidelines.md#how-to-build-the-software) section
2. To run the full test suite:
   ```
   npm run test  # from the root directory
   ```
3. To run the backend test suite:
   ```
   npm test      # from the footnote-backend directory
   ```
4. To run the frontend test suite (in progress):
   ```
   npm test      # from the footnote-frontend directory
   ```

## How to add new tests

Navigate to the `test` directory - either in footnote-backend or footnote-frontend - and write tests using [Mocha](https://mochajs.org/) and the default node [assert](https://nodejs.org/api/assert.html) library, either by adding to an existing file with the `.mjs` extension, or by creating a new one. For a new file, import the assertion library:

```
import * as assert from 'assert';
```

If your tests involve testing and making `http` requests, import the [Supertest](https://www.npmjs.com/package/supertest) library and the [express](https://expressjs.com/) library, and import and set up the router from the `.js` file to be tested:

```
import request from 'supertest';
import express from 'express';
import router from '../routes/api/app.js'; //app.js can be replaced with the relevant .js file that is meant to make the http requests

const app = express();
app.use('/', router);
```

If the new test you add involves testing a file upload (ex: Testing the code for uploading videos) and you need to upload fake files, navigate to the directory within the `test` directory titled `test-<insert-file-type-here>` and add the file within the new directory (ex: the `test-videos` directory). If no suitable directory exists, create one within the `test` directory.

## How to build a release of the software

1. Run an appropriate command from the following to update the version:

   ```
   npm run version:patch  # for a patch update
   npm run version:minor  # for a minor update
   npm run version:major  # for a major update
   ```

   These commands increments the version in `package.json`, commit the change, and tag the commit with the new version.

2. Perform sanity checks on the version update:

   1. Brief option: run the following commands from the root directory

   ```
   npm run build  # build the frontend to ensure it’s ready for deployment
   npm start      # start the server (on port 3000) and the app (on port 5173) concurrently
   npm run test   # run the test suite to confirm all tests pass
   ```

   2. Thorough option: follow steps 2-6 of [How to build the software](../DeveloperGuidelines.md#how-to-build-the-software) section and then step 2 of [How to test the software](#how-to-test-the-software) section

3. Ensure that the git tag generated by the versioning command matches the intended version.

4. After reviewing the version update, push it to the remote repository:
   ```
   git push         # push the version update
   git push --tags  # push the version update tag
   ```

## Troubleshooting

For database connection troubleshooting, refer to Digital Ocean Cluster documentation:

- [Access denied](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-access-denied-error/)
- [Unsupported auth mode](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-authentication-error/)
- [Connection timed out](https://docs.digitalocean.com/support/when-connecting-to-my-database-i-get-a-connection-timed-out-error/)
- [Unknown host](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-unknown-host-error/)
- [Lost connection during query](https://docs.digitalocean.com/support/when-issuing-a-query-on-mysql-i-get-a-lost-connection-error/)
- [Unknown database](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-an-unknown-database-error/)
- [Host blocked by too many connection errors](https://docs.digitalocean.com/support/when-connecting-to-mysql-i-get-a-host-is-blocked-error/)

For any issues that require admin access, please email <miahuynh@cs.washington.edu>.
