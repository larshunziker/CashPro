const postcss = require('postcss');
const fs = require('fs-extra');
const program = require('commander');
const open = require('open');
const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * https://astexplorer.net/ was of great help <3
 * select css, paste in your snippet, select postcss
 */

program.option(
  '-p, --path <path>',
  'Path to css file that belongs to a TeaserGrid config',
);
const options = program.opts();
program.parse(process.argv);
const { path } = options;
const content = fs.readFileSync(path).toString();
const root = postcss.parse(content);
const rootNodes = root.nodes[0].nodes.filter(
  (node) => node.type === 'rule' || node.type === 'atrule',
);

const getValuesFromGridArea = (gridArea) => {
  const {
    groups,
  } = /(?<rowStart>\d+)\s\/\s(?<columnStart>\d+)\s\/\s(?<rowEnd>\d+)\s\/\s(?<columnEnd>\d+)/.exec(
    gridArea,
  );

  return groups;
};

const getItems = (rule) => {
  const items = {};

  if (rule.selector && rule.selector.indexOf('.Grid') !== -1) {
    // Loop over all rules from .Grid0
    rule.nodes.forEach((gridSelectorRule) => {
      if (gridSelectorRule.type === 'rule') {
        // .Item0, .Item1 etc
        const selector = gridSelectorRule.selector;

        gridSelectorRule.nodes.forEach((subRule) => {
          if (subRule.type === 'decl' && subRule.prop === 'grid-area') {
            items[selector] = getValuesFromGridArea(subRule.value);
          }
          if (
            subRule.type === 'decl' &&
            subRule.prop === 'display' &&
            subRule.value === 'none'
          ) {
            items[selector] = getValuesFromGridArea('1 / 1 / 2 / 2'); // set item fixed to position one if it is set to display: none;
          }
        });
      }
    });
  }

  return items;
};

const getViewportNameByMediaQuery = (mediaQuery) => {
  switch (mediaQuery) {
    case '(min-width: $smBreakpoint)':
      return 'tablet (>760px)';
    case '(min-width: $mdBreakpoint)':
      return 'tablet (>960px)';
    case '(min-width: $xlBreakpoint)':
      return 'desktop (>1680px)';

    default:
      return mediaQuery;
  }
};

const openPreviewUrl = (options) => {
  try {
    const itemValues = Object.values(options.items);
    const rows = itemValues[itemValues.length - 1].rowStart;

    const childarea = itemValues
      .map(
        (item) =>
          `${item.rowStart}/${item.columnStart}/${item.rowEnd}/${item.columnEnd}`,
      )
      .join(',');

    open(
      `https://jiib.github.io/cssgridgenerator/?columns=${
        options.columns
      }&rows=${rows}&childarea=${encodeURIComponent(childarea)}`,
    );
  } catch (error) {
    chalk.red('Something went wrong...');
  }
};

/**
 * The CSS Grid Generator url accepts the following url params
 * @param columns Number of columns
 * @param rows Number of rows
 * @param childarea Grid area values for all grid items, separated by comma and encoded using encodeURIComponent()   Example: "1/1/4/19,1/1/2/2,1/19/2/25,2/19/3/25"
 */

const gridInfo = [];

rootNodes.forEach((rule) => {
  // The rule.type === 'rule' is the mobile viewport css definition
  if (rule.type === 'rule') {
    gridInfo.push({
      name: 'mobile',
      rows: 0,
      columns: 24,
      items: getItems(rule),
    });
  }

  // media queries
  if (rule.type === 'atrule') {
    gridInfo.push({
      name: getViewportNameByMediaQuery(rule.params),
      rows: 0,
      columns: 24,
      items: {
        ...gridInfo[gridInfo.length - 1].items, // use items from previous viewport as fallback
        ...getItems(rule.nodes[0]),
      },
    });
  }
});

// Inquirer Prompt
const selectViewport = [
  {
    type: 'rawlist',
    name: 'viewport',
    message: `Please select a viewport:`,
    choices: gridInfo,
    default: 'mobile',
  },
];

inquirer.prompt(selectViewport).then((answers) => {
  const index = gridInfo.findIndex((item) => item.name === answers.viewport);
  openPreviewUrl(gridInfo[index]);
});
