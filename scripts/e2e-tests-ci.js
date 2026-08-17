#!/usr/bin/env node

const chalk = require('chalk');
const cp = require('child_process');
const getDirectories = require('./helpers/getAppDirectories');

const appDir = 'src';

// get all app directories
const directories = getDirectories(`${process.cwd()}/${appDir}`, {
  checkPrTitle: true,
});

async function runTests() {
  console.log(
    chalk`{blue Started e2e tests for {bold ${process.env.E2E_TEST_MATCH}...}}`,
  );
  let nodeOptions = '';
  if (process.env.CI && !process.env.CHANGE_TITLE) {
    nodeOptions = `
    export DD_CIVISIBILITY_AGENTLESS_ENABLED=${process.env.DD_CIVISIBILITY_AGENTLESS_ENABLED}
    export DD_API_KEY=${process.env.DD_API_KEY}
    export DD_SITE=${process.env.DD_SITE}
    export DD_ENV=${process.env.DD_ENV}
    export DD_SERVICE=${process.env.DD_SERVICE} 
    export NODE_OPTIONS="-r dd-trace/ci/init" 
    `;
  }

  return await new Promise((resolve, reject) => {
    // spawn + shell keeps the same exports as before; stdio inherit streams list output (exec buffered until exit).
    const child = cp.spawn('bash', ['-c', `${nodeOptions}npx playwright test`], {
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        console.log(
          chalk`{red Generating report for app {bold ${process.env.E2E_TEST_MATCH}} on env {bold ${process?.env?.BRANCH_NAME}} failed! Check output the following error.}`,
        );
        process.exit(code || 1);
        reject(new Error(`playwright exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
}

async function processApps(array) {
  // create from array a separated string by |
  const appEnv = array.join('|');
  process.env.E2E_TEST_MATCH = `/(${appEnv})/`;
  try {
    await runTests();
    // run tests sync
  } catch (e) {
    // stop further execution errors
    console.log(chalk`{red {bold Unit test(s) failed!} Check logs above.}`);
    process.exit(1);
  }
}

processApps(directories);
