/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { render } from '@testing-library/react';
import utilityLinkFactory from '../factory';

jest.mock('LinkLegacy');
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

const componentFactoryOptions = {
  SVGIcon: () => <div className="MockSVGIcon" />,
  styles: {
    Link: 'LinkClassName',
    Active: 'ActiveClassName',
    Label: 'LabelClassName',
    Icon: 'IconClassName',
    CommentCount: 'CommentCountClassName',
    Badge: 'BadgeClassName',
  },
};

beforeEach(() => {
  initialProps = {
    item: {
      id: 'facebook-id',
      iconLabel: 'Facebook',
      iconType: 'Facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u=[url]',
      referrer: `utm_source=facebook&utm_medium=social&utm_campaign=share-button`,
      targetType: '_blank',
      viewport: 'all',
    },
  };
  Component = utilityLinkFactory(componentFactoryOptions);
});

describe('[Component] UtilityLink', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render without props', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render link without icon', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.item.iconType;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.url = initialProps.item.url;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    const commentCount = queryByTestId('utility-link-comment-count-wrapper');

    expect(container).toMatchSnapshot();
    expect(commentCount).toBeNull();
  });

  it('Should render commentCount if there is one given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.commentCount = 4;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    const commentCount = queryByTestId('utility-link-comment-count-wrapper');

    expect(commentCount).toMatchSnapshot();
  });

  it('Should not render commentCount if there are 0 comments', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.commentCount = 0;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    const commentCount = queryByTestId('utility-link-comment-count-wrapper');

    expect(commentCount).toMatchSnapshot();
  });
});
