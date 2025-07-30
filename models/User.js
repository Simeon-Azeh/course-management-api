'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
     
      User.hasMany(models.CourseOffering, {
        foreignKey: 'facilitatorId',
        as: 'facilitatedCourses'
      });

      
      User.hasMany(models.ActivityTracker, {
        foreignKey: 'userId',
        as: 'activities'
      });
      User.hasOne(models.Student, {
        foreignKey: 'userId',
        as: 'studentProfile'
      });

      User.hasOne(models.Facilitator, {
        foreignKey: 'userId',
        as: 'facilitatorProfile'
      });

      User.hasOne(models.Manager, {
        foreignKey: 'userId',
        as: 'managerProfile'
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
      type: DataTypes.ENUM('manager', 'facilitator', 'student'),
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
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });

  // Hash password before creating user
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // Hash password before updating user if password is changed
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return User;
};