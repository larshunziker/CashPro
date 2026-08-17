'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

// Set App
const app = process.env.APP || '';

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
}

const getPublicUrl = (appPackageJson) =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  dotenvApp: resolveApp(`src/${app}/.env`),
  appPath: resolveApp('.'),
  publicUrlOrPath: '/',
  appName: app,
  appBuild: resolveApp(`build/${app}/public`),
  appBuildStatic: resolveApp(`build/${app}/public/static`),
  serverEntry: 'server.js',
  appPublic: resolveApp(`src/${app}/public`),
  commonPublic: resolveApp('src/common/public'),
  appHtml: resolveApp('src/common/entry/template.dev.ejs'),
  appHtmlProd: resolveApp('src/common/entry/template.ejs'),
  appClientJs: resolveApp(`src/${app}/entry/client/index.tsx`),
  appServerRoot: resolveApp(`src/${app}/entry/server`),
  appServerJs: resolveApp(`src/${app}/entry/server/index.tsx`),
  standalonesAuthorize: resolveApp('src/common/standalones/Authorize'),
  appRoot: resolveApp(`src/${app}/screens/App`),
  appServerBinJs: resolveApp('src/core/server/server.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appServiceWorkerConfig: resolveApp(`src/${app}/shared/swConfig.tsx`),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  postCssMixins: resolveApp(`src/${app}/screens/App/assets/styles/mixins`),
  postCssVars: resolveApp(
    `src/${app}/screens/App/assets/styles/variables.legacy.css.js`,
  ),
  postCssCommonVars: resolveApp(
    'src/common/assets/styles/variables.legacy.css.js',
  ),
  appShared: resolveApp('src/shared'),
  appQueryMaps: resolveApp(`src/${app}/shared`),
  appQueryMapsFrontendName: 'queries-frontend.js',
  appQueryMapsBackendName: 'queries-backend.json',
  appI18n: resolveApp(`src/${app}/i18n`),
  appTsConfig: `${process.cwd()}/tsconfig.json`,
  circularDependencyOutput: `${process.cwd()}/logs/circular-dependencies/${app}`,
  appModules: [
    resolveApp(`src/${app}/screens`),
    resolveApp(`src/${app}/screens/App/components`),
    resolveApp(`src/${app}/screens/App/screens`),
    resolveApp(`src/${app}/entry`),
    resolveApp(`src/${app}/i18n`),
    resolveApp(`src/${app}/shared`),
    resolveApp('src/common/components'),
    resolveApp('src/common/screens'),
    resolveApp('src/common/entry'),
    resolveApp('src/common/public'),
    resolveApp('src/shared'),
    resolveApp('i18n'),
    'screens', // TODO: remove and fix imports
    'components', // TODO: remove and fix imports
    'assets', // TODO: remove and fix imports
  ],
};

module.exports.moduleFileExtensions = moduleFileExtensions;
