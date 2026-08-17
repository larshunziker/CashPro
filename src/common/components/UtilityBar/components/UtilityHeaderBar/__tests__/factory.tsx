import React from 'react';
import { render } from '@testing-library/react';
import utilityHeaderBarFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps = null;

const componentFactoryOptions = {
  UtilityBar: () => <div className="MockUtilityBar" />,
  truncateTitleLength: 200,
  styles: {
    Wrapper: 'WrapperClassName',
    Move: 'MoveClassName',
    ContentWrapper: 'ContentWrapperClassName',
    TitleWrapper: 'TitleWrapperClassName',
    Title: 'TitleClassName',
    UtilityBarWrapper: 'UtilityBarWrapperClassName',
  },
};

beforeEach(() => {
  initialProps = {
    articleData: {
      title: 'Title',
      shortTitle: 'Short Title',
      lead: 'This is the lead text',
      subtypeValue: 'headless',
      channel: {
        title: 'Politic',
      },
      commentStatus: 'open',
      preferredUri: 'preferred/Uri',
      socialMediaTitle: 'tis is the social media Title',
    },
    isScrolledToCollapse: false,
    isSocialBarVisible: true,
    enabledUtilities: ['Facebook'],
  };
  Component = utilityHeaderBarFactory(componentFactoryOptions);
});

describe('[Component] UtilityHeaderBar', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render nothing if the current page is a landing page', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isSocialBarVisible = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('utility-header-bar-wrapper')).toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render UtilityHeaderBar if there are no enabledUtilities', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.enabledUtilities;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render UtilityHeaderBar if array of enabled Utilities is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.enabledUtilities = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render UtilityHeaderBar if enabledUtilities is not an array', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.enabledUtilities = 'Facebook';
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
