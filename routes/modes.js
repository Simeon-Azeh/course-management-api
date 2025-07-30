const express = require('express');
const router = express.Router();
const modeController = require('../controllers/modeController');

/**
 * @swagger
 * tags:
 *   name: Modes
 *   description: API for managing course modes
 */

/**
 * @swagger
 * /modes:
 *   get:
 *     summary: Get all modes
 *     tags: [Modes]
 *     responses:
 *       200:
 *         description: List of all modes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   classes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         topic:
 *                           type: string
 */
router.get('/', modeController.getAllModes);

/**
 * @swagger
 * /modes/{id}:
 *   get:
 *     summary: Get a mode by ID
 *     tags: [Modes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mode ID
 *     responses:
 *       200:
 *         description: Mode found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mode'
 *       404:
 *         description: Mode not found
 */
router.get('/:id', modeController.getModeById);

/**
 * @swagger
 * /modes:
 *   post:
 *     summary: Create a new mode
 *     tags: [Modes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - description
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mode created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 type:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 classes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       topic:
 *                         type: string
 *       400:
 *         description: Invalid input
 */
router.post('/', modeController.createMode);

/**
 * @swagger
 * /modes/{id}:
 *   put:
 *     summary: Update a mode by ID
 *     tags: [Modes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mode ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mode updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Mode not found
 */
router.put('/:id', modeController.updateMode);

/**
 * @swagger
 * /modes/{id}:
 *   delete:
 *     summary: Delete a mode by ID
 *     tags: [Modes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mode ID
 *     responses:
 *       200:
 *         description: Mode deleted
 *       404:
 *         description: Mode not found
 */
router.delete('/:id', modeController.deleteMode);

module.exports = router;
