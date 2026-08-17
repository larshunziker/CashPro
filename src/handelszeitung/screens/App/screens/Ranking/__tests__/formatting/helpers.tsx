import { formatWealthNumber } from '../../helpers';

/**
 *  FORMAT NUMBERS
 */
describe('Ranking helpers - [FORMAT NUMBERS]', () => {
  const testValues = [
    { input: '', expected: '' },
    { input: ' ', expected: '' },
    { input: 'false', expected: 'false' },
    { input: null, expected: null },
    { input: undefined, expected: undefined },
    { input: 'undefined', expected: 'undefined' },
    { input: '5 Mio.', expected: '5 Mio.' },
    { input: `1'805 Mio.`, expected: `1'805 Mio.` },
    { input: '5000', expected: '5’000' },
    { input: 5000, expected: '5’000' },
    { input: 32000000, expected: '32 Mio.' },
    { input: 99501000000, expected: '99,5 Mrd.' },
    { input: 50000000000, expected: '50 Mrd.' },
    { input: 93453065000, expected: '93,5 Mrd.' },
    { input: 9065000, expected: '9 Mio.' },
    { input: 15500000, expected: '16 Mio.' },
    { input: 15400000, expected: '15 Mio.' },
  ];
  test.each(testValues)(
    'number should be formatted to expected values',
    ({ input, expected }) => {
      expect(formatWealthNumber(input)).toEqual(expected);
    },
  );
});
