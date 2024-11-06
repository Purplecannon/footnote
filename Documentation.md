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

### Test

### Adding New Tests

### Build a release of the software
