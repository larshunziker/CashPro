#!/usr/bin/env node

/**
 * @file   test-single.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2019-01-30
 * 
 */

const chalk = require('chalk');
const cp = require('child_process');

// prepare args
const argv = process.argv.slice(2);

// set app
const appEnv = process.env.APP || null;
const appEnvLog = (appEnv && `for ${appEnv}`) || '';

// enable full-icu
process.env.NODE_ICU_DATA = process.cwd() + '/node_modules/full-icu';

console.log(chalk`{blue Starting single unit test {bold ${appEnvLog}}}`);
console.log(chalk`{white > running file "${argv[0] || ''}"}`);

// fork test runner
cp.fork(`${__dirname}/test-run.js`, ['--config=jest.config.js', ...argv]);
