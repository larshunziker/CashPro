#!/usr/bin/env node

/**
 * @file   build.js
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-09-28
 *
 */

'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
const util = require('util');
const asyncExec = util.promisify(require('child_process').exec);
const path = require('path');
const cp = require('child_process');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const bfj = require('bfj');
const configs = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appClientJs])) {
  process.exit(1);
}

// Set App
const app = process.env.APP || '';
const dotEnv = process.env.DOT_ENV || '';
console.log(chalk`{blue Building {bold ${app}} on env {bold ${dotEnv}}}`);

function getStandaloneBuildPromises() {
  return [asyncExec('node ./scripts/build-authorize')];
}
function getMenuBuildPromise() {
  return asyncExec('node ./scripts/persist-menu');
}

function getInitThirdpartyBuildPromise() {
  return new Promise((resolve, reject) => {
    const child = cp.fork(`${__dirname}/build-init-thirdparty.js`);
    let brandingDayFileName = '';
    let initThirdPartyFileName = '';
    child
      .on('message', (data) => {
        if (data.initThirdPartyFileName) {
          initThirdPartyFileName = data.initThirdPartyFileName;
        }
        if (data.brandingDayFileName) {
          brandingDayFileName = data.brandingDayFileName;
        }
      })
      .on('exit', () => {
        resolve({
          initThirdPartyFileName,
          brandingDayFileName,
          stdout: '✅  init-thirdparty build completed',
          stderr: '',
        });
      })
      .on('error', (e) => {
        reject({ stdout: '', stderr: e });
        console.log('on error', e);
      });
  });
}

// build all standalone screens in parallel
async function buildSubProjectsInParallel() {
  console.log(chalk`{blue - Building subprojects in parallel}`);
  const promises = [
    ...getStandaloneBuildPromises(),
    getInitThirdpartyBuildPromise(),
    getMenuBuildPromise(),
  ];

  const responses = await Promise.all(promises);
  const messages = responses.flatMap((item) => item.stdout).filter(Boolean);
  const errors = responses.flatMap((item) => item.stderr).filter(Boolean);

  const initThirdPartyFileName = responses
    .flatMap((item) => item.initThirdPartyFileName)
    .filter(Boolean)
    .toString();
  const brandingDayFileName = responses
    .flatMap((item) => item.brandingDayFileName)
    .filter(Boolean)
    .toString();

  if (errors.length > 0) {
    console.error(errors);

    // return initThirdPartyFileName or brandingDayFileName if one of them is available
    if (initThirdPartyFileName || brandingDayFileName) {
      return { initThirdPartyFileName, brandingDayFileName };
    }

    return;
  }

  console.log('messages: ', messages);

  return { initThirdPartyFileName, brandingDayFileName };
}

// create persisted gql query map
try {
  cp.execSync('node ./scripts/persist-graphql-all.js');
} catch (e) {
  console.error('query map creation failed!');
  process.exit(1);
}

// build app
buildApp();

// Process CLI arguments
const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf('--stats') !== -1;

// build app
function buildApp() {
  let initThirdPartyFileName = '';
  let brandingDayFileName = '';
  // We require that you explicitly set browsers and do not fall back to
  // browserslist defaults.
  const { checkBrowsers } = require('react-dev-utils/browsersHelper');
  checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
      // First, read the current file sizes in build directory.
      // This lets us display how much they changed later.
      return measureFileSizesBeforeBuild(paths.appBuild);
    })
    .then(async (previousFileSizes) => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(paths.appBuild);
      // build sub projects
      const subProjectsResponse = await buildSubProjectsInParallel();

      if (subProjectsResponse) {
        initThirdPartyFileName = subProjectsResponse.initThirdPartyFileName;
        brandingDayFileName = subProjectsResponse.brandingDayFileName;
      }
      // Merge with the public folder
      copyPublicFolder();
      // RASCH: Start the webpack builds for each config
      console.log(chalk`{blue - Building app}`);
      return Promise.all(
        configs.map((config) => build(previousFileSizes, config)),
      );
    })
    .then((buildResponse) => {
      console.log('buildResponse', buildResponse);
      // RASCH: merge all build outputs of all configs and continue
      return {
        ...buildResponse[0], // use client response as default
        warnings: [...buildResponse[0].warnings, ...buildResponse[1].warnings],
      };
    })
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        // add init-thirdparty file to ejs
        try {
          // remove existing .min.js / tsx file from build directory
          if (fs.existsSync(`${paths.appBuild}/branding-day-css.tsx`)) {
            fs.unlinkSync(`${paths.appBuild}/branding-day-css.tsx`);
          }
          if (fs.existsSync(`${paths.appBuild}/hybrid/menu.gql`)) {
            fs.unlinkSync(`${paths.appBuild}/hybrid/menu.gql`);
          }
        } catch (error) {
          console.log('error: ', error.message);
        }

        // update file path on ejs
        if (initThirdPartyFileName) {
          const indexFilePath = `${paths.appBuild}/index.ejs`;
          const indexFile = fs.readFileSync(indexFilePath).toString();
          const contents = indexFile.replace(
            'init-thirdparty.min.js',
            `static/js/${initThirdPartyFileName}`,
          );
          const contentsBrandingDay = contents.replace(
            'branding-day-css.min.js',
            `static/js/${brandingDayFileName}`,
          );
          fs.writeFileSync(indexFilePath, contentsBrandingDay);
          console.log(
            chalk`{green - Updated path to init-thirdparty script on ejs}`,
          );
        }

        if (warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'));
          console.log(warnings.join('\n\n'));
          console.log(
            '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.',
          );
          console.log(
            'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n',
          );
        } else {
          console.log(chalk.green('Compiled successfully.\n'));
        }

        console.log('File sizes after gzip:\n');
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          paths.appBuild,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE,
        );

        const appPackage = require(paths.appPackageJson);
        const publicUrl = paths.publicUrl;
        const publicPath = paths.appBuild;
        const buildFolder = path.relative(process.cwd(), paths.appBuild);
        printHostingInstructions(
          appPackage,
          publicUrl,
          publicPath,
          buildFolder,
          useYarn,
        );
      },
      (err) => {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        console.log(err.stack);
        process.exit(1);
      },
    )
    .catch((err) => {
      if (err && err.message) {
        console.log(err.message);
        console.log(err.stack);
      }
      process.exit(1);
    });
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes, config) {
  if (!config) {
    console.log(chalk.red('no config received. abort build'));
    return;
  }

  console.log(
    chalk.blue(
      `-- Creating an optimized production build for target "${
        config.target || 'browser'
      }"...`,
    ),
  );
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true }),
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      // create query map which will be served by express
      if (config.target === 'node') {
        try {
          cp.fork(`${__dirname}/persist-graphql-build.js`);
        } catch {
          console.error('query map build cmd failed!');
          process.exit(1);
        }
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      };
      if (writeStatsJson) {
        return bfj
          .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch((error) => reject(new Error(error)));
      }

      return resolve(resolveArgs);
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml && file !== paths.appHtmlProd,
  });
}
