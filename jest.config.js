const app = process.env.APP || '';
const wasCommonTested = process.env.WAS_COMMON_DIRECTORY_TESTED || false;
const wasSharedTested = process.env.WAS_SHARED_DIRECTORY_TESTED || false;

const testMatch = [`<rootDir>/src/${app}/**/__tests__/**/*.(j|t)s?(x)`];

process.env.TZ = 'Europe/Zurich';

if (!wasCommonTested) {
  testMatch.push('<rootDir>/src/common/**/__tests__/**/*.(j|t)s?(x)');
}

if (!wasSharedTested) {
  testMatch.push('<rootDir>/src/shared/**/__tests__/**/*.(j|t)s?(x)');
}

module.exports = {
  clearMocks: true,
  // preset: 'ts-jest/presets/js-with-babel',
  coverageDirectory: `./coverage/coverage-${app}`,
  collectCoverageFrom: [
    `src/${app}/**/*.{js,jsx,ts,tsx}`,
    'src/common/**/*.{js,jsx,ts,tsx}',
    'src/shared/**/*.{js,jsx,ts,tsx}',
    `!src/${app}/screens/App/assets/**/*.{js,jsx,ts,tsx}`,
    `!src/${app}/public/**/*.{js,jsx,ts,tsx}`,
    `!src/**/typings.{js,jsx,ts,tsx}`,
    `!src/**/constants.{js,jsx,ts,tsx}`,
    `!src/**/queries.{js,jsx,ts,tsx}`,
    `!src/**/fragments.{js,jsx,ts,tsx}`,
    `!src/**/mutations.{js,jsx,ts,tsx}`,
    `!src/**/mockData.json`,
    '!src/shared/selectors/**/*.{js,jsx,ts,tsx}',
    '!src/common/assets/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageReporters: ['json-summary', 'json', 'lcov', 'html'],
  setupFiles: ['<rootDir>/config/jest/jsdomMocks.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTestEnv.js'],
  testMatch,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transform: {
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.(cjs|js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(cjs|js|jsx|ts|tsx)$',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  testTimeout: 10000,
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'ts',
    'tsx',
    'node',
  ],
  moduleDirectories: [
    `<rootDir>/src/${app}/screens/App/components`,
    `<rootDir>/src/${app}/screens/App/screens`,
    `<rootDir>/src/${app}/screens/App/assets/styles`,
    `<rootDir>/src/${app}/screens/App/assets`,
    `<rootDir>/src/${app}/screens`,
    `<rootDir>/src/${app}/entry`,
    `<rootDir>/src/${app}/i18n`,
    `<rootDir>/src/${app}/shared`,
    '<rootDir>/src/common/assets/styles',
    '<rootDir>/src/common/components',
    '<rootDir>/src/common/screens',
    '<rootDir>/src/common/entry',
    '<rootDir>/src/shared',
    'node_modules',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '\\.legacy.css$': 'identity-obj-proxy',
    '^((?!legacy).)*.css$': '<rootDir>/config/jest/styledJsxTransform.js',
    '^graphics/.*.svg$': '<rootDir>/config/jest/svgTransform.js',
    '\\.svg$': '<rootDir>/config/jest/svgrMock.js',
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __PRODUCTION__: true,
    __TESTING__: true,
    __APP_NAME__: 'test app',
    __AD_PUBLISHER__: 'localhost',
    __TAG_MANAGER_URL__: 'localhost',
    __TAG_MANAGER_URL_FR__: 'localhost',
    __USE_RASCH_AUTH_SERVICE__: true,
    __ALERTS_SERVICE_ENDPOINT__: 'alert-service-endpoint-domain',
    __BOOKMARKS_SERVICE_ENDPOINT__: 'bookmarks-service-endpoint-domain',
    __MEDIA_ASSETS_HOST__: '',
    __RECOS_ENDPOINT__: 'https://graphql.dev.service.beobachter.ch/graphql',
    __COMMERCE_SERVICE_ENDPOINT__: 'commerce-service-endpoint-domain',
    __WEBFORM_FILES_SERVICE_ENDPOINT__: 'commerce-service-endpoint-domain',
    __SAP_SERVICE_ENDPOINT__: 'sap-service-endpoint-domain',
    __DATATRANS_ENDPOINT__: 'datatrans-endpoint-domain',
    __AUTH0_CLIENT_ID__: 'auth0-client-id',
    __AUTH_SERVICE_URL__: '/',
    __AUTH0_SERVICES_URI__: 'https://myservices.publication.ch',
    __AUTH_LOGIN_OFFLINE_ENABLED__: false,
    __GRAPHQL_HOST__: 'https://api.testing.ch/graphql',
    __GRAPHQL_HOST_LOADER__: 'https://graphql.testing.ch/graphql',
    __PREVIEW_GRAPHQL_HOST__: 'https://api.preview.testing.ch/graphql',
    __PIANO_ALERT_ID__: 'test-piano-alert-id',
    __PIANO_AID__: 'test-piano-id',
    __PIANO_LOGIN_CASE__: 'test-piano-login-case',
    __PIANO_LOGIN_CASE_FULLNAME_REQUIRED__: 'test-piano-login-case',
    __PIANO_ENDPOINT__: 'test-piano-endpoint',
    __PIANO_ENV__: 'test-piano-env',
    __APP__: 'handelszeitung',
    __DOT_ENV__: 'stage',
    __PIANO_FORCE_DISABLE__: false,
    __PIANO_API_TOKEN__: 'test-piano-token-wime',
    __PIANO_CXENSE_ID__: 'test-piano-cxsense-id',
    __PIANO_AD_FREE_RESOURCES__:
      'test-ad-free-piano-resource-1 test-ad-free-piano-resource-2',
    __SOVENDUS_API_URL__: 'test-piano-appid-wime',
    __SOVENDUS_API_KEY__: 'test-api-key',
    __SOVENDUS_EXTERNAL_ID__: 'test-external-id',
    __TEALIUM_ACCOUNT__: 'rasch-account',
    __TEALIUM_PROFILE__: 'rasch-test',
    __TEALIUM_ENV__: 'test',
    __GA_SID__: 'test-ga-sid',
    OneSignal: [],
    __ONESIGNAL_APP_ID__: 'onesignal-test-app-id',
    __USE_STRICT_MODE__: true,
    __USE_DEBUG_TRACING__: true,
    __RINGIER_CONNECT_ENABLED__: true,
    __USE_LOCAL_ESI_PROCESSING__: true,
    __FI_BOX_SERVICE_ENDPOINT__: 'https://cdn.fi-box.stage.service.cash.ch',
    __FORCE_PREVIEW_REQUESTS__: false,
    __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID__:
      'web-app-manifest-related-application-play-id',
    __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL__:
      'web-app-manifest-related-application-play-url',
    __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__:
      'web-app-manifest-related-application-itunes-id',
    __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL__:
      'web-app-manifest-related-application-itunes-url',
    __HYBRID_APP_URL__: 'hybrid-app-url://mock-domain',
    __ONE_TRUST_ID__: 'd20e1003-3744-4615-890e-16d87ba43f8d-test',
    __BUILD_DATE_TIME__: new Date().toUTCString(),
    __FEATURES__: [],
    __VIAFOURA_DATE__: false,
    __ENABLE_GOOGLE_NEWS_SHOWCASE__: false,
    __ENABLE_GROWTHBOOK__: true,
    __WEB_PUSH_ENABLED__: true,
    __GROWTHBOOK_API_HOST__: 'https://api.growthbook.io',
    __GROWTHBOOK_CLIENT_KEY__: 'test-growthbook-client-key',
    __CENTINEL_ANALYTICA_SITE_KEY__: 'test-centinel-analytica-site-key',
  },
};
