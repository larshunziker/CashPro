import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

const menuLinks = [
  {
    node: {
      link: {
        path: '/ratgeber',
        label: 'Ratgeber',
        isMainChannel: true,
      },
    },
  },
  {
    node: {
      link: {
        path: '/beratung',
        label: 'Beratung',
        isMainChannel: true,
      },
    },
  },
  {
    node: {
      link: { path: '/invalid' },
    },
  },
  {
    node: {
      link: {},
    },
  },
  {
    node: {},
  },
  {},
];

describe('[Component] NavigationBar', () => {
  it('Should render the navigation wrapper and all valid items', () => {
    const { queryByTestId, container } = render(
      <ReduxProvider>
        <Component menuLinks={menuLinks} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigationbar-container')).not.toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing because no navigation items are provided', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MenuTreeItemEdge[]'. */}
        <Component menuLinks={null} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigationbar-container')).toBeNull();
  });

  it('Should render nothing because empty array of navigation items is provided', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component menuLinks={[]} />
      </ReduxProvider>,
    );

    expect(queryByTestId('navigationbar-container')).toBeNull();
  });
});
