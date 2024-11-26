import { ParsedCron, SpecialCharEnum } from './interfaces';
import { CRON_FIELDS, ERROR_MESSAGES } from './configuration';
import { handleAny, handleStep, handleRange, handleSingleValue } from './operations';

export const parseCronString = (cronString: string): ParsedCron => {
  const parts = cronString.trim().split(' ');

  if (parts.length < CRON_FIELDS.length) {
    throw new Error(ERROR_MESSAGES.INVALID_CRON_STRING(CRON_FIELDS.length));
  }

  const parsedCron: ParsedCron = {};
  CRON_FIELDS.forEach((field, index) => {
    const { name, min, max, specials } = field;

    if (field.name === 'command') {
      parsedCron[name] = parts.slice(index).join(' ');
    } else {
      parsedCron[name] = expandField(parts[index], min, max, specials);
    }
  });

  return parsedCron;
};

const expandField = (
  field: string,
  min: number,
  max: number,
  specials: Set<SpecialCharEnum>
): number[] => {
  const result: number[] = [];

  if (specials.has(SpecialCharEnum.Any) && field === SpecialCharEnum.Any) {
    return handleAny(min, max);
  }

  const parts = field.split(SpecialCharEnum.List);

  for (const part of parts) {
    if (specials.has(SpecialCharEnum.Step) && part.includes(SpecialCharEnum.Step)) {
      const [range, stepStr] = part.split(SpecialCharEnum.Step);
      handleStep(range, stepStr, min, max).forEach((v) => result.push(v));
    } else if (specials.has(SpecialCharEnum.Range) && part.includes(SpecialCharEnum.Range)) {
      handleRange(part, min, max).forEach((v) => result.push(v));
    } else {
      handleSingleValue(part, min, max).forEach((v) => result.push(v));
    }
  }

  return result;
};
