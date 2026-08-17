'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

// map NODE_ENV to DOT_ENV files (branch names in the .env folders within each app)
let DOT_ENV = process.env.DOT_ENV;
if (!DOT_ENV) {
  DOT_ENV = NODE_ENV === 'production' ? 'master' : 'develop';
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenvApp}/.env.${NODE_ENV}.local`,
  `${paths.dotenvApp}/.env.${NODE_ENV}`,
  `${paths.dotenvApp}/.env.${DOT_ENV}.local`,
  `${paths.dotenvApp}/.env.${DOT_ENV}`,
  `${paths.dotenvApp}/.env.local`,

  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV,

        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,

        __APP__: process.env.APP,
        __DOT_ENV__: process.env.DOT_ENV,

        // Graphql env vars
        __DEFAULT_GRAPHQL_ENDPOINT__:
          process.env.DEFAULT_GRAPHQL_ENDPOINT || 'cms',
        __CMS_GRAPHQL_HOST__: process.env.CMS_GRAPHQL_HOST,
        __GRAPHQL_HOST_LOADER__: process.env.GRAPHQL_HOST_LOADER,
        __CMS_PREVIEW_GRAPHQL_HOST__: process.env.CMS_PREVIEW_GRAPHQL_HOST,
        __GRAPHQL_HOST__: process.env.GRAPHQL_HOST,
        __GRAPHQL_ORIGIN__: process.env.GRAPHQL_ORIGIN,
        __GRAPHQL_FORCE_POST__: process.env.GRAPHQL_FORCE_POST,
        __PREVIEW_GRAPHQL_HOST__: process.env.PREVIEW_GRAPHQL_HOST || '',

        // auth0 env vars
        __USE_RASCH_AUTH_SERVICE__: process.env.USE_RASCH_AUTH_SERVICE,
        __AUTH0_CLIENT_ID__: process.env.AUTH0_CLIENT_ID,
        __AUTH_SERVICE_URL__: process.env.AUTH_SERVICE_URL,
        __AUTH0_SERVICES_URI__: process.env.AUTH0_SERVICES_URI,
        __AUTH_LOGIN_OFFLINE_ENABLED__:
          process.env.AUTH_LOGIN_OFFLINE_ENABLED || false,
        __FI_BOX_SERVICE_ENDPOINT__: process.env.FI_BOX_SERVICE_ENDPOINT,

        // alerts service vars
        __ALERTS_SERVICE_ENDPOINT__: process.env.ALERTS_SERVICE_ENDPOINT,

        // bookmarks service vars
        __BOOKMARKS_SERVICE_ENDPOINT__: process.env.BOOKMARKS_SERVICE_ENDPOINT,

        // recos service vars
        __RECOS_ENDPOINT__: process.env.RECOS_ENDPOINT,

        // commerve service vars
        __COMMERCE_SERVICE_ENDPOINT__: process.env.COMMERCE_SERVICE_ENDPOINT,

        __LEGAL_ADVICE_SEARCH_ENDPOINT__:
          process.env.LEGAL_ADVICE_SEARCH_ENDPOINT,
        __ATTACHMENTS_ENDPOINT__: process.env.ATTACHMENTS_ENDPOINT,

        // datatrans service vars
        _DATATRANS_ENDPOINT_: process.env.DATATRANS_ENDPOINT,

        // media host
        __MEDIA_ASSETS_HOST__: process.env.MEDIA_ASSETS_HOST,

        // piano env vars
        __PIANO_ALERT_ID__: process.env.PIANO_ALERT_ID,
        __PIANO_AID__: process.env.PIANO_AID,
        __PIANO_LOGIN_CASE__: process.env.PIANO_LOGIN_CASE,
        __PIANO_LOGIN_CASE_FULLNAME_REQUIRED__:
          process.env.PIANO_LOGIN_CASE_FULLNAME_REQUIRED,
        __PIANO_ENDPOINT: process.env.PIANO_ENDPOINT,
        __PIANO_ENV__: process.env.DOT_ENV,
        __PIANO_FORCE_DISABLE__: process.env.PIANO_FORCE_DISABLE,
        __PIANO_AD_FREE_RESOURCES__: process.env.PIANO_AD_FREE_RESOURCES,

        // piano service for address manipulation
        __PIANO_SERVICE_ENDPOINT__: process.env.PIANO_SERVICE_ENDPOINT,

        __FORCE_PREVIEW_REQUESTS__: process.env.FORCE_PREVIEW_REQUESTS,

        // tealium env vars
        __TEALIUM_ACCOUNT__: process.env.TEALIUM_ACCOUNT,
        __TEALIUM_PROFILE__: process.env.TEALIUM_PROFILE,
        __TEALIUM_ENV__: process.env.TEALIUM_ENV,

        // google analytics env vars
        __GA_SID__: process.env.GA_SID,

        // GTM
        __GTM_AUTH__: process.env.GTM_AUTH,
        __GTM_PREVIEW__: process.env.GTM_PREVIEW,

        // OneSignal app id
        __ONESIGNAL_APP_ID__: process.env.ONESIGNAL_APP_ID || false,
        __DEV_ONESIGNAL_APP_ID__: process.env.DEV_ONESIGNAL_APP_ID || false,
        // OneSignal Web Push killswitch — coerced to a real boolean so that
        // unset or any non-`true` value disables initialization. Aligns with
        // the same key in `config/webpack.global.variables.js`.
        __WEB_PUSH_ENABLED__: process.env.WEB_PUSH_ENABLED === 'true',

        // appnexus
        __AD_PUBLISHER__: process.env.AD_PUBLISHER,
        __TAG_MANAGER_URL__: process.env.TAG_MANAGER_URL,
        __TAG_MANAGER_URL_FR__: process.env.TAG_MANAGER_URL_FR,

        // React.StrictMode
        __USE_STRICT_MODE__: process.env.USE_STRICT_MODE,

        // Debug
        __USE_DEBUG_TRACING__: process.env.USE_DEBUG_TRACING,

        // RC Ringier Connect (SSO)
        __RINGIER_CONNECT_ENABLED__: process.env.RINGIER_CONNECT_ENABLED,
        // Datadog RUM
        __DATADOG_CLIENT_TOKEN__: process.env.DATADOG_CLIENT_TOKEN,
        __DATADOG_APP_ID__: process.env.DATADOG_APP_ID,
        __DATADOG_SERVICE_NAME__: process.env.DATADOG_SERVICE_NAME,
        __DATADOG_ENV__: process.env.DATADOG_ENV,
        __DATADOG_SAMPLE_RATE__: process.env.DATADOG_SAMPLE_RATE,
        __DATADOG_APP_VERSION__: `${
          process.env.LAGOON_GIT_BRANCH || 'nobranch'
        }:${process.env.LAGOON_GIT_SHA || 'nosha'}`,

        // Related Native Applications
        __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID__:
          process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID,
        __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL__:
          process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL,
        __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__:
          process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID,
        __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL__:
          process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL,
        __HYBRID_APP_URL__: process.env.HYBRID_APP_URL,

        // OneTrust ID.
        __ONE_TRUST_ID__: process.env.ONE_TRUST_ID,

        __FEATURES__: process.env.FEATURES,

        // Google News Showcase
        __ENABLE_GOOGLE_NEWS_SHOWCASE__:
          process.env.ENABLE_GOOGLE_NEWS_SHOWCASE,

        // GrowthBook
        __ENABLE_GROWTHBOOK__: process.env.ENABLE_GROWTHBOOK,
        __GROWTHBOOK_API_HOST__: process.env.GROWTHBOOK_API_HOST,
        __GROWTHBOOK_CLIENT_KEY__: process.env.GROWTHBOOK_CLIENT_KEY,

        // AIAIChat
        __AIAICHAT_KEY__: process.env.AIAICHAT_KEY,
        __VIAFOURA_DATE__: process.env.VIAFOURA_DATE,
        __NEWSLETTER_LOGIN_IFRAME__: process.env.NEWSLETTER_LOGIN_IFRAME,
        __NEWSLETTER_LOGOUT_IFRAME__: process.env.NEWSLETTER_LOGOUT_IFRAME,

        // GM FR Home Node ID
        __FR_HOME_NODE_ID__: process.env.FR_HOME_NODE_ID,

        // Centinel Analytica
        __CENTINEL_ANALYTICA_SITE_KEY__:
          process.env.CENTINEL_ANALYTICA_SITE_KEY,
      },
    );

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  /* if (
		process.env.NODE_ENV !== 'development' &&
		stringified['process.env'].__GRAPHQL_FORCE_POST__
	) {
		throw new Error(
			'GRAPHQL_FORCE_POST may not be set in production! Aborting.',
		);
	} */

  return {
    raw,
    stringified,
  };
}

module.exports = getClientEnvironment;
