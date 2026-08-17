#!/usr/bin/env node

/**
 * @file   generate-mocked-component.js
 * @author Finn Hediger <finn.hediger@ringieraxelspringer.ch>
 * @date   2022-11-14
 */

'use strict';

const fs = require('fs');
const chalk = require('chalk');
const commander = require('commander');
const getDirectories = require('./helpers/getAppDirectories');

commander
  .option('-a, --app [app]', 'App [string]')
  .option('-v, --verbose', 'Be more verbose [boolean]')
  .parse(process.argv);

const options = commander.opts();

const publications = options.app
  ? [options.app]
  : [...getDirectories(`${process.cwd()}/src`), 'common'];

const directories = publications.map((publication) => {
  if (publication === 'common') {
    return `src/${publication}`;
  }
  return `src/${publication}/screens/App`;
});

const getMockForComponent = (component) => `\
// 🚨 AUTO-GENERATED FILE! FEEL FREE TO UPDATE 🚨

import React from 'react';

const Mocked${component} = ({ children, ...props }) => (
  <div data-testid="mocked-${component.toLowerCase()}" {...props}>
    {children}
  </div>
);

export default Mocked${component};
`;

const handleErr = (err) => {
  console.log(
    chalk.red('Generating mock components failed! Check output for errors.'),
  );
  console.log(err);
  process.exit(1);
};

// write content to mock file
const writeMockFile = (path, component) => {
  if (fs.existsSync(`${path}/__mocks__`)) {
    // early return to not overwrite to already existing mock
    options.verbose &&
      console.log(chalk.yellow(`Ignoring ${path}, file already exists`));
    return;
  }

  try {
    fs.mkdirSync(`${path}/__mocks__`);
  } catch (err) {
    if (err.code != 'EEXIST') {
      handleErr(err);
    }
  }

  // write text to mock file
  fs.writeFile(
    `${path}/__mocks__/index.tsx`,
    getMockForComponent(component),
    (err) => {
      if (err) {
        handleErr(err);
      }
    },
  );
};

// loop over all files of a folder and it's components
// subdirectories and generate mock files
const handleFolder = (path) => {
  const content = fs.readdirSync(path);
  content.forEach((component) => {
    if (fs.lstatSync(`${path}/${component}`).isDirectory()) {
      if (path.includes('components')) {
        // for component directories
        handleComponent(path, component);
      } else {
        // for screen directories which may contain nested components
        handleFolder(`${path}/${component}`);
      }
    }
  });
};

// create the mock file and scan for component subdirectories
const handleComponent = (parent, component) => {
  const path = `${parent}/${component}`;
  const content = fs.readdirSync(path);
  if (content.includes('components')) {
    handleFolder(`${path}/components`);
  }
  writeMockFile(path, component);
};

// entrypoint
directories.forEach((directory) => {
  console.log(`Generating mock components for '${directory}' ...`);
  handleFolder(`${directory}/components`);
  handleFolder(`${directory}/screens`);
});

process.exitCode != 1 &&
  console.log(chalk.green('Generated requested mock components'));
