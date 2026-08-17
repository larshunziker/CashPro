import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../ShortTitle';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_JOURNALISTIC,
  ORGANIZATION_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../../../../shared/constants/content';
import {
  ARTICLE_TYPE_BLOG_A,
  ARTICLE_TYPE_BLOG_B,
  ARTICLE_TYPE_BLOG_C,
  ARTICLE_TYPE_BLOG_D,
  ARTICLE_TYPE_BLOG_E,
  ARTICLE_TYPE_BLOG_F,
  ARTICLE_TYPE_BLOG_G,
  ARTICLE_TYPE_BLOG_H,
  ARTICLE_TYPE_BLOG_I,
  ARTICLE_TYPE_BLOG_J,
  ARTICLE_TYPE_BLOG_K,
  ARTICLE_TYPE_BLOG_L,
  ARTICLE_TYPE_BLOG_M,
  ARTICLE_TYPE_BLOG_N,
  ARTICLE_TYPE_BLOG_O,
  ARTICLE_TYPE_BLOG_P,
  ARTICLE_TYPE_BLOG_Q,
} from '../../../../../../constants';
import { ORGANIZATION_TYPE_POP } from '../../../../../../screens/PopRestaurants/constants';

jest.mock(
  '../../../../../../screens/Organization/components/RestaurantRanking',
  () => {
    return () => {
      return null;
    };
  },
);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialState = { settings: { language: 'de' } };
  initialProps = {
    __typename: ARTICLE_CONTENT_TYPE,
    subtypeValue: ARTICLE_TYPE_BLOG_D,
    title: 'Title',
    preferredUri: '/uri',
    shortTitle: 'ShortTitle',
    authors: [],
    teaserType: ARTICLE_TYPE_BLOG_D,
    organizationData: {
      hasNoPoints: false,
      id: 'cmVzdGF1cmFudDo3Mjg=',
      isProvisional: false,
      points: 14,
      pointsChange: null,
      trendIsDisabled: false,
      __typename: 'Restaurant',
    },
    organizationType: ORGANIZATION_TYPE_POP,
    restaurantType: 'Beiz',
    cityList: 'neuenburg',
    sponsor: null,
    channel: null,
    styles: {},
  };
});

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

describe('[Component] Teaser - ShortTitle', () => {
  test.each`
    subtypeValue
    ${ARTICLE_TYPE_BLOG_A}
    ${ARTICLE_TYPE_BLOG_B}
    ${ARTICLE_TYPE_BLOG_C}
    ${ARTICLE_TYPE_BLOG_D}
    ${ARTICLE_TYPE_BLOG_E}
    ${ARTICLE_TYPE_BLOG_F}
    ${ARTICLE_TYPE_BLOG_G}
    ${ARTICLE_TYPE_BLOG_H}
    ${ARTICLE_TYPE_BLOG_I}
    ${ARTICLE_TYPE_BLOG_J}
    ${ARTICLE_TYPE_BLOG_K}
    ${ARTICLE_TYPE_BLOG_L}
    ${ARTICLE_TYPE_BLOG_M}
    ${ARTICLE_TYPE_BLOG_N}
    ${ARTICLE_TYPE_BLOG_O}
    ${ARTICLE_TYPE_BLOG_P}
    ${ARTICLE_TYPE_BLOG_Q}
    ${ARTICLE_TYPE_JOURNALISTIC}
  `(
    'Should render ShortTitle for subtypeValue $subtypeValue correctly',
    ({ subtypeValue }) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.subtypeValue = subtypeValue;
      const { container } = render(
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        <ReduxProvider initialState={initialState}>
          <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </IntlProvider>
        </ReduxProvider>,
      );
      expect(container).toMatchSnapshot();
    },
  );

  test.each`
    typename
    ${RECIPE_CONTENT_TYPE}
    ${TEASER_CONTENT_TYPE}
  `('Should render ShortTitle for $typename correctly', ({ typename }) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.__typename = typename;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each`
    organizationType
    ${'default'}
    ${ORGANIZATION_TYPE_POP}
  `(
    'Should render ShortTitle for Organization of type $organizationType correctly',
    ({ organizationType }) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.__typename = ORGANIZATION_CONTENT_TYPE;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.organizationType = organizationType;
      const { container } = render(
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
        <ReduxProvider initialState={initialState}>
          <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </IntlProvider>
        </ReduxProvider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
