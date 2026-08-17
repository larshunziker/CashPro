#!/usr/bin/env node

const chalk = require('chalk');
const cp = require('child_process');

const argv = process.argv.slice(2);

// set app
const appEnv = process.env.APP || '';
if (!appEnv) {
  process.exit(0);
}

async function runTests(appEnv) {
  process.env.E2E_TEST_MATCH = `/(${appEnv})/`;
  console.log(chalk`{blue Started e2e tests for {bold ${appEnv}...}}`);
  const single = `${argv.join(' ')}`;
  process.env.DD_SITE = process.env.E2E_TEST_MATCH;
  let nodeOptions = '';
  if (process.env.CI) {
    nodeOptions = 'NODE_OPTIONS="-r dd-trace/ci/init" && ';
  }

  return await new Promise((resolve, reject) => {
    cp.exec(`${nodeOptions}npx playwright test ${single}`, (err, stdout) => {
      console.log(stdout);
      if (err) {
        console.log(
          chalk`{red Generating report for app {bold ${appEnv}} on env {bold ${process.env.DOT_ENV}} failed! Check output the following error.}`,
        );
        console.log(err);
        process.exit(1);
        reject();
        return;
      }
      resolve();
    });
  });
}

runTests(appEnv);
