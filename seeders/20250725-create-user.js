'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE email = 'testuser@example.com';`
    );

    if (existingUsers[0].length === 0) {
      const hashedPassword = await bcrypt.hash('Testing123$', 10);
      return queryInterface.bulkInsert('users', [{
        id: uuidv4(),
        fullName: 'Test User',
        email: 'testuser@example.com',
        role: 'manager',
        phone: '1234567890',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    } else {
      console.log("User already exists, skipping seeding.");
      return;
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { email: 'testuser@example.com' });
  }
};
