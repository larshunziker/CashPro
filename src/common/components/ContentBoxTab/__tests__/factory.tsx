import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import SSRContextProvider from '../../SSRContext';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;

const ContentBoxBody = () => () => <div data-testid="mocked-contentBoxBody" />;

beforeEach(() => {
  componentFactoryOptions = {
    ContentBoxBodyRenderer: ContentBoxBody,
    styles: {
      Wrapper: 'WrapperClassName',
      Title: 'TitleClassName',
      Link: 'LinkClassName',
      TabWrapper: 'TabWrapperClassName',
      TabTitleWrapper: 'TabTitleClassName',
      ActiveTab: 'ActiveTabClassName',
      TabTitle: 'TabTitleClassName',
    },
  };

  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] ContentBoxTab Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container } = render(
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </SSRContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render Tabs if length of body is < 1', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.node.body = [
      {
        __typename: 'TabParagraph',
        id: 'cGFyYWdyYXBoOnRhYjoyMTU5NTY6Mjk1ODEz',
        title: 'Most Read',
        style: 'numbered_list',
        sortBy: 'most_read',
        linkLabel: null,
        mode: 'automatic',
        termReference: null,
      },
    ];

    const { container } = render(
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </SSRContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing', () => {
    const { container } = render(
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </SSRContextProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
