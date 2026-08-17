import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('../../../../../../../../../../common/components/Picture');
jest.mock('../../../../../../../../../../common/components/Link');
jest.mock('../../../../../../Icon');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ministageTeaser: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] MinistageTeaser', () => {
  it('Should render mobile correctly', () => {
    const { queryByTestId } = render(
      <IntlProvider locale="de-CH">
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );

    expect(queryByTestId('ministage-teaser-outer-container')).not.toBeNull();
    expect(queryByTestId('ministage-teaser-inner-container')).not.toBeNull();
    expect(queryByTestId('ministage-teaser-button-wrapper')).not.toBeNull();
    expect(queryByTestId('mocked-picture')).not.toBeNull();

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('ministage-teaser-outer-container').classList.contains(
        'Container',
      ),
    ).toBeTruthy();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('ministage-teaser-inner-container').classList.contains(
        'Container',
      ),
    ).toBeTruthy();
  });

  it('Should render desktop correctly', () => {
    const { queryByTestId } = render(
      <IntlProvider locale="de-CH">
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );

    expect(queryByTestId('ministage-teaser-outer-container')).not.toBeNull();
    expect(queryByTestId('ministage-teaser-inner-container')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('ministage-teaser-outer-container').classList.contains(
        'Container',
      ),
    ).toBeTruthy();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('ministage-teaser-inner-container').classList.contains(
        'Container',
      ),
    ).toBeTruthy();
  });

  it('Should not render ButtonWrapper if there is no ministage teaser link', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageTeaser.link;
    const { queryByTestId } = render(
      <IntlProvider locale="de-CH">
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );

    expect(queryByTestId('ministage-teaser-button-wrapper')).toBeNull();
  });

  it('Should not render Picture if there is no relativeOriginPath', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageTeaser.image.relativeOriginPath = '';
    const { queryByTestId } = render(
      <IntlProvider locale="de-CH">
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </IntlProvider>,
    );

    expect(queryByTestId('mocked-picture')).toBeNull();
  });
});
