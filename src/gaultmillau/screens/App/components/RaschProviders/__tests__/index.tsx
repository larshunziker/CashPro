import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

jest.mock('../../AppSetup');
jest.mock('../../AppNexusProvider');
jest.mock(
  '../../../../../../common/components/Tealium/components/TealiumProvider',
);
jest.mock('../../../../../../common/components/OneSignalProvider');
jest.mock('../../../../../../common/components/Auth0Provider');
jest.mock('../../../../../../common/components/PianoProvider');
jest.mock('../../../../../../common/components/ToastContainer');
jest.mock('../../../../../../common/components/BackgroundFetchProvider');
jest.mock('../../../../../../common/components/PerformanceMeasureProvider');
jest.mock('../../../../../../common/components/ViewGridLayout');

describe('[Component] RaschProviders', () => {
  it('Should match snapshot', async () => {
    const { container } = render(
      <ReduxProvider>
        <Component />
      </ReduxProvider>,
    );
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
