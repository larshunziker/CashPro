/**
 * @file   Ministage Single Alert Topic Tests
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'relativeOriginPath' implicitly has an 'any' type. */
const AlertItem = ({ children, relativeOriginPath }) => (
  <>
    {(relativeOriginPath && <img src={relativeOriginPath} alt="" />) || null}
    <div className="MockAlertItem">{children}</div>
  </>
);
/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
const SubscribeButton = ({ label }) => (
  <div className="MockSubscribeButtonItem">{label}</div>
);
let initialProps: any = {};
let initialState: any = {};
/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
let store: any;

const componentFactoryOptions: any = {
  AlertItem,
  SubscribeButton,
  imageStyles: {
    style_320: 'small',
    slyle_960: 'large',
  },
  windowStateSelector: () => initialState.window,
  styles: {
    Wrapper: 'WrapperClassName',
    ContentWrapper: 'ContentWrapperClassName',
    Title: 'TitleClassName',
    AlertItemWrapper: 'AlertItemWrapperClassName',
  },
};

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
  initialState = {
    window: {
      height: 886,
      scrollTop: 0,
      viewport: {
        label: 'viewport/xl',
        from: 960,
        to: 1599,
      },
      imageBreakpoint: {
        label: '450',
      },
      width: 1038,
    },
    piano: {
      pageMetadata: {
        publication: 'publication',
        isNativeContent: false,
        pathname: 'pathname',
        publicationDate: 'publicationDate',
        restrictionStatus: 'restrictionStatus',
        section: 'section',
        tags: ['string'],
        contentType: 'contentType',
        isPrintArticle: false,
        gcid: 'gcid',
      },
    },
  };

  store = createStore((state) => state, initialState);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] MinistageSingleAlertTopic', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should not render if ministageparagraph is empty', () => {
    initialProps.ministageParagraph = null;
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if ministageSingleAlertTopic is empty', () => {
    initialProps.ministageParagraph.ministage = null;
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if there is neither organization, person nor keyword', () => {
    delete initialProps.ministageParagraph.ministage.keyword;
    delete initialProps.ministageParagraph.ministage.organization;
    delete initialProps.ministageParagraph.ministage.person;

    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render keyword correctly', () => {
    delete initialProps.ministageParagraph.ministage.organization;
    delete initialProps.ministageParagraph.ministage.person;

    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render organization correctly', () => {
    delete initialProps.ministageParagraph.ministage.keyword;
    delete initialProps.ministageParagraph.ministage.person;

    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render person correctly', () => {
    delete initialProps.ministageParagraph.ministage.keyword;
    delete initialProps.ministageParagraph.ministage.organization;

    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render one alert only even if organization, person and keyword are given', () => {
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render fallback headline if no headline related', () => {
    delete initialProps.ministageParagraph.ministage.headline;
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render image if media item is given', () => {
    initialProps.ministageParagraph.ministage.media = {
      file: {
        relativeOriginPath: '/federer.png',
      },
    };
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
