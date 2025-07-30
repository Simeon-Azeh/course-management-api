const service = require('../../services/activityTrackerService');
const { sequelize, User, CourseOffering, Module, Cohort, Mode } = require('../../models');

describe('ActivityTracker Service', () => {
  let user, offering;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Create user dependency
    user = await User.create({
      id: '33333333-3333-3333-3333-333333333333',
      fullName: 'Service User',
      email: 'service@example.com',
      password: 'secret',
      role: 'student'
    });

    // Create module dependency
    await Module.create({
      id: '22c0aebf-ea4b-4045-87da-6399c6b88f45',
      title: 'Service Module',
      description: 'Module for service test',
      durationWeeks: 8
    });

    // Create cohort dependency
    await Cohort.create({
      id: 'cdd9e3d2-18e6-48ef-8226-feffddfeaf25',
      name: 'Service Cohort',
      startDate: '2026-01-01',
      endDate: '2026-12-31'
    });

    // Create mode dependency
    await Mode.create({
      id: 'aae56820-f937-4617-a270-5c22670d0b8e',
      type: 'online',
      description: 'Online mode'
    });

    // Create facilitator user dependency
    await User.create({
      id: 'ec48e9c1-0887-4af2-8804-d4b68fc53918',
      fullName: 'Facilitator User',
      email: 'facilitator@example.com',
      password: 'secret',
      role: 'facilitator'
    });

    // Now create course offering with valid foreign keys
    offering = await CourseOffering.create({
      id: '44444444-4444-4444-4444-444444444444',
      moduleId: '22c0aebf-ea4b-4045-87da-6399c6b88f45',
      cohortId: 'cdd9e3d2-18e6-48ef-8226-feffddfeaf25',
      term: 'F1',
      academicYear: '2026',
      intakePeriod: "T1",
      modeId: 'aae56820-f937-4617-a270-5c22670d0b8e',
      facilitatorId: 'ec48e9c1-0887-4af2-8804-d4b68fc53918',
      createdAt: new Date('2025-07-27T06:01:02Z'),
      updatedAt: new Date('2025-07-27T06:01:02Z'),
    });
  });

  it('should create, fetch, update, and delete a log', async () => {
    const newLog = await service.createActivityLog({
      allocationId: offering.id,
      userId: user.id,
      attendance: true
    });

    const found = await service.getActivityLogById(newLog.id);
    expect(found).toBeDefined();
    expect(found.attendance).toBe(true);

    const updated = await service.updateActivityLog(newLog.id, { attendance: false });
    expect(updated.attendance).toBe(false);

    const deleted = await service.deleteActivityLog(newLog.id);
    expect(deleted).toBeDefined();

    await expect(service.getActivityLogById(newLog.id)).resolves.toBeNull();
  });
});
