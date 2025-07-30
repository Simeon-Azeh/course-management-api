const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

/**
 * @swagger
 * tags:
 *   name: Assessments
 *   description: Assessment management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Assessment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           example: "Midterm Exam"
 *         description:
 *           type: string
 *           example: "Covers chapters 1-5"
 *         type:
 *           type: string
 *           enum: [quiz, assignment]
 *           example: "quiz"
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2025-08-01"
 *         courseOfferingId:
 *           type: string
 *           format: uuid
 *           example: "c0ffee00-cafe-babe-1234-56789abcdef0"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-27T13:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-27T13:00:00Z"
 */

/**
 * @swagger
 * /assessments:
 *   post:
 *     summary: Create a new assessment
 *     tags: [Assessments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - courseOfferingId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Midterm Exam"
 *               description:
 *                 type: string
 *                 example: "Covers chapters 1-5"
 *               type:
 *                 type: string
 *                 enum: [quiz, assignment]
 *                 example: "quiz"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-01"
 *               courseOfferingId:
 *                 type: string
 *                 format: uuid
 *                 example: "c0ffee00-cafe-babe-1234-56789abcdef0"
 *     responses:
 *       201:
 *         description: Assessment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Assessment created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Assessment'
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Failed to create assessment
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assessments:
 *   get:
 *     summary: Get all assessments
 *     tags: [Assessments]
 *     responses:
 *       200:
 *         description: List of assessments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Assessments retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assessment'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assessments/{id}:
 *   get:
 *     summary: Get an assessment by ID
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assessment ID
 *     responses:
 *       200:
 *         description: Assessment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Assessment retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Assessment'
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assessments/{id}:
 *   put:
 *     summary: Update an assessment
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assessment ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Final Exam"
 *               description:
 *                 type: string
 *                 example: "Covers all chapters"
 *               type:
 *                 type: string
 *                 enum: [quiz, assignment]
 *                 example: "assignment"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               courseOfferingId:
 *                 type: string
 *                 format: uuid
 *                 example: "c0ffee00-cafe-babe-1234-56789abcdef0"
 *     responses:
 *       200:
 *         description: Assessment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Assessment updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Assessment'
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Failed to update assessment
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assessments/{id}:
 *   delete:
 *     summary: Delete an assessment
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Assessment ID
 *     responses:
 *       204:
 *         description: Assessment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 204
 *                 message:
 *                   type: string
 *                   example: Assessment deleted successfully
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 *       500:
 *         description: Internal server error
 */

router.post('/', assessmentController.createAssessment);
router.get('/', assessmentController.getAllAssessments);
router.get('/:id', assessmentController.getAssessmentById);
router.put('/:id', assessmentController.updateAssessment);
router.delete('/:id', assessmentController.deleteAssessment);

module.exports = router;
