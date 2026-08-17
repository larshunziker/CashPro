/**
 * @file   format test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-16 14:30:00
 */

import { getTelLink } from '../format';

describe('[Function] format', () => {
  it.each([
    [
      {
        tel: '044 123 12 12',
      },
    ],
    [
      {
        tel: '0041123219856',
      },
    ],
    [
      {
        tel: '+41 09 323 23 43',
      },
    ],
    [
      {
        tel: '031 321 32 54, 045 345 31 32',
      },
    ],
  ])('Should match the snapshot %#', (testData) => {
    expect(getTelLink(testData.tel)).toMatchSnapshot();
  });
});
