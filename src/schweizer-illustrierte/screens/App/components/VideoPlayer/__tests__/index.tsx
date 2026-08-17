import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import VideoComponent, { VideoPlayerPropsInner } from '../index';
import mockData from './mockData.json';

// @ts-ignore
let initialProps: VideoPlayerPropsInner = {};
const Component = (props: any) => {
  return (
    <ReduxProvider>
      <VideoComponent {...props} />
    </ReduxProvider>
  );
};

beforeEach(() => {
  // @ts-ignore
  initialProps = mockData;
});

describe('[Component] Video', () => {
  it('Should render nothing', () => {
    // @ts-ignore
    initialProps = {};
    const { container } = render(
      <SSRContextProvider>
        <Component {...initialProps} />
      </SSRContextProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render the video-container and the ssr loading placeholder', () => {
    const { queryByTestId } = render(
      <SSRContextProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </SSRContextProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-player-container').innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-ssr-loading-container').innerHTML).toContain(
      'loading...',
    );
  });

  // TODO: Maybe find a solution on how we can the test the async loading "video-brightcove-wrapper"
});
