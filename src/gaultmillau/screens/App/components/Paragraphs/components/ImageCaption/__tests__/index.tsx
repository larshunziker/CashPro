import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../gaultmillau/shared/tests/components/ReduxProvider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';

let initialProps = {};
let initialState = {};

beforeAll(() => {
  initialProps = {
    caption: 'Caption',
  };
});

beforeEach(() => {
  initialProps = {
    ...initialProps,
  };

  initialState = {
    window: windowInitialState,
  };
});

describe('[Component] Caption', () => {
  it('Should render with caption', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render without caption', () => {
    // @ts-ignore
    initialProps.caption = '';
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
