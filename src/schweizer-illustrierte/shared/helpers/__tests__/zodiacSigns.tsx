import { getZodiacSign, getZodiacSignIcon } from '../zodiacSigns';

describe('[SHARED] helpers - zodiacSigns', () => {
  test.each([
    [{ slug: 'widder', expectedId: 1 }],
    [{ slug: 'stier', expectedId: 2 }],
    [{ slug: 'zwillinge', expectedId: 3 }],
    [{ slug: 'krebs', expectedId: 4 }],
    [{ slug: 'lowe', expectedId: 5 }],
    [{ slug: 'jungfrau', expectedId: 6 }],
    [{ slug: 'waage', expectedId: 7 }],
    [{ slug: 'skorpion', expectedId: 8 }],
    [{ slug: 'schutze', expectedId: 9 }],
    [{ slug: 'steinbock', expectedId: 10 }],
    [{ slug: 'wassermann', expectedId: 11 }],
    [{ slug: 'fische', expectedId: 12 }],
  ])('Should return properly id of zodiac sign', (config) => {
    const zodiacSign = getZodiacSign(config.slug);

    expect(zodiacSign).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(zodiacSign.id).toEqual(config.expectedId);
  });

  test('Should generate icon name from zodiac sign', () => {
    const zodiacSign = {
      id: 11,
      title: 'Wassermann',
      slug: 'wassermann',
    };

    expect(getZodiacSignIcon(zodiacSign.slug)).toEqual('Wassermann');
  });
});
