#!/usr/bin/env node

/**
 * @file   annualGoals annual-goals.js
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2021-03-02
 */

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const glob = require('glob');
const commander = require('commander');
const getDirectories = require('./helpers/getAppDirectories');
const appDirectories = getDirectories(`${process.cwd()}/src`);

const ANNUAL_GOALS = {
  common: {
    typescript: '0',
  },
  beobachter: {
    circularDependencies: 18, // change this to 10 when we reached the goals
    testCoveragePct: 67.61, // change this to our goal 75
    typescript: 100,
  },
  gaultmillau: {
    circularDependencies: 17, // change this to 10 when we reached the goals
    testCoveragePct: 62.28, // change this to our goal 75
    typescript: 100,
  },
};

let warn = 0;
let error = 0;

commander
  .option('-p, --app [app]', 'App [string]', null)
  .option('-s, --show-js-files', 'Show not moved JS files [boolean]')
  .parse(process.argv);

const options = commander.opts();

const checkCircleDependencies = (app) => {
  // console.log('key ' + app + ' has value ' + CIRCULAR_DEPENDENCIES_GOALS[app]);
  const logPath = `${process.cwd()}/logs/circular-dependencies/${app}/log.txt`;
  const logFile = fs.existsSync(logPath);

  if (logFile) {
    const data = fs.readFileSync(logPath, 'utf8');
    const logData = JSON.parse(data);
    const circularDependencies =
      (ANNUAL_GOALS[app] && ANNUAL_GOALS[app].circularDependencies) || null;
    if (Object.keys(logData).length > 0) {
      if (parseInt(logData.count) > parseInt(circularDependencies)) {
        error = 1;
        console.log(
          chalk.red.bold(
            `[${app}] Detected ${
              parseInt(logData.count) - parseInt(circularDependencies)
            } new circular-dependencies\n`,
          ),
          chalk.gray(`new: ${logData.count}, goal ${circularDependencies}\n`),
        );
      } else {
        console.log(
          chalk.green(`[${app}]`),
          chalk.green.bold(`Annual Goals still on track 🎉`),
        );
      }
    }
  } else {
    console.log(
      chalk.yellow.bold(`[${app}] No log data found ❗️\n`),
      chalk.gray(`${logPath}\n`),
    );
    console.log(
      chalk.gray(`Pleas run "yarn run dev" to create the log file\n`),
    );
  }
};

const checkTestCoverage = (app) => {
  // console.log('key ' + app + ' has value ' + CIRCULAR_DEPENDENCIES_GOALS[app]);
  const logPath = `${process.cwd()}/coverage/coverage-${app}/coverage-summary.json`;
  const logFile = fs.existsSync(logPath);

  if (logFile) {
    const data = fs.readFileSync(logPath, 'utf8');
    const covData = JSON.parse(data);
    const testCoveragePct =
      (ANNUAL_GOALS[app] && ANNUAL_GOALS[app].testCoveragePct) || null;
    if (Object.keys(covData).length > 0) {
      if (parseFloat(covData.total.lines.pct) < parseFloat(testCoveragePct)) {
        error = 1;
        console.log(
          chalk.red.bold(
            `[${app}] Losed ${(
              parseFloat(testCoveragePct) - parseFloat(covData.total.lines.pct)
            ).toFixed(2)}% test-coverage\n`,
          ),
          chalk.gray(
            `new: ${covData.total.lines.pct}%, goal ${testCoveragePct}%`,
          ),
        );
      } else {
        warn = 0;
        console.log(
          chalk.green(`[${app}]`),
          chalk.green.bold(`TestCoverage Annual Goals still on track 🎉`),
        );
      }
    }
  } else {
    warn = 1;
    console.log(
      chalk.yellow.bold(`[${app}] No coverage data found ❗️\n`),
      chalk.gray(`${logPath}`),
    );
  }

  if (warn) {
    console.log(
      chalk.yellowBright(
        `\nPlease run "yarn run test:ci --coverage" to create the coverage files`,
      ),
    );
  }
};

const getNotMovedJsFiles = (app, showJsFiles = false) => {
  //find ./src/<APP> -iname "*.js" ! -iname "queries*" ! -iname "fragments*" ! -iname "*[0-9]*" ! -iname "variables*" ! -iname "OneSignal*" ! -iname "init-thirdparty-*"
  const filePaths = glob.sync(
    `src/${app}/**/!(queries|fragments|mutations|*[0-9]*|variables|OneSignal|init-thirdparty-*|init-thirdparty.min|advertising)*.js`,
    {},
  );

  const typescriptGoal =
    (ANNUAL_GOALS[app] && ANNUAL_GOALS[app].typescript) || null;
  if (filePaths.length > typescriptGoal) {
    // error = 1;
    console.log(
      chalk.yellow.bold(
        `[${app}] New js files detected ${
          parseInt(filePaths.length) - parseInt(typescriptGoal)
        }❗️\n`,
      ),
      chalk.yellow.bold(chalk.gray(`Goal is ${parseInt(typescriptGoal)}`)),
    );
  } else {
    console.log(chalk.greenBright.bold(`[${app}] on track 🎉`));
  }
  if (showJsFiles) {
    if (filePaths) {
      for (const filePath of filePaths) {
        console.log(`💩 ${filePath}`);
      }
    }
  }
};

console.log(chalk.white(`\nJS to TS left\n`));
if (!options.app || options.app === 'common') {
  getNotMovedJsFiles('common', options.showJsFiles);
}

for (var key in appDirectories) {
  const app = appDirectories[key];
  if (options.app && app === options.app) {
    getNotMovedJsFiles(app, options.showJsFiles);
  } else if (!options.app) {
    getNotMovedJsFiles(app, options.showJsFiles);
  }
}

if (!options.showJsFiles) {
  console.log(chalk.white(`\nCircular Dependencies\n`));
  for (var key in appDirectories) {
    const app = appDirectories[key];
    if (options.app && app === options.app) {
      checkCircleDependencies(app);
    } else if (!options.app) {
      checkCircleDependencies(app);
    }
  }

  console.log(chalk.white(`\nTest Coverage\n`));
  for (var key in appDirectories) {
    const app = appDirectories[key];
    if (options.app && app === options.app) {
      checkTestCoverage(app);
    } else if (!options.app) {
      checkTestCoverage(app);
    }
  }
}
if (error) {
  console.log(chalk.red.bold('Missed Annual Goals'));
  process.exit(1);
} else {
  console.log(chalk.green.bold('\nAnnual Goals on track 😎'));
}
