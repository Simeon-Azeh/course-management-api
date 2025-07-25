const express = require('express');
const activityTrackerController = require('../controllers/activityTrackerController');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ActivityTracker
 *   description: API for tracking facilitator activities
 */

/**
 * @swagger
 * /activitytracker:
 *   get:
 *     summary: Get all activity logs (only managers)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all activity logs
 *       403:
 *         description: Forbidden
 */
router.get('/', authenticateToken, authorizeRoles('manager'), activityTrackerController.getAllActivityLogs);

/**
 * @swagger
 * /activitytracker/{id}:
 *   get:
 *     summary: Get an activity log by ID (managers and facilitators)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity log ID
 *     responses:
 *       200:
 *         description: Activity log found
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */
router.get('/:id', authenticateToken, authorizeRoles('manager', 'facilitator'), activityTrackerController.getActivityLogById);

/**
 * @swagger
 * /activitytracker:
 *   post:
 *     summary: Create a new activity log (only facilitators)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Activity log created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('facilitator'),
  activityTrackerController.createActivityLog
);

/**
 * @swagger
 * /activitytracker/{id}:
 *   put:
 *     summary: Update an activity log by ID (only facilitators)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Activity log updated
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */
router.put('/:id', authenticateToken, authorizeRoles('facilitator'), activityTrackerController.updateActivityLog);

/**
 * @swagger
 * /activitytracker/{id}:
 *   delete:
 *     summary: Delete an activity log by ID (only facilitators)
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity log ID
 *     responses:
 *       200:
 *         description: Activity log deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('facilitator'), activityTrackerController.deleteActivityLog);

module.exports = router;