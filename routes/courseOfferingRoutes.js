const express = require('express');
const router = express.Router();
const courseOfferingController = require('../controllers/courseOfferingController');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

/**
 * @swagger
 * tags:
 *   name: CourseOfferings
 *   description: API for managing course offerings
 */

/**
 * @swagger
 * /courseofferings:
 *   get:
 *     summary: Get all course offerings
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all course offerings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseOffering'
 */
router.get('/', authenticateToken, courseOfferingController.getAllCourseOfferings);

/**
 * @swagger
 * /courseofferings/{id}:
 *   get:
 *     summary: Get a course offering by ID
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course offering ID
 *     responses:
 *       200:
 *         description: Course offering found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseOffering'
 *       404:
 *         description: Course offering not found
 */
router.get('/:id', authenticateToken, courseOfferingController.getCourseOfferingById);

/**
 * @swagger
 * /courseofferings:
 *   post:
 *     summary: Create a new course offering
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moduleId
 *               - cohortId
 *               - term
 *               - academicYear
 *             properties:
 *               moduleId:
 *                 type: string
 *                 description: ID of the module being offered
 *               facilitatorId:
 *                 type: string
 *                 description: ID of the facilitator assigned
 *               cohortId:
 *                 type: string
 *                 description: ID of the cohort
 *               modeId:
 *                 type: string
 *                 description: ID representing the delivery mode (e.g., online, onsite)
 *               term:
 *                 type: string
 *                 example: "Fall"
 *               academicYear:
 *                 type: string
 *                 example: "2025/2026"
 *             example:
 *               moduleId: "module123"
 *               facilitatorId: "facilitator456"
 *               cohortId: "cohort789"
 *               modeId: "mode012"
 *               term: "Spring"
 *               academicYear: "2025/2026"
 *     responses:
 *       201:
 *         description: Course offering created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticateToken, authorizeRoles('manager'), courseOfferingController.createCourseOffering);

/**
 * @swagger
 * /courseofferings/{id}:
 *   put:
 *     summary: Update a course offering by ID
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course offering ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: string
 *                 description: ID of the module
 *               facilitatorId:
 *                 type: string
 *                 description: ID of the facilitator
 *               cohortId:
 *                 type: string
 *                 description: ID of the cohort
 *               modeId:
 *                 type: string
 *                 description: Delivery mode ID
 *               term:
 *                 type: string
 *               academicYear:
 *                 type: string
 *             example:
 *               moduleId: "moduleUpdated"
 *               facilitatorId: "facilitatorUpdated"
 *               cohortId: "cohortUpdated"
 *               modeId: "modeUpdated"
 *               term: "Summer"
 *               academicYear: "2026/2027"
 *     responses:
 *       200:
 *         description: Course offering updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Course offering not found
 */
router.put('/:id', authenticateToken, authorizeRoles('manager'), courseOfferingController.updateCourseOffering);

/**
 * @swagger
 * /courseofferings/{id}:
 *   delete:
 *     summary: Delete a course offering by ID
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course offering ID
 *     responses:
 *       204:
 *         description: Course offering deleted
 *       404:
 *         description: Course offering not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('manager'), courseOfferingController.deleteCourseOffering);

module.exports = router;
