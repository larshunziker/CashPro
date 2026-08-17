import '@testing-library/jest-dom';

import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { isNotExpanded } from '../../MainLinks';
import mockData from './mockData.json';

let initialProps = {
  ...mockData,
  headerContentType: '',
  routePathname: '',
  routeScreenReady: false,
  routeVertical: 'vertical/home',
  navigationStateNavigationVisibility: null,
  isScrolledToCollapse: false,
  isSticky: true,
  setNavigationVisible: jest.fn(),
};
const initialState = {
  route: routeInitialState,
};

jest.mock('Link');
beforeEach(() => {
  initialProps = {
    ...initialProps,
  };
});

describe('NavigationBar', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render links correctly', () => {
    const { getByText } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const arbeitLink = getByText('Arbeit');
    expect(arbeitLink).not.toBeNull;
  });

  // it('should render different links on different verticals', () => {
  //   initialState.route.vertical = 'vertical/work';
  //   const { container, getByText } = render(
  //     <ReduxProvider initialState={initialState}>
  //       <Component {...initialProps} />
  //     </ReduxProvider>,
  //   );
  //   const arbeitLink = getByText('Arbeit');
  //   expect(arbeitLink).not.toBeNull;
  //
  //   const educationLink = getByText('Bildung');
  //   expect(educationLink).not.toBeNull;
  //
  //   expect(container).toMatchSnapshot();
  // });

  it('should render button correctly', () => {
    const { getByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    const menuButton = getByTestId('menu');
    expect(menuButton).not.toBeNull();
    expect(menuButton).toMatchSnapshot();
  });
});

describe('isNotExpanded', () => {
  test.each`
    node                             | expected
    ${{}}                            | ${true}
    ${{ link: { expanded: false } }} | ${true}
    ${{ link: { expanded: true } }}  | ${false}
  `('returns $expected when node is $node.link', ({ node, expected }) => {
    expect(isNotExpanded({ node })).toBe(expected);
  });
});
