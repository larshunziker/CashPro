import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    window: windowInitialState,
    settings: settingsInitialState,
  };
});

describe('[Component] ImageGalleryParagraph', () => {
  it('Should not render image gallery paragraph if there is no valid data', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.gallery = null;
    const { queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} origin="" />
      </ReduxProvider>,
    );

    expect(queryAllByTestId('imagegalleryparagraph-container')).toHaveLength(0);
  });

  it('Should render image gallery paragraph', () => {
    const { queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} origin="" />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryAllByTestId('imagegalleryparagraph-container')).toHaveLength(1);
  });
});
