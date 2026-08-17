import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import Component, { getHatIconType, isRankingInHat } from '../index';

jest.mock('../../../../../components/Icon');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    points: 19,
    isProvisional: false,
    pointsChange: 18,
    trendIsDisabled: false,
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

describe('[Component] RestaurantRanking', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly if trend is disabled', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.trendIsDisabled = true;
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly if points but no hat is disabled', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.points = 8;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pointsChange = 8;
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly if there are no points/no ranking', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.points = 0;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pointsChange = 0;
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each`
    ranking | result
    ${null} | ${false}
    ${11}   | ${false}
    ${12}   | ${true}
    ${14}   | ${true}
    ${18}   | ${true}
    ${19}   | ${true}
    ${20}   | ${true}
    ${21}   | ${false}
  `(
    'Should return isRankingInHat $result when the ranking is $ranking',
    ({ ranking, result }) => {
      expect(isRankingInHat(ranking)).toBe(result);
    },
  );

  test.each`
    ranking | isProvisional
    ${11}   | ${false}
    ${12}   | ${true}
    ${14}   | ${true}
    ${18}   | ${false}
    ${19}   | ${true}
    ${20}   | ${false}
  `(
    'Should return correct iconType when the ranking is $ranking and isProvisional is $isProvisional',
    ({ ranking, isProvisional }) => {
      expect(getHatIconType(ranking, isProvisional)).toMatchSnapshot();
    },
  );
});
