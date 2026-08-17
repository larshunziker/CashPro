import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../LandingPagesStatic';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
beforeEach(() => {
  initialState = { settings: { language: 'de' }, window: windowInitialState };
});

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

describe('[Component] LandingPageStatic', () => {
  it('Should not render Teaser if TeaserParagraph empty', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          <Component />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('landing-page-static-wrapper')).not.toBeNull();
  });
});
