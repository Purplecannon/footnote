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
Internally, we will be using the [issues](https://github.com/miahuynhh/footnote/issues) tab in our github repository. This allows us to keep track of bugs being reported and address them right away. We can even tag people who have worked on that portion of the code. After the bug has been addressed, the issue will be closed. However, we will still have a history of bugs which helps us keep track of “known bugs” and allows us to better fix bugs that may arise in the future. 
    
As for bug reporting, we will be following some of the tips mentioned in the bug writing guidelines from Mozilla
    

        1.  First, please describe the expected behavior (how our website should work) and the actual behavior. 
    
        2.  Indicate whether you can reproduce the bug, and if so, please outline the steps you will take.
    
            a.  Additionally, anyone who reports a bug should copy and paste the error that they are getting in the issue description. This allows people to get a bigger picture of the error and makes it easier for developers to look for solutions on their own. 
        
            b.  It would be good to note whether this occurs every time or if it is an intermittent issue. 
        
        3.  You should also indicate any steps that you have already taken, so that other developers know what to rule out. 
    
        4.  Other information to include would be type of device, operating system, and browser. 
    

After reporting the bug, it’s important to follow up so that this is addressed in a timely manner.

### Known bugs
We will be documenting our “known bugs” in our Readme.md file in our github repository. This will include a section called “Troubleshooting,” which will list common bugs and their behavior as well as the exact steps to fix the bug. 

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
