import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { GrowthBook } from '@growthbook/growthbook';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import SSRContextProvider from '../../common/components/SSRContext';
import ReduxProvider from './tests/components/ReduxProvider';

const growthbook = new GrowthBook({
  features: {}, // Add any feature flags or configurations here
});

const AllTheProviders = ({ children }: any) => {
  return (
    /*@ts-ignore*/
    <GrowthBookProvider growthbook={growthbook}>
      <SSRContextProvider>
        <ReduxProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </ReduxProvider>
      </SSRContextProvider>
    </GrowthBookProvider>
  );
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
