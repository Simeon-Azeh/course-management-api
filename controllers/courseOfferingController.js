const { CourseOffering, Module, Cohort, Class } = require('../models');

const getAllCourseOfferings = async (req, res) => {
  try {
    const { cohortId, term, intakePeriod, modeId } = req.query;
    const where = {};

    // Role-based filtering
    if (req.user.role === 'facilitator') {
      where.facilitatorId = req.user.id;
    } else {
      // Managers can filter by facilitatorId if provided
      if (req.query.facilitatorId) {
        where.facilitatorId = req.query.facilitatorId;
      }
    }

    if (cohortId) where.cohortId = cohortId;
    if (term) where.term = term;
    if (intakePeriod) where.intakePeriod = intakePeriod;
    if (modeId) where.modeId = modeId;

    const courseOfferings = await CourseOffering.findAll({
      where,
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
    // If facilitator, check ownership
    if (req.user.role === 'facilitator' && courseOffering.facilitatorId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: Not your course offering' });
    }
    res.status(200).json(courseOffering);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve course offering', error: error.message });
  }
};

const createCourseOffering = async (req, res) => {
  const { moduleId, cohortId, term, academicYear, intakePeriod, modeId, facilitatorId } = req.body;

  // Managers only can assign facilitatorId (optional)
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Forbidden: Only managers can create course offerings' });
  }

  if (!moduleId || !cohortId || !term || !academicYear) {
    return res.status(400).json({ message: 'Fields required: moduleId, cohortId, term, academicYear' });
  }

  try {
    const newCourseOffering = await CourseOffering.create({
      moduleId,
      cohortId,
      term,
      academicYear,
      intakePeriod,
      modeId,
      facilitatorId
    });
    res.status(201).json(newCourseOffering);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create course offering', error: error.message });
  }
};

const updateCourseOffering = async (req, res) => {
  const { moduleId, cohortId, term, academicYear, intakePeriod, modeId, facilitatorId } = req.body;

  try {
    const courseOffering = await CourseOffering.findByPk(req.params.id);
    if (!courseOffering) {
      return res.status(404).json({ message: 'Course offering not found' });
    }

    // Only managers can update
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Forbidden: Only managers can update course offerings' });
    }

    await courseOffering.update({
      moduleId,
      cohortId,
      term,
      academicYear,
      intakePeriod,
      modeId,
      facilitatorId
    });
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

    // Only managers can delete
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Forbidden: Only managers can delete course offerings' });
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
