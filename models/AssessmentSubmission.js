'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AssessmentSubmission extends Model {
    static associate(models) {
      // Submission belongs to a student
      AssessmentSubmission.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });

      // Submission belongs to an assessment
      AssessmentSubmission.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        as: 'assessment'
      });

      // Submission belongs to a course offering
      AssessmentSubmission.belongsTo(models.CourseOffering, {
        foreignKey: 'courseOfferingId',
        as: 'courseOffering'
      });
    }
  }

 AssessmentSubmission.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  assessmentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  courseOfferingId: {                   // ✅ Add this field
    type: DataTypes.UUID,
    allowNull: false
  },
  assessmentTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'AssessmentSubmission',
  tableName: 'assessment_submissions',
  timestamps: true
});


  return AssessmentSubmission;
};
