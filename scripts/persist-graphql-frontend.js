#!/usr/bin/env node

/**
 * @file   persist-graphql-frontend.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-15
 * 
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const sha = require('jssha');
const { hashCode } = require('../src/shared/helpers/nonSecureHasher.js');
const paths = require('../config/paths');

// set app
const appEnv = process.env.APP || '';

if (!appEnv) {
  process.exit();
}

console.log(
  chalk`{blue Preparing {bold frontend} query map for {bold ${appEnv}}}`,
);

const backendQueryMapSrc = `${paths.appQueryMaps}/${paths.appQueryMapsBackendName}`;

function handleWrite(err, data) {
  if (err) {
    console.log(chalk`{red File write failed!}`);
    process.exit(1);
    return;
  }

  console.log(
    chalk`{green {bold Frontend} query map for {bold ${appEnv}} created.}`,
  );
}

function handleFile(err, data) {
  if (err) {
    console.log(
      chalk`{red Was not able to find/read file "${backendQueryMapSrc}"!}`,
    );
    process.exit(1);
    return;
  }

  // parse json
  const queriesJson = JSON.parse(data);

  if (!queriesJson) {
    console.log(chalk`{red File read failed!}`);
    return;
  }

  const map = {};
  Object.keys(queriesJson).forEach((key) => {
    map[hashCode(key)] = queriesJson[key];
  });

  // create hash of backend query map
  const shaObject = new sha('SHA-1', 'TEXT');
  shaObject.update(data.toString());
  const hash = shaObject.getHash('HEX');

  // create file content
  const content = `
// !!! THIS FILE IS AUTO-GENERATED !!!
export const apiVersion = '${hash}';
export default ${JSON.stringify(map)};
`;

  // write file
  fs.writeFile(
    `${paths.appQueryMaps}/${paths.appQueryMapsFrontendName}`,
    content,
    handleWrite,
  );
}

// read backend query map
fs.readFile(backendQueryMapSrc, handleFile);
