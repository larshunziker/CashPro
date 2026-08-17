#!/usr/bin/env node

/**
 * @file   persist-graphql-all.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-16
 *
 */

const cp = require('child_process');
const chalk = require('chalk');
const getDirectories = require('./helpers/getAppDirectories');

const appDir = 'src';

// get all app directories
const directories = getDirectories(`${process.cwd()}/${appDir}`);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

let DOT_ENV = process.env.DOT_ENV || 'develop';

// update possible types once
async function main() {
  process.env.APP = 'cash'; // fetch possible types always from cash (gql service + cms)
  const updatePossibleTypes = require('./update-possible-types');
  await updatePossibleTypes();

  // create querymap for all apps
  directories.map((directory) => {
    cp.exec(
      'node ./scripts/persist-graphql.js',
      {
        env: Object.assign(process.env, {
          APP: directory,
          DOT_ENV: DOT_ENV,
          SKIP_POSSIBLE_TYPES: true,
        }),
      },
      (err, stdout) => {
        console.log(stdout);
        if (err) {
          console.log(
            chalk`{red Updating graphql querymap for app {bold ${directory}} on env {bold ${DOT_ENV}} failed! Check output the following error.}`,
          );
          console.log(err);
          process.exit(1);
          return;
        }
      },
    );
  });
}

main();
