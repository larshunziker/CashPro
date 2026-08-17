/**
 * @file test guid helper
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date 2019-05-10
 *
 */

import guid from '../guid';

it('Should match the provided regular expression', () => {
  const guidRegExp = new RegExp(
    '({){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(}){0,1}',
  );
  const testGuids = [guid(), guid(), guid(), guid(), guid()];
  testGuids.forEach((testGuid) =>
    expect(guidRegExp.test(testGuid)).toEqual(true),
  );
});
