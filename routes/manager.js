const express = require('express');
const router = express.Router();
const managerController = require('../controllers/ManagerController');

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 */

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Create a new manager
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: Manager ID (optional, auto-generated if not provided)
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: Manager created
 *       400:
 *         description: Invalid input
 */
router.post('/', managerController.createManager);

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Get all managers
 *     tags: [Managers]
 *     responses:
 *       200:
 *         description: List of all managers
 */
router.get('/', managerController.getAllManagers);

/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Get a manager by ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager ID
 *     responses:
 *       200:
 *         description: Manager found
 *       404:
 *         description: Manager not found
 */
router.get('/:id', managerController.getManagerById);

/**
 * @swagger
 * /managers/{id}:
 *   put:
 *     summary: Update a manager by ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Manager updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Manager not found
 */
router.put('/:id', managerController.updateManager);

/**
 * @swagger
 * /managers/{id}:
 *   delete:
 *     summary: Delete a manager by ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager ID
 *     responses:
 *       200:
 *         description: Manager deleted
 *       404:
 *         description: Manager not found
 */
router.delete('/:id', managerController.deleteManager);

module.exports = router;
