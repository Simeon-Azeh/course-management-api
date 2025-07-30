'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create a demo user with role 'student' (if not exists)
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'student.demo@example.com' LIMIT 1;`
    );

    let userId;
    if (existingUsers.length === 0) {
      const hashedPassword = await bcrypt.hash('DemoPass123!', 10);
      userId = uuidv4();
      await queryInterface.bulkInsert('users', [{
        id: userId,
        fullName: 'Demo Student',
        email: 'student.demo@example.com',
        role: 'student',
        phone: '0000000000',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    } else {
      userId = existingUsers[0].id;
    }

    // 2. Find an existing cohort (just take the first one)
    const [cohorts] = await queryInterface.sequelize.query(
      `SELECT id FROM cohorts LIMIT 1;`
    );

    if (cohorts.length === 0) {
      console.log('No cohorts found. Please seed cohorts first.');
      return;
    }
    const cohortId = cohorts[0].id;

    // 3. Check if student already exists for this user and cohort
    const [existingStudents] = await queryInterface.sequelize.query(
      `SELECT id FROM students WHERE userId = '${userId}' AND cohortId = '${cohortId}' LIMIT 1;`
    );

    // 4. Insert into students table if not exists
    if (existingStudents.length === 0) {
      await queryInterface.bulkInsert('students', [{
        id: uuidv4(),
        userId,
        cohortId,
        enrollmentDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    } else {
      console.log('Student record already exists for this user and cohort.');
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete the demo student and user

    // Get user id of demo student
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'student.demo@example.com' LIMIT 1;`
    );
    if (users.length === 0) return;

    const userId = users[0].id;

    // Delete student linked to this user
    await queryInterface.bulkDelete('students', { userId });

    // Delete demo user
    await queryInterface.bulkDelete('users', { id: userId });
  }
};
