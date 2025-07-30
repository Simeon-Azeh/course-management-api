const { Student, Attendance, AssessmentSubmission } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using authenticated user info

    // Find the student linked to the user
    const student = await Student.findOne({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get today's attendance
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const attendance = await Attendance.findOne({
      where: {
        studentId: student.id,
        date: today
      }
    });

    // Get recent 5 assessment submissions
    const submissions = await AssessmentSubmission.findAll({
      where: { studentId: student.id },
      order: [['submittedAt', 'DESC']],
      limit: 5
    });

    return res.json({
      attendance: attendance ? attendance.status : 'not marked',
      recentSubmissions: submissions.map(sub => ({
        title: sub.assessmentTitle,
        score: sub.score,
        submittedAt: sub.submittedAt
      }))
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
