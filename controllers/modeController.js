const { Mode, Class } = require('../models');

const getAllModes = async (req, res) => {
  try {
    const modes = await Mode.findAll({
      include: [{ model: Class, as: 'classes', attributes: ['id', 'topic'] }]
    });
    res.json(modes);
  } catch (error) {
    console.error('Error fetching modes:', error);
    res.status(500).json({ message: 'Failed to retrieve modes' });
  }
};

const getModeById = async (req, res) => {
  try {
    const mode = await Mode.findByPk(req.params.id, {
      include: [{ model: Class, as: 'classes', attributes: ['id', 'topic'] }]
    });
    if (!mode) return res.status(404).json({ message: 'Mode not found' });
    res.json(mode);
  } catch (error) {
    console.error('Error fetching mode:', error);
    res.status(500).json({ message: 'Failed to retrieve mode' });
  }
};

const createMode = async (req, res) => {
  try {
    const { type, description } = req.body;
    if (!type) {
      return res.status(400).json({ message: 'Type is required' });
    }

    const newMode = await Mode.create({ type, description });
    res.status(201).json(newMode);
  } catch (error) {
    console.error('Error creating mode:', error);
    res.status(400).json({ message: 'Failed to create mode' });
  }
};

const updateMode = async (req, res) => {
  try {
    const { type, description } = req.body;
    const mode = await Mode.findByPk(req.params.id);
    if (!mode) return res.status(404).json({ message: 'Mode not found' });

    await mode.update({ type, description });
    res.json(mode);
  } catch (error) {
    console.error('Error updating mode:', error);
    res.status(400).json({ message: 'Failed to update mode' });
  }
};

const deleteMode = async (req, res) => {
  try {
    const mode = await Mode.findByPk(req.params.id);
    if (!mode) return res.status(404).json({ message: 'Mode not found' });

    await mode.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting mode:', error);
    res.status(500).json({ message: 'Failed to delete mode' });
  }
};

module.exports = {
  getAllModes,
  getModeById,
  createMode,
  updateMode,
  deleteMode
};
