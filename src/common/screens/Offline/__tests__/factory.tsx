import { render } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import screenFactory from '../factory';

const Screen = screenFactory({
  Helmet: () => null,
  styles: {
    Wrapper: '',
    Title: '',
    Description: '',
  },
});

describe('[Screen] Offline', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <HelmetProvider>
        <Screen />,
      </HelmetProvider>,
    );
    expect(queryByTestId('wrapper')).not.toBeNull();
    expect(queryByTestId('title-wrapper')).not.toBeNull();
    expect(queryByTestId('description-wrapper')).not.toBeNull();
  });
});
