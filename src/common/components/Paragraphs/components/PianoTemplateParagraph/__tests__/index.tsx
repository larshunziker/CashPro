import React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    pianoTemplateParagraph: {
      id: '201020',
      offerId: 'OFH9PTPMXOMI',
      publication: 'schweizer_illustrierte',
      templateId: 'OT6KV4QA49E6',
    },
  };
  initialState = {
    window: windowInitialState,
    piano: {
      userMetadata: {
        idToken: 'xyz',
        externalSubscription: 'externalSubscription',
        initialAuthRequest: true,
      },
    },
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };
});

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.tp = {
  push: jest.fn(),
  offer: {
    show: jest.fn(),
  },
};

describe('[Component] PianoTemplateParagraph', () => {
  it('Should render nothing if there are no props', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store: Store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        <Component pianoTemplateParagraph={{}} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no id', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store: Store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.pianoTemplateParagraph.id;

    const { container } = render(
      <Provider store={store}>
        <Component pianoTemplateParagraph={{}} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no offerId', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store: Store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.pianoTemplateParagraph.offerId;

    const { container } = render(
      <Provider store={store}>
        <Component pianoTemplateParagraph={{}} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store: Store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
