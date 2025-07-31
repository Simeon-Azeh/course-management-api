const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const activityTrackerRoutes = require('./routes/activityTrackerRoutes');
const classRoutes = require('./routes/classRoutes');
const studentRoutes = require('./routes/students');
const moduleRoutes = require('./routes/modules');
const facilitatorRoutes = require('./routes/facilitators');
const cohortRoutes = require('./routes/cohorts');
const modeRoutes = require('./routes/modes');
const courseOfferingRoutes = require('./routes/courseOfferingRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const assessmentSubmissionRoutes = require('./routes/assessmentSubmissionRoutes');
const managerRoutes = require('./routes/manager');
const notificationRoutes = require('./routes/notificationRoutes');


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/activitytracker', activityTrackerRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/facilitators', facilitatorRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/modes', modeRoutes);
app.use('/api/courseofferings', courseOfferingRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/assessmentsubmissions', assessmentSubmissionRoutes);
app.use('/api/notifications', notificationRoutes);


app.get('/', (req, res) => {
  res.send('Course Management Platform API is running');
});

module.exports = app;
