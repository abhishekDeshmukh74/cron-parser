import { handleAny, handleStep, handleRange, handleSingleValue } from './operations';
import { ERROR_MESSAGES } from './configuration';

describe('operations.test', () => {
  describe('handleAny', () => {
    it('should return all values in the given range', () => {
      expect(handleAny(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array when min and max are equal', () => {
      expect(handleAny(3, 3)).toEqual([3]);
    });
  });

  describe('handleStep', () => {
    it('should return values in the range with the given step', () => {
      expect(handleStep('*', '2', 1, 10)).toEqual([1, 3, 5, 7, 9]);
    });

    it('should throw an error for invalid step value', () => {
      expect(() => handleStep('*', 'abc', 1, 10)).toThrow(ERROR_MESSAGES.INVALID_STEP('abc'));
    });

    it('should return stepped values for a valid range', () => {
      expect(handleStep('2-8', '3', 1, 10)).toEqual([2, 5, 8]);
    });

    it('should throw an error when step is non-positive', () => {
      expect(() => handleStep('*', '0', 1, 10)).toThrow(ERROR_MESSAGES.INVALID_STEP('0'));
    });
  });

  describe('handleRange', () => {
    it('should return all values in the given range', () => {
      expect(handleRange('3-6', 1, 10)).toEqual([3, 4, 5, 6]);
    });

    it('should throw an error for invalid range values', () => {
      expect(() => handleRange('abc-5', 1, 10)).toThrow(ERROR_MESSAGES.INVALID_RANGE('abc-5'));
    });

    it('should handle range values at the boundaries', () => {
      expect(handleRange('1-10', 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should throw an error when range exceeds boundaries', () => {
      expect(() => handleRange('11-15', 1, 10)).toThrow(ERROR_MESSAGES.INVALID_RANGE('11-15'));
    });
  });

  describe('handleSingleValue', () => {
    it('should return the single value if within the range', () => {
      expect(handleSingleValue('5', 1, 10)).toEqual([5]);
    });

    it('should throw an error if the value is out of range', () => {
      expect(() => handleSingleValue('15', 1, 10)).toThrow(ERROR_MESSAGES.OUT_OF_RANGE(15));
    });

    it('should throw an error for invalid value', () => {
      expect(() => handleSingleValue('abc', 1, 10)).toThrow(ERROR_MESSAGES.INVALID_VALUE('abc'));
    });

    it('should handle boundary values', () => {
      expect(handleSingleValue('1', 1, 10)).toEqual([1]);
      expect(handleSingleValue('10', 1, 10)).toEqual([10]);
    });
  });
});
