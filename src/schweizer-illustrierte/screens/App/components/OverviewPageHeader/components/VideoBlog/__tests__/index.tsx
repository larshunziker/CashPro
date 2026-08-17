import { render } from '@testing-library/react';
import React from 'react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { VideoBlogPropsInner } from '../index';

// @ts-ignore
let initialProps: VideoBlogPropsInner = {};
let initialState = {};
jest.mock('Picture');

beforeEach(() => {
  // @ts-ignore
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    lead: null,
    headerImage: null,
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] OverviewPageHeader - Video Blog', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render component correctly', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(
      queryByTestId('overview-page-header-video-blog-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('overview-page-header-video-blog-lead'),
    ).not.toBeNull();
    expect(
      queryByTestId('overview-page-header-video-blog-image'),
    ).not.toBeNull();
  });

  it('Should not render component when no title is given', () => {
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = {
      file: {
        alt: 'test',
        relativeOriginPath: 'foo.jpg',
      },
    };
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('overview-page-header-video-blog-wrapper')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-image')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-lead')).toBeNull();
  });

  it('Should not render component when no image is given', () => {
    initialProps.title = 'Some example title';
    initialProps.lead = 'Some example lead text.';
    initialProps.headerImage = null;
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('overview-page-header-video-blog-wrapper')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-image')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-lead')).toBeNull();
  });

  it('Should not render component when no image is given', () => {
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';

    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
    expect(queryByTestId('overview-page-header-video-blog-wrapper')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-image')).toBeNull();
    expect(queryByTestId('overview-page-header-video-blog-lead')).toBeNull();
  });
});
