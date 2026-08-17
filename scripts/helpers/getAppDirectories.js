/**
 * @file   get app directories
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-27
 *
 */

const { existsSync, lstatSync, readdirSync } = require('fs');
const { join, basename } = require('path');

// blacklisted directories in apps folder
const blacklist = [
  'common',
  'shared',
  'handelszeitung',
  'schweizer-illustrierte',
];

const globalProjectMap = ['RAS', 'DTC', 'DTCPP', 'AD', 'PNT'];

// NOTE: pls add any new publication at the very bottom of the appProjectMap array
// so we respect the ignition sorting
// filtering map for PR title
const appProjectMap = {
  beobachter: 'BEO',
  cash: 'CASH',
  gaultmillau: 'GM',
};

const isDirectory = (source) => lstatSync(source).isDirectory();
const isNotBlacklisted = (name) => !blacklist.includes(name);
const isPrTitleRelated = (name) => {
  const prTitle = process.env.CHANGE_TITLE;

  if (!prTitle || !appProjectMap[name]) {
    return true;
  }

  if (
    !globalProjectMap.some((projectAlias) =>
      prTitle.startsWith(`${projectAlias}-`),
    ) && // eg. `RAS-XXX: foo` or `DTCPP-XXX: bar`
    !prTitle.startsWith(`${appProjectMap[name]}-`) && // eg. `SI-XXX: foo` or `BEO-XXX: foo`
    !prTitle.includes(`[${appProjectMap[name]}]`) // eg. `SI-XXX: foo [BEO]`
  ) {
    console.log(
      `ATTENTION: directory '${name}' is not PR title (${prTitle}) related and therefor ignored! if this is not expected, please adjust the config.`,
    );
    return false;
  }

  return true;
};

const getAppDirectories = (source, { checkPrTitle = false } = {}) => {
  if (!existsSync(source)) {
    return [];
  }
  const appProjectMapKeys = Object.keys(appProjectMap);
  const directories = readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory)
    .map((final) => basename(final))
    .filter(isNotBlacklisted)
    .sort(
      (a, b) => appProjectMapKeys.indexOf(a) - appProjectMapKeys.indexOf(b),
    );

  // check if we have an entry in the project map defined for each app
  for (let i = 0; i < directories.length; i++) {
    if (!appProjectMap[directories[i]]) {
      console.log(
        `ATTENTION: we don't have a mapping defined for the app directory "${directories[i]}"! Please add the abbreviation to the appProjectMap or add the directory to the blacklist.`,
      );
    }
  }

  if (checkPrTitle) {
    const foundApp = directories.filter(isPrTitleRelated);
    if (foundApp.length === 0) {
      console.log(
        `ATTENTION: you are ignoring all apps! Please add the abbreviation to the pr title as [APP] or APP-XXX`,
      );
      return directories;
    } else {
      return foundApp;
    }
  }

  return directories;
};

module.exports = getAppDirectories;
