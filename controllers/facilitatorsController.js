const { User, Facilitator } = require('../models');

const getAllFacilitators = async (req, res) => {
  try {
    const facilitators = await User.findAll({
      where: { role: 'facilitator' },
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: {
        model: Facilitator,
        as: 'facilitatorProfile',
        attributes: ['id', 'specialty', 'bio']
      }
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
      attributes: ['id', 'fullName', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: {
        model: Facilitator,
        as: 'facilitatorProfile',
        attributes: ['id', 'specialty', 'bio']
      }
    });

    if (!facilitator) {
      return res.status(404).json({ message: 'Facilitator not found' });
    }

    res.json(facilitator);
  } catch (error) {
    console.error('Error fetching facilitator:', error);
    res.status(500).json({ message: 'Failed to retrieve facilitator' });
  }
};

const createFacilitator = async (req, res) => {
  try {
    const { fullName, email, phone, password, specialty, bio } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    // Create the user with role = facilitator
    const newUser = await User.create({
      fullName,
      email,
      phone,
      password,
      role: 'facilitator'
    });

    // Create associated facilitator profile
    const facilitatorProfile = await Facilitator.create({
      userId: newUser.id,
      specialty,
      bio
    });

    res.status(201).json({
      user: newUser,
      facilitatorProfile
    });
  } catch (error) {
    console.error('Error creating facilitator:', error);
    res.status(400).json({ message: 'Failed to create facilitator' });
  }
};

const updateFacilitator = async (req, res) => {
  try {
    const { fullName, email, phone, specialty, bio } = req.body;

    const user = await User.findOne({
      where: { id: req.params.id, role: 'facilitator' },
      include: {
        model: Facilitator,
        as: 'facilitatorProfile'
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Facilitator not found' });
    }

    await user.update({ fullName, email, phone });

    if (user.facilitatorProfile) {
      await user.facilitatorProfile.update({ specialty, bio });
    }

    res.json({
      user,
      facilitatorProfile: user.facilitatorProfile
    });
  } catch (error) {
    console.error('Error updating facilitator:', error);
    res.status(400).json({ message: 'Failed to update facilitator' });
  }
};

const deleteFacilitator = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: 'facilitator' }
    });

    if (!user) {
      return res.status(404).json({ message: 'Facilitator not found' });
    }

    await user.destroy(); // Cascade will delete the facilitatorProfile due to `onDelete: 'CASCADE'`

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
