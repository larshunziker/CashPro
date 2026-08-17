const chalk = require('chalk');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');
const { getSharedConfigFactory } = require('./webpack.config.shared');
const { ENV_PRODUCTION } = require('./webpack.helpers');

// -------------------------------------------------------------------------------------

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
const clientConfig = getSharedConfigFactory({
  webpackEnv: ENV_PRODUCTION,
  isTargetNodeJs: false,
});

// enable profiling
if (process.env.PROFILE) {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow.bold('Running client build with profiling'));

  clientConfig.resolve.alias = {
    ...clientConfig.resolve.alias,
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  };
}

// -------------------------------------------------------------------------------------

// use client config as base and change needed parts to match the
// node configuration
const serverConfig = getSharedConfigFactory({
  webpackEnv: ENV_PRODUCTION,
  isTargetNodeJs: true,
});

// define plugins values
serverConfig.plugins.push(
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),

  // Copy webfonts into static directory on build
  new CopyWebpackPlugin({
    patterns: [
      {
        from: `${paths.appRoot}/assets/webfonts/`,
        to: 'static/webfonts/',
        noErrorOnMissing: true,
        globOptions: { ignore: ['**/.gitkeep'] },
      },
    ],
  }),

  // Copy static data directory
  new CopyWebpackPlugin({
    patterns: [
      {
        from: `${paths.appRoot}/assets/data/`,
        to: 'static/data/',
        noErrorOnMissing: true,
        globOptions: { ignore: ['**/.gitkeep'] },
      },
    ],
  }),
);

module.exports = [clientConfig, serverConfig];
