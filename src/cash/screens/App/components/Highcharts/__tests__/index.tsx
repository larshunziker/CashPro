import { formatPrice, mapTimePeriodToShortUrlFormat } from '../helpers';

describe('formatPrice', () => {
  test.each`
    item                                                    | expected
    ${{ value: '1110', type: null }}                        | ${"1'110.00"}
    ${{ value: '1110', type: 'Volume' }}                    | ${"1'110"}
    ${{ value: '1.1234', type: 'Volume' }}                  | ${'1.1234'}
    ${{ value: '1.123456789', type: 'Volume' }}             | ${'1.123456789'}
    ${{ value: 0, type: 'Value' }}                          | ${''}
    ${{ value: NaN, type: 'Value' }}                        | ${''}
    ${{ value: '', type: 'Value' }}                         | ${''}
    ${{ value: '1.125678901', type: 'Value' }}              | ${'1.13'}
    ${{ value: '1.123456789', type: 'Value' }}              | ${'1.12'}
    ${{ value: '1110', type: 'Value' }}                     | ${"1'110.00"}
    ${{ value: '1234.56789', type: 'default' }}             | ${"1'234.57"}
    ${{ value: '123.456789', type: 'default' }}             | ${'123.46'}
    ${{ value: '12.3456789', type: 'default' }}             | ${'12.35'}
    ${{ value: '1.23456789', type: 'default' }}             | ${'1.23'}
    ${{ value: '0', type: 'default' }}                      | ${'0'}
    ${{ value: '900200021.0635585', type: 'default' }}      | ${"900'200'021"}
    ${{ value: '200021.0635585', type: 'default' }}         | ${"200'021"}
    ${{ value: '900200021.0635585', type: 'EQU' }}          | ${"900'200'021"}
    ${{ value: '200021.0635585', type: 'EQU' }}             | ${"200'021"}
    ${{ value: '21.0635585', type: 'EQU' }}                 | ${'21.06'}
    ${{ value: '20.0635585', type: 'EQU' }}                 | ${'20.06'}
    ${{ value: '19.0635585', type: 'EQU' }}                 | ${'19.064'}
    ${{ value: '5.0635585', type: 'EQU' }}                  | ${'5.064'}
    ${{ value: '4.0635585', type: 'EQU' }}                  | ${'4.0636'}
    ${{ value: '1.0635585', type: 'EQU' }}                  | ${'1.0636'}
    ${{ value: '21.0635585', type: 'INT' }}                 | ${'21.0636'}
    ${{ value: '20.0635585', type: 'INT' }}                 | ${'20.0636'}
    ${{ value: '19.0635585', type: 'INT' }}                 | ${'19.0636'}
    ${{ value: '5.0635585', type: 'INT' }}                  | ${'5.0636'}
    ${{ value: '1.01', type: 'INT' }}                       | ${'1.0100'}
    ${{ value: '1.00', type: 'INT' }}                       | ${'1.0000'}
    ${{ value: '1.004', type: 'INT' }}                      | ${'1.0040'}
    ${{ value: '0', type: 'INT' }}                          | ${'0.0000'}
    ${{ value: '19.0635585', type: 'CUR' }}                 | ${'19.0636'}
    ${{ value: '1.0635585', type: 'CUR' }}                  | ${'1.0636'}
    ${{ value: '0', type: 'CUR' }}                          | ${'0.0000'}
    ${{ value: '0.123456789', type: 'CCR' }}                | ${'0.1235'}
    ${{ value: '123456.789987', type: 'CCR' }}              | ${"123'456.79"}
    ${{ value: '999.789123', type: 'CUR' }}                 | ${'999.7891'}
    ${{ value: '19.0635585', type: 'default' }}             | ${'19.06'}
    ${{ value: '1.0635585', type: 'default' }}              | ${'1.06'}
    ${{ value: '0.993456789', type: 'default' }}            | ${'0.9935'}
    ${{ value: '0.0123456789', type: 'default' }}           | ${'0.012346'}
    ${{ value: '0.00123456789', type: 'default' }}          | ${'0.001235'}
    ${{ value: '0.000123456789', type: 'default' }}         | ${'0.000123'}
    ${{ value: '0.0000123456789', type: 'default' }}        | ${'0.000012'}
    ${{ value: '0.00000123456789', type: 'default' }}       | ${'0.0000012'}
    ${{ value: '0.00000000123456789', type: 'default' }}    | ${'0.0000000012'}
    ${{ value: '2.789123', type: 'CCR' }}                   | ${'2.79'}
    ${{ value: '0.00123456789', type: 'CCR' }}              | ${'0.001235'}
    ${{ value: '0.000123456789', type: 'CCR' }}             | ${'0.000123'}
    ${{ value: '0.0000123456789', type: 'CCR' }}            | ${'0.000012'}
    ${{ value: '0.00000123456789', type: 'CCR' }}           | ${'0.0000012'}
    ${{ value: '0.00123456789', type: 'INT' }}              | ${'0.0012'}
    ${{ value: '0.000123456789', type: 'INT' }}             | ${'0.00012'}
    ${{ value: '0.0000123456789', type: 'INT' }}            | ${'0.000012'}
    ${{ value: '0.00000123456789', type: 'INT' }}           | ${'0.0000012'}
    ${{ value: '0.00000000123456789', type: 'CCR' }}        | ${'0.0000000012'}
    ${{ value: '0.00000000123456789', type: 'CCR' }}        | ${'0.0000000012'}
    ${{ value: '0.00000000123456789', type: 'FullNumber' }} | ${'0'}
    ${{ value: '0', type: 'FullNumber' }}                   | ${'0'}
    ${{ value: '-0', type: 'FullNumber' }}                  | ${'0'}
    ${{ value: '-0.1', type: 'FullNumber' }}                | ${'0'}
    ${{ value: '-0.9999', type: 'FullNumber' }}             | ${'-1'}
    ${{ value: '-0.49', type: 'FullNumber' }}               | ${'0'}
    ${{ value: '-0.5', type: 'FullNumber' }}                | ${'-1'}
    ${{ value: '0.1', type: 'FullNumber' }}                 | ${'0'}
    ${{ value: '0.9999', type: 'FullNumber' }}              | ${'1'}
    ${{ value: '0.49', type: 'FullNumber' }}                | ${'0'}
    ${{ value: '0.5', type: 'FullNumber' }}                 | ${'1'}
    ${{ value: '123.123', type: 'FullNumber' }}             | ${'123'}
    ${{ value: '-123.123', type: 'FullNumber' }}            | ${'-123'}
  `(
    'returns $expected when value is $item.value on $item.type',
    ({ item, expected }) => {
      expect(formatPrice(item.value, item.type)).toBe(expected);
    },
  );
});

describe('mapTimePeriodToShortUrlFormat', () => {
  test.each`
    item                | expected
    ${'1d'}             | ${'intraday'}
    ${'1w'}             | ${'oneWeek'}
    ${'1m'}             | ${'oneMonth'}
    ${'3m'}             | ${'threeMonths'}
    ${'6m'}             | ${'sixMonths'}
    ${'ytd'}            | ${'ytd'}
    ${'1y'}             | ${'oneYear'}
    ${'3y'}             | ${'threeYears'}
    ${'5y'}             | ${'fiveYears'}
    ${'maximum'}        | ${'analyse'}
    ${'something_else'} | ${'something_else'}
  `('returns expected value is $expected  ', ({ item, expected }) => {
    expect(mapTimePeriodToShortUrlFormat(item)).toBe(expected);
  });
});
