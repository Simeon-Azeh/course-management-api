const db = require('../models');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

test('dummy test to prevent empty test suite error', () => {
  expect(true).toBe(true);
});
