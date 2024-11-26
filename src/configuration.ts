import { SpecialCharEnum, CronField } from './interfaces';

export const CRON_FIELDS: CronField[] = [
  {
    name: 'minute',
    min: 0,
    max: 59,
    specials: new Set<SpecialCharEnum>([
      SpecialCharEnum.Any,
      SpecialCharEnum.Range,
      SpecialCharEnum.Step,
    ]),
  },
  {
    name: 'hour',
    min: 0,
    max: 23,
    specials: new Set<SpecialCharEnum>([
      SpecialCharEnum.Any,
      SpecialCharEnum.Range,
      SpecialCharEnum.Step,
    ]),
  },
  {
    name: 'day of month',
    min: 1,
    max: 31,
    specials: new Set<SpecialCharEnum>([
      SpecialCharEnum.Any,
      SpecialCharEnum.Range,
      SpecialCharEnum.Step,
    ]),
  },
  {
    name: 'month',
    min: 1,
    max: 12,
    specials: new Set<SpecialCharEnum>([
      SpecialCharEnum.Any,
      SpecialCharEnum.Range,
      SpecialCharEnum.Step,
    ]),
  },
  {
    name: 'day of week',
    min: 0,
    max: 6,
    specials: new Set<SpecialCharEnum>([
      SpecialCharEnum.Any,
      SpecialCharEnum.Range,
      SpecialCharEnum.Step,
    ]),
  },
  {
    name: 'command',
    min: -1,
    max: -1,
    specials: new Set<SpecialCharEnum>(),
  },
];

export const ERROR_MESSAGES = {
  INVALID_STEP: (stepStr: string) => `Invalid step value: ${stepStr}`,
  INVALID_RANGE: (part: string) => `Invalid range: ${part}`,
  INVALID_VALUE: (part: string) => `Invalid value: ${part}`,
  OUT_OF_RANGE: (val: number) => `Value out of range: ${val}`,
  INVALID_CRON_STRING: (expectedFields: number) =>
    `Invalid cron string. Expected ${expectedFields} fields.`,
};
