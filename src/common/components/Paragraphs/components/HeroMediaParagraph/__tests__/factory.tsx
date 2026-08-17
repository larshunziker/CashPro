import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import heroMediaParagraphFactory from '../factory';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const ImageParagraph = (props) => <img alt={'alt img'} src={props} />;
let initialProps: any = {};
let initialState: any = {};
let store: any;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));

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
    route: {
      screenReady: true,
      isInitialPage: true,
      locationBeforeTransitions: {
        pathname: '/',
      },
    },
  };

  store = createStore((state) => state, initialState);

  Component = heroMediaParagraphFactory({
    ImageParagraph,
    icon: <div>icon</div>,
    styles: {
      Wrapper: 'WrapperStyle',
      InnerContainer: 'InnerContainerStyle',
      InnerWrapper: 'InnerWrapperStyle',
      InnerGrid: 'InnerGridStyle',
      Title: 'TitleStyle',
      ShortTitle: 'ShortTitleStyle',
      Lead: 'LeadStyle',
      Button: 'ButtonStyle',
    },
  });
});

describe('[Common] HeroMediaParagraph', () => {
  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('subTitle-wrapper')).not.toBeNull();
    expect(queryByTestId('lead-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without a subTitle', () => {
    initialProps.entry.subTitle = null;
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('subTitle-wrapper')).toBeNull();
    expect(queryByTestId('lead-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without a lead', () => {
    initialProps.entry.lead = null;
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('subTitle-wrapper')).not.toBeNull();
    expect(queryByTestId('lead-wrapper')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without a shortText', () => {
    initialProps.entry.shortText = null;
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('shortText-wrapper')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without a subTitle and lead', () => {
    initialProps.entry.lead = null;
    initialProps.entry.subTitle = null;
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('subTitle-wrapper')).toBeNull();
    expect(queryByTestId('lead-wrapper')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly without a subTitle and shortText', () => {
    initialProps.entry.shortTextw = null;
    initialProps.entry.subTitle = null;
    const { container, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(queryByTestId('subTitle-wrapper')).toBeNull();
    expect(queryByTestId('shortText-wrapper')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
