//
const BREAKPOINTS = {
  xsBreakpoint: '320px',
  xsBreakpointTo: '759px', // if you change this, you must change the corresponding value on the init-thirdparty file!
  smBreakpoint: '760px',
  smBreakpointTo: '959px',
  mdBreakpoint: '960px',
  mdBreakpointTo: '1199px',
  lgBreakpoint: '1200px',
  lgBreakpointTo: '1679px',
  xlBreakpoint: '1680px',
  xlBreakpointTo: '1919px',
  xxlBreakpoint: '1920px',
};

const BRANDINGDAY_CONTAINER_WIDTH = {
  mdBreakPointBrandingDayContainerWidth: '994px',
  xlBreakPointBrandingDayContainerWidth: '1440px',
};

const COLORS = {
  // Gray Palette
  transparent: 'transparent',
  black: '#000000',
  darkgray: '#2c3643',
  titlegray: '#3b444f',
  bodygray: '#67747c',
  lightgray: '#99a9b3',
  smokeyWhite: 'rgba(166, 170, 173, 1)',
  subduedgray: '#dbe6ec',
  white: '#fff',

  // Primary Palette
  darkblue: '#142b44',
  navblue: '#1d508d',
  lpblue: '#297CBB',
  linkblue: '#288ad6',
  teal: '#0FDEBD',
  green: '#16c98d',
  red: '#fa5e5b',

  inherit: 'inherit',
};

const FONTS = {
  fontRasch: 'rasch-font',

  h1FontSize: '2rem',
  h2FontSize: '1.25rem',
  h3FontSize: '1.125rem',
  h4FontSize: '1rem',
  h5FontSize: '0.75rem',
  bodyFontSize: '16px',
};

const SPACING = {
  // paddings
  smallPadding: '5px',
  defaultPadding: '10px',
  mediumPadding: '20px',
  largePadding: '30px',

  // margins
  margin4: '4px',
  margin8: '8px',
  margin12: '12px',
  margin16: '16px',
  margin24: '24px',
  margin32: '32px',
  margin40: '40px',
  margin48: '48px',
  margin56: '56px',
  margin64: '64px',
  margin72: '72px',
  margin80: '80px',
  margin88: '88px',
  margin96: '96px',
  margin104: '104px',
  margin112: '112px',
  margin120: '120px',
  margin128: '128px',

  // margins legacy
  smallMargin: '5px',
  defaultMargin: '10px',
  mediumMargin: '20px',
  largeMargin: '30px',

  wrapperMarginXs: '32px',
  wrapperMarginSm: '40px',
  wrapperMarginMd: '32px',
  wrapperMarginXl: '48px',
};

const GRID = {
  gridColumns: '24',
  gridGutterWidthXs: '6px',
  gridGutterWidthSm: '18px',
  gridGutterWidthMd: '20px',
  gridGutterWidthXl: '24px',

  outerGapXs: '19px',
  outerGapSm: '29px',
  outerGapMd: '82px',
  outerGapLg: '40px',
  outerGapXl: '84px',
  breakpointLgMarginLeft: 'calc(40vw - 440px)',
  breakpointXlMarginLeft: 'calc(40vw - 630px)',

  pullOutSm: '10px',
  pullOutMd: '55px',
  pullOutXl: '38px',
};

const ZINDEXES = {
  zIndex0: '0',
  zIndex1: '1',
  zIndex10: '10',
  zIndex50: '50',
  zIndex100: '100',
  zIndexPianoOverlay: '1210',
  zIndexHeader: '1000',
  zIndexHeaderAd: '1001',
};

module.exports = {
  BRANDINGDAY_CONTAINER_WIDTH,
  BREAKPOINTS,
  COLORS,
  FONTS,
  GRID,
  SPACING,
  ZINDEXES,
};
