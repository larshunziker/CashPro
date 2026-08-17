import React from 'react';
import { cleanup, render } from '@testing-library/react';
import componentFactory, {
  BrightcovePropsInner,
  getErrorMessage,
} from '../factory';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockdata.json';
import SSRContextProvider from '../../SSRContext';
import { ERROR_UNKNOWN, ERROR_VIDEO_NOT_FOUND } from '../constants';
import { BrightcoveFactoryOptions } from '../typings';

// @ts-ignore
let componentFactoryOptions: BrightcoveFactoryOptions = {};
// @ts-ignore
let initialProps: BrightcovePropsInner = {};
let initialState = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  componentFactoryOptions = {
    playerId: 'aM4DpruyD',
    accountId: '2112711546001',
  };
  initialProps = JSON.parse(JSON.stringify(mockData));
  initialProps.isScriptLoaded = true;
  initialProps.isScriptLoadSucceed = true;
  initialProps.entry = null;
  initialProps.hasToLazyLoadBrightcoveScript = false;

  initialState = {
    window: {
      height: 500,
      scrollTop: 0,
      viewport: {
        label: 'viewport/xs',
        from: 0,
        to: 759,
      },
      width: 320,
    },
  };
});

afterEach(cleanup);

describe('[Common] Brightcove', () => {
  test('Should return component from factory', () => {
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });

  it('Should render correctly*', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    // TODO: make it work :) It currently only renders the "unknow error" state, I couldn't get it working
    expect(container).toMatchSnapshot();
  });

  it('Should render not found error mesage', () => {
    const container = getErrorMessage(ERROR_VIDEO_NOT_FOUND);
    expect(container).toMatchSnapshot();
  });

  it('Should render unknown error mesage', () => {
    const container = getErrorMessage(ERROR_UNKNOWN);
    expect(container).toMatchSnapshot();
  });
});
