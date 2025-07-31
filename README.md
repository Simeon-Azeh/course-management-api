# Course Management Platform

A full-stack platform for managing courses, offerings, and student activity logs.  
Includes internationalization (i18n), activity tracking, notifications, and Redis-backed job queues.

---

## Video walkthrough

*(Add link or instructions if available)*

## Swagger documentation 
http://localhost:5000/api-docs/

## My reflection live demo 
https://reflectionsimeon.netlify.app/

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Schema Overview](#database-schema-overview)
- [Authentication Flow](#authentication-flow)
- [Running the Project](#running-the-project)
- [Redis Setup](#redis-setup)
- [Testing API Endpoints](#testing-api-endpoints)
- [Internationalization (i18n)](#internationalization-i18n)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Example Usage Scenarios](#example-usage-scenarios)
- [API Documentation](#api-documentation)
- [Assumptions & Limitations](#assumptions--limitations)
- [License](#license)
- [Author](#author)

---

## Features

- Course and offering management
- Student activity tracking
- RESTful API endpoints
- Notification worker (email, etc.) using Bull and Redis
- Internationalized frontend (English & French)
- Modular service/controller architecture
- Authentication and role-based access

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Redis](https://redis.io/) (for notifications and job queues)
- [Git](https://git-scm.com/) (optional, for cloning)
- [MySQL](https://www.mysql.com/) (for persistent database)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Simeon-Azeh/course-management-platform.git
   cd course-management-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Environment Setup

1. **Configure environment variables:**

   Create a `.env` file in the root directory and add your settings:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   EMAIL_USER=your@email.com
   EMAIL_PASS=yourpassword
   JWT_SECRET=your_jwt_secret
   ```

2. **Configure database:**
   - Ensure your database is running and accessible.
   - Update `config/db.js` or your ORM config as needed.

---

## Database Schema Overview

*(See Swagger docs for full schema details)*

The main tables/models include:

- **User**: Stores user info, authentication credentials, and roles.
- **Role**: Defines user roles (admin, manager, facilitator, student, etc.).
- **Manager**: Academic manager accounts.
- **Facilitator**: Faculty/facilitator accounts.
- **Student**: Student accounts.
- **Module (Course)**: Basic course/module information.
- **Cohort**: Student groupings by year/intake.
- **Class**: Class identifiers (e.g., '2024S', '2025J').
- **Mode**: Delivery mode (Online, In-person, Hybrid).
- **CourseOffering**: Specific offerings/instances of a course (linked to module, class, cohort, trimester, intake, mode, facilitator).
- **ActivityTracker**: Logs weekly activities for each course offering and facilitator.
- **Assessment**: Assessment definitions for modules/courses.
- **AssessmentSubmission**: Student submissions for assessments.
- **Attendance**: Attendance records for students in classes.
- **Notification**: Stores notifications sent to users.
- **SequelizeMeta**: Sequelize migration tracking table (internal).
  
**Relationships:**  
- Managers assign facilitators to course offerings.
- Facilitators submit activity logs for their assigned offerings.
- Students are grouped in cohorts and classes, and submit assessments.
- Attendance and grading are tracked per course offering.

---

## Authentication Flow

- **Registration/Login:**  
  Users register and log in via API endpoints. Passwords are hashed and stored securely.
- **JWT Tokens:**  
  On successful login, a JWT token is issued and must be sent with protected API requests.
- **Role-Based Access:**  
  Middleware checks user roles for access to certain endpoints (e.g., only managers can create course offerings).

**Example Login Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Example Protected Request:**
```http
GET /activitytracker
Authorization: Bearer <your-jwt-token>
```

---

## Running the Project

1. **Start the backend server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

2. **Start the notification worker (in a separate terminal):**
   ```bash
   node workers/notificationWorker.js
   ```

3. **Open the frontend:**
   - Open `frontend/index.html` in your browser.
   - Or serve with a static server:
     ```bash
     npx serve frontend
     ```

---

## Redis Setup

Redis is required for job queues and notifications.

### Option 1: Local Installation

- **Windows:**  
  Download [Memurai](https://www.memurai.com/) or [Redis for Windows](https://github.com/microsoftarchive/redis/releases).
- **Linux/macOS:**  
  Install via package manager:
  ```bash
  sudo apt-get install redis-server
  # or
  brew install redis
  ```

- **Start Redis:**
  ```bash
  redis-server
  ```

### Option 2: Docker

If you have Docker installed:
```bash
docker run -p 6379:6379 redis
```

### Option 3: Remote Redis

Update your `redisClient.js`:
```javascript
const Redis = require('ioredis');
const redis = new Redis({ host: 'your-redis-host', port: your-redis-port });
```

---

## Testing API Endpoints

You can use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the REST API.

### Example Endpoints

- **Get all activity logs:**
  ```
  GET http://localhost:5000/api/activitytracker
  ```

- **Get activity log by ID:**
  ```
  GET http://localhost:5000/api/activitytracker/:id
  ```

- **Create activity log:**
  ```
  POST http://localhost:5000/api/activitytracker
  Content-Type: application/json

  {
    "allocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "attendance": true,
    "formativeOneGrading": 0,
    "formativeTwoGrading": 0,
    "summativeGrading": 0,
    "courseModeration": true,
    "intranetSync": true,
    "gradeBookStatus": "pending"
  }
  ```

- **Update activity log:**
  ```
  PUT http://localhost:5000/api/activitytracker/:id
  Content-Type: application/json

  {
    "attendance": false,
    "formativeOneGrading": 0,
    ...
  }
  ```

- **Delete activity log:**
  ```
  DELETE http://localhost:5000/api/activitytracker/:id
  ```

*(See Swagger UI for full endpoint documentation and request/response examples)*

---

## Internationalization (i18n)

- The frontend supports English and French.
- Use the language switcher in the header to change languages.
- All reflection content and UI text will update automatically.

---

## Example Usage Scenarios

### 1. **Instructor logs activity for a course offering**
- facilitator logs in, navigates to a course offering, and submits attendance and grading info.
- Activity log is created and can be viewed by managers .

### 2. **Student views their dashboard data**

### 3. **managers and users  receives notification**
- When a new activity log is created, a notification job is queued and processed by the worker, sending an email via Redis/Bull and saving to the notifications table.

---

## Project Structure

```
course-management-platform/
├── controllers/
│   └── activityTrackerController.js
├── models/
├── services/
│   └── activityTrackerService.js
├── workers/
│   └── notificationWorker.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── index.js
│   └── translations.js
├── redisClient.js
├── server.js
├── .env
└── README.md
```

---

## Troubleshooting

- **Redis connection errors:**  
  Make sure Redis is running and accessible at the configured host/port.
- **Database errors:**  
  Check your database credentials and connection settings.
- **Email sending issues:**  
  Update SMTP credentials in `notificationWorker.js` and allow less secure apps if using Gmail for testing.
- **Port conflicts:**  
  Change the `PORT` in `.env` if needed.
- **Migration issues:**
  create new migration files if needed

---

## API Documentation

- Full API documentation is available at [Swagger UI](http://localhost:5000/api-docs/).
- All endpoints, request/response examples, and status codes are documented there.

---

## Assumptions & Limitations

- Only managers can assign facilitators and create course offerings.
- Only facilitators assigned to a course offering can submit activity logs for it.
- Notifications are sent via email and stored in the database; push notifications are not implemented.
- Passwords are hashed using bcrypt before storage.
- The frontend is a simple static SPA; advanced features (e.g., file uploads, analytics) are not included.
- The system assumes all users have unique emails.
- Internationalization is limited to English and French.
- The system requires Redis and MySQL to be running for full functionality.

---

## License

MIT

---

##