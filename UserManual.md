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

```
app
├── public # Reusable actions, e.g., navigating, opening, creating entities
├── pages # Website pages
├── components # Reusable React components across scenes
├── hooks # Reusable React hooks
└── routes # Route definitions
```

#### backend

```
server
├── routes # All API routes
│ ├── api # API endpoints
│ └── auth # Authentication routes
├── config # Database configuration
├── services # Services (e.g., S3)
└── test # Test helpers
```

### Build

### Test

### Adding New Tests

### Build a release of the software
