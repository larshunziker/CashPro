import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { datadogLogs } from '@datadog/browser-logs';
import { GrowthBook } from '@growthbook/growthbook';
import { autoAttributesPlugin } from '@growthbook/growthbook/plugins';
import { getServiceUrl } from '../../../shared/helpers/serviceUrl';
import { noop } from '../../../shared/helpers/utils';
import { StableNavigateContextProvider } from '../../../shared/hooks/useStableNavigateContext';
import GrowthBookProviderWrapper from '../../components/GrowthBookProvider';
import SSRContextProvider from '../../components/SSRContext';
import asyncConfigureApolloClient from '../../../shared/asyncConfigureApolloClient';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { growthBookUtils } from '../../../shared/helpers/growthBookUtils';
import connectToDevTools from '../../../shared/helpers/connectToDevTools';
import type { ClientFactoryOptions } from './typings';

// The graphql host is passed into the template from an environment variable.
let graphqlHost = window.__GRAPHQL_HOST__;
const graphqlOrigin = window.__GRAPHQL_ORIGIN__;
const host = window.location.host;

if (__FORCE_PREVIEW_REQUESTS__) {
  graphqlHost = process.env.__PREVIEW_GRAPHQL_HOST__ || '';
  if (
    !process.env.__PREVIEW_GRAPHQL_HOST__ &&
    __DEVELOPMENT__ &&
    __DOT_ENV__ !== 'stage' &&
    __DOT_ENV__ !== 'master'
  ) {
    // eslint-disable-next-line no-console
    console.log(
      'WARNING: __PREVIEW_GRAPHQL_HOST__ is only available on stage or master!',
    );
  }
}

const clientFactory =
  ({
    RaschProviders,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ComponentType<{}>'. */
    AutoUpdateProvider = null,
    AppRoutes,
    configureClientStore,
    mountNode,
    preRender = noop,
    generateApolloCache,
  }: ClientFactoryOptions) =>
  async () => {
    // setup datadoglogs
    if (
      __DATADOG_CLIENT_TOKEN__ &&
      __DATADOG_ENV__ &&
      __DATADOG_SAMPLE_RATE__ &&
      !window.location.hostname.includes('localhost')
    ) {
      datadogLogs.init({
        clientToken: __DATADOG_CLIENT_TOKEN__,
        service: 'rasch-stack',
        site: 'datadoghq.eu',
        env: __DATADOG_ENV__,
        forwardErrorsToLogs: true,
        sessionSampleRate: parseInt(__DATADOG_SAMPLE_RATE__),
      });

      datadogLogs.addLoggerGlobalContext('publication', __APP__);
    }

    // push location origin to global scope
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin =
      global.location.origin ||
      `${global.location.protocol}//${global.location.hostname}${
        global.location.port ? `:${global.location.port}` : ''
      }`;

    const apolloClient = await asyncConfigureApolloClient(
      getServiceUrl(graphqlHost),
      graphqlOrigin,
      host,
      generateApolloCache,
    );

    // Make the client globally available for content prefetching
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.apolloClient = apolloClient;

    const store = configureClientStore();
    const initialState = store.getState();
    initialState.route.clientUrl = window.origin;

    let growthbookJSX: any = null;
    const isProd = __DOT_ENV__ === 'master' || __DOT_ENV__ === 'production';

    if (__ENABLE_GROWTHBOOK__) {
      const growthbook = new GrowthBook({
        apiHost: __GROWTHBOOK_API_HOST__ || '',
        clientKey: __GROWTHBOOK_CLIENT_KEY__ || '',
        enableDevMode: !isProd || !!connectToDevTools,
        decryptionKey: '',
        plugins: [autoAttributesPlugin({ uuidAutoPersist: true })],
        navigateDelay: 50,
        navigate: growthBookUtils.navigateHandler,
        onFeatureUsage: (featureKey, result) => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'gb_feature',
              gb_feature_key: featureKey,
              gb_feature_value: result?.value,
            },
          });
        },
        trackingCallback: async (experiment, result) => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'experiment_viewed',
              experiment_id: experiment.key,
              variation_id: result.key,
            },
          });
        },
      });
      await growthbook.init({ timeout: 1000 });

      growthbookJSX = (
        <GrowthBookProviderWrapper growthbook={growthbook}>
          <HelmetProvider>{AppRoutes && <AppRoutes />}</HelmetProvider>
        </GrowthBookProviderWrapper>
      );
    }

    const Root = (): ReactElement => (
      <Provider store={store}>
        <SSRContextProvider>
          <BrowserRouter>
            <StableNavigateContextProvider>
              {(RaschProviders && <RaschProviders />) || null}
              <ApolloProvider client={apolloClient}>
                <>
                  {(AutoUpdateProvider && <AutoUpdateProvider />) || null}
                  {(__ENABLE_GROWTHBOOK__ && growthbookJSX) || (
                    <HelmetProvider>
                      {AppRoutes && <AppRoutes />}
                    </HelmetProvider>
                  )}
                </>
              </ApolloProvider>
            </StableNavigateContextProvider>
          </BrowserRouter>
        </SSRContextProvider>
      </Provider>
    );

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const render = () => require('./render').default(mountNode, Root);

    // Do the pre render passed function
    await preRender();

    // Remove the global image intersection observer defined in the template, if it's there
    if ('imageObserver' in global) {
      // @ts-ignore
      global.imageObserver.disconnect();
    }

    // Do the initial rendering.
    render();
  };

export default clientFactory;
