'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityTracker extends Model {
    static associate(models) {
      // Activity belongs to a student
      ActivityTracker.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });

      // Activity may optionally be tied to a class
      ActivityTracker.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class'
      });
    }
  }

  ActivityTracker.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    activityType: {
      type: DataTypes.ENUM('attendance', 'submission', 'participation'),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ActivityTracker',
    tableName: 'activity_trackers',
    timestamps: true
  });

  return ActivityTracker;
};
