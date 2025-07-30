const { User, Manager } = require('../models');
const bcrypt = require('bcrypt');

// Get all managers with user profile
const getAllManagers = async (req, res) => {
  try {
    const managers = await User.findAll({
      where: { role: 'manager' },
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: {
        model: Manager,
        as: 'managerProfile',
        attributes: ['id', 'department', 'title']
      }
    });

    res.status(200).json(managers);
  } catch (error) {
    console.error('Error fetching managers:', error);
    res.status(500).json({ message: 'Failed to retrieve managers' });
  }
};

// Get a single manager by ID
const getManagerById = async (req, res) => {
  try {
    const manager = await User.findOne({
      where: { id: req.params.id, role: 'manager' },
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: {
        model: Manager,
        as: 'managerProfile',
        attributes: ['id', 'department', 'title']
      }
    });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    res.status(200).json(manager);
  } catch (error) {
    console.error('Error fetching manager:', error);
    res.status(500).json({ message: 'Failed to retrieve manager' });
  }
};

// Create a new manager with linked user account
const createManager = async (req, res) => {
  try {
    const { fullName, email, phone, password, department, title } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    // Create user with manager role
    const newUser = await User.create({
      fullName,
      email,
      phone,
      password,
      role: 'manager'
    });

    // Create associated manager profile
    const managerProfile = await Manager.create({
      userId: newUser.id,
      department,
      title
    });

    res.status(201).json({
      user: newUser,
      managerProfile
    });
  } catch (error) {
    console.error('Error creating manager:', error);
    res.status(400).json({ message: 'Failed to create manager', error: error.message });
  }
};

// Update manager
const updateManager = async (req, res) => {
  try {
    const { fullName, email, phone, department, title } = req.body;

    const user = await User.findOne({
      where: { id: req.params.id, role: 'manager' },
      include: {
        model: Manager,
        as: 'managerProfile'
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    await user.update({ fullName, email, phone });

    if (user.managerProfile) {
      await user.managerProfile.update({ department, title });
    }

    res.status(200).json({
      user,
      managerProfile: user.managerProfile
    });
  } catch (error) {
    console.error('Error updating manager:', error);
    res.status(400).json({ message: 'Failed to update manager', error: error.message });
  }
};

// Delete manager
const deleteManager = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: 'manager' }
    });

    if (!user) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    await user.destroy(); // Assuming cascading deletes are in place

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting manager:', error);
    res.status(500).json({ message: 'Failed to delete manager', error: error.message });
  }
};

module.exports = {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager
};
