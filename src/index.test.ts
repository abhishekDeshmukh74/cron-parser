import { formatParsedCron } from './index';
import { CRON_FIELDS } from './configuration';

describe('formatParsedCron', () => {
  it('should format a parsed cron object into a string', () => {
    const parsedCron = {
      minute: [0, 15, 30, 45],
      hour: [0],
      'day of month': [1, 15],
      month: [1, 2, 3, 4, 5, 6],
      'day of week': [1, 2, 3, 4, 5],
      command: '/usr/bin/find',
    };

    const expectedOutput = `
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6
day of week   1 2 3 4 5
command       /usr/bin/find
    `.trim();

    expect(formatParsedCron(parsedCron)).toBe(expectedOutput);
  });

  it('should correctly align fields when values are varied in length', () => {
    const parsedCron = {
      minute: [5],
      hour: [0],
      'day of month': [1],
      month: [12],
      'day of week': [0],
      command: '/bin/echo',
    };

    const expectedOutput = `
minute        5
hour          0
day of month  1
month         12
day of week   0
command       /bin/echo
    `.trim();

    expect(formatParsedCron(parsedCron)).toBe(expectedOutput);
  });
});
