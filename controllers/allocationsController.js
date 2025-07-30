const { CourseOffering, Module, Class, User, Mode } = require('../models');

const getAllAllocations = async (req, res) => {
  try {
    const allocations = await CourseOffering.findAll({
      include: [
        { model: Module, as: 'module', attributes: ['id', 'title'] },
        { model: Class, as: 'classes', attributes: ['id', 'topic', 'date', 'time'] },
        { model: User, as: 'facilitator', attributes: ['id', 'fullName', 'email'] },
        { model: Mode, as: 'mode', attributes: ['id', 'type'] }
      ]
    });
    res.json(allocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve allocations' });
  }
};

const getAllocationById = async (req, res) => {
  try {
    const allocation = await CourseOffering.findByPk(req.params.id, {
      include: [
        { model: Module, as: 'module', attributes: ['id', 'title'] },
        { model: Class, as: 'classes', attributes: ['id', 'topic', 'date', 'time'] },
        { model: User, as: 'facilitator', attributes: ['id', 'fullName', 'email'] },
        { model: Mode, as: 'mode', attributes: ['id', 'type'] }
      ]
    });
    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });
    res.json(allocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve allocation' });
  }
};

const createAllocation = async (req, res) => {
  try {
    const { moduleId, cohortId, facilitatorId, term, modeId, academicYear, intakePeriod } = req.body;
    const newAllocation = await CourseOffering.create({
      moduleId,
      cohortId,
      facilitatorId,
      term,
      modeId,
      academicYear,
      intakePeriod
    });
    res.status(201).json(newAllocation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create allocation' });
  }
};

const updateAllocation = async (req, res) => {
  try {
    const { moduleId, cohortId, facilitatorId, term, modeId, academicYear, intakePeriod } = req.body;
    const allocation = await CourseOffering.findByPk(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });

    await allocation.update({ moduleId, cohortId, facilitatorId, term, modeId, academicYear, intakePeriod });
    res.json(allocation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update allocation' });
  }
};

const deleteAllocation = async (req, res) => {
  try {
    const allocation = await CourseOffering.findByPk(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });

    await allocation.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete allocation' });
  }
};

module.exports = {
  getAllAllocations,
  getAllocationById,
  createAllocation,
  updateAllocation,
  deleteAllocation
};