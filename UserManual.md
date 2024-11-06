# Overview

## User Documentation

### Installation

### Starting the system

### Software Usage

### Reporting bugs

### Known bugs

---

## Developer documentation

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
├── middlewares - Middlewares
├── services - Services such as s3
└── test - Test helpers and fixtures, tests themselves are colocated

### Build

### Test


### Adding New Tests

### Build a release of the software
