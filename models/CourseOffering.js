'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseOffering extends Model {
    static associate(models) {
      // One course offering belongs to a module
      CourseOffering.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });

      // One course offering belongs to a cohort
      CourseOffering.belongsTo(models.Cohort, {
        foreignKey: 'cohortId',
        as: 'cohort'
      });

      // Course offering has many classes
      CourseOffering.hasMany(models.Class, {
        foreignKey: 'courseOfferingId',
        as: 'classes'
      });
    }
  }

  CourseOffering.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cohortId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CourseOffering',
    tableName: 'course_offerings',
    timestamps: true
  });

  return CourseOffering;
};
