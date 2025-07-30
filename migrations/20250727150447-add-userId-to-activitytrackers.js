'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('activitytrackers', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',   // name of the users table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'   // adjust depending on your desired behavior
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('activitytrackers', 'userId');
  }
};
