import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { authInitialState } from '../../../../../../../../../shared/reducers/auth';
import { autoUpdateInitialState } from '../../../../../../../../shared/reducers/autoUpdate';
import ReduxProvider from '../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

let initialProps: any = {};
let initialState: any = {};

beforeEach(() => {
  initialProps = {
    instrumentKey: '',
    initialValue: 0,
    field: 'lval',
    /* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
    formatFn: (val) => String(val),
    defaultUpdateStatus: 'neutral',
  };
  initialState = { auth: authInitialState, autoUpdate: autoUpdateInitialState };
});

describe('[Component] InstrumentField', () => {
  it('Should render InstrumentField with empty value', async () => {
    // @ts-ignore
    const { container } = render(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render InstrumentField with values from redux store and update with dynamic status', async () => {
    initialState.autoUpdate.instrumentKeys = ['1-2-3'];
    initialProps.initialValue = 100;
    initialProps.instrumentKey = '1-2-3';
    initialProps.field = 'lval';
    delete initialProps.defaultUpdateStatus;

    // @ts-ignore
    const { container, rerender } = render(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();

    initialState.autoUpdate.data = { '1-2-3': { lval: 123 } };

    rerender(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    await waitFor(() => expect(container).toMatchSnapshot());

    initialState.autoUpdate.data = { '1-2-3': { lval: 99 } };

    rerender(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('Should render InstrumentField with values from redux store but update with neutral status', async () => {
    initialState.autoUpdate.instrumentKeys = ['1-2-3'];
    initialProps.initialValue = 1683356841414;
    initialProps.instrumentKey = '1-2-3';
    initialProps.field = 'lvalDatetime';
    initialProps.defaultUpdateStatus = 'neutral';

    /* @ts-ignore TODO: TS7006 ->  Parameter 'val' implicitly has an 'any' type. */
    initialProps.formatFn = (val) =>
      new Date(val).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Zurich',
      });

    // @ts-ignore
    const { container, rerender } = render(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();

    initialState.autoUpdate.data = {
      '1-2-3': { lvalDatetime: 1687356841414 },
    };

    rerender(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('Should render InstrumentField with values from redux store even if there is no formatFn provided', async () => {
    initialState.autoUpdate.instrumentKeys = ['1-2-4'];
    initialProps.initialValue = 1683356841414;
    initialProps.instrumentKey = '1-2-4';
    initialProps.field = 'lvalDatetime';
    delete initialProps.formatFn;

    // @ts-ignore
    const { container, rerender } = render(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();

    initialState.autoUpdate.data = {
      '1-2-4': { lvalDatetime: 1687356841414 },
    };

    rerender(
      <ReduxProvider state={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
