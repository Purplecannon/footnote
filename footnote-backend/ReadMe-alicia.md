.
├── bin
│ └── www
├── public
│ ├── images
│ ├── javascripts
│ └── stylesheets
│ └── style.css
├── routes
│ ├── index.js
│ └── users.js
│ └── videos.js # New route for video uploads
└── views
| ├── error.pug
| ├── index.pug
| └── layout.pug
├── services
│ └── s3Service.js # Logic for uploading to DigitalOcean Spaces or AWS S3
├── app.js
├── package.json
└── .env

#### services/ Directory:

    commonly used for files that contain business logic or external API integrations, keeping your routes and controllers clean.
