const { Attendance, Student } = require('../models');

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      include: [{ model: Student, as: 'student', attributes: ['id', 'userId', 'cohortId'] }]
    });
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendances' });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id, {
      include: [{ model: Student, as: 'student', attributes: ['id', 'userId', 'cohortId'] }]
    });
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance' });
  }
};

const createAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    const newAttendance = await Attendance.create({ studentId, date, status });
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create attendance' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });

    await attendance.update({ studentId, date, status });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update attendance' });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });

    await attendance.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete attendance' });
  }
};

module.exports = {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
};
