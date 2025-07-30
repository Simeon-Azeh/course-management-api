const { formatDate } = require('../../utils/date');

describe('formatDate', () => {
  it('should format a date to YYYY-MM-DD', () => {
    const result = formatDate(new Date('2025-01-15T12:00:00Z'));
    expect(result).toBe('2025-01-15');
  });
});
