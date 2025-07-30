const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management API',
      version: '1.0.0',
      description: 'API documentation for the Course Management Platform',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'user-uuid' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'hashedpassword' },
            role: { type: 'string', example: 'facilitator' }
          },
          required: ['id', 'name', 'email', 'role']
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'role-uuid' },
            name: { type: 'string', example: 'manager' }
          },
          required: ['id', 'name']
        },
        Manager: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'manager-uuid' },
            userId: { type: 'string', format: 'uuid', example: 'user-uuid' }
          },
          required: ['id', 'userId']
        },
        Facilitator: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'facilitator-uuid' },
            userId: { type: 'string', format: 'uuid', example: 'user-uuid' }
          },
          required: ['id', 'userId']
        },
        Student: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'student-uuid' },
            userId: { type: 'string', format: 'uuid', example: 'user-uuid' },
            cohortId: { type: 'string', format: 'uuid', example: 'cohort-uuid' }
          },
          required: ['id', 'userId', 'cohortId']
        },
        Module: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'module-uuid' },
            name: { type: 'string', example: 'Mathematics' },
            code: { type: 'string', example: 'MATH101' }
          },
          required: ['id', 'name', 'code']
        },
        Cohort: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'cohort-uuid' },
            year: { type: 'string', example: '2025' },
            intake: { type: 'string', example: 'HT1' }
          },
          required: ['id', 'year', 'intake']
        },
        Class: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'class-uuid' },
            name: { type: 'string', example: '2025J' }
          },
          required: ['id', 'name']
        },
        Mode: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'mode-uuid' },
            type: { type: 'string', example: 'Online' }
          },
          required: ['id', 'type']
        },
        CourseOffering: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'offering-uuid' },
            moduleId: { type: 'string', format: 'uuid', example: 'module-uuid' },
            classId: { type: 'string', format: 'uuid', example: 'class-uuid' },
            cohortId: { type: 'string', format: 'uuid', example: 'cohort-uuid' },
            trimester: { type: 'string', example: 'Trimester 1' },
            intake: { type: 'string', example: 'HT1' },
            modeId: { type: 'string', format: 'uuid', example: 'mode-uuid' },
            facilitatorId: { type: 'string', format: 'uuid', example: 'facilitator-uuid' }
          },
          required: ['id', 'moduleId', 'classId', 'cohortId', 'trimester', 'intake', 'modeId', 'facilitatorId']
        },
        ActivityTracker: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'Unique identifier for the activity log', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' },
            allocationId: { type: 'string', format: 'uuid', description: 'ID of the related course offering allocation', example: 'f1e2d3c4-b5a6-7890-fedc-0987654321ba' },
            userId: { type: 'string', format: 'uuid', description: 'ID of the user who performed the activity', example: '11223344-5566-7788-99aa-bbccddeeff00' },
            attendance: { type: 'boolean', description: 'Attendance status', example: true },
            formativeOneGrading: { type: 'number', format: 'float', description: 'Score for the first formative grading', example: 85.5 },
            formativeTwoGrading: { type: 'number', format: 'float', description: 'Score for the second formative grading', example: 90.0 },
            summativeGrading: { type: 'number', format: 'float', description: 'Score for summative grading', example: 88.0 },
            courseModeration: { type: 'boolean', description: 'Whether course moderation is complete', example: false },
            intranetSync: { type: 'boolean', description: 'Whether data is synced with intranet', example: true },
            gradeBookStatus: { type: 'string', enum: ['pending', 'completed', 'failed'], description: 'Status of the grade book', example: 'completed' },
            createdAt: { type: 'string', format: 'date-time', description: 'Timestamp when the record was created', example: '2025-07-27T10:00:00Z' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Timestamp when the record was last updated', example: '2025-07-27T12:00:00Z' }
          },
          required: ['id', 'allocationId', 'userId']
        },
        Assessment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'assessment-uuid' },
            moduleId: { type: 'string', format: 'uuid', example: 'module-uuid' },
            name: { type: 'string', example: 'Midterm Exam' },
            type: { type: 'string', example: 'Exam' },
            maxScore: { type: 'number', example: 100 }
          },
          required: ['id', 'moduleId', 'name', 'type', 'maxScore']
        },
        AssessmentSubmission: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'submission-uuid' },
            assessmentId: { type: 'string', format: 'uuid', example: 'assessment-uuid' },
            studentId: { type: 'string', format: 'uuid', example: 'student-uuid' },
            score: { type: 'number', example: 85 },
            submittedAt: { type: 'string', format: 'date-time', example: '2025-07-27T10:00:00Z' }
          },
          required: ['id', 'assessmentId', 'studentId', 'score', 'submittedAt']
        },
        Attendance: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'attendance-uuid' },
            studentId: { type: 'string', format: 'uuid', example: 'student-uuid' },
            classId: { type: 'string', format: 'uuid', example: 'class-uuid' },
            date: { type: 'string', format: 'date', example: '2025-07-27' },
            present: { type: 'boolean', example: true }
          },
          required: ['id', 'studentId', 'classId', 'date', 'present']
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // your route files with swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;