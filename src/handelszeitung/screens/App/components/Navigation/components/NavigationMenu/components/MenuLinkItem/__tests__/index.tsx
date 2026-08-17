import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { noop } from '../../../../../../../../../../shared/helpers/utils';
import Component from '../index';

const initialProps = {
  node: {
    link: {
      label: 'Startseite',
      description: null,
      path: '/',
      routed: true,
      expanded: false,
      image: null,
    },
  },
  closeNavigation: noop,
};

describe('[Component] Menu Link Item Tests', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component {...initialProps} />
      </MemoryRouter>,
    );
    expect(queryByTestId('menu-link-item-wrapper')).not.toBeNull();
    expect(queryByTestId('menu-link-item-wrapper')).toMatchSnapshot();
  });

  it('Should render nothing if you link is given', () => {
    /* @ts-ignore TODO: TS2790 ->  The operand of a 'delete' operator must be optional. */
    delete initialProps.node.link;
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('menu-link-item-wrapper')).toBeNull();
  });
});
