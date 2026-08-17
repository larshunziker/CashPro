/**
 * @file   truncateInBetween test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-05-17 09:23:24
 */

import { truncateInBetween } from 'helpers/utils';

describe('[Function] truncateInBetween', () => {
  it.each([
    { text: 'tagesanzeiger.ch', textMaxLength: 16 },
    { text: 'blog.tagesanzeiger.ch', textMaxLength: 16 },
    {
      text: 'blog.tagesanzeiger.ch',
      textMaxLength: 16,
      slicePosStart: 5,
      slicePosEnd: 8,
    },
    { text: 'wettbewerbsforumschweiz.ch' },
    { text: 'wettbewerbsforumschweiz.ch', textMaxLength: 30 },
    { text: 'forum.beobachter.ch', textMaxLength: 16 },
    { text: 'forum.beobachter.ch', textMaxLength: 16, separator: '-' },
    { text: 'ringieraxelspringer.ch' },
    { text: 'ringieraxelspringer.ch', textMaxLength: 18 },
    { text: 'schweizer-illustrierte.ch', textMaxLength: 16 },
  ])('Should return the correctly truncated text', (testCase) => {
    expect(truncateInBetween(testCase)).toMatchSnapshot();
  });
});
