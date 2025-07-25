'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // A student belongs to a user
      Student.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // A student belongs to a cohort
      Student.belongsTo(models.Cohort, {
        foreignKey: 'cohortId',
        as: 'cohort'
      });

      // A student may have multiple attendance records
      Student.hasMany(models.Attendance, {
        foreignKey: 'studentId',
        as: 'attendances'
      });

      // A student may submit many assessments
      Student.hasMany(models.AssessmentSubmission, {
        foreignKey: 'studentId',
        as: 'submissions'
      });
    }
  }

  Student.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cohortId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    enrollmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true
  });

  return Student;
};
