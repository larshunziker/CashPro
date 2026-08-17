const {
  BRANDINGDAY_CONTAINER_WIDTH,
  BREAKPOINTS,
  GRID,
  ZINDEXES,
  SPACING,
} = require('../../../../../common/assets/styles/variablesDefault.legacy.css');

module.exports = {
  // use global variables
  ...BRANDINGDAY_CONTAINER_WIDTH,
  ...BREAKPOINTS,
  ...GRID,
  ...ZINDEXES,
  ...SPACING,

  outerGapMd: '57px',
  xlBreakPointBrandingDayContainerWidth: '1320px',

  // TODO: add new color or font variables also in the global.legacy.css file as regular css variables to make them available for the FI-Box devs.

  // colors
  black: 'rgba(0, 0, 0, 1)', // #000000
  blackA2: 'rgba(0, 0, 0, .2)', //#000000
  black50: 'rgba(0, 0, 0, .5)', // #000000
  black30: 'rgba(0, 0, 0, .30)', // #000000
  black15: 'rgba(0, 0, 0, .15)', // #000000
  black90: 'rgba(0, 0, 0, .9)', // #000000
  white: 'rgba(255, 255, 255, 1)', // #FFFFFF
  transparent: 'transparent',
  inherit: 'inherit',

  primaryA: 'rgba(177, 16, 41, 1)', // #B11029
  primaryB: 'rgba(122, 0, 0, 1)', // #7A0000
  secondaryA: 'rgba(16, 123, 142, 1)', // #107B8E
  secondaryB: 'rgba(0, 79, 97, 1)', // #004F61
  positive: 'rgba(54, 133, 63, 1)', // #36853F
  blackA: 'rgba(0, 0, 0, 1)', // #000000
  blackB: 'rgba(41, 46, 50, 1)', // #292E32
  blackC: 'rgb(105, 105, 105)', //#696969
  greyA: 'rgba(106, 110, 113, 1)', // #6A6E71
  greyB: 'rgba(160, 163, 166, 1)', // #A0A3A6
  greyC: 'rgba(216, 216, 216, 1)', // #D8D8D8
  greyD: 'rgba(239, 239, 239, 1)', // #EFEFEF
  greyE: 'rgba(245, 245, 245, 1)', // #F5F5F5
  errorA: 'rgba(197, 25, 66, 1)', // #C51942
  errorB: 'rgba(236, 182, 195, 1)', // #ECB6C3
  decoA: 'rgba(176, 213, 220, 1)', // #B0D5DC
  decoB: 'rgba(223, 238, 241, 1)', // #DFEEF1
  decoC: 'rgba(185, 212, 188, 1)', // #B9D4BC
  decoD: 'rgba(247, 232, 235, 1)', // #F7E8EB
  decoE: 'rgba(227, 238, 228, 1)', // #E3EEE4
  decoG: 'rgba(0, 91, 10, 1)', // #005B0A
  decoF: 'rgba(156, 13, 34, 1)', // #9C0D22
  warning: 'rgba(255,177,31)', // #FFB11F
  positiveA: 'rgba(54, 133, 63, 1)', //#36853F
  positiveB: 'rgba(37, 101, 45)', // #25652D

  // other colors
  gradientTeaserBackground:
    'linear-gradient(-180deg, rgba(255,255,255,0) 26%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.9) 90%)',

  // z-Indexes
  zIndexBackground: -1,
  zIndexLow: 0,
  zIndex1: 1,
  zIndexMedium: 10,
  zIndexHigh: 100,
  zIndexHighest: 1000,
  zIndexHeaderAd: 1001,
  zIndexOverlay: 1500,

  // not from styleguide
  // DO NOT DELETE: colors used in /common/components that are not implemented with a factory
  smokeyWhite: 'rgba(166, 170, 173, 1)',
  greyPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  grayPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  white0: 'rgba(255, 255, 255, 0)', // #FFFFFF
  white85: 'rgba(255, 255, 255, 0.85)', // #FFFFFF with 85% opacity
  logoutAnimatedDotsColor: '#B11029',

  // fonts
  fontSourceSerifPro: '"Source Serif Pro", Times New Roman, Times, serif',
  fontSourceSansPro: '"Source Sans Pro", Arial, Helvetica, sans-serif',
  fontRaschIcon: 'rasch-font',
  fontRasch: 'rasch-font',
  fontGotham: '"Gotham A", "Gotham B", Helvetica, Arial, sans-serif',
  positiveB50: 'rgba(4, 102, 50, .5)', // #046632
  primaryA50: 'rgba(177, 16, 41, .5)', // #B11029
  warning50: 'rgba(255,177,31,.5)', // #FFB11F

  // header height
  headerHeight: '85px',
  headerHeightObserver: '86px',

  // heights
  headerHeightXs: '50px',
  headerHeightSm: '64px',
  headerHeightXl: '109px',
  headerHeightMarketingPageXs: '50px',
  headerHeightMarketingPageSm: '64px',
  headerHeightMarketingPageMd: '66px',

  //margins
  headerMarginXs: '12px',
  headerMarginLg: '27px',
  headerMarginXl: '45px',

  //transitions
  basicShortTransition: '0.3s ease-in-out',

  /*  Colors with no equivalents in palette */
  blackAlpha4: 'rgba(0, 0, 0, .4)',
  blackAlpha5: 'rgba(0, 0, 0, .5)',
};
