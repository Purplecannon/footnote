# Overview

## User Manual

## Description
Footnote is a tool designed to help dancers and choreographers digitally notate, visualize, and
share their routines with ease. Whether you’re a beginner or a seasoned dancer, Footnote makes it
easy to organize and document choreography in a much more efficient way than traditional methods.
Footnote's key feature allows a user to leave detailed notes on specific timestamps in your dance video.

### Installation

### Starting the system

### Software Usage

### Reporting bugs

### Known bugs

---

## Developer Guidelines

### Obtaining the source code

The source code of footnote can be found in its public [gitHub repository](https://github.com/miahuynhh/footnote).

### Directory Layout

#### frontend

app
├── public - Reusable actions such as navigating, opening, creating entities
├── pages - Website pages
├── components - React components reusable across scenes
├── hooks - Reusable React hooks
└── routes - Route definitions

#### backend

server
├── routes - All API routes are contained within here
│ ├── api - API routes
│ └── auth - Authentication routes
├── config - Database configuration
├── services - Services such as s3
└── test - Test helpers

### Build

### Running Tests
Ensure that all necessary packages are installed - i.e. run ```npm install-all``` from the root directory.
For backend testing, ensure that the proper database configurations are in place - the correct .env file in the root directory, and the ca-certificate.crt file in the config directory in the footnote-backend directory. 
For backend testing - navigate to the footnote-backend directory.
For frontend testing - navigate to the footnote-frontend directory.
Ensure that the ```test``` folder is present within the directory, then run the following from the terminal:
```
npm test
```

### Adding New Tests
Navigate to the ```test``` directory - either in footnote-backend or footnote-frontend - and write tests using [Mocha](https://mochajs.org/) and the default node ```assert``` library, either by adding to an existing file with the ``` .mjs ``` extension, or by creating a new one. For a new file, import the assertion library:
```
import * as assert from 'assert';
```

### Build a release of the software
