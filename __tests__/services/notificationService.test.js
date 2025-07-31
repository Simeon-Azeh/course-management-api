const { queueNotification } = require('../../services/notificationService');
const notificationQueue = require('../../queues/notificationQueue');

describe('Notification Service', () => {
  it('should add a notification job to the queue', async () => {
    const result = await queueNotification({
      type: 'email',
      userId: '49cbbc1c-9b7a-424a-a52b-01c535465d14',
      courseId: 101,
      message: 'Jest test notification!'
    });
    expect(result).toBeDefined();
  });

  afterAll(async () => {
    await notificationQueue.close(); 
  });
});