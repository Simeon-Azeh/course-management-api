'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Facilitator extends Model {
    static associate(models) {
      // A facilitator belongs to a user
      Facilitator.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // A facilitator can teach multiple course offerings
      Facilitator.hasMany(models.CourseOffering, {
        foreignKey: 'facilitatorId',
        as: 'courses'
      });
    }
  }

  Facilitator.init({
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
    specialty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Facilitator',
    tableName: 'facilitators',
    timestamps: true
  });

  return Facilitator;
};
