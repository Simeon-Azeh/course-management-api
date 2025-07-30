// swagger.js
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
        url: 'http://localhost:5000',
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
        ActivityTracker: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the activity log',
              example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
            },
            allocationId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the related course offering allocation',
              example: 'f1e2d3c4-b5a6-7890-fedc-0987654321ba',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user who performed the activity',
              example: '11223344-5566-7788-99aa-bbccddeeff00',
            },
            attendance: {
              type: 'boolean',
              description: 'Attendance status',
              example: true,
            },
            formativeOneGrading: {
              type: 'number',
              format: 'float',
              description: 'Score for the first formative grading',
              example: 85.5,
            },
            formativeTwoGrading: {
              type: 'number',
              format: 'float',
              description: 'Score for the second formative grading',
              example: 90.0,
            },
            summativeGrading: {
              type: 'number',
              format: 'float',
              description: 'Score for summative grading',
              example: 88.0,
            },
            courseModeration: {
              type: 'boolean',
              description: 'Whether course moderation is complete',
              example: false,
            },
            intranetSync: {
              type: 'boolean',
              description: 'Whether data is synced with intranet',
              example: true,
            },
            gradeBookStatus: {
              type: 'string',
              enum: ['pending', 'completed', 'failed'],
              description: 'Status of the grade book',
              example: 'completed',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the record was created',
              example: '2025-07-27T10:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the record was last updated',
              example: '2025-07-27T12:00:00Z',
            },
          },
          required: ['id', 'allocationId', 'userId'],
        },
      },
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
