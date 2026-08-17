import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import ReduxProvider from '../../../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

jest.mock('Link');
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const initialState = {};

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
    ContentWrapper: 'ContentWrapperClassName',
    Title: 'TitleClassName',
    Keyword: 'KeywordClassName',
  },
  labelPrefix: '#',
  titleFallback: 'Aktuelle Themen',
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] MinistageTrendingTopics', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render if ministageparagraph is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph = null;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if ministageTrendingTopics is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage = null;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if keywords does not exist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage.keywords;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if there are no keywords related', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.keywords = [];
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render fallback headline if not headline related', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage.headline;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render node link instead of preferredUri', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.keywords.edges[0].node.link =
      '/node-link';

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render node link instead of preferredUri, activePath css class, custom headline and custom labelPrefix', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.keywords.edges[0].node.link =
      '/node-link';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.headline = '';
    const initialState = {
      route: {
        locationBeforeTransitions: {
          pathname: '/node-link',
        },
      },
    };
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"ActivePath"' can't be used to index type '{ Wrapper */
    componentFactoryOptions.styles['ActivePath'] = 'ActivePathClassName';
    componentFactoryOptions.labelPrefix = '';
    componentFactoryOptions.titleFallback = '';
    const Ministage = componentFactory(componentFactoryOptions);

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Ministage {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
