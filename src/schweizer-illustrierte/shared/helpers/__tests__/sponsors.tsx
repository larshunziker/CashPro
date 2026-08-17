import { getSponsor } from '../sponsors';

describe('[SHARED] helpers - sponsors', () => {
  test.each([[{ name: 'Volvo' }], [{ name: 'Dyson' }], [{ name: 'Toyota' }]])(
    'Should return correct sponsors',
    (config) => {
      const sponsor = getSponsor(config.name);

      expect(sponsor).not.toBeNull();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      expect(sponsor.name).toEqual(config.name);
    },
  );

  test('Should return null if sponsor cannot be find', () => {
    expect(getSponsor('test')).toBeNull();
  });
});
