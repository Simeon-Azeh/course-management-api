const { Assessment } = require('../models');

// Create a new assessment
exports.createAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Assessment created successfully',
      data: assessment,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Failed to create assessment',
      error: err.message,
    });
  }
};

// Get all assessments
exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.findAll();
    res.status(200).json({
      status: 200,
      message: 'Assessments retrieved successfully',
      data: assessments,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve assessments',
      error: err.message,
    });
  }
};

// Get a single assessment by ID
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment) {
      return res.status(404).json({
        status: 404,
        message: 'Assessment not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Assessment retrieved successfully',
      data: assessment,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve assessment',
      error: err.message,
    });
  }
};

// Update an assessment
exports.updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment) {
      return res.status(404).json({
        status: 404,
        message: 'Assessment not found',
      });
    }
    await assessment.update(req.body);
    res.status(200).json({
      status: 200,
      message: 'Assessment updated successfully',
      data: assessment,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Failed to update assessment',
      error: err.message,
    });
  }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment) {
      return res.status(404).json({
        status: 404,
        message: 'Assessment not found',
      });
    }
    await assessment.destroy();
    res.status(204).json({
      status: 204,
      message: 'Assessment deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to delete assessment',
      error: err.message,
    });
  }

};


