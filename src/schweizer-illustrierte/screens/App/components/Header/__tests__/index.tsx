import React from 'react';
import { render } from '@testing-library/react';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider/index';
import Component from '../../Header';
import { MAIN_CHANNEL_STYLE } from '../../../../App/constants';

describe('[Component] Header', () => {
  test('Should render with inital data if all necessary data is provided', () => {
    const initialState = {
      settings: settingsInitialState,
    };
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('header-container')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('header-logo-wrapper').innerHTML).toContain(
      'Schweizer Illustrierte Logo',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('header-logo-wrapper').innerHTML).not.toContain(
      'Style Logo',
    );
  });

  test('Should render Style (SY) logo if the active main channel is "Style"', () => {
    const initialState = {
      settings: settingsInitialState,
    };
    initialState.settings.activeMainChannel = MAIN_CHANNEL_STYLE;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('header-logo-wrapper').innerHTML).toContain(
      'Style Logo',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('header-logo-wrapper').innerHTML).not.toContain(
      'Schweizer Illustrierte Logo',
    );
  });
});
