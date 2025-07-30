module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('quiz', 'assignment'),
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    courseOfferingId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'Assessments',
    timestamps: true
  });

  Assessment.associate = (models) => {
    Assessment.belongsTo(models.CourseOffering, {
      foreignKey: 'courseOfferingId',
      as: 'courseOffering'
    });
  };

  return Assessment;
};