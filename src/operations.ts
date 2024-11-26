import { ERROR_MESSAGES } from './configuration';
import { SpecialCharEnum } from './interfaces';

export const handleAny = (min: number, max: number): number[] => {
  const result: number[] = [];
  for (let i = min; i <= max; i++) result.push(i);
  return result;
};

export const handleStep = (range: string, stepStr: string, min: number, max: number): number[] => {
  const result: number[] = [];
  const step = parseInt(stepStr, 10);

  if (isNaN(step) || step <= 0) throw new Error(ERROR_MESSAGES.INVALID_STEP(stepStr));

  let rangeStart = min;
  let rangeEnd = max;

  if (range !== SpecialCharEnum.Any) {
    const [start, end] = range.split(SpecialCharEnum.Range).map((v) => parseInt(v, 10));
    rangeStart = start ?? min;
    rangeEnd = end ?? max;
  }

  for (let i = rangeStart; i <= rangeEnd; i += step) {
    if (i >= min && i <= max) result.push(i);
  }

  return result;
};

export const handleRange = (part: string, min: number, max: number): number[] => {
  const result: number[] = [];
  const [startStr, endStr] = part.split(SpecialCharEnum.Range);
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);

  if (isNaN(start) || isNaN(end)) throw new Error(ERROR_MESSAGES.INVALID_RANGE(part));
  if (start < min || end > max || start > end) throw new Error(ERROR_MESSAGES.INVALID_RANGE(part));

  for (let i = start; i <= end; i++) {
    if (i >= min && i <= max) result.push(i);
  }

  return result;
};

export const handleSingleValue = (part: string, min: number, max: number): number[] => {
  const result: number[] = [];
  const val = parseInt(part, 10);

  if (isNaN(val)) throw new Error(ERROR_MESSAGES.INVALID_VALUE(part));
  if (val >= min && val <= max) {
    result.push(val);
  } else {
    throw new Error(ERROR_MESSAGES.OUT_OF_RANGE(val));
  }

  return result;
};
