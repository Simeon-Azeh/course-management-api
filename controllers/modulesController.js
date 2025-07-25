const { Module } = require('../models');

const getAllModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve modules' });
  }
};

const getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve module' });
  }
};

const createModule = async (req, res) => {
  try {
    const { title, description, durationWeeks } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newModule = await Module.create({ title, description, durationWeeks });
    res.status(201).json(newModule);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create module' });
  }
};

const updateModule = async (req, res) => {
  try {
    const { title, description, durationWeeks } = req.body;
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    await module.update({ title, description, durationWeeks });
    res.json(module);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update module' });
  }
};

const deleteModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    await module.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete module' });
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
