#!/usr/bin/env node

/**
 * @file   authorize.js
 * @desc   use simple webpack config and create an authorize directory
 *         for selected application in the public directory
 */

'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('../config/env');

const paths = require('../config/paths');
const rimraf = require('rimraf');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const simpleWebpackConfig = require('../config/webpack.config.simple');

// define public path for authorize directory
const authorizePublicPath = `${paths.appPublic}/authorize`;

// get webpack config
const config = simpleWebpackConfig({
  entry: { index: `${paths.standalonesAuthorize}/index.tsx` },
  output: {
    filename: '[name].[contenthash:8].min.js',
    path: authorizePublicPath,
  },
});

// define html inject webpack plugin
config.plugins.push(
  new HtmlWebpackPlugin({
    inject: true,
    template: `!!raw-loader!${paths.standalonesAuthorize}/index.html`,
    filename: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  // Inlines the webpack runtime script. This script is too small to warrant
  // a network request.
  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
);

// remove existing files
rimraf.sync(authorizePublicPath);

// execute webpack
const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const messages = stats.toJson({ all: false, warnings: true, errors: true });

  if (messages.errors.length) {
    messages.errors.map((item) => console.log(`\n 🚨  ERROR: ${item.message}`));
  }

  if (messages.warnings.length) {
    messages.warnings.map((item) =>
      console.log(`\n ️❗️  WARNING: ${item.message}`),
    );
  }

  console.log('✅  authorize build completed');
});
