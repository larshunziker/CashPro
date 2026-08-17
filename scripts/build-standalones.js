#!/usr/bin/env node

'use strict';

const cp = require('child_process');
const chalk = require('react-dev-utils/chalk');

console.log(chalk.blue(`Building standalone apps for ${process.env.APP}`));

// build init-thirdparty
cp.fork(`${__dirname}/build-init-thirdparty`);
// build authorize page
cp.fork(`${__dirname}/build-authorize`);
