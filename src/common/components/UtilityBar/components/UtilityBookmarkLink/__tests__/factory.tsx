import React from 'react';
import { render } from '@testing-library/react';
import utilityLinkFactory from '../factory';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import { bookmarkListInitialState } from '../../../../../../shared/reducers/bookmarkList';
// TODO: check import there is no shared provider for common components tests
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import Link from '../../../../Link';

jest.mock('LinkLegacy');
jest.mock('Link');

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  SVGIcon: ({ type }) => <div className="MockSVGIcon" data-type={type} />,
  Link,
  ToastService: () => null,
  styles: {
    Animating: 'AnimatingClassName',
    Restricted: 'RestrictedClassName',
    Link: 'LinkClassName',
    Active: 'ActiveClassName',
    Label: 'LabelClassName',
    Icon: 'IconClassName',
  },
};

beforeEach(() => {
  initialProps = {
    item: {
      id: 'bookmark-id',
      iconLabel: 'Bookmark',
      iconType: 'Bookmark',
      url: 'https://www.bookmarkservice.com/sharer/sharer.php?u=[url]',
      referrer: `utm_source=facebook&utm_medium=social&utm_campaign=share-button`,
      targetType: '_blank',
      viewport: 'all',
    },
  };
  initialState = {
    auth: authInitialState,
    bookmarkList: bookmarkListInitialState,
  };
  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ SVGIcon */
  Component = utilityLinkFactory(componentFactoryOptions);
});

describe('[Component] UtilityBookmarkLink', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.url = initialProps.item.url;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth = {
      isAuthenticated: true,
    };
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
