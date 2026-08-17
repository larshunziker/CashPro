import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../components/NavigationUserMenuModal/index';

describe('[Component] NavigationUserMenu', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider>
        <Component />
      </ReduxProvider>,
    );

    expect(container).not.toBeNull();
  });
});
