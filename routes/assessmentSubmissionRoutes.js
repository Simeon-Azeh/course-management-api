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
 * /assessmentsubmissions:
 *   get:
 *     summary: Get all assessment submissions
 *     tags: [AssessmentSubmissions]
 *     responses:
 *       200:
 *         description: List of all assessment submissions
 */
router.get('/', assessmentController.getAllSubmissions);

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   get:
 *     summary: Get an assessment submission by ID
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Assessment submission ID
 *     responses:
 *       200:
 *         description: Assessment submission found
 *       404:
 *         description: Assessment submission not found
 */
router.get('/:id', assessmentController.getSubmissionById);

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
 *             properties:
 *               studentId:
 *                 type: string
 *               assessmentId:
 *                 type: string
 *               submission:
 *                 type: string
 *               submittedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Assessment submission created
 *       400:
 *         description: Invalid input
 */
router.post('/', assessmentController.createSubmission);

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   put:
 *     summary: Update an assessment submission by ID
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Assessment submission ID
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
 *               submission:
 *                 type: string
 *               submittedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Assessment submission updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Assessment submission not found
 */
router.put('/:id', assessmentController.updateSubmission);

/**
 * @swagger
 * /assessmentsubmissions/{id}:
 *   delete:
 *     summary: Delete an assessment submission by ID
 *     tags: [AssessmentSubmissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Assessment submission ID
 *     responses:
 *       200:
 *         description: Assessment submission deleted
 *       404:
 *         description: Assessment submission not found
 */
router.delete('/:id', assessmentController.deleteSubmission);

module.exports = router;