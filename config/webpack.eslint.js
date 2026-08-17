const path = require('path');
const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const paths = require('./paths');
const aliases = require('./aliases');

module.exports = {
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules, ...paths.appModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH?.split(path.delimiter).filter(Boolean) || [],
    ),

    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.js', '.json', '.jsx'],
    alias: aliases,
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false),
      __DEVELOPMENT__: JSON.stringify(false),
      __PRODUCTION__: JSON.stringify(true),
      __TESTING__: JSON.stringify(false),
      __APP_NAME__: JSON.stringify(paths.appName),
      __AD_PUBLISHER__: JSON.stringify(process.env.AD_PUBLISHER),
      __TAG_MANAGER_URL__: JSON.stringify(process.env.TAG_MANAGER_URL),
      __TAG_MANAGER_URL_FR__: JSON.stringify(process.env.TAG_MANAGER_URL_FR),
      __GRAPHQL_HOST_LOADER__: JSON.stringify(process.env.GRAPHQL_HOST_LOADER),
      __USE_STRICT_MODE__: process.env.USE_STRICT_MODE || false,
      __USE_DEBUG_TRACING__:
        (process.env.USE_DEBUG_TRACING === 'true' &&
          (process.env.DOT_ENV === 'develop' ||
            process.env.DOT_ENV === 'local' ||
            process.env.DOT_ENV === 'stage')) ||
        false,
      __RINGIER_CONNECT_ENABLED__: process.env.RINGIER_CONNECT_ENABLED || true,
    }),
  ],
};
