'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate(models) {
      // A manager belongs to a user
      Manager.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

  
    }
  }

  Manager.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Manager',
    tableName: 'managers',
    timestamps: true
  });

  return Manager;
};
