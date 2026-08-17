//

const {
  BREAKPOINTS,
  GRID,
  ZINDEXES,
  SPACING,
  COLORS,
} = require('../../../../../common/assets/styles/variablesDefault.legacy.css');

module.exports = {
  // use global variables
  ...BREAKPOINTS,
  ...GRID,
  ...ZINDEXES,
  ...SPACING,
  ...COLORS,

  // colors
  white: 'rgba(255, 255, 255, 1)', //#FFFFFF
  black5: 'rgba(0, 0, 0, .5)',
  black15: 'rgba(0, 0, 0, .15)',
  black25: 'rgba(0, 0, 0, .25)',
  blackAlpha4: 'rgba(0, 0, 0, .4)',
  neutralA: 'rgba(0, 0, 0, 1)', // #000000
  neutralA50: 'rgba(0, 0, 0, .5)', // #000000
  neutralA80: 'rgba(0, 0, 0, .8)', // #000000
  neutralB: 'rgba(74, 74, 74, 1)', // #4A4A4A
  neutralC: 'rgba(102, 102, 102, 1)', // #666666
  neutralD: 'rgba(136, 136, 136, 1)', // #888888
  neutralE: 'rgba(216, 216, 216, 1)', // #D8D8D8
  neutralF: 'rgba(239, 239, 239, 1)', // #EFEFEF
  neutralG: 'rgba(245, 245, 245, 1)', // #F5F5F5
  greyA: 'rgba(106, 110, 113, 1)', // #6A6E71
  greyB: 'rgba(160, 163, 166, 1)', // #A0A3A6
  greyC: 'rgba(216, 216, 216, 1)', // #D8D8D8
  greyD: 'rgba(239, 239, 239, 1)', //#EFEFEF
  greyE: 'rgba(245, 245, 245, 1)', //#F5F5F5
  greyF: 'rgb(245, 245, 245)', //#F5F5F5
  pink: 'rgb(247, 230, 238)', //#F7E6EE
  blogQbella: '#009246',
  blogQitalia: '#ce2b37',

  primaryA: 'rgba(236, 198, 0, 1)', // #ECC600
  primaryB: 'rgba(207, 155, 7, 1)', // #CF9B07
  primaryC: 'rgba(208, 132, 6, 1)', // #D08406

  zueriA: 'rgba(125, 186, 254, 1)', // #7DBAFF
  zueriB: 'rgba(1, 45, 133, 1)', // #012D85
  caminadaA: 'rgba(87, 79, 132, 1)', // #574F84
  caminadaB: 'rgba(1, 1, 2, 1)', // #010102

  error: 'rgba(208, 2, 27, 1)', // #D0021B
  success: 'rgba(20, 128, 72, 1)', // #148048

  transparent: 'transparent',
  whiteTransparent: 'linear-gradient(to right, rgba(255, 255, 255, 0), $white)', // it is used in background-gradients (there is a bug with transparent in safari)
  inherit: 'inherit',

  // not from styleguide
  grayPlaceholder: 'rgba(246, 246, 246,1)', // #f6f6f6
  logoutAnimatedDotsColor: '#292e32',

  // gradients
  gradientPrimaryA: 'linear-gradient(90deg, $primaryA 0%, $primaryC 100%)',
  gradientPrimaryB: 'linear-gradient(0deg, $primaryA 0%, $primaryC 100%)',
  gradientZueri: 'linear-gradient(90deg, $zueriA 0%, $zueriB 100%)',
  gradientCaminada: 'linear-gradient(90deg, $caminadaA 0%, $caminadaB 100%)',
  gradientTeaserA:
    'linear-gradient(to bottom, color($white a(0%)) 50%, color($neutralA a(50%)) 100%)',

  // shadow
  shadowA: '0px 1px 1px $black5',
  shadowB: '0px 1px 4px $black15',
  shadowC: '0px 1px 4px $black25',

  // paddings
  defaultPadding: '10px', // tmp, replace it with correct value
  mediumPadding: '20px', // tmp, replace it with correct value
  largePadding: '30px', // tmp, replace it with correct value
  smallPadding: '5px',

  // margins
  smallMargin: '5px',
  defaultMargin: '10px', // tmp, replace it with correct value
  mediumMargin: '20px', // tmp, replace it with correct value
  largeMargin: '30px', // tmp, replace it with correct value
  sectionParagraphMarginXs: '20px',
  sectionParagraphMarginMd: '30px',
  sectionParagraphMarginLg: '30px',

  // fonts (official)
  fontActaDisplay: 'ActaDisplay, serif',
  fontActaHeadline: 'ActaHeadline, serif',
  fontBagueSansPro: 'BagueSansPro, sans-serif',
  fontBagueSansProHairline: 'BagueSansPro-Hairline, sans-serif',
  fontBagueSansProXThin: 'BagueSansPro-XThin, sans-serif',
  fontBagueSansProUBlack: 'BagueSansPro-UBlack, sans-serif',
  fontIcon: 'gault-millau',

  // font sizes
  // h1FontSize              : '32px',
  h2FontSize: '2rem',
  h3FontSize: '1.5rem',
  bodyFontSize: '16px',

  // line heights
  // h1LineHeight            : '36px',
  // h2LineHeight            : '28px',
  // h3LineHeight            : '24px',
  bodyLineHeight: 1.6,

  footerHeightXs: '464px',
  footerHeightLg: '283px',
  footerHeightXl: '212px',

  headerHeightXs: '45px',
  headerHeightLg: '55px',
  headerHeightXl: '65px',

  headerHeightObserver: '50px',

  utilityBarHeight: '40px',

  // linkLineHeight          : '20px',
  // secondaryLinkLineHeight : '19px',
  // columnLineHeight        : '18px',
  // metaInfoLineHeight      : '16px',

  hideMobileGMLogo: '374px',

  // advertisement
  monsterSkyContentMargin: '40px',
  monsterSkyWidth: '300px',
  monsterSkyHeight: '600px',
  wideboardHeight: '250px',
  wideboardWidth: '994px',
  rectangleHeight: '250px',
  rectangleWidth: '300px',

  // z-Indexes
  zIndexLow: 0,
  zIndexMedium: 10,
  zIndexHigh: 100,
  zIndexHighest: 1000,
  zIndexHeaderAd: 1001,
  zIndexOverlay: 100001,

  // form style
  inputHeight: '24px',
  inputBottomLineGap: '10px',
  inputLineWidth: '1px',

  /*  Colors with no equivalents in palette */
  blackA: 'rgba(0, 0, 0, 1)', //#000000
  blackB: 'rgb(41, 46, 50, 1)', //#292E32
  blackC: 'rgb(105, 105, 105)', //#696969
  blackAlpha5: 'rgba(0, 0, 0, .5)',
  redA: 'rgba(213, 16, 48, 1)', // #D51030
};
