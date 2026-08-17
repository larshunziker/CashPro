#!/usr/bin/env node

/**
 * @file   styles typedef.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2019-12-16
 */

'use strict';

const DtsCreator = require('typed-css-modules').default;
const glob = require('glob');
const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

const creator = new DtsCreator();

const handleFile = async (filePath) => {
  // TODO: make sure the output is formatted using prettier and eslint
  return creator
    .create(filePath)
    .then((content) => {
      console.log(chalk.green.bold('Typing definition(s) created 😎'));
      content.writeFile(
        (definition) =>
          '// 🚨 AUTO-GENERATED FILE! DO NOT UPDATE MANUALLY 🚨 \n\n' +
          definition,
      );
    })
    .catch((error) => console.log(chalk.red.bold('Creation failed: ' + error)));
};

program.option('-p, --path [path]');
const options = program.opts();
program.parse(process.argv);

const { path } = options;

if (path) {
  console.log(chalk.blue('Run cmd against a single file: "' + path + '"'));

  if (!fs.existsSync(path)) {
    console.log(chalk.red.bold('File not found!'));
    process.exit(0);
  }

  handleFile(path);
} else {
  // if no path is provided, use the default glob for create typing
  // definitions for all `.css` files (exclude `.legacy.css` files)
  glob('src/**/!(*.legacy).css', {}, (error, filePaths) => {
    if (filePaths) {
      for (const filePath of filePaths) {
        handleFile(filePath);
      }
    }
  });
}
