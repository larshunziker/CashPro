/**
 * @file   TestLog helper
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-09-05 15:55:23
 *
 */

export const testLog = (msg) => {
  if (__TESTING__) {
    console.log(msg); // eslint-disable-line no-console
  }
};
