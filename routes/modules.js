const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modulesController');

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: API endpoints for managing course modules
 */

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: A list of all modules
 */

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module found
 *       404:
 *         description: Module not found
 */

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               durationWeeks:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Module created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               durationWeeks:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Module updated
 *       404:
 *         description: Module not found
 */

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       200:
 *         description: Module deleted
 *       404:
 *         description: Module not found
 */

router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.post('/', moduleController.createModule);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
