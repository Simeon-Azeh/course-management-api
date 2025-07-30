const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentSubmissionController');

/**
 * @swagger
 * tags:
 *   name: AssessmentSubmissions
 *   description: API for managing assessment submissions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AssessmentSubmission:
 *       type: object
 *       required:
 *         - studentId
 *         - assessmentId
 *         - courseOfferingId
 *         - assessmentTitle
 *         - submittedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         studentId:
 *           type: string
 *           format: uuid
 *         assessmentId:
 *           type: string
 *           format: uuid
 *         courseOfferingId:
 *           type: string
 *           format: uuid
 *         assessmentTitle:
 *           type: string
 *         submission:
 *           type: string
 *           description: The submitted file format or content
 *         score:
 *           type: number
 *           format: float
 *           nullable: true
 *         submittedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /assessmentsubmissions:
 *   get:
 *     summary: Retrieve all assessment submissions
 *     tags: [AssessmentSubmissions]
 *     responses:
 *       200:
 *         description: A list of assessment submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AssessmentSubmission'
 */

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   get:
 *     summary: Retrieve a single assessment submission by ID
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Found the submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/AssessmentSubmission'
 */

/**
 * @swagger
 * /assessmentsubmissions:
 *   post:
 *     summary: Create a new assessment submission
 *     tags: [AssessmentSubmissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - assessmentId
 *               - courseOfferingId
 *               - assessmentTitle
 *               - submittedAt
 *             properties:
 *               studentId:
 *                 type: string
 *                 format: uuid
 *               assessmentId:
 *                 type: string
 *                 format: uuid
 *               courseOfferingId:
 *                 type: string
 *                 format: uuid
 *               assessmentTitle:
 *                 type: string
 *               submission:
 *                 type: string
 *               score:
 *                 type: number
 *                 format: float
 *                 nullable: true
 *               submittedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/AssessmentSubmission'
 */

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   put:
 *     summary: Update a submission
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               assessmentId:
 *                 type: string
 *               courseOfferingId:
 *                 type: string
 *               assessmentTitle:
 *                 type: string
 *               submission:
 *                 type: string
 *               score:
 *                 type: number
 *               submittedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/AssessmentSubmission'
 */

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   delete:
 *     summary: Delete a submission
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

router.get('/', assessmentController.getAllSubmissions);
router.get('/:id', assessmentController.getSubmissionById);
router.post('/', assessmentController.createSubmission);
router.put('/:id', assessmentController.updateSubmission);
router.delete('/:id', assessmentController.deleteSubmission);

module.exports = router;
