const bcrypt = require('bcrypt');
const db = require('../../models'); 

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

describe('User Model', () => {
  test('should hash password before saving', async () => {
    const user = await db.User.create({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'plainpassword',
      role: 'student'
    });

    expect(user.password).not.toBe('plainpassword');
    const isMatch = await bcrypt.compare('plainpassword', user.password);
    expect(isMatch).toBe(true);
  });

  test('should create a user with associated role', async () => {
    const user = await db.User.create({
      fullName: 'Facilitator Joe',
      email: 'joe@example.com',
      password: 'pass123',
      role: 'facilitator'
    });

    expect(user.fullName).toBe('Facilitator Joe');
    expect(user.role).toBe('facilitator');
  });
});
