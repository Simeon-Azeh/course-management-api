const express = require('express');
const allocationsController = require('../controllers/allocationsController');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Allocations
 *   description: API for managing allocations
 */

/**
 * @swagger
 * /allocations:
 *   get:
 *     summary: Get all allocations
 *     tags: [Allocations]
 *     responses:
 *       200:
 *         description: List of all allocations
 */
router.get('/', allocationsController.getAllAllocations);

/**
 * @swagger
 * /allocations/{id}:
 *   get:
 *     summary: Get an allocation by ID
 *     tags: [Allocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Allocation ID
 *     responses:
 *       200:
 *         description: Allocation found
 *       404:
 *         description: Allocation not found
 */
router.get('/:id', allocationsController.getAllocationById);

/**
 * @swagger
 * /allocations:
 *   post:
 *     summary: Create a new allocation (only managers)
 *     tags: [Allocations]
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
 *               cohortId:
 *                 type: string
 *               facilitatorId:
 *                 type: string
 *               term:
 *                 type: string
 *               academicYear:
 *                 type: string
 *               modeId:
 *                 type: string
 *               intakePeriod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Allocation created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  allocationsController.createAllocation
);

/**
 * @swagger
 * /allocations/{id}:
 *   put:
 *     summary: Update an allocation by ID (only managers)
 *     tags: [Allocations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Allocation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: string
 *               cohortId:
 *                 type: string
 *               facilitatorId:
 *                 type: string
 *               term:
 *                 type: string
 *               academicYear:
 *                 type: string
 *               modeId:
 *                 type: string
 *               intakePeriod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Allocation updated
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Allocation not found
 */
router.put('/:id', authenticateToken, authorizeRoles('manager'), allocationsController.updateAllocation);

/**
 * @swagger
 * /allocations/{id}:
 *   delete:
 *     summary: Delete an allocation by ID (only managers)
 *     tags: [Allocations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Allocation ID
 *     responses:
 *       200:
 *         description: Allocation deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Allocation not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('manager'), allocationsController.deleteAllocation);

module.exports = router;