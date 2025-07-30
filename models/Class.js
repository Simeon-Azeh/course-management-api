'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      // A class belongs to one module
      Class.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module'
      });

      // A class belongs to one cohort
      Class.belongsTo(models.Cohort, {
        foreignKey: 'cohortId',
        as: 'cohort'
      });

      // A class is handled by one facilitator (User)
      Class.belongsTo(models.User, {
        foreignKey: 'facilitatorId',
        as: 'facilitator'
      });

      Class.belongsTo(models.Mode, {
        foreignKey: 'modeId',
        as: 'mode'
      });
    }
  }

  Class.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cohortId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    facilitatorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    modeId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    courseOfferingId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'classes',
    timestamps: true
  });

  return Class;
};