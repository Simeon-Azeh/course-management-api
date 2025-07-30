const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Facilitator, Manager } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, fullName: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

const register = async (req, res) => {
  const { fullName, email, password, role, phone, specialty, bio, department, title } = req.body;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ fullName, email, password, role, phone });

    // Create role-specific profile
    if (role === 'facilitator') {
      await Facilitator.create({
        userId: user.id,
        specialty: specialty || null,
        bio: bio || null
      });
    } else if (role === 'manager') {
      await Manager.create({
        userId: user.id,
        department: department || null,
        title: title || null
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

module.exports = { login, register };
