import { ApolloClient, InMemoryCache } from '@apollo/client';
import raf from 'raf';
import connectToDevTools from './helpers/connectToDevTools';
import { log } from './helpers/utils';
import rasApolloLinks from './rasApolloLinks';

// We init the cache and hydrate in a setTimeout and a requestAnimationFrame.
// This is to somewhat simulate the behaviour of a fully async hydration in
// an inline hydration by deferring the needed calculations by at least one frame
// and therefore not block anything that might need to happen earlier.
/* @ts-ignore TODO: TS7031 ->  Binding element 'generateApolloCache' implicitly has an 'any' type. */
const initCache = ({ generateApolloCache }): Promise<InMemoryCache> =>
  new Promise((resolve) => {
    if (__DEVELOPMENT__) {
      resolve(generateApolloCache());
      return;
    }

    setTimeout(() => {
      raf(() => {
        let isHydrated = false;
        let state = {};
        const hydrationDataEl =
          document && document.querySelector('#hydrationdata');

        if (__CLIENT__ && hydrationDataEl) {
          let initialState;
          /**
           * hydrate if the script is executed when then page is already loaded
           */
          if (
            (document.readyState === 'complete' ||
              document.readyState === 'interactive') &&
            !isHydrated
          ) {
            try {
              const hydrationPayload = hydrationDataEl.innerHTML.trim();
              // Only base64 decode and parse JSON, with proper UTF-8 handling
              const decoded = decodeBase64UTF8(hydrationPayload);
              initialState = JSON.parse(decoded);
              state = initialState.state;
              const cache = generateApolloCache(state);
              isHydrated = true;
              resolve(cache);
              return;
            } catch (e) {
              // eslint-disable-next-line
              console.error(
                'failed to parse hydration data: readyState = complete',
                e,
                hydrationDataEl.innerHTML,
              );
              resolve(generateApolloCache());
              return;
            }
          }

          document.addEventListener('readystatechange', () => {
            if (
              (document.readyState === 'interactive' ||
                document.readyState === 'complete') &&
              !isHydrated
            ) {
              try {
                const hydrationPayload = hydrationDataEl.innerHTML.trim();
                const decoded = decodeBase64UTF8(hydrationPayload);
                initialState = JSON.parse(decoded);
              } catch (e) {
                // eslint-disable-next-line
                console.error(
                  'parsing hydration data failed',
                  e,
                  hydrationDataEl.innerHTML,
                );
                // return empty cache
                resolve(generateApolloCache());
                return;
              }
              state = initialState.state;
              log(
                'asyncConfigureApolloClient',
                [
                  'state',
                  state,
                  'global.apolloInitialErrorStatus',
                  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                  global.apolloInitialErrorStatus,
                ],
                'green',
              );
              const cache = generateApolloCache(state);
              isHydrated = true;

              resolve(cache);
            }
          });
        }

        // hydrate apollo BE error state apolloInlineErrorState
        if (__CLIENT__ && window.__APOLLO_STATE__) {
          const initialState = JSON.parse(window.__APOLLO_STATE__);
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.apolloInitialErrorStatus = initialState.statusCode;
          state = initialState.state;
          const cache = generateApolloCache(state);
          resolve(cache);
        }
      });
    }, 0);
  });

const apolloClient: any = async (
  apiUri: string,
  apiOrigin: string,
  host: string,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'generateApolloCache' implicitly has an 'any' type. */
  generateApolloCache,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '() => any'. */
  fetchAfterware: () => any | null = null,
  headers = {},
) => {
  const cache = await initCache({ generateApolloCache });

  // create client
  return new ApolloClient({
    ssrMode: false,
    ssrForceFetchDelay: 0,
    /* @ts-ignore TODO: TS2322 ->  Type 'boolean | ""' is not assignable to type 'boolean | undefined'. */
    connectToDevTools,
    link: rasApolloLinks({
      uri: apiUri,
      apiOrigin,
      host,
      fetchAfterware,
      headers,
    }),
    cache,
  });
};

// Utility: decode base64 to UTF-8 string
function decodeBase64UTF8(b64: string): string {
  try {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder('utf-8').decode(
        new Uint8Array(Array.from(atob(b64), (c) => c.charCodeAt(0))),
      );
    } else {
      // Fallback for environments without TextDecoder (legacy browsers)
      // Note: escape is deprecated but works for most BMP Unicode
      // This will not work for all Unicode (e.g., emoji, non-BMP)
      return decodeURIComponent(escape(atob(b64)));
    }
  } catch (e) {
    // If not base64, fallback to raw string
    return b64;
  }
}

export default apolloClient;
