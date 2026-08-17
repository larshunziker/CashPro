/**
 * @file   SubscribeButton helper test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-10-22 13:59:56
 */

import { getAlertItemTypeByTypename } from '../helper';

describe('[Common] SubscribeButton helper', () => {
  it.each([
    [{ typename: 'Keyword', expected: 'term' }],
    [{ typename: 'Person', expected: 'node' }],
    [{ typename: 'Organisation', expected: 'node' }],
    [{ typename: 'Image', expected: 'node' }],
    [{ typename: '', expected: 'node' }],
    [{ typename: null, expected: 'node' }],
  ])('Should return the correct typename $#', (testCase) => {
    expect(getAlertItemTypeByTypename(testCase.typename)).toEqual(
      testCase.expected,
    );
  });
});
