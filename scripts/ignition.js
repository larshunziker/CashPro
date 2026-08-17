#!/usr/bin/env node

/**
 * @file   ignition.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-09-26
 *
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const cp = require('child_process');
const getDirectories = require('./helpers/getAppDirectories');

// use .env.local file if available
require('dotenv').config({ path: '.env.local' });

// constants
const TYPE_BUILD = 'build';
const TYPE_BUILD_AUTHORIZE = 'build-authorize';
const TYPE_BUILD_INIT_THIRDPARTY = 'build-init-thirdparty';
const TYPE_BUILD_STANDALONES = 'build-standalones';
const TYPE_START = 'start';
const TYPE_PERSIST_GRAPHQL = 'persist-graphql';
const TYPE_PERSIST_GRAPHQL_BUILD = 'persist-graphql-build';
const TYPE_E2E_TESTS = 'e2e-tests';
const TYPE_TEST = 'test';
const TYPE_SINGLE_RUN_TEST = 'test-single';
const TYPE_SOURCEMAP_EXPLORER = 'sourcemap-explorer';
const TYPE_DEV = 'dev';
// const TYPE_CLINIC = 'clinic';

// directory which contains all runnable applications
const appDir = 'src';

// prepare args
const argv = process.argv.slice(2);

// we need at least a type on the ignition
if (argv.length < 1) {
  // eslint-disable-next-line no-console
  console.log(
    chalk`{red {bold Please provide at least a type on the arguments}}`,
  );
  process.exit(0);
}

// note:
// ----------------
// first arg = type
// other args = options (which are passed to child processes)
const getActionLabel = () => {
  const actionType = argv[0] || '';

  return (
    (actionType === `--${TYPE_BUILD}` && TYPE_BUILD) ||
    (actionType === `--${TYPE_BUILD_AUTHORIZE}` && TYPE_BUILD_AUTHORIZE) ||
    (actionType === `--${TYPE_BUILD_INIT_THIRDPARTY}` &&
      TYPE_BUILD_INIT_THIRDPARTY) ||
    (actionType === `--${TYPE_BUILD_STANDALONES}` && TYPE_BUILD_STANDALONES) ||
    (actionType === `--${TYPE_START}` && TYPE_START) ||
    (actionType === `--${TYPE_TEST}` && TYPE_TEST) ||
    (actionType === `--${TYPE_SINGLE_RUN_TEST}` && TYPE_SINGLE_RUN_TEST) ||
    (actionType === `--${TYPE_PERSIST_GRAPHQL}` && TYPE_PERSIST_GRAPHQL) ||
    (actionType === `--${TYPE_PERSIST_GRAPHQL_BUILD}` &&
      TYPE_PERSIST_GRAPHQL_BUILD) ||
    (actionType === `--${TYPE_E2E_TESTS}` && TYPE_E2E_TESTS) ||
    (actionType === `--${TYPE_SOURCEMAP_EXPLORER}` &&
      TYPE_SOURCEMAP_EXPLORER) ||
    // (actionType === `--${TYPE_CLINIC}` && TYPE_CLINIC) ||
    TYPE_DEV
  );
};

const appDirectories = getDirectories(`${process.cwd()}/${appDir}`);

// question object for prompting
const confirmDefaultApp = [
  {
    type: 'confirm',
    name: 'defaultApp',
    message: `Do you want to run your selected default app "${process.env.DEFAULT_APP}"?`,
  },
];

const selectApp = [
  {
    type: 'rawlist',
    name: 'app',
    message: `Please select your app:`,
    choices: () => appDirectories,
    filter: function (val) {
      return val.toLowerCase();
    },
  },
];

const selectDotEnv = [
  {
    type: 'rawlist',
    name: 'dotEnv',
    message: `Please select your env:`,
    choices: [
      'develop',
      'stage',
      'migration',
      'gql',
      'localhost',
      'performance',
      'update',
    ],
    default: 'develop',
  },
];

// runs next script
const runNextStep = () => {
  // make sure DOT_ENV is defined for some tasks
  const actionType = getActionLabel();

  // set env variable for profiling
  if (argv[1] && argv[1] === '--profile') {
    process.env.PROFILE = true;
  }

  if (
    (actionType === TYPE_BUILD ||
      actionType === TYPE_BUILD_AUTHORIZE ||
      actionType === TYPE_E2E_TESTS ||
      actionType === TYPE_PERSIST_GRAPHQL ||
      actionType === TYPE_DEV) &&
    !process.env.DOT_ENV
  ) {
    if (actionType === TYPE_E2E_TESTS) {
      // only localhost and stage are allowed for e2e tests
      // reduce selectDotEnv choices to localhost and stage
      selectDotEnv[0].choices = ['localhost', 'stage'];
    }
    inquirer.prompt(selectDotEnv).then(function (answers) {
      process.env.DOT_ENV = answers.dotEnv;
      runNextStep();
    });
    return;
  }

  // set env variable for NGINX (used in `dev` and `start`)
  if (argv[1] && argv[1] === '--nginx') {
    process.env.NGINX = true;
  }

  const script = `${actionType}.js`;

  // pass options forward but remove type
  const options = JSON.parse(JSON.stringify(argv));
  options.shift();

  const child = cp.fork(`${__dirname}/${script}`, options || []);

  child.on('close', (code) => {
    if (code > 0) {
      process.exit(1);
    }
  });
};

// sends prompt to client
const prompt = async () => {
  // is a default app set on .env.local? prompt if user wants to boot this one
  if (process.env.DEFAULT_APP) {
    const answer = await inquirer.prompt(confirmDefaultApp);
    if (answer.defaultApp) {
      process.env.APP = process.env.DEFAULT_APP;
      runNextStep();
      return;
    }
  }

  // otherwise provide a selection
  inquirer.prompt(selectApp).then(function (answers) {
    process.env.APP = answers.app;
    runNextStep();
  });
};

// on test:single try to guess app by parsing the relative path
if (getActionLabel() === TYPE_SINGLE_RUN_TEST && argv.length === 2) {
  const relativePath = argv[1];
  appDirectories.map((appDirectory) => {
    if (relativePath.indexOf(`src/${appDirectory}`) > -1) {
      process.env.APP = appDirectory;
    }
  });
}

// init
if (!process.env.APP && getActionLabel() !== TYPE_SINGLE_RUN_TEST) {
  prompt();
} else {
  runNextStep();
}
