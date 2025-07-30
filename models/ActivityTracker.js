'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityTracker extends Model {
    static associate(models) {
      ActivityTracker.belongsTo(models.CourseOffering, {
        foreignKey: 'allocationId',
        as: 'allocation'
      });

      ActivityTracker.belongsTo(models.User, {      // Add association to User model
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  ActivityTracker.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    allocationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {                            // New userId column
      type: DataTypes.UUID,
      allowNull: false
    },
    attendance: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    formativeOneGrading: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    formativeTwoGrading: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    summativeGrading: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    courseModeration: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    intranetSync: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gradeBookStatus: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ActivityTracker',
    tableName: 'activitytrackers',
    timestamps: true
  });

  return ActivityTracker;
};
