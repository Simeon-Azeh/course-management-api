'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Users can be facilitators managing many classes or course offerings
      User.hasMany(models.CourseOffering, {
        foreignKey: 'facilitatorId',
        as: 'facilitatedCourses'
      });

      // Optional: track login/activity
      User.hasMany(models.ActivityTracker, {
        foreignKey: 'userId',
        as: 'activities'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
  type: DataTypes.STRING,
  allowNull: false,
},
    role: {
      type: DataTypes.ENUM('manager', 'facilitator'),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  return User;
};
