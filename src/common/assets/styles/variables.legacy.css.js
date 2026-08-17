const defaultVariables = require('./variablesDefault.legacy.css');

module.exports = {
  // use global variables
  ...defaultVariables.BREAKPOINTS,
  ...defaultVariables.COLORS,
  ...defaultVariables.FONTS,
  ...defaultVariables.GRID,
  ...defaultVariables.SPACING,
  ...defaultVariables.ZINDEXES,

  // white label specific variables
  fontSansSerif:
    '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSerif: 'Times New Roman, Times, serif',

  // component specific variables
  black: '#000000',
  zIndex1: '1',
  zIndex50: '50',
  zIndex100: '100',
};
