#!/usr/bin/env node

/**
 * @file   sourcemap-explorer.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-09-26
 * 
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const onFinished = require('on-finished');
const cp = require('child_process');
const paths = require('../config/paths');

// set app
const appEnv = process.env.APP || '';
console.log(chalk`{blue Preparing sourcemap explorer for {bold ${appEnv}}}`);

// check if app is builded
if (!fs.existsSync(paths.appBuild)) {
  console.log(
    chalk`{red Run '{bold yarn run build}' first to create build for app "{bold ${appEnv}}"}!`,
  );
  process.exit(0);
}

const src = `${paths.appBuild}/static/js`;

// run sourcemap explorer for main bundle
cp.exec(`./node_modules/.bin/source-map-explorer ${src}/*.*.js`);
