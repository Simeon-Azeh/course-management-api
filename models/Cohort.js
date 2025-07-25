'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cohort extends Model {
    static associate(models) {
      // A cohort can have many students
      Cohort.hasMany(models.Student, {
        foreignKey: 'cohortId',
        as: 'students'
      });

      // A cohort can have many classes
      Cohort.hasMany(models.Class, {
        foreignKey: 'cohortId',
        as: 'classes'
      });

      // A cohort can have many course offerings
      Cohort.hasMany(models.CourseOffering, {
        foreignKey: 'cohortId',
        as: 'courseOfferings'
      });
    }
  }

  Cohort.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cohort',
    tableName: 'cohorts',
    timestamps: true
  });

  return Cohort;
};
