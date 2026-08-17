import React from 'react';
import { render } from '@testing-library/react';
import { initialState as headerInitialState } from '../../../../../../../../../../shared/reducers/header';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

jest.mock('Link');
beforeEach(() => {
  initialState = {
    header: {
      ...headerInitialState,
    },
  };
});

describe('[Component] Header - VerticalTitle', () => {
  it('Should render nothing', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component vertical={''} isCollapsed={false} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render verticle from header state', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.header.title = 'Verticle';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component vertical={''} isCollapsed={false} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render verticle from vertical titles', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component vertical={'vertical/education'} isCollapsed={false} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render link to verticle from title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.header.link = null;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component vertical={'vertical/education'} isCollapsed={false} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render link to verticle from state', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.header.link = 'https://www.example.com';
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component vertical={'vertical/education'} isCollapsed={false} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
