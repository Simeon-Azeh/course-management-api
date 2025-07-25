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
const assessmentSubmissionRoutes = require('./routes/assessmentSubmissionRoutes');


// Use routes
app.use('/auth', authRoutes);
app.use('/allocations', allocationRoutes);
app.use('/activitytracker', activityTrackerRoutes);
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/modules', moduleRoutes);
app.use('/facilitators', facilitatorRoutes);
app.use('/cohorts', cohortRoutes);
app.use('/modes', modeRoutes);
app.use('/course-offerings', courseOfferingRoutes);
app.use('/attendances', attendanceRoutes);
app.use('/assessment-submissions', assessmentSubmissionRoutes);


app.get('/', (req, res) => {
  res.send('Course Management Platform API is running');
});

module.exports = app;
