const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API for managing attendance records
 */

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: List of all attendance records
 */
router.get('/', attendanceController.getAllAttendances);

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     summary: Get an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record found
 *       404:
 *         description: Attendance record not found
 */
router.get('/:id', attendanceController.getAttendanceById);

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [present, absent, late]
 *     responses:
 *       201:
 *         description: Attendance record created
 *       400:
 *         description: Invalid input
 */
router.post('/', attendanceController.createAttendance);

/**
 * @swagger
 * /attendance/{id}:
 *   put:
 *     summary: Update an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               classId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [present, absent, late]
 *     responses:
 *       200:
 *         description: Attendance record updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Attendance record not found
 */
router.put('/:id', attendanceController.updateAttendance);

/**
 * @swagger
 * /attendance/{id}:
 *   delete:
 *     summary: Delete an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record deleted
 *       404:
 *         description: Attendance record not found
 */
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;