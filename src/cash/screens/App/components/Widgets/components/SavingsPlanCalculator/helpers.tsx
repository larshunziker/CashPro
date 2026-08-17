import { replaceAll } from '../../../../../../../shared/helpers/replaceAll';
import { formatPrice } from '../../../Highcharts/helpers';

export const format = (val: string | number, roundingDigits = 2) => {
  const numeric = getNumericValue(val);
  if (roundingDigits === 2) return numeric > 0 ? formatPrice(numeric) : '0.00';
  if (roundingDigits === 1) return Math.round(100 * numeric) / 100;
  if (roundingDigits === 0) return Math.round(numeric);
};

export const getNumericValue = (val: string | number) => {
  if (!val) return 0;
  if (typeof val === 'number') return val;

  const newVal = replaceAll(
    // first replace commas with points, apostrophes with single quotes
    replaceAll(replaceAll(val, `’`, `'`), ',', '.'),
    // then remove all charactors that are not numbers or points
    /[^0-9.]/g,
    '',
  );
  return parseFloat(newVal);
};
