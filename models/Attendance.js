'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      // An attendance record belongs to a student
      Attendance.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });
    }
  }

  Attendance.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
    timestamps: true
  });

  return Attendance;
};
