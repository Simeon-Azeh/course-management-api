'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cohorts', 'startDate', {
      type: Sequelize.DATE,
      allowNull: true, // or false if required
    });
    await queryInterface.addColumn('cohorts', 'endDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cohorts', 'startDate');
    await queryInterface.removeColumn('cohorts', 'endDate');
  },
};
