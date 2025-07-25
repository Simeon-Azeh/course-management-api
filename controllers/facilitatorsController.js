const { User } = require('../models');

const getAllFacilitators = async (req, res) => {
  try {
    const facilitators = await User.findAll({
      where: { role: 'facilitator' },
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt']
    });
    res.json(facilitators);
  } catch (error) {
    console.error('Error fetching facilitators:', error);
    res.status(500).json({ message: 'Failed to retrieve facilitators' });
  }
};

const getFacilitatorById = async (req, res) => {
  try {
    const facilitator = await User.findOne({
      where: { id: req.params.id, role: 'facilitator' },
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt']
    });
    if (!facilitator) return res.status(404).json({ message: 'Facilitator not found' });
    res.json(facilitator);
  } catch (error) {
    console.error('Error fetching facilitator:', error);
    res.status(500).json({ message: 'Failed to retrieve facilitator' });
  }
};

const createFacilitator = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ message: 'Full name and email are required' });
    }

    const newFacilitator = await User.create({
      fullName,
      email,
      phone,
      role: 'facilitator'
    });
    res.status(201).json(newFacilitator);
  } catch (error) {
    console.error('Error creating facilitator:', error);
    res.status(400).json({ message: 'Failed to create facilitator' });
  }
};

const updateFacilitator = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const facilitator = await User.findOne({ where: { id: req.params.id, role: 'facilitator' } });
    if (!facilitator) return res.status(404).json({ message: 'Facilitator not found' });

    await facilitator.update({ fullName, email, phone });
    res.json(facilitator);
  } catch (error) {
    console.error('Error updating facilitator:', error);
    res.status(400).json({ message: 'Failed to update facilitator' });
  }
};

const deleteFacilitator = async (req, res) => {
  try {
    const facilitator = await User.findOne({ where: { id: req.params.id, role: 'facilitator' } });
    if (!facilitator) return res.status(404).json({ message: 'Facilitator not found' });

    await facilitator.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting facilitator:', error);
    res.status(500).json({ message: 'Failed to delete facilitator' });
  }
};

module.exports = {
  getAllFacilitators,
  getFacilitatorById,
  createFacilitator,
  updateFacilitator,
  deleteFacilitator
};
