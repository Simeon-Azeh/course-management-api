const { Student, User, Cohort } = require('../models');

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
  try {
    const { userId, cohortId, enrollmentDate } = req.body;
    if (!userId || !cohortId || !enrollmentDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newStudent = await Student.create({ userId, cohortId, enrollmentDate });
    // Fetch again with associations for response
    const studentWithAssociations = await Student.findByPk(newStudent.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] },
        { model: Cohort, as: 'cohort', attributes: ['id', 'name'] }
      ]
    });
    res.status(201).json(studentWithAssociations);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create student' });
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

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
