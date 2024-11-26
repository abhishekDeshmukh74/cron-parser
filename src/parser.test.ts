import { CRON_FIELDS, ERROR_MESSAGES } from './configuration';
import { parseCronString } from './parser';

describe('parseCronString', () => {
  it('should throw an error for an invalid cron string with missing fields', () => {
    const invalidCronString = '*/5 * * *';
    expect(() => parseCronString(invalidCronString)).toThrowError(
      ERROR_MESSAGES.INVALID_CRON_STRING(CRON_FIELDS.length)
    );
  });

  it('should correctly parse a valid cron string with single values', () => {
    const cronString = '0 5 * * * /path/to/command';
    const parsedCron = parseCronString(cronString);

    expect(parsedCron.minute).toEqual([0]);
    expect(parsedCron.hour).toEqual([5]);
    expect(parsedCron['day of month']).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31,
    ]);
    expect(parsedCron.month).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(parsedCron['day of week']).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(parsedCron.command).toEqual('/path/to/command');
  });

  it('should correctly parse a cron string with ranges', () => {
    const cronString = '0 0-6/2 * * * /path/to/command';
    const parsedCron = parseCronString(cronString);

    expect(parsedCron.hour).toEqual([0, 2, 4, 6]);
    expect(parsedCron['day of month']).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31,
    ]);
    expect(parsedCron.command).toEqual('/path/to/command');
  });

  it('should correctly parse a cron string with steps', () => {
    const cronString = '*/5 0-23/2 * * * /path/to/command';
    const parsedCron = parseCronString(cronString);

    expect(parsedCron.minute).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    expect(parsedCron.hour).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
    expect(parsedCron.command).toEqual('/path/to/command');
  });

  it('should correctly parse a cron string with "any" character', () => {
    const cronString = '* * * * * /path/to/command';
    const parsedCron = parseCronString(cronString);

    expect(parsedCron.minute).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
      49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    ]);
    expect(parsedCron.hour).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ]);
    expect(parsedCron['day of month']).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31,
    ]);
    expect(parsedCron.month).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(parsedCron['day of week']).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(parsedCron.command).toEqual('/path/to/command');
  });

  it('should correctly parse a cron string with a list', () => {
    const cronString = '5,10,15 * * * * /path/to/command';
    const parsedCron = parseCronString(cronString);

    expect(parsedCron.minute).toEqual([5, 10, 15]);
    expect(parsedCron.command).toEqual('/path/to/command');
  });

  it('should throw an error for an invalid cron string with an invalid special character', () => {
    const invalidCronString = '*/5 * * * /invalid*character';
    expect(() => parseCronString(invalidCronString)).toThrowError(
      ERROR_MESSAGES.INVALID_CRON_STRING(CRON_FIELDS.length)
    );
  });
});
