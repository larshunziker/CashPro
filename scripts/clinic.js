#!/usr/bin/env node

/**
 * @file   clinic.js
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2019-03-07
 * 
 */

// NOTE: clinic was uninstall and has to be re-added if you want to use it!

const fs = require('fs');
const chalk = require('chalk');
const cp = require('child_process');
const inquirer = require('inquirer');
const paths = require('../config/paths');

const selectReport = [
  {
    type: 'list',
    name: 'report',
    message: `Please select a report:`,
    choices: () => ['doctor', 'flame', 'bubbleprof'],
    filter: val => val.toLowerCase(),
  },
];

inquirer.prompt(selectReport).then(answers => {
  // set app
  const appEnv = process.env.APP || '';
  console.log(chalk`{blue Starting Clinic run {bold ${appEnv}}}`);

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

  // run clinic
  cp.exec(
    `npx clinic ${answers.report} --on-port='autocannon -c100 http://localhost:${port}' --dest=clinic -- node ${paths.appBuild}/${paths.serverEntry} --viewsPath=${paths.appBuild} --port=${port}`,
    (err, stdout) => {
      console.log(stdout);
      if (err) {
        console.log(
          chalk`{red Generating report for app {bold ${directory}} on env {bold ${DOT_ENV}} failed! Check output the following error.}`,
        );
        console.log(err);
        process.exit(1);
        return;
      }
    },
  );
});
