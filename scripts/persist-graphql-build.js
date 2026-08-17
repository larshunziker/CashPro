#!/usr/bin/env node

/**
 * @file   persist-graphql-build.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-15
 *
 */

const fs = require('fs-extra');
const chalk = require('chalk');
const sha = require('jssha');
const paths = require('../config/paths');

const AWS = require('aws-sdk');

const bucketName = 'query-maps-rasch';
const bucketRegion = 'eu-central-1';

AWS.config.update({
  region: bucketRegion,
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});

// set app
const appEnv = process.env.APP || '';

if (!appEnv) {
  process.exit();
}

console.log(chalk`{blue Creating builded query map for {bold ${appEnv}}}`);

// check if app is builded
if (!fs.existsSync(paths.appBuild)) {
  console.log(
    chalk`{red Run '{bold yarn run build}' first to create build for app "{bold ${appEnv}}"}!`,
  );
  process.exit(0);
}

const backendQueryMapSrc = `${paths.appQueryMaps}/${paths.appQueryMapsBackendName}`;

// check if querymap exists
const queryMapContent = fs.readFileSync(backendQueryMapSrc).toString();

if (!queryMapContent) {
  console.log(
    chalk`{red Run '{bold yarn run persistgraphql}' first to create query map for app "{bold ${appEnv}}"}!`,
  );
  process.exit(0);
}

// hash query map
const shaObject = new sha('SHA-1', 'TEXT');
shaObject.update(queryMapContent);
const hash = shaObject.getHash('HEX');

console.log(
  chalk`{green Query map {bold ${hash}} for app {bold ${appEnv}} start upload to S3 buckets...}`,
);

s3.upload(
  {
    Key: `${hash}.json`,
    Body: queryMapContent,
    ACL: 'public-read',
    ContentType: 'application/json',
  },
  (err) => {
    if (err) {
      console.log(chalk`{red Uploading to S3 failed! - ${err}}`);
      process.exit(0);
      return;
    }
    console.log(chalk`{green Uploaded query map to S3!}`);
  },
);
