const db = require('../../models');
const { User, CourseOffering, ActivityTracker, Module, Cohort } = db;

describe('ActivityTracker Model', () => {
  let user, offering;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Create user dependency
    user = await User.create({
      id: '11111111-1111-1111-1111-111111111111',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password',
      role: 'student'
    });

    // Create module dependency
    await Module.create({
      id: '22c0aebf-ea4b-4045-87da-6399c6b88f45',
      title: 'Test Module',
      description: 'Module for testing',
      durationWeeks: 10
    });

    // Create cohort dependency
    await Cohort.create({
      id: 'cdd9e3d2-18e6-48ef-8226-feffddfeaf25',
      name: 'Test Cohort',
      startDate: '2026-01-01',
      endDate: '2026-12-31'
    });

    // Now create course offering with valid foreign keys
    offering = await CourseOffering.create({
      id: '44444444-4444-4444-4444-444444444444',
      moduleId: '22c0aebf-ea4b-4045-87da-6399c6b88f45', // FK to Module
      cohortId: 'cdd9e3d2-18e6-48ef-8226-feffddfeaf25', // FK to Cohort
      term: 'F1',
      academicYear: '2026',
      intakePeriod: null,
      modeId: null,
      facilitatorId: null
    });
  });

  it('should create an ActivityTracker record', async () => {
    const log = await ActivityTracker.create({
      allocationId: offering.id,
      userId: user.id,
      attendance: true,
      formativeOneGrading: 10.5,
      summativeGrading: 20,
      courseModeration: true,
      intranetSync: false,
      gradeBookStatus: 'pending'
    });

    expect(log).toBeDefined();
    expect(log.attendance).toBe(true);
    expect(log.gradeBookStatus).toBe('pending');
  });

  it('should associate with CourseOffering and User', async () => {
    const log = await ActivityTracker.findOne({ include: ['allocation', 'user'] });
    expect(log.allocation).toBeDefined();
    expect(log.user).toBeDefined();
    expect(log.user.email).toBe('test@example.com');
  });
});
