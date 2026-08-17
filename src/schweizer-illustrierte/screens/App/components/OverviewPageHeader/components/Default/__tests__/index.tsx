import { render } from '@testing-library/react';
import React from 'react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { DefaultPropsInner } from '../index';

// @ts-ignore
let initialProps: DefaultPropsInner = {};
let initialState = {};

beforeEach(() => {
  // @ts-ignore
  initialProps = {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    title: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    lead: null,
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] OverviewPageHeader - Default', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render component correctly', () => {
    // @ts-ignore
    initialState.settings.activeMainChannel = 'SI';
    initialProps.title = 'Hallo welt';
    initialProps.lead = 'Some example lead text.';
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toBe('');
    expect(
      queryByTestId('overview-page-header-default-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('overview-page-header-default-lead')).not.toBeNull();
  });
});
