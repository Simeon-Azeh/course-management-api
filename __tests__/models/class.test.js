const db = require('../../models');
const { Class, Module, Cohort, User, Mode, CourseOffering } = db;

describe('Class Model', () => {
  let moduleInstance, cohortInstance, facilitatorInstance, modeInstance, courseOfferingInstance;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Create required foreign key dependencies
    moduleInstance = await Module.create({
      id: 'fb98d4e2-f28b-46fb-8292-28280d2b9435',
      title: 'Backend Development',
      description: 'Covers Node.js and Express',
        durationWeeks: 10
    });

    cohortInstance = await Cohort.create({
      id: 'cdd9e3d2-18e6-48ef-8226-feffddfeaf25',
      name: 'Cohort 1',
      startDate: '2025-06-01',
      endDate: '2025-12-01',
    });

    facilitatorInstance = await User.create({
      id: 'fb017301-0882-46b2-9989-67b12c0802b0',
      fullName: 'Facilitator User',
      email: 'facilitator@example.com',
      role: 'facilitator',
      password: 'hashedpassword',
    });

    modeInstance = await Mode.create({
    id: '44444444-4444-4444-4444-444444444444',
      type: 'online',
      description: 'Online mode',
    });

    courseOfferingInstance = await CourseOffering.create({
      id: '403fdf65-a54a-4c95-8655-82e01363ed3f',
      title: 'Fullstack Bootcamp',
      description: 'Intensive 6-month program',
      startDate: '2025-06-01',
      endDate: '2025-12-01',
        moduleId: moduleInstance.id,
        cohortId: cohortInstance.id,
        facilitatorId: facilitatorInstance.id,
        modeId: modeInstance.id,
        term: 'F1',
        academicYear: '2025',
        intakePeriod: 'T1',
        
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('should create a full Class successfully with all fields', async () => {
    const mockClass = await Class.create({
      id: 'e7edf5b2-5b39-4db8-88d1-37ce022fd7f9',
      topic: 'Navigating nodejs with Js',
      date: '2025-07-29',
      time: '05:50:16',
      durationMinutes: 90,
      moduleId: moduleInstance.id,
      cohortId: cohortInstance.id,
      facilitatorId: facilitatorInstance.id,
      modeId: modeInstance.id,
      courseOfferingId: courseOfferingInstance.id
    });

    expect(mockClass).toHaveProperty('id', 'e7edf5b2-5b39-4db8-88d1-37ce022fd7f9');
    expect(mockClass.topic).toBe('Navigating nodejs with Js');
    expect(mockClass.durationMinutes).toBe(90);
    expect(mockClass.moduleId).toBe(moduleInstance.id);
    expect(mockClass.cohortId).toBe(cohortInstance.id);
    expect(mockClass.facilitatorId).toBe(facilitatorInstance.id);
    expect(mockClass.modeId).toBe(modeInstance.id);
    expect(mockClass.courseOfferingId).toBe(courseOfferingInstance.id);
    expect(mockClass.createdAt).toBeTruthy();
    expect(mockClass.updatedAt).toBeTruthy();
  });
});
