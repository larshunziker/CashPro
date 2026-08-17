//

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

  // colors
  black: 'rgba(0, 0, 0, 1)', // #000000
  black00: 'rgba(0, 0, 0, 0)',
  black15: 'rgba(0, 0, 0, .15)',
  black30: 'rgba(0, 0, 0, .3)',
  black50: 'rgba(0, 0, 0, .5)',
  black60: 'rgba(0, 0, 0, .6)',
  blackA: 'rgba(0, 0, 0, 1)', //#000000
  blackB: 'rgb(41, 46, 50, 1)', //#292E32
  blackC: 'rgb(105, 105, 105)', //#696969
  darkLila: 'rgba(41, 25, 97, 1)', // #291961
  grayA: 'rgba(216, 216, 216, 1)', // #D8D8D8
  grayA25: 'rgba(216, 216, 216, .25)', // #D8D8D8
  grayB: 'rgba(136, 136, 136, 1)', // #888888
  grayC: 'rgba(102, 102, 102, 1)', // #666666
  grayD: 'rgba(74, 74, 74, 1)', // #4A4A4A
  grayE: 'rgba(239, 239, 239, 1)', // #EFEFEF
  grayF: 'rgba(245, 245, 245, 1)', // #F5F5F5
  greyA: 'rgba(106, 110, 113, 1)', // #6A6E71
  greyB: 'rgba(160, 163, 166, 1)', // #A0A3A6
  greyC: 'rgba(216, 216, 216, 1)', // #D8D8D8
  greyD: 'rgba(239, 239, 239, 1)', //#EFEFEF
  greyE: 'rgba(245, 245, 245, 1)', //#F5F5F5
  greyF: 'rgb(245, 245, 245)', //#F5F5F5
  smokeyWhite: 'rgba(166, 170, 173, 1)',
  grayUpperLeft: 'rgba(48, 48, 48, 1)', // #303030
  lila: 'rgba(90, 68, 168, 1)', // #5A44A8
  pink: 'rgba(255, 50, 100, 1)', // #FF3264
  purple: 'rgba(175, 0, 255, 1)', // #AF00FF
  blue: 'rgba(85, 45, 230, 1)', // #552DE6
  green: 'rgba(20, 190, 165, 1)', // #14BEA5
  petrol: 'rgba(20, 125, 140, 1)', // #147D8C
  redA: 'rgba(213, 16, 48, 1)', // #D51030
  redB: 'rgba(232, 28, 76, 1)', // #E81C4C
  redC: 'rgba(143, 10, 42, 1)', // #8F0A2A
  skin: 'rgba(212, 173, 173, 1)', // #D4ADAD
  skinGradientA: 'rgba(245, 229, 229, 1)', // #F5E5E5
  skinGradientB: 'rgba(237, 212, 212, 1)', // #EDD4D4
  blogGradientA: 'rgba(237, 232, 232, 1)', // #EDE8E8
  blogGradientB: 'rgba(247, 240, 240, 1)', // #F7F0F0
  blogGradientC: 'rgba(242, 230, 230, 1)', // #F2E6E6
  skinLight: 'rgba(233, 213, 213, 1)', // #E9D5D5
  transparent: 'transparent',
  white: 'rgba(255, 255, 255, 1)', // #FFFFFF
  whiteTransparent: 'linear-gradient(to right, rgba(255, 255, 255, 0), $white)', // it is used in background-gradients (there is a bug with transparent in safari)
  blackTransparent: 'linear-gradient(to right, $transparent, $black)',
  gradientSI: 'linear-gradient(133.52deg, $redB 4.35%, $redA 100%)',
  gradientRed: 'linear-gradient(135deg, $redB 0%, $redA 100%)',
  gradientRed2: 'linear-gradient(180deg, $redB 0%, $redA 100%)',
  gradientBlack: 'linear-gradient(135deg, $grayUpperLeft 0%, $black 100%)',
  gradientBlackMenu: 'linear-gradient(135deg, $black 0%, rgba(0,0,0,0.8) 100%)',
  gradientHoro: 'linear-gradient(135deg, $lila 0%, $darkLila 100%)',
  gradientTeaser: 'linear-gradient(180deg, $black00 0%, $black30 100%)',
  gradientSkin:
    'linear-gradient(315deg, $skinGradientA 0%, $skinGradientB 100%);',
  gradientBlog:
    'linear-gradient(315deg, $blogGradientA, $blogGradientB, $blogGradientC);',
  inherit: 'inherit',

  // TOAST COLORS:
  success: 'rgba(1, 145, 100, 1)', //#019164,
  warning: 'rgba(255, 177, 31, 1)', //#FFB11F,

  // not from styleguide
  grayPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  gradientSkin2: 'linear-gradient(135deg, #F4EFEF 0%, #F2E6E6 100%);',
  gradientSpecialStage:
    'radial-gradient(circle at 0% 75%,$black50 0%,transparent 35%),radial-gradient(circle at 100% 50%, $black50 0%, transparent 40%);',
  logoutAnimatedDotsColor: '#ca0c25',

  // shadows
  shadowA: '2px 2px 1px $black50',
  shadowB: '1px 1px 1px $black50',
  shadowC: '0 1px 2px $black50',
  shadowD: '2px 2px 2px $black50',
  shadowE: '2px 3px 3px $black50',
  shadowF: '2px 3px 3px $black30',
  shadowG: '2px 2px 2px $black15',
  shadowH: '2px 3px 3px $black30',
  shadowI: 'inset 0 1px 2px $black50',
  shadowK: 'inset 0 -3px 2px 0 $black50, 0 -3px 2px 0 $black30',

  // shadows (not in style guide)
  indicatorShadow: '1px 1px 66px 7px $black60',
  shadowPrintTeaserSY: '0 2px 4px 0 $black50', // also used for select options

  // fonts (official)
  fontBague: '"PFBagueSansPro", Arial, Helvetica, sans-serif',
  fontLeJeune: '"LeJeune", Times New Roman, Times, serif',
  fontActionCond: '"ActionCond", Arial Narrow, Arial, Helvetica, sans-serif',
  fontIcons: 'si-icons',

  //heights
  headerHeightXs: '60px',
  headerHeightSm: '100px',
  headerHeightXl: '155px',
  headerHeightMarketingPageXs: '52px',
  headerHeightMarketingPageSm: '62px',
  headerHeightMarketingPageXl: '81px',
  menuHeaderHeightXs: '91px',
  menuHeaderHeightSm: '$headerHeightSm',
  menuHeaderHeightXl: '$headerHeightXl',
  footerHeightXs: '250px',
  footerHeightLg: '100px',
  utilityBarHeight: '45px',

  //margins
  headerMarginXs: '12px',
  headerMarginLg: '27px',
  headerMarginXl: '45px',
  headerMarginSYXs: '15px',
  headerMarginSYLg: '32px',
  headerMarginSYXl: '52px',

  // z-indexes
  zIndexBehindContent: '-1',
  zIndexMedium: '1',
  zIndexOverlay: '9999',

  /*  Colors with no equivalents in palette */
  blackAlpha4: 'rgba(0, 0, 0, .4)',
  blackAlpha5: 'rgba(0, 0, 0, .5)',
};
