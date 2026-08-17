import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import AboOverview from '../index';
import { ABO_DATA } from '../constants';

it('Should render a AboOverview', () => {
  const { container } = render(
    <ReduxProvider>
      <AboOverview
        desktopData={ABO_DATA.desktopData}
        mobileData={ABO_DATA.mobileData}
        id="1"
      />
      ,
    </ReduxProvider>,
  );

  expect(container).not.toBeNull();
  expect(container).toMatchSnapshot();
});
