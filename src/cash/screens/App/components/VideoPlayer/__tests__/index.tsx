import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import * as BrightcoveHelpers from '../../../../../../common/components/Brightcove/helpers';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

let initialProps: Record<string, any> = {};
let initialState: Record<string, any> = {};
let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);

  fetchSpy = jest.spyOn(global, 'fetch' as any).mockResolvedValue({
    ok: true,
    json: async () => ({ data: { jwVideoId: null } }),
  });

  initialProps = {
    video: {
      id: '179006',
      brightcoveId: '5750322578001',
      jwPlayerId: '9Xw0ABCD',
      caption: 'caption',
      credit: 'Keystone',
      image: {
        file: {
          focalPointX: 1000,
          focalPointY: 1000,
          relativeOriginPath: '/_DSC9718.jpg',
        },
      },
    },
  };
  initialState = {
    window: windowInitialState,
    route: {
      ...routeInitialState,
      clientUrl: 'https://develop.publication.ch',
    },
  };
});

afterEach(() => {
  fetchSpy.mockRestore();
  jest.restoreAllMocks();
});

describe('[Component] Cash VideoPlayer', () => {
  it('Should render nothing without video data', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component video={undefined as any} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render the video-container and the ssr loading placeholder', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...(initialProps as any)} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-container').innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-ssr-loading-container').innerHTML).toContain(
      'loading...',
    );
  });

  it('Should render nothing when only brightcove id exists', () => {
    delete initialProps.video.jwPlayerId;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component {...(initialProps as any)} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing when no JW and no Brightcove id are available', () => {
    delete initialProps.video.jwPlayerId;
    delete initialProps.video.brightcoveId;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component {...(initialProps as any)} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should include the Cash JW SEO embedUrl in JSON-LD', () => {
    const createSSRHelmetSpy = jest.spyOn(BrightcoveHelpers, 'createSSRHelmet');

    render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...(initialProps as any)} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(createSSRHelmetSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      expect.any(String),
      'https://cdn.jwplayer.com/players/9Xw0ABCD-bJhMqInH.html',
    );
  });

  it('Should render nothing when no player is available', () => {
    delete initialProps.video.jwPlayerId;
    delete initialProps.video.brightcoveId;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <HelmetProvider>
            <Component {...(initialProps as any)} />
          </HelmetProvider>
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });
});
