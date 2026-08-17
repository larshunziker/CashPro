import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Logo from '../../FooterLogo';

jest.mock('LinkLegacy');

describe('[Component] Footer', () => {
  it('Should render Logo with German Link correctly', () => {
    const { container } = render(
      <ReduxProvider>
        <Logo languageAwareData={{ path: '/' }} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render Logo with French Link correctly', () => {
    const { container } = render(
      <ReduxProvider>
        <Logo languageAwareData={{ path: '/fr' }} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
