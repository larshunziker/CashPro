#!/usr/bin/env node

/**
 * @file   test.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-06-13
 *
 */

const chalk = require('chalk');
const cp = require('child_process');

const argv = process.argv.slice(2);

// set app
const appEnv = process.env.APP || '';
if (!appEnv) {
  process.exit(0);
}

// enable full-icu
process.env.NODE_ICU_DATA = process.cwd() + '/node_modules/full-icu';

console.log(chalk`{blue Starting unit tests for {bold ${appEnv}}}`);

// fork test runner
cp.fork(`${__dirname}/test-run.js`, [
  '--config=jest.config.js',
  '--env=jsdom',
  '--runInBand',
  '--silent',
  ...argv,
]);
