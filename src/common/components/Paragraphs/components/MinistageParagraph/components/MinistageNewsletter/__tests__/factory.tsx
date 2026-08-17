import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { routeInitialState } from '../../../../../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

const componentFactoryOptions = {
  styles: {
    Background: 'BackgroundClassName',
    Wrapper: 'WrapperClassName',
    Container: 'ContainerClassName',
    InnerWrapper: 'InnerWrapperClassName',
    Row: 'RowClassName',
    ContentWrapper: 'ContentWrapperClassName',
    HeaderWrapper: 'HeaderWrapperClassName',
    HeaderText: 'HeaderTextClassName',
    LeadText: 'LeadTextClassName',
    HiddenTeaserImage: 'HiddenTeaserImageClassName',
    PictureWrapper: 'PictureWrapperClassName',
    Picture: 'PictureClassName',
  },
  imageStyles: {
    style_320: 'STYLE_TEASER_1_1',
  },
  MailchimpSubscribeForm: () => <div className="MailChimpSubscribeMock"></div>,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);

  initialProps = {
    ministageNewsletter: JSON.parse(JSON.stringify(mockData)),
  };
  initialState = {
    route: routeInitialState,
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
  };
});

describe('[Component] MinistageNewsletter', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('ministage-newsletter-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-newsletter-lead-wrapper')).not.toBeNull();
    expect(
      queryByTestId('ministage-newsletter-picture-wrapper'),
    ).not.toBeNull();
  });

  it('Should not render lead', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageNewsletter.lead;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageNewsletter.headline;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('ministage-newsletter-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-newsletter-lead-wrapper')).toBeNull();
  });

  it('Should not render image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageNewsletter.image.relativeOriginPath;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('ministage-newsletter-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-newsletter-picture-wrapper')).toBeNull();
  });
});
