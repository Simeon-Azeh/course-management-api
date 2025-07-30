const { AssessmentSubmission, Student } = require('../models');

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await AssessmentSubmission.findAll({
      include: [{ model: Student, as: 'student', attributes: ['id', 'userId', 'cohortId'] }]
    });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve submissions' });
  }
};

const getSubmissionById = async (req, res) => {
  try {
    const submission = await AssessmentSubmission.findByPk(req.params.id, {
      include: [{ model: Student, as: 'student', attributes: ['id', 'userId', 'cohortId'] }]
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve submission' });
  }
};

const createSubmission = async (req, res) => {
  try {
    const {
      studentId,
      assessmentId,
      courseOfferingId,
      assessmentTitle,
      score,
      submittedAt
    } = req.body;

    const newSubmission = await AssessmentSubmission.create({
      studentId,
      assessmentId,
      courseOfferingId,
      assessmentTitle,
      score,
      submittedAt
    });

    res.status(201).json(newSubmission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create submission', error: error.message });
  }
};

const updateSubmission = async (req, res) => {
  try {
    const { studentId, assessmentTitle, score, submittedAt } = req.body;
    const submission = await AssessmentSubmission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    await submission.update({ studentId, assessmentTitle, score, submittedAt });
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update submission' });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const submission = await AssessmentSubmission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    await submission.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete submission' });
  }
};

module.exports = {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  deleteSubmission
};
