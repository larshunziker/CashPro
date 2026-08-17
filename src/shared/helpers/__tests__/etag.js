/**
 * @file   etag test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-16 14:30:00
 */

import etag from '../etag';

describe('[Function] etag', () => {
  it.each([
    [
      {
        entityLength: 55,
        lastModified: 'Mon, 16 Sep 2019 13:06:02 GMT',
      },
    ],
    [
      {
        entityLength: 1,
        lastModified: 'Wed, 11 Dec 2019 23:00:00 GMT',
      },
    ],
  ])('Should match the snapshot %#', (testData) => {
    expect(etag(testData.lastModified)).toMatchSnapshot();
  });
});
