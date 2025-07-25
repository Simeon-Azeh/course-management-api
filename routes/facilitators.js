const express = require('express');
const router = express.Router();
const facilitatorController = require('../controllers/facilitatorsController');

/**
 * @swagger
 * tags:
 *   name: Facilitators
 *   description: API for managing facilitators
 */

/**
 * @swagger
 * /facilitators:
 *   get:
 *     summary: Get all facilitators
 *     tags: [Facilitators]
 *     responses:
 *       200:
 *         description: List of all facilitators
 */
router.get('/', facilitatorController.getAllFacilitators);

/**
 * @swagger
 * /facilitators/{id}:
 *   get:
 *     summary: Get a facilitator by ID
 *     tags: [Facilitators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     responses:
 *       200:
 *         description: Facilitator found
 *       404:
 *         description: Facilitator not found
 */
router.get('/:id', facilitatorController.getFacilitatorById);

/**
 * @swagger
 * /facilitators:
 *   post:
 *     summary: Create a new facilitator
 *     tags: [Facilitators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facilitator created
 *       400:
 *         description: Invalid input
 */
router.post('/', facilitatorController.createFacilitator);

/**
 * @swagger
 * /facilitators/{id}:
 *   put:
 *     summary: Update a facilitator by ID
 *     tags: [Facilitators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Facilitator updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Facilitator not found
 */
router.put('/:id', facilitatorController.updateFacilitator);

/**
 * @swagger
 * /facilitators/{id}:
 *   delete:
 *     summary: Delete a facilitator by ID
 *     tags: [Facilitators]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facilitator ID
 *     responses:
 *       200:
 *         description: Facilitator deleted
 *       404:
 *         description: Facilitator not found
 */
router.delete('/:id', facilitatorController.deleteFacilitator);

module.exports = router;