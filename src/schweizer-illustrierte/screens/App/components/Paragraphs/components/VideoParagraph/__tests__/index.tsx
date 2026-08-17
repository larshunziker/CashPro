import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
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
    settings: settingsInitialState,
  };
});

describe('[Paragraphs] VideoParagraph', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS2741 ->  Property 'video' is missing in type '{}' but required in type '{ video */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('<div></div>');
  });

  it('Should render correctly with a title, video and caption wrapper', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('video-title-wrapper')).not.toBeNull();
    expect(queryByTestId('video-wrapper')).not.toBeNull();
    expect(queryByTestId('video-caption-wrapper')).not.toBeNull();
  });

  it('Should render correctly without a title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.video.title = '';
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('video-title-wrapper')).toBeNull();
    expect(queryByTestId('video-wrapper')).not.toBeNull();
    expect(queryByTestId('video-caption-wrapper')).not.toBeNull();
  });

  it('Should render correctly without a caption and credit', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.video.credit = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.video.caption = '';
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('video-title-wrapper')).not.toBeNull();
    expect(queryByTestId('video-wrapper')).not.toBeNull();
    expect(queryByTestId('video-caption-wrapper')).toBeNull();
  });
});
