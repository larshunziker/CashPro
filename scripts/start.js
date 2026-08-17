#!/usr/bin/env node

/**
 * @file   start.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-09-26
 *
 */

const fs = require('fs');
const chalk = require('chalk');
const cp = require('child_process');
const paths = require('../config/paths');

// set app
const appEnv = process.env.APP || '';
console.log(chalk`{blue Starting Build {bold ${appEnv}}}`);

// set port
const port = process.env.PORT || 3000;

// check if app is builded
if (!fs.existsSync(paths.appBuild)) {
  console.log(
    chalk`{red Run '{bold yarn run build}' first to create build for app "{bold ${appEnv}}"}!`,
  );
  process.exit(0);
}

// set path to icu files
process.env.NODE_ICU_DATA = './node_modules/full-icu';
process.env.TZ = 'Europe/Zurich';

// build and run nginx
if (process.env.NGINX) {
  console.log(__dirname);
  cp.exec(`node ${__dirname}/nginx`);
}

// create server
cp.fork(
  `${paths.appBuild}/${paths.serverEntry}`,
  [`--viewsPath=${paths.appBuild}`, `--port=${port}`],
  { execArgv: [`--enable-source-maps`] },
);
