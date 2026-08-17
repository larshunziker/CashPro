import { clientsClaim, setCacheNameDetails, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';

// define cache constants
const GRAPHQL_CACHE_NAME = 'graphql';
const APP_ASSETS_CACHE_NAME = 'app-assets';
const CMS_IMAGES_CACHE_NAME = 'images-dynamic';
const STATIC_FONTS_CACHE_NAME = 'fonts-static';
const STATIC_IMAGES_CACHE_NAME = 'images-static';
const FI_BOX_ASSETS_CACHE_NAME = 'fi-box-assets';

// define period constants
const DAY_IN_SECONDS = 60 * 60 * 24;
const WEEK_IN_SECONDS = DAY_IN_SECONDS * 7;
const MONTH_IN_SECONDS = WEEK_IN_SECONDS * 4;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;

/* @ts-ignore TODO: TS7031 ->  Binding element 'prefix' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'version' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'domain' implicitly has an 'any' type. */
const swConfigFactory = ({ prefix, version, domain, debug = false }) => {
  // configuration
  setCacheNameDetails({
    prefix,
    suffix: version,
    precache: 'precache',
    runtime: 'runtime',
  });

  if (debug) {
    // init and claim
    skipWaiting();
    clientsClaim();
  }

  // cache fi-box assets cache first, invalidate after 1y (hashed files)
  registerRoute(
    new RegExp(
      `https:\/\/cdn.fi-box.(stage.)?service.cash.ch\/(themes|sites)\/.*\.(css|woff|js).*`,
    ),
    new CacheFirst({
      cacheName: `${prefix}-${FI_BOX_ASSETS_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: YEAR_IN_SECONDS,
          maxEntries: 50,
        }),
      ],
    }),
  );

  // cache graphql requests network first, invalidate after 1d
  registerRoute(
    new RegExp(
      `https:\/\/api.(dev.|stage.)?${domain}\/graphql(?!.*Comment|.*GetLatestTickerArticles)`,
    ),
    new NetworkFirst({
      cacheName: `${prefix}-${GRAPHQL_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: DAY_IN_SECONDS,
          maxEntries: 50,
        }),
      ],
    }),
  );

  // cache new graphql endpoint
  registerRoute(
    new RegExp(
      `https:\/\/graphql.ws.(develop.|stage.)?ringieraxelspringer.ch\/*`,
    ),
    new NetworkFirst({
      cacheName: `${prefix}-${GRAPHQL_CACHE_NAME}-ws-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: DAY_IN_SECONDS,
          maxEntries: 50,
        }),
      ],
    }),
  );

  // cache app assets cache first, invalidate after 1y (hashed files)
  registerRoute(
    // cache js and css files from static cache first, invalidate after 1y (hashed files)
    new RegExp(`\/static\/.*.[a-f0-9]{8}.*.(js|css)$`),
    new CacheFirst({
      cacheName: `${prefix}-${APP_ASSETS_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: YEAR_IN_SECONDS,
          maxEntries: 50,
        }),
      ],
    }),
  );

  // cache woff2 fonts from static cache first, invalidate after 1m (hashed files)
  registerRoute(
    new RegExp(`\/static\/media\/.*.woff2`),
    new CacheFirst({
      cacheName: `${prefix}-${STATIC_FONTS_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: MONTH_IN_SECONDS,
          maxEntries: 100,
        }),
      ],
    }),
  );

  // cache images from static cache first, invalidate after 1m (hashed files)
  registerRoute(
    new RegExp(`\/static\/media\/.*.(jpg|jpeg|svg|gif|png)`),
    new CacheFirst({
      cacheName: `${prefix}-${STATIC_IMAGES_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: MONTH_IN_SECONDS,
          maxEntries: 100,
        }),
      ],
    }),
  );

  // cache images only from CMS stale while revalidate, invalidate after 1w
  registerRoute(
    new RegExp(
      `https:\/\/(cdn|api).(develop.|stage.)?${domain}\/sites\/default\/files\/.*\.(?!json$).*`,
    ),
    new StaleWhileRevalidate({
      cacheName: `${prefix}-${CMS_IMAGES_CACHE_NAME}-v${version}`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: WEEK_IN_SECONDS,
          maxEntries: 100,
        }),
      ],
    }),
  );

  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      // @ts-ignore
      self.skipWaiting();
    }
  });

  self.addEventListener('activate', (event) => {
    // cleanup stale caches to free up quota
    cleanupOutdatedCaches();

    // before activate the new SW we remove all the legacy
    // cache keys created by a previous worker
    // @ts-ignore
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key.indexOf(version) === -1) {
              return caches.delete(key);
            }
          }),
        );
      }),
    );
  });

  // add precaching definitions
  // @ts-ignore
  // eslint-disable-next-line
  const mf = self.__WB_MANIFEST;
  // precacheAndRoute(mf); DON'T USE THIS, IT WILL PRECACHE EVERYTHING
};

export default swConfigFactory;
