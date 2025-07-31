const Queue = require('bull');
const redis = require('../redisClient');
const nodemailer = require('nodemailer');
const { User, Notification } = require('../models'); 

// For testing,
async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'hilda.farrell23@ethereal.email',
      pass: 'BTdNxFpRPJPNVdz8qY'
    }
  });
}

let transporterPromise = createTestTransporter();

// Get user email by userId from the database
async function getUserEmail(userId) {
  const user = await User.findByPk(userId);
  return user ? user.email : null;
}

async function sendEmail(userId, message) {
  const to = await getUserEmail(userId);
  if (!to) {
    throw new Error(`No email found for userId ${userId}`);
  }
  const transporter = await transporterPromise;
  let info = await transporter.sendMail({
    from: '"Course Platform" <no-reply@course-platform.test>',
    to,
    subject: 'Course Notification',
    text: message
  });
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}

const notificationQueue = new Queue('notifications', {
  redis: { host: process.env.REDIS_HOST || '127.0.0.1', port: process.env.REDIS_PORT || 6379 },
});

notificationQueue.process(async (job) => {
  const { type, userId, courseId, message } = job.data;

  console.log(`Processing notification for User ${userId}: ${message}`);

  try {
    if (type === 'email') {
      await sendEmail(userId, message);
      console.log(`Email sent to User ${userId}`);
    }
    // Save notification to DB
    await Notification.create({
      userId,
      message,
      read: false,
      courseId: courseId || null
    });
    console.log(`Notification saved to DB for User ${userId}`);
  } catch (err) {
    console.error('Error sending email or saving notification:', err);
    throw err;
  }

  return Promise.resolve();
});