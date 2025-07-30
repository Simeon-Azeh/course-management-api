const { Cohort, Student, Class, CourseOffering } = require('../models');

const getAllCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.findAll({
      include: [
        { model: Student, as: 'students', attributes: ['id'] },
        { model: Class, as: 'classes', attributes: ['id', 'topic', 'durationMinutes', 'facilitatorId'] },
        { model: CourseOffering, as: 'courseOfferings', attributes: ['id'] }
      ]
    });
    res.json(cohorts);
  } catch (error) {
    console.error('Error fetching cohorts:', error);
    res.status(500).json({ message: 'Failed to retrieve cohorts' });
  }
};

const getCohortById = async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id, {
      include: [
        { model: Student, as: 'students', attributes: ['id', 'userId'] },
        { model: Class, as: 'classes', attributes: ['id', 'topic'] },
        { model: CourseOffering, as: 'courseOfferings', attributes: ['id'] }
      ]
    });
    if (!cohort) return res.status(404).json({ message: 'Cohort not found' });
    res.json(cohort);
  } catch (error) {
    console.error('Error fetching cohort:', error);
    res.status(500).json({ message: 'Failed to retrieve cohort' });
  }
};

const createCohort = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    if (!name || !startDate) {
      return res.status(400).json({ message: 'Name and startDate are required' });
    }

    const newCohort = await Cohort.create({ name, startDate, endDate });
    res.status(201).json(newCohort);
  } catch (error) {
    console.error('Error creating cohort:', error);
    res.status(400).json({ message: 'Failed to create cohort' });
  }
};

const updateCohort = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    const cohort = await Cohort.findByPk(req.params.id);
    if (!cohort) return res.status(404).json({ message: 'Cohort not found' });

    await cohort.update({ name, startDate, endDate });
    res.json(cohort);
  } catch (error) {
    console.error('Error updating cohort:', error);
    res.status(400).json({ message: 'Failed to update cohort' });
  }
};

const deleteCohort = async (req, res) => {
  try {
    const cohort = await Cohort.findByPk(req.params.id);
    if (!cohort) return res.status(404).json({ message: 'Cohort not found' });

    await cohort.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting cohort:', error);
    res.status(500).json({ message: 'Failed to delete cohort' });
  }
};

module.exports = {
  getAllCohorts,
  getCohortById,
  createCohort,
  updateCohort,
  deleteCohort
};
