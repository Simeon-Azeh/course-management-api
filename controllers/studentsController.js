const { Student, User, Cohort, Attendance, AssessmentSubmission } = require('../models');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] }
      ]
    });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve students' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] }
      ]
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve student' });
  }
};

const createStudent = async (req, res) => {
  const t = await Student.sequelize.transaction(); // use transaction
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      role = 'student', // default role
      cohortId,
      enrollmentDate,
      password, // include password here!
    } = req.body;

    // Validate required fields including password
    if (!firstName || !lastName || !email || !gender || !cohortId || !enrollmentDate || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create user (assuming password will be hashed by model hook)
    const newUser = await User.create(
      {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        gender,
        dateOfBirth,
        password,  // make sure this is passed
        role,
      },
      { transaction: t }
    );

    // Create student linked to user
    const newStudent = await Student.create(
      {
        userId: newUser.id,
        cohortId,
        enrollmentDate,
      },
      { transaction: t }
    );

    // Commit transaction
    await t.commit();

    // Fetch created student with associations
    const studentWithAssociations = await Student.findByPk(newStudent.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] },
      ],
    });

    res.status(201).json(studentWithAssociations);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(400).json({ message: 'Failed to create student', error: error.message });
  }
};



const updateStudent = async (req, res) => {
  try {
    const { userId, cohortId, enrollmentDate } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.update({ userId, cohortId, enrollmentDate });

    const updatedStudent = await Student.findByPk(student.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] }
      ]
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update student' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};

const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] },
        { model: Attendance, as: 'attendances', attributes: ['date', 'status'], limit: 10, order: [['date', 'DESC']] },
        { model: AssessmentSubmission, as: 'submissions', attributes: ['assessmentTitle', 'score', 'submittedAt'], limit: 5, order: [['submittedAt', 'DESC']] }
      ]
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve student dashboard data' });
  }
};


module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  getStudentDashboard,
  updateStudent,
  deleteStudent
};
