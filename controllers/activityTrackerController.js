const activityLogService = require('../services/activityTrackerService');

const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await activityLogService.getAllActivityLogs();
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve activity logs' });
  }
};

const getActivityLogById = async (req, res) => {
  try {
    const log = await activityLogService.getActivityLogById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Activity log not found' });
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve activity log' });
  }
};

const createActivityLog = async (req, res) => {
  try {
    const newLog = await activityLogService.createActivityLog(req.body);
    res.status(201).json(newLog);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create activity log' });
  }
};

const updateActivityLog = async (req, res) => {
  try {
    const updatedLog = await activityLogService.updateActivityLog(req.params.id, req.body);
    if (!updatedLog) return res.status(404).json({ message: 'Activity log not found' });
    res.json(updatedLog);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update activity log' });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const deleted = await activityLogService.deleteActivityLog(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Activity log not found' });
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