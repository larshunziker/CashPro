import { ensureAutoUpdateData, getFilteredInstrumentKeys } from '../index';
import mockData from './mockData.json';

describe('AutoUpdateProvider - ensureAutoUpdateData', () => {
  test('should return no data', () => {
    // @ts-ignore
    expect(ensureAutoUpdateData({})).toEqual({});
  });

  test('should return correct ensured auto update data', () => {
    expect(
      // @ts-ignore
      ensureAutoUpdateData([
        // @ts-ignore
        { node: { instrumentKey: '123-4-1', currentPrice: '3' } },
        // @ts-ignore
        { node: { instrumentKey: '555-4-1', amount: '5' } },
      ]),
    ).toEqual({
      '123-4-1': {
        currentPrice: '3',
        instrumentKey: '123-4-1',
      },
      '555-4-1': {
        amount: '5',
        instrumentKey: '555-4-1',
      },
    });
  });

  test('should return no ensured auto update data if there is none', () => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'QuoteListEdge[]'. */
    expect(ensureAutoUpdateData(null)).toEqual({});
  });

  test('should return filtered list array for market open', () => {
    expect(
      getFilteredInstrumentKeys([
        { listingKey: '123-4-1', isMarketOpen: true },
        { listingKey: '994712-4-1', isMarketOpen: true, constituents: false },
        { listingKey: '994712-333-1', isMarketOpen: false },
      ]),
    ).toEqual(['123-4-1', '994712-4-1']);
  });

  test('should return filtered list array for market open without constituents', () => {
    expect(
      getFilteredInstrumentKeys([
        { listingKey: '123-4-1', isMarketOpen: true },
        { listingKey: '994712-4-1', isMarketOpen: true, constituents: true },
        { listingKey: '994712-333-1', isMarketOpen: true },
      ]),
    ).toEqual(['123-4-1', '994712-333-1']);
  });

  test('should return filtered list array for market closed without constituents', () => {
    expect(
      getFilteredInstrumentKeys(
        [
          { listingKey: '123-4-1', isMarketOpen: true },
          {
            listingKey: '994712-4-1',
            isMarketOpen: false,
            constituents: false,
          },
          { listingKey: '994712-333-1', isMarketOpen: false },
        ],
        false,
      ),
    ).toEqual(['994712-333-1', '994712-4-1']);
  });

  test('should return filtered list array for market closed without constituents', () => {
    const data = [
      ...mockData.mockInstrumentKeysAnonymous,
      ...mockData.mockInstrumentKeysCustom,
    ];
    expect(getFilteredInstrumentKeys(data, false)).toMatchSnapshot();
  });
});

describe('AutoUpdateProvider - getFilteredInstrumentKeys stability', () => {
  // Regression guard for the market-data auto-update request flood:
  // the returned keys are joined into the `listingKeys` Apollo query variable.
  // If the result order depended on the insertion order of the redux state,
  // every reordering would change the variable and make Apollo cancel and
  // refire the polling queries. The helper must therefore be deterministic
  // and order-independent.

  test('returns the same sorted result regardless of input order', () => {
    const ascendingInput = getFilteredInstrumentKeys([
      { listingKey: '123-4-1', isMarketOpen: true },
      { listingKey: '456-4-1', isMarketOpen: true },
      { listingKey: '789-4-1', isMarketOpen: true },
    ]);

    const shuffledInput = getFilteredInstrumentKeys([
      { listingKey: '789-4-1', isMarketOpen: true },
      { listingKey: '123-4-1', isMarketOpen: true },
      { listingKey: '456-4-1', isMarketOpen: true },
    ]);

    expect(shuffledInput).toEqual(['123-4-1', '456-4-1', '789-4-1']);
    expect(shuffledInput).toEqual(ascendingInput);
  });

  test('removes duplicates and keeps the joined query variable stable across orderings', () => {
    const result = getFilteredInstrumentKeys([
      { listingKey: '789-4-1', isMarketOpen: true },
      { listingKey: '123-4-1', isMarketOpen: true },
      { listingKey: '789-4-1', isMarketOpen: true },
      { listingKey: '456-4-1', isMarketOpen: true },
    ]);

    expect(result).toEqual(['123-4-1', '456-4-1', '789-4-1']);

    const sameInstrumentsDifferentOrder = getFilteredInstrumentKeys([
      { listingKey: '456-4-1', isMarketOpen: true },
      { listingKey: '789-4-1', isMarketOpen: true },
      { listingKey: '123-4-1', isMarketOpen: true },
    ]);

    // The joined value is what ends up as the Apollo query variable; it must be
    // identical so the polling queries are not cancelled and refired.
    expect(result.join(',')).toBe(sameInstrumentsDifferentOrder.join(','));
  });
});
