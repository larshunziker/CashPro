import { VIEWPORT_MD, VIEWPORT_SM, VIEWPORT_XS } from '../../actions/window';
import {
  ENTITY_QUEUE_PARAGRAPH,
  TEASER_PARAGRAPH,
} from '../../constants/paragraphs';
import {
  convertCookieToObject,
  findFirstParagraphIdByType,
  formatPrice,
  generateRandomNumber,
  getArticleDate,
  getImageAltTag,
  getObjectValueByPath,
  hashString,
  isCurrentViewportInRange,
  mapToEdgesNode,
  stringToInt,
  stripPhoneNumber,
  truncateByChars,
} from '../utils';

describe('[Function] utils ', () => {
  test.each`
    source          | result
    ${null}         | ${null}
    ${'213'}        | ${213}
    ${'21.3'}       | ${21}
    ${'Beobachter'} | ${null}
  `(
    'Should transform string $source to int correctly',
    ({ source, result }) => {
      const output = stringToInt(source);
      expect(output).toBe(result);
    },
  );

  test.each`
    input           | output
    ${'0543534543'} | ${'0543534543'}
    ${'+413534543'} | ${'413534543'}
  `('Should strip phone number $input correctly', ({ input, output }) => {
    const result = stripPhoneNumber(input);
    expect(result).toBe(output);
  });

  test.each`
    input           | output
    ${'100'}        | ${'1.–'}
    ${'2323'}       | ${'23.23'}
    ${'99'}         | ${'0.99'}
    ${'Beobachter'} | ${null}
  `('Should format price in cents $input correctly', ({ input, output }) => {
    const result = formatPrice(input);
    expect(result).toBe(output);
  });

  test.each`
    input           | output
    ${''}           | ${0}
    ${'Beobachter'} | ${1876839121}
  `('Should hash string $input correctly', ({ input, output }) => {
    const result = hashString(input);
    expect(result).toBe(output);
  });

  test.each`
    input           | limit | output
    ${'A'}          | ${6}  | ${'A'}
    ${'Beo'}        | ${12} | ${'Beo'}
    ${'Beobachter'} | ${6}  | ${'Beo...'}
  `('Should truncate string $input correctly', ({ input, limit, output }) => {
    const result = truncateByChars(input, limit, '...');
    expect(result).toBe(output);
  });

  test.each`
    input                                                                                           | output
    ${{ showUpdated: true, createDate: '2018-10-02T08:00:00', changeDate: '2019-09-04T16:47:17' }}  | ${'2019-09-04T16:47:17'}
    ${{ showUpdated: false, createDate: '2018-10-02T08:00:00', changeDate: '2019-09-04T16:47:17' }} | ${'2018-10-02T08:00:00'}
    ${{ showUpdated: false, createDate: '2018-10-02T08:00:00', changeDate: undefined }}             | ${'2018-10-02T08:00:00'}
  `('Should return correct date', ({ input, output }) => {
    const result = getArticleDate(input);
    expect(result).toBe(output);
  });

  test.each`
    input                               | path         | output
    ${{ de: '/', fr: '/fr' }}           | ${'de'}      | ${'/'}
    ${{ de: '/', fr: '/fr' }}           | ${'de'}      | ${'/'}
    ${{ de: '/', fr: '/fr' }}           | ${'fr'}      | ${'/fr'}
    ${{ de: '/', fr: '/fr' }}           | ${''}        | ${null}
    ${null}                             | ${'fr'}      | ${null}
    ${{ de: '/', fr: { word: 'mot' } }} | ${'fr.word'} | ${'mot'}
  `('Should return correct object value by path', ({ input, path, output }) => {
    const result = getObjectValueByPath(input, path);
    expect(result).toBe(output);
  });

  test.each`
    input | output
    ${{
  id: 1,
  teaserImage: {
    alt: 'image-alt',
    image: {
      ['VIEWPORT_XS']: {
        alt: 278,
      },
    },
  },
}} | ${'image-alt'}
    ${{
  id: 1,
  teaserImage: {
    image: {
      ['VIEWPORT_XS']: {
        alt: 'image-xs-alt',
      },
    },
  },
}} | ${'image-xs-alt'}
    ${{
  id: 1,
  teaserImage: {
    image: {
      ['VIEWPORT_XS']: {},
    },
  },
}} | ${''}
  `('Should get correct image alt tag $output', ({ input, output }) => {
    const result = getImageAltTag(input);
    expect(result).toBe(output);
  });

  test.each`
    input         | output
    ${['a', 'b']} | ${{ edges: [{ node: 'a' }, { node: 'b' }] }}
    ${['a']}      | ${{ edges: [{ node: 'a' }] }}
  `('Should map $input to edgesNode correctly ', ({ input, output }) => {
    const result = mapToEdgesNode(input);
    expect(result).toMatchObject(output);
  });

  test.each`
    viewport       | viewports                                  | output
    ${VIEWPORT_XS} | ${[VIEWPORT_XS, VIEWPORT_SM, VIEWPORT_MD]} | ${true}
    ${VIEWPORT_SM} | ${[VIEWPORT_XS, VIEWPORT_MD]}              | ${false}
    ${''}          | ${[VIEWPORT_XS, VIEWPORT_MD]}              | ${false}
  `(
    'Should detect if $viewport is in $viewports correctly',
    ({ viewport, viewports, output }) => {
      const result = isCurrentViewportInRange(viewport, viewports);
      expect(result).toBe(output);
    },
  );

  test.each`
    body                                                                                                              | output
    ${[{ id: '5345345', __typename: ENTITY_QUEUE_PARAGRAPH }]}                                                        | ${'5345345'}
    ${[{ id: '5345345', __typename: ENTITY_QUEUE_PARAGRAPH }, { id: '3345346', __typename: ENTITY_QUEUE_PARAGRAPH }]} | ${'5345345'}
    ${[{ id: '5345345', __typename: TEASER_PARAGRAPH }, { id: '3345346', __typename: ENTITY_QUEUE_PARAGRAPH }]}       | ${'3345346'}
    ${[{ id: '5345345', __typename: TEASER_PARAGRAPH }, { __typename: ENTITY_QUEUE_PARAGRAPH }]}                      | ${null}
    ${[]}                                                                                                             | ${null}
    ${null}                                                                                                           | ${null}
    ${[{ id: '5345345', __typename: TEASER_PARAGRAPH }]}                                                              | ${null}
  `('Should return correct paragraph id', ({ body, output }) => {
    const result = findFirstParagraphIdByType(body, ENTITY_QUEUE_PARAGRAPH);
    expect(result).toBe(output);
  });

  test.each`
    input                           | separator | output
    ${'isTest=0&isIABGlobal=false'} | ${'&'}    | ${{ isTest: '0', isIABGlobal: 'false' }}
    ${'isTest=0'}                   | ${'&'}    | ${{ isTest: '0' }}
    ${'isTest=0'}                   | ${''}     | ${{ '0': '', i: '', s: '', T: '', e: '', t: '', '': '' }}
    ${'isTest=0,isTest1=1'}         | ${','}    | ${{ isTest: '0', isTest1: '1' }}
    ${'isTest,0'}                   | ${'&'}    | ${{ 'isTest,0': '' }}
    ${'isTest=0;isIABGlobal=false'} | ${';'}    | ${{ isTest: '0', isIABGlobal: 'false' }}
  `(
    'Should convert cookie String to an Object',
    ({ input, separator, output }) => {
      const result = convertCookieToObject(input, separator);
      expect(result).toMatchObject(output);
    },
  );
});

describe('[Function] utils  generateRandomNumber', () => {
  const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
  Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: mGetRandomValues },
  });
  it('Should return a random number', () => {
    const randomNumber = generateRandomNumber(1);
    expect(randomNumber).toEqual(new Uint32Array(10));
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(typeof randomNumber[0]).toBe('number');
  });
  it('Should return null', () => {
    const randomNumberNull = generateRandomNumber(0);
    expect(randomNumberNull).toBeNull();
  });
});
