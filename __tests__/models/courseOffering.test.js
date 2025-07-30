const db = require('../../models');
const { CourseOffering, Module, Cohort, User, Mode } = db;

describe('CourseOffering Model', () => {
  let moduleInstance, cohortInstance, facilitatorInstance, modeInstance;

  beforeAll(async () => {
    // Sync DB and force recreate tables
    await db.sequelize.sync({ force: true });

    // Create related instances for associations
    moduleInstance = await Module.create({
      id: '11111111-1111-1111-1111-111111111111',
      title: 'Test Module',
      description: 'Test module description',
      durationWeeks: 6,
    });

    cohortInstance = await Cohort.create({
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Test Cohort',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
    });

    facilitatorInstance = await User.create({
      id: '33333333-3333-3333-3333-333333333333',
      fullName: 'Facilitator User',
      email: 'facilitator@example.com',
      password: 'securepass',
      role: 'facilitator',
    });

    modeInstance = await Mode.create({
      id: '44444444-4444-4444-4444-444444444444',
      type: 'online',
      description: 'Online mode',
    });
  });

  it('should create a CourseOffering with required fields', async () => {
    const courseOffering = await CourseOffering.create({
      id: '55555555-5555-5555-5555-555555555555',
      moduleId: moduleInstance.id,
      cohortId: cohortInstance.id,
      term: 'Fall',
      academicYear: '2024',
      intakePeriod: 'T1',
      modeId: modeInstance.id,
      facilitatorId: facilitatorInstance.id,
    });

    expect(courseOffering).toBeDefined();
    expect(courseOffering.term).toBe('Fall');
    expect(courseOffering.academicYear).toBe('2024');
    expect(courseOffering.moduleId).toBe(moduleInstance.id);
    expect(courseOffering.cohortId).toBe(cohortInstance.id);
  });

  it('should associate CourseOffering with Module, Cohort, User (facilitator), and Mode', async () => {
    const courseOffering = await CourseOffering.findOne({
      where: { id: '55555555-5555-5555-5555-555555555555' },
      include: [
        { model: Module, as: 'module' },
        { model: Cohort, as: 'cohort' },
        { model: User, as: 'facilitator' },
        { model: Mode, as: 'mode' },
      ],
    });

    expect(courseOffering.module).toBeDefined();
    expect(courseOffering.module.title).toBe('Test Module');

    expect(courseOffering.cohort).toBeDefined();
    expect(courseOffering.cohort.name).toBe('Test Cohort');

    expect(courseOffering.facilitator).toBeDefined();
    expect(courseOffering.facilitator.email).toBe('facilitator@example.com');

    expect(courseOffering.mode).toBeDefined();
    expect(courseOffering.mode.type).toBe('online');
  });
});
