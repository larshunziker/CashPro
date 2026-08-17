#!/usr/bin/env node

/**
 * @file   test-ci.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-06-13
 *
 */

const chalk = require('chalk');
const cp = require('child_process');
const getDirectories = require('./helpers/getAppDirectories');

const argv = process.argv.slice(2);

const appDir = 'src';

// enable full-icu
process.env.NODE_ICU_DATA = './node_modules/full-icu';

// get all app directories
const directories = getDirectories(`${process.cwd()}/${appDir}`, {
  checkPrTitle: true,
});

const options = ['--config=jest.config.js', '--silent', '--bail', '--ci'];

// changed maxWorkers to 4 because of an issue with tests running on the CI
if (process.env.LAGOON) {
  console.log(chalk`{blue Using {bold 50%}} workers`);
  options.push('--maxWorkers=50%');
  // options.push('--runInBand');
  options.push('--logHeapUsage');
} else {
  console.log(chalk`{blue Using {bold 4} workers}`);
  options.push('--maxWorkers=4');
  options.push('--coverage');
}

async function runTests(appEnv) {
  process.env.APP = appEnv;
  console.log(chalk`{blue Started unit tests for {bold ${appEnv}...}}`);

  return await new Promise((resolve, reject) => {
    const child = cp.fork(
      `${__dirname}/test-run.js`,
      options,
      // { silent: true },
    );
    child.on('exit', (code) => {
      code ? reject() : resolve();
    });
  });
}

async function processApps(array) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    try {
      // run tests sync
      await runTests(item);
      if (i === 0) {
        process.env.WAS_COMMON_DIRECTORY_TESTED = true;
        process.env.WAS_SHARED_DIRECTORY_TESTED = true;
      }
    } catch (e) {
      // stop further execution errors
      console.log(chalk`{red {bold Unit test(s) failed!} Check logs above.}`);
      process.exit(1);
    }
  }
}

processApps(directories);
