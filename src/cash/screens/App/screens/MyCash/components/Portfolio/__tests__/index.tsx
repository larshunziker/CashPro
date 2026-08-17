import { isListingKey, isListingKeyList } from '../helpers';

describe('isListingKey', () => {
  const listingKeys = [
    { key: '231-213-1', expected: true },
    { key: '999999915312-9910014-333', expected: true },
    { key: '1-5-4', expected: true },
    { key: '', expected: false },
    { key: null, expected: false },
    { key: undefined, expected: false },
    { key: '1-5-', expected: false },
    { key: '1-5-4-', expected: false },
    { key: '1-5-4-1', expected: false },
    { key: '1-', expected: false },
    { key: '1-5', expected: false },
    { key: '-1-5-4', expected: false },
  ];

  listingKeys.forEach(({ key, expected }) => {
    it(`should return ${expected} when key is ${key}`, () => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. */
      expect(isListingKey(key)).toBe(expected);
    });
  });
});

describe('isListingKeyList', () => {
  const listingKeys = [
    { keys: '231-213-1', expected: true },
    { keys: '231-213-1,1-2-3', expected: true },
    { keys: '999-991-333,424-414-141', expected: true },
    { keys: '999-991-333,', expected: false },
    { keys: '999-991-333, 424-414-141', expected: false },
    { keys: '999-991-333,424-414-141,', expected: false },
    { keys: ' 999-991-333,424-414-141', expected: false },
    { keys: '', expected: false },
    { keys: ',', expected: false },
    { keys: null, expected: false },
    { keys: undefined, expected: false },
  ];

  listingKeys.forEach(({ keys, expected }) => {
    it(`should return ${expected} when keys are ${keys}`, () => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. */
      expect(isListingKeyList(keys)).toBe(expected);
    });
  });
});
