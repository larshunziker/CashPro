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

  /* ********************************** */
  /*  OVERRIDE ROLE MODEL GRID  */
  /*  - breakpoint change: at 1024px instead of 960px */
  /*  - new grid for smBreakpoint: Count: 24, Gutter: 16px, Column: 26px */
  /*  - content left-aligned till 1360px */
  /* ********************************** */

  gridGutterWidthSm: '16px',
  smBreakpointTo: '1023px',
  mdBreakpoint: '1024px',
  outerGapMd: '15px',
  breakpointLgMarginLeft: '40px',
  mdBreakPointBrandingDayContainerWidth: '1058px',

  /* ********************************** */
  /*  H Z   R E B R U S H  */
  /* ********************************** */

  // COLORS
  blackA: 'rgba(0, 0, 0, 1)', //#000000
  blackA2: 'rgba(0, 0, 0, .2)', //#000000
  blackA5: 'rgba(0, 0, 0, .5)', //#000000
  blackB: 'rgb(41, 46, 50, 1)', //#292E32
  blackC: 'rgb(105, 105, 105)', //#696969
  blueA: 'rgba(25, 42, 107, 1)', //#192A6B
  blueC: 'rgba(0, 0, 63, 1)', //#00003F
  decoA: 'rgba(224, 245, 239, 1)', //#E0F5EF
  decoB: 'rgba(240, 240, 250, 1)', //#F0F0FA
  decoC: 'rgba(247, 239, 232, 1)', //#F7EFE8
  greyA: 'rgba(106, 110, 113, 1)', // #6A6E71
  greyB: 'rgba(160, 163, 166, 1)', // #A0A3A6
  greyC: 'rgba(216, 216, 216, 1)', // #D8D8D8
  greyD: 'rgba(239, 239, 239, 1)', //#EFEFEF
  greyE: 'rgba(245, 245, 245, 1)', //#F5F5F5
  errorA: 'rgba(197, 25, 66, 1)', //#c51942
  errorB: 'rgba(236, 182, 195, 1)', //#ecb6c3
  white: 'rgba(255, 255, 255, 1)', //#FFFFFF
  white5: 'rgba(255, 255, 255, .05)', //#FFFFFF
  bilanzA: 'rgba(170, 29, 33, 1)', //#AA1D21
  bilanzB: 'rgba(135, 23, 26, 1)', //#87171A
  bilanzC: 'rgba(87, 15, 17, 1)', //#570F11
  positiveA: 'rgba(54, 133, 63, 1)', //#36853F

  // not from styleguide
  grayPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  logoutAnimatedDotsColor: '#192a6b',

  // TOAST COLORS:
  success: 'rgba(1, 145, 100, 1)', //#019164,
  warning: 'rgba(255, 177, 31, 1)', //#FFB11F,
  error: 'rgba(213, 16, 48, 1)', //#D51030

  // FONTS
  fontGothamNarrow:
    'Gotham-Narrow-Black, Helvetica-Bold, Arial-Bold, Verdana-Bold, sans-serif',
  fontGothamBlack:
    'Gotham-Black, Helvetica-Bold, Arial-Bold, Verdana-Bold, sans-serif',
  fontGothamBook: 'Gotham-Book, Helvetica, Arial, Verdana, sans-serif',
  fontGeorgia: 'Georgia, Times New Roman, serif',

  // z-Indexes
  zIndexBackground: -1,
  zIndexLow: 0,
  zIndex1: 1,
  zIndexMedium: 10,
  zIndexHigh: 100,
  zIndexHighest: 1000,
  zIndexHeaderAd: 1001,
  zIndexOverlay: 1500,

  // header height
  headerHeight: '50px',
  headerHeightObserver: '51px',

  /* ********************************** */
  /*  H Z   L E G A C Y  */
  /* ********************************** */

  // colors ministage social media
  blue: 'rgba(25, 42, 107, 1)', // #192A6B
  blueLinkedIn: 'rgba(0, 119, 181, 1)', // #0077B5
  blueTwitter: 'rgba(0, 149, 198, 1)', // #0095C6
  purple: 'rgba(116, 54, 122, 1)', // #74367A
  purpleInstagram: 'rgba(153, 57, 163, 1);', // #9939A3
  red: 'rgba(254, 107, 107, 1)', // #FE6B6B
  greenXing: 'rgba(18, 101, 103, 1)', // #126567

  transparent: 'transparent',
  none: 'none',
  teaserGradientStart: 'rgba(117, 117, 117, 0)',
  teaserGradientEnd: 'rgba(56, 56, 56, 1)',
  inherit: 'inherit',

  // DO NOT DELETE: colors used in /common/components that are not implemented with a factory
  smokeyWhite: 'rgba(166, 170, 173, 1)',
  black: 'rgba(0, 0, 0, 1)',

  gradientBlack: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)',
  gradientShineWhite:
    'linear-gradient(20deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)',
  gradientLongReadBlack:
    'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)',
  gradientWhite:
    'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
  gradientDossierImage:
    'linear-gradient(-180deg, rgba(39,39,39,.9) 0%, rgba(255,255,255,0) 60%)',
  brandRepGradientGlare:
    'linear-gradient(50deg, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%)',
  brandRepGradientDark:
    'linear-gradient(-166deg, rgba(255,255,255,0) 40%,rgba(0,0,0,0.2) 60%, rgba(0,0,0,.9) 90%)',
  brandRepGradientGlareSm:
    'linear-gradient(20deg, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)',
  brandRepGradientDarkSm:
    'linear-gradient(-180deg, rgba(255,255,255,0) 26%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.9) 90%)',

  // fonts (official)
  fontGotham: '"Gotham A", "Gotham B", Helvetica, Arial, sans-serif', // TODO: remove this after rebrush is done
  fontIcon: 'BeoIcons-Light',
  fontRasch: 'rasch-font',
  fontHelvetica: 'Helvetica, Arial, sans-serif',

  // font sizes
  h2FontSize: '2rem',
  h3FontSize: '1.5rem',
  bodyFontSize: '16px',

  bodyLineHeight: '3.1rem',
  footerHeight: '46px',

  // advertisement
  monsterSkyContentMargin: '40px',
  monsterSkyWidth: '300px',
  monsterSkyHeight: '600px',
  wideboardHeight: '250px',
  wideboardWidth: '994px',
  rectangleHeight: '250px',
  rectangleWidth: '300px',

  // form style
  inputHeight: '24px',
  inputBottomLineGap: '10px',
  inputLineWidth: '1px',

  // seat change teaser
  singlePictureWidthSm: '150px',
  singlePictureWidthMd: '120px',
  singlePictureWidthLg: '160px',
  singlePictureWidthXl: '160px',
  singlePictureWidthXxl: '170px',

  doublePictureWidthSm: '120px',
  doublePictureWidthMd: '110px',
  doublePictureWidthLg: '150px',
  doublePictureWidthXl: '150px',
  doublePictureWidthXxl: '170px',

  indentSecondPictureSm: '32.73px',
  indentSecondPictureMd: '29px',
  indentSecondPictureLg: '20px',
  indentSecondPictureXl: '46px',
  indentSecondPictureXxl: '40px',

  // others
  retinaFontScale: '1.1',
  retinaDpi: '192dpi',

  // transitions
  $navigationTransitionFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

  /*  Colors with no equivalents in palette */
  blackAlpha4: 'rgba(0, 0, 0, .4)',
  blackAlpha5: 'rgba(0, 0, 0, .5)',
};
