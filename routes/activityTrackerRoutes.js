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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   allocationId:
 *                     type: string
 *                     format: uuid
 *                   userId:
 *                     type: string
 *                     format: uuid
 *                   attendance:
 *                     type: boolean
 *                   formativeOneGrading:
 *                     type: number
 *                     format: float
 *                   formativeTwoGrading:
 *                     type: number
 *                     format: float
 *                   summativeGrading:
 *                     type: number
 *                     format: float
 *                   courseModeration:
 *                     type: boolean
 *                   intranetSync:
 *                     type: boolean
 *                   gradeBookStatus:
 *                     type: string
 *                     enum: [pending, completed, failed]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Forbidden
 */

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
 *           format: uuid
 *         description: Activity log ID
 *     responses:
 *       200:
 *         description: Activity log found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 allocationId:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 attendance:
 *                   type: boolean
 *                 formativeOneGrading:
 *                   type: number
 *                   format: float
 *                 formativeTwoGrading:
 *                   type: number
 *                   format: float
 *                 summativeGrading:
 *                   type: number
 *                   format: float
 *                 courseModeration:
 *                   type: boolean
 *                 intranetSync:
 *                   type: boolean
 *                 gradeBookStatus:
 *                   type: string
 *                   enum: [pending, completed, failed]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */

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
 *             required:
 *               - allocationId
 *               - userId
 *             properties:
 *               allocationId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the course offering allocation
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user creating the log
 *               attendance:
 *                 type: boolean
 *                 description: Attendance status
 *               formativeOneGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for first formative grading
 *               formativeTwoGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for second formative grading
 *               summativeGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for summative grading
 *               courseModeration:
 *                 type: boolean
 *                 description: Whether course moderation was done
 *               intranetSync:
 *                 type: boolean
 *                 description: Status of intranet synchronization
 *               gradeBookStatus:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *                 description: Grade book status
 *     responses:
 *       201:
 *         description: Activity log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityTracker'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */

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
 *           format: uuid
 *         description: Activity log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attendance:
 *                 type: boolean
 *                 description: Attendance status
 *               formativeOneGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for first formative grading
 *               formativeTwoGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for second formative grading
 *               summativeGrading:
 *                 type: number
 *                 format: float
 *                 description: Score for summative grading
 *               courseModeration:
 *                 type: boolean
 *                 description: Whether course moderation was done
 *               intranetSync:
 *                 type: boolean
 *                 description: Status of intranet synchronization
 *               gradeBookStatus:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *                 description: Grade book status
 *     responses:
 *       200:
 *         description: Activity log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityTracker'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */

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
 *           format: uuid
 *         description: Activity log ID
 *     responses:
 *       204:
 *         description: Activity log deleted successfully (no content)
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Activity log not found
 */

router.get('/', authenticateToken, authorizeRoles('manager'), activityTrackerController.getAllActivityLogs);
router.get('/:id', authenticateToken, authorizeRoles('manager', 'facilitator'), activityTrackerController.getActivityLogById);
router.post('/', authenticateToken, authorizeRoles('facilitator'), activityTrackerController.createActivityLog);
router.put('/:id', authenticateToken, authorizeRoles('facilitator'), activityTrackerController.updateActivityLog);
router.delete('/:id', authenticateToken, authorizeRoles('facilitator'), activityTrackerController.deleteActivityLog);

module.exports = router;
