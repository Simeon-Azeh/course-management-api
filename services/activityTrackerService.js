const { ActivityTracker, CourseOffering } = require('../models');

const createActivityLog = async (data) => {
  return await ActivityTracker.create(data);
};

const getActivityLogById = async (id) => {
  return await ActivityTracker.findByPk(id, {
    include: { model: CourseOffering, as: 'allocation' }
  });
};

const getAllActivityLogs = async (filter = {}) => {
  return await ActivityTracker.findAll({
    where: filter,
    include: { model: CourseOffering, as: 'allocation' }
  });
};

const updateActivityLog = async (id, updates) => {
  const log = await ActivityTracker.findByPk(id);
  if (!log) throw new Error('Log not found');
  return await log.update(updates);
};

const deleteActivityLog = async (id) => {
  const log = await ActivityTracker.findByPk(id);
  if (!log) throw new Error('Log not found');
  return await log.destroy();
};

module.exports = {
  createActivityLog,
  getActivityLogById,
  getAllActivityLogs,
  updateActivityLog,
  deleteActivityLog
};