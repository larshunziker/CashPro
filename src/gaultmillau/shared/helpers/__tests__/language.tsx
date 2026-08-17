import { isFrenchRoute } from '../language';

describe('[HELPER] language', () => {
  test.each`
    pathname           | result
    ${'/fr/'}          | ${true}
    ${'/fr'}           | ${true}
    ${'/fr?q=test'}    | ${true}
    ${'/pop'}          | ${false}
    ${'/pop/fribourg'} | ${false}
  `(
    'Should detect pathname $pathname as frenchroute $result',
    ({ pathname, result }) => {
      expect(isFrenchRoute(pathname)).toBe(result);
    },
  );
});
