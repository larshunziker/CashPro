#!/usr/bin/env node

'use strict';

const { exec } = require('child_process');
const glob = require('glob');
const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');
const getDirectories = require('./helpers/getAppDirectories');
const appDirectories = getDirectories(`${process.cwd()}/src`);

program.option('-p, --app [app]');
const options = program.opts();
program.parse(process.argv);

function handleWrite(err, app) {
  if (err) {
    console.log(chalk`{red File write failed for {bold ${app}}!}`);
    process.exit(1);
    return;
  }

  console.log(chalk` {green Creating styleguide for {bold ${app}}.}`);
}

const contentJsx = (app) => `/* istanbul ignore file */

// 🚨 AUTO-GENERATED FILE! DO NOT UPDATE MANUALLY - PARAGRAPHS 🚨
// ✅ use 'yarn styleguide --app ${app}' instead
// @ts-nocheck
import React, { ReactElement } from 'react';
XXX__IMPORT__XXXXXX__IMPORT_MOCK_DATA__XXX
const StyleguildeParagraphs = (): ReactElement => {
  return (
    <>
      XXX__RENDER_STYLEGUIDE_PARAGRAPHS__XXX
    </>
  );
};

export default StyleguildeParagraphs;
`;

const generateImport = (file, path) => `import ${file} from '${path}';\n`;
const generateTitle = (componentName) =>
  `<h2 className="component-${componentName}">${componentName}</h2>`;
const generateComponent = (componentName, mockDataName) =>
  `<div className="component-${componentName}"><${componentName} {...${mockDataName}} /></div>`;

const getMockDataName = (componentName) => {
  let mockDataName = `${componentName}MockData`;
  return mockDataName.charAt(0).toLowerCase() + mockDataName.slice(1);
};

const isWorkingMinistage = (componentName) =>
  !['MinistageGuider', 'MinistageNewsletter', 'MinistageTeaser'].includes(
    componentName,
  );

const getMockDataPath = (relativePath, componentPath, subPath = '') => {
  let mockDataRelativePath = '';
  const componentName = componentPath.split('/').pop();
  const mockDataPath = `${componentPath}/__tests__/mockData.json`;
  const mockDataCommonPath = `src/common/components/Paragraphs/components/${subPath}${componentName}/__tests__/mockData.json`;

  if (fs.existsSync(mockDataPath)) {
    mockDataRelativePath = `${relativePath}/__tests__/mockData.json`;
  } else if (fs.existsSync(mockDataCommonPath)) {
    mockDataRelativePath = `../../../../../../../common/components/Paragraphs/components/${subPath}${componentName}/__tests__/mockData.json`;
  }
  return mockDataRelativePath;
};

const createStyleGuideComponents = (app) => {
  const styleguidePath = `src/${app}/screens/App/screens/Styleguide`;
  if (!fs.existsSync(styleguidePath)) {
    fs.mkdirSync(styleguidePath);
  }
  if (!fs.existsSync(`${styleguidePath}/components`)) {
    fs.mkdirSync(`${styleguidePath}/components`);
  }
  if (!fs.existsSync(`${styleguidePath}/components/Paragraphs`)) {
    fs.mkdirSync(`${styleguidePath}/components/Paragraphs`);
  }
};

const getContent = (app, imports, mockDataImports, components) =>
  contentJsx(app)
    .replace('XXX__IMPORT__XXX', `${imports.join('')}`)
    .replace('XXX__IMPORT_MOCK_DATA__XXX', `${mockDataImports.join('')}`)
    .replace(
      'XXX__RENDER_STYLEGUIDE_PARAGRAPHS__XXX',
      `${components.join('\n      ')}`,
    );

const generateFile = (app, imports, mockDataImports, components) => {
  fs.writeFile(
    `src/${app}/screens/App/screens/Styleguide/components/Paragraphs/index.tsx`,
    getContent(app, imports, mockDataImports, components),
    (error) => handleWrite(error, app),
  );
};

const handleFile = async (app) => {
  const paragraphsPath = `src/${app}/screens/App/components/Paragraphs/components`;
  const ministagePath = `${paragraphsPath}/MinistageParagraph/components`;
  let imports = [];
  let mockDataImports = [];
  let components = [];
  let paragraphs = glob.sync(`${paragraphsPath}/*`);
  let ministages = glob.sync(`${ministagePath}/*`);

  paragraphs.forEach((componentPath) => {
    const componentName = componentPath.split('/').pop();
    const relativePath = `../../../../${componentPath.split('/App/').pop()}`;
    const mockDataName = getMockDataName(componentName);
    const mockDataPath = getMockDataPath(relativePath, componentPath);

    if (mockDataPath && componentName !== 'ParagraphsRenderer') {
      imports.push(generateImport(componentName, relativePath));
      mockDataImports.push(generateImport(mockDataName, mockDataPath));
      components.push(generateTitle(componentName));
      components.push(generateComponent(componentName, mockDataName));
    }
  });

  ministages.forEach((componentPath) => {
    const subPath = 'MinistageParagraph/components/';
    const componentName = componentPath.split('/').pop();
    const relativePath = `../../../../${componentPath.split('/App/').pop()}`;
    const mockDataName = getMockDataName(componentName);
    const mockDataPath = getMockDataPath(relativePath, componentPath, subPath);

    if (mockDataPath && isWorkingMinistage(componentName)) {
      imports.push(generateImport(componentName, relativePath));
      mockDataImports.push(generateImport(mockDataName, mockDataPath));
      components.push(generateTitle(componentName));
      components.push(generateComponent(componentName, mockDataName));
    }
  });

  if (imports.length < 1) {
    console.log(chalk.red.bold(`no mocked data in ${paragraphsPath}`));
    process.exit(0);
  }

  createStyleGuideComponents(app);
  generateFile(app, imports, mockDataImports, components);

  // lint autogenerated files
  exec(
    `./node_modules/eslint/bin/eslint.js --fix src/${app}/screens/App/screens/Styleguide/components/**`,
  );
};

// run cmd for a single file if path was provided
if (options.app) {
  console.log(
    chalk.blue('Run cmd against a single app: "' + options.app + '"'),
  );

  if (!fs.existsSync(`src/${options.app}`)) {
    console.log(chalk.red.bold('App not found!'));
    process.exit(0);
  }

  handleFile(options.app);
} else {
  for (var key in appDirectories) {
    const app = appDirectories[key];
    handleFile(app);
  }
}
