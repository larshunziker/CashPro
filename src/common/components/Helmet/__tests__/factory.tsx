import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import helmetFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

jest.mock('react-helmet-async', () => {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const React = require('react');
  /* eslint-enable */
  const plugin = jest.requireActual('react-helmet-async');
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  const mockHelmet = ({ children, ...props }) =>
    React.createElement(
      'div',
      {
        ...props,
        /* @ts-ignore TODO: TS7006 ->  Parameter 'object' implicitly has an 'any' type. */
        meta: props.meta.map((object) => JSON.stringify(object)),
        socialMetaValues: JSON.stringify(props.socialMetaValues),
        className: 'mock-helmet',
      },
      children,
    );
  return {
    ...plugin,
    Helmet: jest.fn().mockImplementation(mockHelmet),
  };
});

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.locationOrigin = 'https://www.beobachter';

const routeInitialState = {
  locationBeforeTransitions: {
    pathname: '/home',
    search: '',
    hash: '',
    action: 'PUSH',
    key: 'b86ozif',
    query: {},
  },
  screenReady: true,
  vertical: 'Home',
};

const additionalMetaData = [
  {
    property: 'og:url',
    content: '[url]',
  },
];

const socialMetaTags = [
  {
    property: 'og:description',
    content: '[field_short_description]',
  },
  {
    property: 'og:image',
    content: '[field_heroimage]',
  },
  {
    property: 'og:title',
    content: '[field_short_title]',
  },
];

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };
  initialProps = {
    title: 'Home Channel | GaultMillau – Channel',
    meta: [
      {
        name: 'description',
        content: 'Gault Millau Channel',
      },
      {
        name: 'parsely-type',
        content: 'sectionpage',
      },
    ],
    socialMetaValues: {
      field_short_title: 'SEO Title',
      field_short_description: 'Gault Millau Channel',
      field_heroimage:
        'https://cdn.dev.ras.dev/sw/560/sites/default/files/GaultMillau_Home.jpg',
      field_lead: 'Gault Millau Channel',
    },
    link: [],
    script: [],
    locationPath: '/pop/zurich/frischeparadies-fisch-ist-king',
  };

  Component = helmetFactory({
    socialMetaTags,
    additionalMetaData,
    locationStateSelector: () => routeInitialState,
  });
});

describe('[Component] Helmet factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render Helmet with all content correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const spy = jest.spyOn(console, 'log');
    const { container } = render(
      <Provider store={store}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </HelmetProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
