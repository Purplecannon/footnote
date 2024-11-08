# Progress

---

## Week 1

We didn't form a group yet.

---

## Week 2

## Assignment:

Requirements & Team Policies. Mainly an overview of the project and user-cases.

#### Alicia Z.

- Wrote 3 user-cases. Shared my work with team and asked for their feedback. Give me thoughts for others' work.
- Researched cloud service and frameworks.
- Decided on digitalOcean together with Mia and set that up.
- Generated sprint boot for backend.
- Start to learn spring.

#### Kirupa G.

- Wrote user-cases. Discussed with the team to make sure we didn't have overlapping use cases
- Discussed with Mia to get a better understanding of the product
- Did research on frontend tools (HTML/CSS/React) as well as Figma
- Started working on screens on Figma for Sign in, Login, and the Project page (video + annotations)

---

## Week 3

## Assignment:

Software Architecture Update.

#### Alicia Z.

- Team decided to switch to javascript for backend. So, I deleted all spring stuff and generated express js.
- Implemented video uploading logic in the backend and tested successfully with postman.
- Wrote software architecture for software architecture. Shared with team and asked for their feedback.

#### Kirupa G.

- Finished up Figma screens and showed my work to the team.
- Created HTML/CSS for the Sign in and Login Screens
- Showed team during weekly meeting and gathered feedback on the screens (getting rid of forgot password)

---

## Week 4

## Assignment:

Software Design, Risk Assessment, Schedule update.

#### Kirupa Gunaseelan

- Worked on learning typescript and shifted existing code to typescript (vite React)
- Split signin/login into two components in order to keep track of data more efficiently.
- Made interfaces to keep track of username, password, and confirm password for Sign in page and Login page.

#### Mia Huynh

- Set up database configurations for DigitalOcean Cluster
- Connected the database in database.js
- Implemented createTables(), clearTables(), userCreate(), userLogin() in users.js
- Set up and initialized all USERS, PROJECTS, and ANNOTATIONS tables in app.js

#### Catherine Jin

- Write unit tests for creating an account and logging in
- (won't run the unit tests until those functions are complete and a delete account function is implemented so we can remove any dummy accounts added during unit testing)
- Set up testing branch
- Started researching Javascript-specific testing frameworks

#### Elainie Kassa

#### Lauren Yarrington

- Implemented createAnnotation() that takes project ID and timestamp
- Implemented editAnnotation() that takes project ID and timestamp
- Implemented saveAnnotation() that takes project ID, note, and timestamp
- Implemented deleteAnnotation() that takes project ID and timestamp

#### Alicia Z.

- Wrote two risk cases for the assignment and also personal schedule.
- Revised software architecture and software design based on my own understanding, shared with team and asked for their feedback.
- Moved to front-end, started to learn react.
- Generated vite for front-end framework and moved Kirupa's code there.
- Cleaned up git main branch. Because at that time most of the team members are pushing to main, leading to 70+ commits on main branch, and lots of unnecessary files, such as the leftover stuff from spring and node_modules.
- Started to implement user homepage. Halfway done: logic set up but lack styling.

---

## Week 5

## Assignment:

Testing Update.

#### Kirupa Gunaseelan

- Was able to change and update the state of variables (username, password, confirm password) in the input fields.
- Created handleSubmit function that sends this data via a POST request.
- Was able to console.log(data) but had to conduct more research in order to figure out how to link this to the
  backend for the sign up page.

#### Mia Huynh

- Delegated tasks for Design assignment and weekly timeline/deadline for team
- Implemented getProjects(), createProject(), addUrl(), deleteProject() in projects.js
- Improved database schema
- Troubleshot database configurations and connectivity
- Improved code quality for my previously written code

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Completed Homepage implementation
- Added CreateNewPage (draft) as a placeholder
- Revised Software design for frontend

---

## Week 6

## Assignment

#### Kirupa Gunaseelan

- Was able to finish up the code for Sign in
- Worked with Mia to try to figure out how to link the frontend and backend, but ran into issues with
  my computer architecture.
- Mia was able to get the code to work on her computer, so I created a handleSubmit function for Login
  (similar to how I implemented this for the Sign in component) in order to pass that information to that
  backend as well.

#### Mia Huynh

- Delegated tasks for Testing assignment and weekly timeline/deadline for team
- Revised backend software design section
- Set up GitHub Actions for CI with Catherine
- Improved database schema
- CD:
  - Integrated front end and back end in app.js, users.js, SignUp.tsx, and Login.tsx
  - Added package.json to root directory to deploy through DigitalOcean, reorganized .gitignore
  - Configured so that backend and frontend can run concurrently in one command from the root directory
  - Troubleshooting footnote-frontend: installed dependencies, fixed TS errors

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Wrote my assignment part of the documentation.
- Restructured the frontend with team.

---

## Week 7

## Assignment:

#### Kirupa Gunaseelan

- Worked on navigation: making sure that the Sign in page and Log in pages navigated to the home page successfully.

#### Mia Huynh

- Delegated tasks: for Documentations, Beta release, Demo presentation and weekly timeline/deadline for team
- Merged homepage frontend: debugged front and back end and resolved conflicts
- Revised tables: Refactored tables creation code into services/tables.js, changed naming conventions
- Documentation assignment: set up version update automation, contributed to user manual (description, install the software, run the software) and developer guidelines (build the software, build a release)
- Living document: revised CI set up on GitHub Actions and incorporate TA feedback
- Restructured backend directory
- Helped teammates with database configurations
- Integrated homepage front and back end: with Kirupa and Alicia
- Implemented full-stack session handling for login, signup, homepage

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

- Editing top level README.md
- Modularized userHome
  - Making card a reusable component
  - Implementing a customized hook to fetch project data from backend
  - Making mock data for display when backend returns error || no data
  - Changed styling of all the above
- Started implementation of Annotation component
- Draft architecture diagram for presentation

---

## Week 8

## Assignment

#### Kirupa Gunaseelan

#### Mia Huynh

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

---

## Week 9

## Assignment

#### Kirupa Gunaseelan

#### Mia Huynh

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

---

## Week 10

## Assignment

#### Kirupa Gunaseelan

#### Mia Huynh

#### Catherine Jin

#### Elainie Kassa

#### Lauren Yarrington

#### Alicia Z.

---
