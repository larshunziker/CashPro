//

const {
  BREAKPOINTS,
  GRID,
  ZINDEXES,
  SPACING,
} = require('../../../../../common/assets/styles/variablesDefault.legacy.css');

module.exports = {
  // use global variables
  ...BREAKPOINTS,
  ...GRID,
  ...ZINDEXES,
  ...SPACING,

  /* ********************************** */
  /*  N E W   B E O   R E B R U S H  */
  /* ********************************** */

  grey10: 'rgb(245, 245, 245)', // #F5F5F5
  grey20: 'rgb(239, 239, 239)', // #EFEFEF
  grey30: 'rgb(216, 216, 216)', // #D8D8D8
  grey40: 'rgb(163, 163, 163)', // #A3A3A3
  grey45: 'rgb(161, 161, 161)', // #A5A1A1
  grey50: 'rgb(136, 136, 136)', // #888888
  grey70: 'rgb(102, 102, 102)', // #666666
  grey80: 'rgb(74, 74, 74)', //#4A4A4A
  grey90: 'rgb(46, 46, 46)', //#2E2E2E
  green: 'rgb(0, 155, 70)', // #009B46
  greenDark: 'rgb(0, 110, 50)', // #006E32
  greenLight: 'rgb(242, 250, 246)', // #F2FAF6
  blue: 'rgb(35, 56, 129)', // #233881
  blueDark: 'rgb(25, 40, 91)', // #19285B
  black: 'rgb(0, 0, 0)', // #000000
  red: 'rgb(171, 0, 0)', //#ab0000
  beigeDark: 'rgb(208, 203, 192)', // #d0cbc0
  purple: 'rgb(108, 108, 167)', // #6C6CA7
  purpleLight: 'rgb(239, 239, 242)', //#EFEFF2

  /*  OVERRIDE NEW BEO GRID  */
  /*  - breakpoint change: at 1024px instead of 960px */
  /*  - new grid for smBreakpoint: Count: 24, Gutter: 16px, Column: 26px */
  /*  - content left-aligned till 1360px */
  /* ********************************** */

  gridGutterWidthSm: '16px',
  smBreakpointTo: '1023px',
  mdBreakpoint: '1024px',
  outerGapMd: '15px',
  breakpointLgMarginLeft: '40px',

  /* ********************************** */
  /*  O L D   B E O  */
  /* ********************************** */

  // COLORS
  redA: 'rgb(223, 0, 0)', //#df0000
  redB: 'rgb(195, 0, 0)', //#c30000
  redC: 'rgb(171, 0, 0)', //#ab0000
  redD: 'rgb(108, 0, 0)', //#6c0000
  greyA: 'rgb(119, 119, 119)', //#777777
  greyB: 'rgb(221, 221, 220)', //#dddddc
  greyC: 'rgb(246, 246, 246)', //#f6f6f6
  greyD: 'rgb(237, 236, 232)', //#edece8
  greyE: 'rgb(239, 239, 239)', //#EFEFEF
  greyF: 'rgb(245, 245, 245)', //#F5F5F5
  beigeA: 'rgb(238 ,233, 222)', //#eee9de
  beigeB: 'rgb(208, 203, 192)', //#d0cbc0
  beigeC: 'rgb(166, 162, 153)', //#a6a299
  white: 'rgb(255, 255, 255)', //#FFFFFF
  petrol: 'rgb(53, 119, 134)', //#357786

  // not from styleguide
  grayPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  logoutAnimatedDotsColor: '#df0000',

  // TOAST COLORS
  success: 'rgba(1, 145, 100, 1)', //#019164,
  warning: 'rgba(255, 177, 31, 1)', //#FFB11F,
  error: 'rgba(213, 16, 48, 1)', //#D51030

  // FONTS
  fontSpezia: 'Spezia, Helvetica, Arial, Verdana, sans-serif',
  fontRecife: 'Recife, Georgia, Times New Roman, serif',

  /*  Colors with no equivalents in palette */
  blackAlpha1: 'rgba(0, 0, 0, .1)',
  blackAlpha4: 'rgba(0, 0, 0, .4)',
  blackAlpha5: 'rgba(0, 0, 0, .5)',
  blackAlpha6: 'rgba(0, 0, 0, .6)',
  blackAlpha12: 'rgba(1, 1, 1, .12)',
  white50: 'rgba(255, 255, 255, .5)', // #fff semi-transparent
  none: 'none',
  transparent: 'transparent',
  inherit: 'inherit',
  initial: 'initial',
  whiteAlpha75: 'rgba(255, 255, 255, .75)',
  smokeyWhite: 'rgba(166, 170, 173, 1)', // used in common components

  // social
  colorFacebook: 'rgb(21, 82, 142)',
  colorFacebookHover: 'rgb(16, 65, 113)',
  colorLinkedIn: 'rgba(0, 119, 181, 1)', // #0077B5
  colorPhonecall: 'rgb(62, 159, 5)',
  colorPhonecallHover: 'rgb(29, 127, 4)',
  colorTwitter: 'rgb(0, 149, 198)',
  colorTwitterHover: 'rgb(0, 119, 158)',
  colorMail: 'rgb(171, 0, 0)', // #ab0000
  colorMailHover: 'rgb(136, 0, 0)',
  colorWhatsApp: 'rgba(62, 159, 5, 1)', // #3E9F05
  colorPocket: 'rgba(241, 61, 82, 1)', // #F13D52
  colorMailchimp: 'rgba(130, 158, 42, 1)', // #829e2a
  colorXing: 'rgba(18, 101, 103, 1)', // #126567

  gradientAuth0Overlay:
    'radial-gradient(#40404b, #111118) rgba(34, 34, 40, .94)',
  brandRepGradientGlare:
    'linear-gradient(50deg, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%)',
  brandRepGradientDark:
    'linear-gradient(-166deg, rgba(255,255,255,0) 40%,rgba(0,0,0,0.2) 60%, rgba(0,0,0,.9) 90%)',
  brandRepGradientGlareSm:
    'linear-gradient(20deg, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)',
  brandRepGradientDarkSm:
    'linear-gradient(-180deg, rgba(255,255,255,0) 26%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.9) 90%)',
  gradientLongReadBlack:
    'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)',

  // margins
  sectionParagraphMarginXs: '40px',
  sectionParagraphMarginMd: '50px',
  sectionParagraphMarginLg: '64px',
  chapterNavigationTopMargin: '8px',

  fontRaschIcon: 'rasch-font',
  bodyLineHeight: 1.6,
  footerHeight: '46px',

  // header
  headerHeightXs: '140px',
  headerHeightSm: '160px',
  headerHeightMarketingPageXs: '54px',
  headerHeightMarketingPageSm: '84px',

  headerHeightObserver: '160px',

  headerNavigationHeight: '40px',

  // advertisement
  monsterSkyContentMargin: '40px',
  monsterSkyWidth: '300px',
  monsterSkyHeight: '600px',
  wideboardHeight: '250px',
  wideboardWidth: '994px',
  rectangleHeight: '250px',
  rectangleWidth: '300px',

  // z-Indexes
  zIndexBackground: -1,
  zIndexLow: 0,
  zIndexMedium: 10,
  zIndexHigh: 100,
  zIndexHighest: 1000,
  zIndexOverlay: 1500,

  // form style
  inputHeight: '24px',
  inputBottomLineGap: '10px',
  inputLineWidth: '1px',

  // others
  retinaFontScale: '1.1',
  retinaDpi: '192dpi',
  xlBreakpointContainerWidth: '1440px',
  defaultRadius: '8px',

  // transitions
  $navigationTransitionFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

  // border radius
  borderRadius: '4px',

  // page scroll offset
  pageScrollOffset: 96,

  bottomBarHeightPx: '76px',
};
