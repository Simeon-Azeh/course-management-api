'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Testing123$', 10);
    return queryInterface.bulkInsert('users', [{
      id: require('uuid').v4(),
      fullName: 'Test User',
      email: 'testuser@example.com',
      role: 'manager',
      phone: '1234567890',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { email: 'testuser@example.com' });
  }
};
