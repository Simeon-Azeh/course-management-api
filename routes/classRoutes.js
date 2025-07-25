const express = require('express');
const router = express.Router();

const classController = require('../controllers/classesController');
const authenticateToken = require('../middleware/auth');  
const authorizeRoles = require('../middleware/authorizeRoles');        

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing classes
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all classes
 */
router.get('/', authenticateToken, classController.getAllClasses);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 */
router.get('/:id', authenticateToken, classController.getClassById);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class (only managers)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Class created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticateToken, authorizeRoles('manager'), classController.createClass);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update a class by ID (only managers)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Class updated
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Class not found
 */
router.put('/:id', authenticateToken, authorizeRoles('manager'), classController.updateClass);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class by ID (only managers)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Class not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('manager'), classController.deleteClass);

module.exports = router;