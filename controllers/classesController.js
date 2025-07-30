const { Class } = require('../models');

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve classes' });
  }
};

const getClassById = async (req, res) => {
  try {
    const singleClass = await Class.findByPk(req.params.id);
    if (!singleClass) return res.status(404).json({ message: 'Class not found' });
    res.json(singleClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve class' });
  }
};

const createClass = async (req, res) => {
  try {
    const {
      topic,
      date,
      time,
      durationMinutes,
      moduleId,
      cohortId,
      facilitatorId,
      modeId,
      courseOfferingId
    } = req.body;

    const newClass = await Class.create({
      topic,
      date,
      time,
      durationMinutes,
      moduleId,
      cohortId,
      facilitatorId,
      modeId,
      courseOfferingId
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create class' });
  }
};

const updateClass = async (req, res) => {
  try {
    const {
      topic,
      date,
      time,
      durationMinutes,
      moduleId,
      cohortId,
      facilitatorId,
      modeId,
      courseOfferingId
    } = req.body;

    const singleClass = await Class.findByPk(req.params.id);
    if (!singleClass) return res.status(404).json({ message: 'Class not found' });

    await singleClass.update({
      topic,
      date,
      time,
      durationMinutes,
      moduleId,
      cohortId,
      facilitatorId,
      modeId,
      courseOfferingId
    });

    res.json(singleClass);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update class' });
  }
};

const deleteClass = async (req, res) => {
  try {
    const singleClass = await Class.findByPk(req.params.id);
    if (!singleClass) return res.status(404).json({ message: 'Class not found' });

    await singleClass.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete class' });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};