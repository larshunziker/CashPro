import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import * as BrightcoveHelpers from '../../../../../../common/components/Brightcove/helpers';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { initialState as windowInitialState } from '../../../../../shared/reducers/window';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps: Record<string, any> = {};
let initialState: Record<string, any> = {};
let fetchSpy: jest.SpyInstance;

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);

  fetchSpy = jest.spyOn(global, 'fetch' as any).mockResolvedValue({
    ok: true,
    json: async () => ({ data: { jwVideoId: null } }),
  });

  initialProps = mockData;
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

describe('[Component] Video', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      <IntlProvider locale="de-CH">
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <Component video={undefined as any} {...initialProps} />
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render the video-container and the ssr loading placeholder', () => {
    const jwVideo = {
      ...initialProps.video,
      jwPlayerId: '9Xw0ABCD',
    };

    const { queryByTestId } = render(
      <IntlProvider locale="de-CH">
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <HelmetProvider>
              <Component {...initialProps} video={jwVideo} />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-container').innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('video-ssr-loading-container').innerHTML).toContain(
      'loading...',
    );
  });

  it('Should include the German JW SEO embedUrl in JSON-LD', () => {
    const createSSRHelmetSpy = jest.spyOn(BrightcoveHelpers, 'createSSRHelmet');

    const jwVideo = {
      ...initialProps.video,
      jwPlayerId: '9Xw0ABCD',
    };

    render(
      <IntlProvider locale="de-CH">
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <HelmetProvider>
              <Component {...initialProps} video={jwVideo} />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );

    expect(createSSRHelmetSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      expect.any(String),
      'https://cdn.jwplayer.com/players/9Xw0ABCD-C7evCKXE.html',
    );
  });

  it('Should include the French JW SEO embedUrl in JSON-LD', () => {
    const createSSRHelmetSpy = jest.spyOn(BrightcoveHelpers, 'createSSRHelmet');

    const jwVideo = {
      ...initialProps.video,
      jwPlayerId: '9Xw0ABCD',
    };
    const frenchState = {
      ...initialState,
      settings: {
        language: 'fr',
      },
    };

    render(
      <IntlProvider locale="fr-CH">
        <ReduxProvider initialState={frenchState}>
          <SSRContextProvider>
            <HelmetProvider>
              <Component {...initialProps} video={jwVideo} />
            </HelmetProvider>
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );

    expect(createSSRHelmetSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      expect.any(String),
      'https://cdn.jwplayer.com/players/9Xw0ABCD-3GtHJUrL.html',
    );
  });

  it('Should render nothing when only brightcove id exists', () => {
    const { container } = render(
      <IntlProvider locale="fr-CH">
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <Component
              {...initialProps}
              video={{
                ...initialProps.video,
                jwPlayerId: undefined,
              }}
            />
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing when no player is available', () => {
    const { container } = render(
      <IntlProvider locale="de-CH">
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            <Component
              {...initialProps}
              video={{
                ...initialProps.video,
                jwPlayerId: undefined,
                brightcoveId: undefined,
              }}
            />
          </SSRContextProvider>
        </ReduxProvider>
      </IntlProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  // TODO: Maybe find a solution on how we can the test the async loading "video-brightcove-wrapper"
});
