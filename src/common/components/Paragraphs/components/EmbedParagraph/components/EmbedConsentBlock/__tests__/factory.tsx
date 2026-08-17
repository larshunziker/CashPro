import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import embedConsentBlockFactory from '../factory';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import mockOptions from './mockData.json';
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const windowStateSelector = (state) => state;
const consentBlockContent: any = {};
const button = jest.fn((props) => (
  <button>{JSON.stringify(props, null, 2)}</button>
));
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

const componentFactoryOptions = {
  windowStateSelector,
  styles: {
    Wrapper: '.SampleWrapperClass',
    Title: '.SampleTitleClass',
    Link: '.SampleLinkClass',
    Lead: '.SampleLeadClass',
    Container: '.SampleContainerClass',
    LinkWrapper: '.SampleLinkWrapperClass',
  },
  consentBlockContent,
  Button: button,
};

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
  Component = embedConsentBlockFactory(componentFactoryOptions);
});

describe('[Common]  EmbedParagraph - EmbedConsentBlock factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render factory correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('embed-consent-block-wrapper')).not.toBeNull();
    expect(queryByTestId('default-link')).not.toBeNull();
  });
});
