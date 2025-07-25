'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mode extends Model {
    static associate(models) {
      // A mode can be associated with many classes
      Mode.hasMany(models.Class, {
        foreignKey: 'modeId',
        as: 'classes'
      });
    }
  }

  Mode.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('physical', 'online', 'hybrid'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Mode',
    tableName: 'modes',
    timestamps: true
  });

  return Mode;
};
