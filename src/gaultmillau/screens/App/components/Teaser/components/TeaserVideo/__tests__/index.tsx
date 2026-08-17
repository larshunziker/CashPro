import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('Link');
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] TeaserVideo', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        <ReduxProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </IntlProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  it('Should render correctly 2', () => {
    const { container } = render(
      <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
        <ReduxProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} isActive />
        </ReduxProvider>
      </IntlProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
