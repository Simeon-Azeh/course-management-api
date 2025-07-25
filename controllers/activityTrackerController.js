const { ActivityTracker, CourseOffering } = require('../models');

const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityTracker.findAll({
      include: [
        { model: CourseOffering, as: 'allocation', attributes: ['id'] }
      ]
    });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve activity logs' });
  }
};

const getActivityLogById = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id, {
      include: [
        { model: CourseOffering, as: 'allocation', attributes: ['id'] }
      ]
    });
    if (!log) return res.status(404).json({ message: 'Activity log not found' });
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve activity log' });
  }
};

const createActivityLog = async (req, res) => {
  try {
    const {
      allocationId,
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    } = req.body;

    const newLog = await ActivityTracker.create({
      allocationId,
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    });
    res.status(201).json(newLog);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create activity log' });
  }
};

const updateActivityLog = async (req, res) => {
  try {
    const {
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    } = req.body;

    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Activity log not found' });

    await log.update({
      attendance,
      formativeOneGrading,
      formativeTwoGrading,
      summativeGrading,
      courseModeration,
      intranetSync,
      gradeBookStatus
    });
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update activity log' });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: 'Activity log not found' });

    await log.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete activity log' });
  }
};

module.exports = {
  getAllActivityLogs,
  getActivityLogById,
  createActivityLog,
  updateActivityLog,
  deleteActivityLog
};
