/**
 * @file   parseSearchQuery test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-02-18 09:13:20
 *
 */

import { parseSearchQuery } from '../parseSearchQuery';

describe('[Function] parseSearchQuery', () => {
  test.each`
    input                                  | output
    ${''}                                  | ${{}}
    ${null}                                | ${{}}
    ${[]}                                  | ${{}}
    ${'?test=hallo'}                       | ${{ test: 'hallo' }}
    ${'?search=royals&sort=newest&page=2'} | ${{ page: '2', search: 'royals', sort: 'newest' }}
    ${'search=royals&sort=newest&page=2'}  | ${{ page: '2', search: 'royals', sort: 'newest' }}
  `('should parse searchQuery "$input" correctly', ({ input, output }) => {
    expect(parseSearchQuery(input)).toEqual(output);
  });
});
