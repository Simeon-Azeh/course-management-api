const express = require('express');
const router = express.Router();
const courseOfferingController = require('../controllers/courseOfferingController');

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
 *     responses:
 *       200:
 *         description: List of all course offerings
 */
router.get('/', courseOfferingController.getAllCourseOfferings);

/**
 * @swagger
 * /courseofferings/{id}:
 *   get:
 *     summary: Get a course offering by ID
 *     tags: [CourseOfferings]
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
 *       404:
 *         description: Course offering not found
 */
router.get('/:id', courseOfferingController.getCourseOfferingById);

/**
 * @swagger
 * /courseofferings:
 *   post:
 *     summary: Create a new course offering
 *     tags: [CourseOfferings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               facilitatorId:
 *                 type: string
 *               modeId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Course offering created
 *       400:
 *         description: Invalid input
 */
router.post('/', courseOfferingController.createCourseOffering);

/**
 * @swagger
 * /courseofferings/{id}:
 *   put:
 *     summary: Update a course offering by ID
 *     tags: [CourseOfferings]
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
 *               courseId:
 *                 type: string
 *               facilitatorId:
 *                 type: string
 *               modeId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Course offering updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Course offering not found
 */
router.put('/:id', courseOfferingController.updateCourseOffering);

/**
 * @swagger
 * /courseofferings/{id}:
 *   delete:
 *     summary: Delete a course offering by ID
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course offering ID
 *     responses:
 *       200:
 *         description: Course offering deleted
 *       404:
 *         description: Course offering not found
 */
router.delete('/:id', courseOfferingController.deleteCourseOffering);

module.exports = router;