import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import embedParagraphFactory from '../factory';
import { checkConsentInCookie, getConsentCookie } from '../helpers';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import SSRContextProvider from '../../../../SSRContext';
import mockOptions from './mockData.json';

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const windowStateSelector = (state) => state;
/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
let initialState: any = {};

jest.mock('../components/EmbedContact');

const EmbedConsentBlock = (): ReactElement => (
  <div data-testid="embed-consent-block-wrapper"></div>
);

const componentFactoryOptions = {
  windowStateSelector,
  styles: {
    Wrapper: '.SampleWrapperClass',
    Title: '.SampleTitleClass',
    TitleWrapper: '.SampleTitleWrapperClass',
  },
  EmbedConsentBlock,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockOptions));
  initialState = {
    window: windowInitialState,
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };
  componentFactoryOptions.windowStateSelector = () =>
    windowStateSelector(windowInitialState);
  Component = embedParagraphFactory(componentFactoryOptions);
});

describe('[Common] Paragraphs - EmbedParagraph factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render factory correctly without embeddedscript tags', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toContain('<embeddedscript');
    expect(container.innerHTML).toContain('<script');
    expect(queryByTestId('embed-paragraph-factory-wrapper')).not.toBeNull();
  });

  it('Should render factory correctly without header', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.embedParagraph.header = null;

    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toContain('<embeddedscript');
    expect(container.innerHTML).toContain('<div');
    expect(queryByTestId('embed-paragraph-factory-wrapper')).not.toBeNull();
    expect(queryByTestId('embed-paragraph-factory-header')).toBeNull();
  });

  it('Should render EmbedConsentBlock correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.embedParagraph.disableCookieConsent = false;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('embed-paragraph-factory-header')).toBeNull();
    expect(queryByTestId('embed-consent-block-wrapper')).not.toBeNull();
  });
  it('Should render factory correctly cuz of disableCookieConsent', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.embedParagraph.disableCookieConsent = true;

    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('embed-paragraph-factory-header')).not.toBeNull();
    expect(container.innerHTML).toContain('<script');
  });
  it('Should render factory correctly cuz of disableCookieConsent', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.embedParagraph.disableCookieConsent = false;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('embed-paragraph-factory-header')).toBeNull();
    expect(queryByTestId('embed-consent-block-wrapper')).not.toBeNull();
  });
});

describe('[Common]  EmbedParagraph - EmbedConsentBlock Helper Functions', () => {
  const mockedWindowDocumentCookie = jest.spyOn(
    window.document,
    'cookie',
    'get',
  );
  afterAll(() => {
    mockedWindowDocumentCookie.mockRestore();
  });
  test('Should return an Object of type ConsentCookie', () => {
    const cookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.consentCookie),
    );
    mockedWindowDocumentCookie.mockReturnValue('OptanonConsent=' + cookie);
    const mockCookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.mockCookie),
    );
    expect(getConsentCookie()).toMatchObject(mockCookie);
  });
  test('Should return null', () => {
    const cookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.consentCookie),
    );
    mockedWindowDocumentCookie.mockReturnValue('otherName=' + cookie);
    expect(getConsentCookie()).toBe(null);
  });
  test('Should return true when user has all required permissions', () => {
    const cookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.consentCookie),
    );
    mockedWindowDocumentCookie.mockReturnValue('OptanonConsent=' + cookie);

    expect(checkConsentInCookie()).toBe(true);
  });
  test('Should return true when user has some permissions and publication is Tele', () => {
    // @ts-ignore
    __APP_NAME__ = 'tele';
    const cookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.consentCookieTele),
    );
    mockedWindowDocumentCookie.mockReturnValue('OptanonConsent=' + cookie);

    expect(checkConsentInCookie()).toBe(true);
  });
  test('Should return false when user has no permissions', () => {
    const cookie = JSON.parse(
      JSON.stringify(mockOptions.consentBlock.consentCookieWithNoRights),
    );
    mockedWindowDocumentCookie.mockReturnValue('OptanonConsent=' + cookie);
    expect(checkConsentInCookie()).toBe(false);
  });
  test('Should return false when some required permissions are missing ', () => {
    const cookie = JSON.parse(
      JSON.stringify(
        mockOptions.consentBlock.consentCookieWithNotRequireRights,
      ),
    );
    mockedWindowDocumentCookie.mockReturnValue('OptanonConsent=' + cookie);
    expect(checkConsentInCookie()).toBe(false);
  });
});
