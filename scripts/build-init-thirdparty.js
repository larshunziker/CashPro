#!/usr/bin/env node

/**
 * @file   build init-thirdparty
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-27 09:17:10
 */

'use strict';

// get parent node_env
const isDevelopment = process.env.NODE_ENV === 'development';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
const paths = require('../config/paths');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.init-thirdparty');

const app = process.env.APP || '';

if (!app) {
  console.log('🚨 app env is not defined');
  process.exit();
}

const outputPath = `${paths.appBuildStatic}/js`;
const brandingDayCssFile = `${paths.appPublic}/branding-day-css.tsx`;
var brandingDayCssFileExists = false;

// get webpack config
let config = Object.assign(
  {
    entry: {
      ['init-thirdparty']: `${paths.commonPublic}/init-thirdparty.tsx`,
    },
    output: {
      filename: '[name].[contenthash:8].min.js',
      path: outputPath,
    },
  },
  webpackConfig,
);

if (fs.existsSync(brandingDayCssFile)) {
  brandingDayCssFileExists = !brandingDayCssFileExists;
  Object.assign(config.entry, { ['branding-day-css']: brandingDayCssFile });
}

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const messages = stats.toJson({ all: false, warnings: true, errors: true });

  if (messages.errors.length) {
    messages.errors.map((item) => console.log(`\n 🚨  ERROR: ${item.message}`));
    process.exit(1);
  }

  if (messages.warnings.length) {
    messages.warnings.map((item) =>
      console.log(`\n ️❗️  WARNING: ${item.message}`),
    );
  }

  const initThirdPartyFileName = `${Object.keys(stats.compilation.assets)[0]}`;
  const brandingDayFileName = brandingDayCssFileExists
    ? Object.keys(stats.compilation.assets)[1]
    : null;

  // since the init-thirdparty script was not generated during the build, we had to call the
  // build-init-thirdparty.js script twice to make sure it will definitely be generated in the public/static/js folder
  // the process.send function failed by the second call. Therefore we had to use this quick fix.
  // https://stackoverflow.com/questions/30585540/process-send-is-conditionally-defined-in-node-js/30585632
  process.send = process.send || function () {};
  process.send({ initThirdPartyFileName, brandingDayFileName });

  // copy file for dev mode
  if (isDevelopment) {
    fs.copyFileSync(
      `${outputPath}/${initThirdPartyFileName}`,
      `${paths.appPublic}/init-thirdparty.min.js`,
    );
    if (brandingDayCssFileExists) {
      fs.copyFileSync(
        `${outputPath}/${brandingDayFileName}`,
        `${paths.appPublic}/branding-day-css.min.js`,
      );
    }
  }
});
