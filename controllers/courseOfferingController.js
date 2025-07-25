const { CourseOffering, Module, Cohort, Class } = require('../models');

const getAllCourseOfferings = async (req, res) => {
  try {
    const courseOfferings = await CourseOffering.findAll({
      include: [
        { model: Module, as: 'module', attributes: ['id', 'title'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] },
        { model: Class, as: 'classes' }
      ]
    });
    res.status(200).json(courseOfferings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve course offerings', error: error.message });
  }
};

const getCourseOfferingById = async (req, res) => {
  try {
    const courseOffering = await CourseOffering.findByPk(req.params.id, {
      include: [
        { model: Module, as: 'module', attributes: ['id', 'title'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] },
        { model: Class, as: 'classes' }
      ]
    });
    if (!courseOffering) {
      return res.status(404).json({ message: 'Course offering not found' });
    }
    res.status(200).json(courseOffering);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve course offering', error: error.message });
  }
};

const createCourseOffering = async (req, res) => {
  const { moduleId, cohortId, term, academicYear } = req.body;

  if (!moduleId || !cohortId || !term || !academicYear) {
    return res.status(400).json({ message: 'All fields are required: moduleId, cohortId, term, academicYear' });
  }

  try {
    const newCourseOffering = await CourseOffering.create({ moduleId, cohortId, term, academicYear });
    res.status(201).json(newCourseOffering);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create course offering', error: error.message });
  }
};

const updateCourseOffering = async (req, res) => {
  const { moduleId, cohortId, term, academicYear } = req.body;

  try {
    const courseOffering = await CourseOffering.findByPk(req.params.id);
    if (!courseOffering) {
      return res.status(404).json({ message: 'Course offering not found' });
    }

    await courseOffering.update({ moduleId, cohortId, term, academicYear });
    res.status(200).json(courseOffering);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update course offering', error: error.message });
  }
};

const deleteCourseOffering = async (req, res) => {
  try {
    const courseOffering = await CourseOffering.findByPk(req.params.id);
    if (!courseOffering) {
      return res.status(404).json({ message: 'Course offering not found' });
    }

    await courseOffering.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete course offering', error: error.message });
  }
};

module.exports = {
  getAllCourseOfferings,
  getCourseOfferingById,
  createCourseOffering,
  updateCourseOffering,
  deleteCourseOffering
};
