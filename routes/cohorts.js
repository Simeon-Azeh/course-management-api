const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohortController');

/**
 * @swagger
 * tags:
 *   name: Cohorts
 *   description: API for managing cohorts
 */

/**
 * @swagger
 * /cohorts:
 *   get:
 *     summary: Get all cohorts
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: List of all cohorts
 */
router.get('/', cohortController.getAllCohorts);

/**
 * @swagger
 * /cohorts/{id}:
 *   get:
 *     summary: Get a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       200:
 *         description: Cohort found
 *       404:
 *         description: Cohort not found
 */
router.get('/:id', cohortController.getCohortById);

/**
 * @swagger
 * /cohorts:
 *   post:
 *     summary: Create a new cohort
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Cohort created
 *       400:
 *         description: Invalid input
 */
router.post('/', cohortController.createCohort);

/**
 * @swagger
 * /cohorts/{id}:
 *   put:
 *     summary: Update a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Cohort updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cohort not found
 */
router.put('/:id', cohortController.updateCohort);

/**
 * @swagger
 * /cohorts/{id}:
 *   delete:
 *     summary: Delete a cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cohort ID
 *     responses:
 *       200:
 *         description: Cohort deleted
 *       404:
 *         description: Cohort not found
 */
router.delete('/:id', cohortController.deleteCohort);

module.exports = router;