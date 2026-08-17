/**
 * @file test object utils
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date 2019-07-29
 *
 */

import { removeEmptyKeysFromObject } from 'helpers/objectUtils';

let input1, input2, input3, input4, output1, output2, output3, output4;

beforeAll(() => {
  input1 = {
    a: 'a',
    b: null,
    c: 3,
  };
  input2 = {
    a: 'a',
    b: null,
    c: 3,
    d: {
      e: 'e',
      f: null,
      g: null,
    },
  };
  input3 = {
    a: 'a',
    b: 'b',
    c: 3,
  };
  input4 = {
    a: 'a',
    b: 'b',
    c: 3,
    d: {
      e: 'e',
      f: 'f',
      g: 7,
    },
  };
  output1 = { a: 'a', c: 3 };
  output2 = {
    a: 'a',
    c: 3,
    d: {
      e: 'e',
    },
  };
  output3 = input3;
  output4 = input4;
});

describe('[Function] removeEmptyKeysFromObject', () => {
  it('Should return objects without null attributes', () => {
    expect(removeEmptyKeysFromObject(input1)).toEqual(output1);
  });
  it('Should return objects without null attributes', () => {
    expect(removeEmptyKeysFromObject(input2)).toEqual(output2);
  });
  it('Should return objects without null attributes', () => {
    expect(removeEmptyKeysFromObject(input3)).toEqual(output3);
  });
  it('Should return objects without null attributes', () => {
    expect(removeEmptyKeysFromObject(input4)).toEqual(output4);
  });
});
