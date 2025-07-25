const { CourseOffering, Module, Class, User, Mode } = require('../models');

const getAllAllocations = async (req, res) => {
  try {
    const allocations = await CourseOffering.findAll({
      include: [
        { model: Module, as: 'module', attributes: ['id', 'title'] },
        { model: Class, as: 'class', attributes: ['id', 'name', 'startDate', 'graduationDate'] },
        { model: User, as: 'facilitator', attributes: ['id', 'fullName', 'email'] },
        { model: Mode, as: 'mode', attributes: ['id', 'name'] }
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
        { model: Class, as: 'class', attributes: ['id', 'name', 'startDate', 'graduationDate'] },
        { model: User, as: 'facilitator', attributes: ['id', 'fullName', 'email'] },
        { model: Mode, as: 'mode', attributes: ['id', 'name'] }
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
    const { moduleId, classId, facilitatorId, trimester, modeId, year } = req.body;
    const newAllocation = await CourseOffering.create({
      moduleId,
      classId,
      facilitatorId,
      trimester,
      modeId,
      year
    });
    res.status(201).json(newAllocation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create allocation' });
  }
};

const updateAllocation = async (req, res) => {
  try {
    const { moduleId, classId, facilitatorId, trimester, modeId, year } = req.body;
    const allocation = await CourseOffering.findByPk(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Allocation not found' });

    await allocation.update({ moduleId, classId, facilitatorId, trimester, modeId, year });
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
