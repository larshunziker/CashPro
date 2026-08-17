import { getImageObjectSchema } from '../../../shared/helpers/withHelmet';
import { StructuredData } from '../../../shared/decorators/@types/withHelmetFactory';
import {
  ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
  ROOT_SCHEMA_TYPE_SOFTWARE,
  SHARED_META_DATA,
} from '../../../shared/constants/structuredData';
import appleTouchIcon120 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-120x120.png';
import appleTouchIcon152 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-180x180.png';
import appleIcon from '../../screens/App/assets/graphics/favicon/apple-touch-icon.png';
import androidIcon from '../../screens/App/assets/graphics/logo-cash.png';
import iPadAirSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iPadAir_landscape_splash.png';
import iPadAirSplash from '../../screens/App/assets/graphics/splashscreens/iPadAir_splash.png';
import iPhoneSEAndLaterSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iPhone_SE_and_later_landscape_splash.png';
import iPhoneSEAndLaterSplash from '../../screens/App/assets/graphics/splashscreens/iPhone_SE_and_later_splash.png';
import iPadMiniSplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadMini_landscape_splash.png';
import iPadMiniSplash from '../../screens/App/assets/graphics/splashscreens/ipadMini_splash.png';
import iPadPro1SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro1_landscape_splash.png';
import iPadPro1Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro1_splash.png';
import iPadPro2SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro2_landscape_splash.png';
import iPadPro2Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro2_splash.png';
import iPadPro3SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro3_landscape_splash.png';
import iPadPro3Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro3_splash.png';
import iphone13SplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone13_landscape_splash.png';
import iphone13Splash from '../../screens/App/assets/graphics/splashscreens/iphone13_splash.png';
import iphone13maxSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone13max_landscape_splash.png';
import iphone13maxSplash from '../../screens/App/assets/graphics/splashscreens/iphone13max_splash.png';
import iPhone14proMaxSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone14proMax_landscape_splash.png';
import iPhone14proMaxSplash from '../../screens/App/assets/graphics/splashscreens/iphone14proMax_splash.png';
import iPhone14proSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone14pro_landscape_splash.png';
import iPhone14proSplash from '../../screens/App/assets/graphics/splashscreens/iphone14pro_splash.png';
import iPhone8SplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone8_landscape_splash.png';
import iPhone8Splash from '../../screens/App/assets/graphics/splashscreens/iphone8_splash.png';
import iPhonePlusSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone8plus_landscape_splash.png';
import iPhonePlusSplash from '../../screens/App/assets/graphics/splashscreens/iphone8plus_splash.png';
import iPhoneXSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonex_landscape_splash.png';
import iPhoneXSplash from '../../screens/App/assets/graphics/splashscreens/iphonex_splash.png';
import iPhoneXRSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonexr_landscape_splash.png';
import iPhoneXRSplash from '../../screens/App/assets/graphics/splashscreens/iphonexr_splash.png';
import iPhoneXSMaxSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonexsmax_landscape_splash.png';
import iPhoneXSMaxSplash from '../../screens/App/assets/graphics/splashscreens/iphonexsmax_splash.png';
import { MetaIcons, MetaTag } from '../../../common/components/Helmet/typings';

/**
 * @TODO
 * Do NOT make this in-line data: attributes. They bloat the response for EVERY browser.
 * Use an SVG loader or something (or file-loader to copy the to the public folder).
 * Apple Guidelines https://developer.apple.com/design/human-interface-guidelines/foundations/layout
 */

// sonar-disable

const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;

/**
 * meta data
 */
export const metaData: Array<MetaTag> = [
  ...SHARED_META_DATA,
  {
    name: 'msapplication-TileColor',
    content: '#ffffff',
  },
  {
    name: 'theme-color',
    content: '#ffffff',
  },
  {
    property: 'og:site_name',
    content: 'cash.ch',
  },
  {
    property: 'og:locale',
    content: 'de_DE',
  },
  {
    property: 'fb:pages',
    content: '117305114951399',
  },
  {
    name: 'apple-mobile-web-app-title',
    content: 'cash.ch',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'white-translucent',
  },
  {
    name: 'twitter:site',
    content: '@cashch',
  },
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:creator',
    content: '@cashch',
  },
  {
    name: 'vf:domain',
    content: `${viafouraSubdomain}.cash.ch`,
  },
];

/**
 * html attributes
 */
export const htmlAttributes: Record<string, string> = {
  lang: 'de-CH',
};

/**
 * meta links for icons
 */
export const metaIcons: Array<MetaIcons> = [];

/**
 * meta links
 *
 * @desc  array of meta links
 * @type {Array<Object>}
 */
export const metaLinks = [
  { rel: 'icon', type: 'image/x-icon', href: '' },
  // iPhone 5, 5S, SE (640px x 1136px)
  { name: 'msapplication-TileColor', content: '#ffffff' },
  { name: 'theme-color', content: '#ffffff' },
  { rel: 'apple-touch-icon', sizes: '120x120', href: appleTouchIcon120 },
  { rel: 'apple-touch-icon', sizes: '152x152', href: appleTouchIcon152 },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIcon180 },
  { rel: 'apple-touch-icon', href: appleTouchIcon180 },
  { rel: 'apple-touch-icon-precomposed', href: appleTouchIcon180 },
  // iPhone SE and Later(640px x 1136px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhoneSEAndLaterSplash,
  },
  // iPhone SE and later (1136px x 640px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhoneSEAndLaterSplashLandscape,
  },
  // iPhone 8, 7, 6s, 6 (750px x 1334px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhone8Splash,
  },
  // iPhone 8, 7, 6s, 6 (1334px x 750px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhone8SplashLandscape,
  },
  // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhonePlusSplash,
  },
  // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (2208px x 1242px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhonePlusSplashLandscape,
  },
  // iPhone X, Xs,12 mini, 13 mini (1125px x 2436px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhoneXSplash,
  },
  // iPhone X, Xs 12 mini, 13 mini (2436px x 1125px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhoneXSplashLandscape,
  },
  // iPhone 11, Xr (828px x 1792px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhoneXRSplash,
  },
  // iPhone 11, Xr (1792px x 828px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhoneXRSplashLandscape,
  },
  // iPhone 11 pro Max, Xs Max (1242px x 2688px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhoneXSMaxSplash,
  },
  // iPhone 11 pro Max, Xs Max (2688px x 1242px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhoneXSMaxSplashLandscape,
  },
  // iPhone 13/14, 13/12 pro (1170x2532px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iphone13Splash,
  },
  // iPhone 13/14, 13/12pro (1170x2532px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iphone13SplashLandscape,
  },
  // iPhone 13/12 pro max, 14 plus (1284x2778px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iphone13maxSplash,
  },
  // iPhone 13/12 pro max, 14 plus (1284x2778px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iphone13maxSplashLandscape,
  },
  // iPhone 14 pro (1179x2556px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhone14proSplash,
  },
  // iPhone 14 pro (1179x2556px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhone14proSplashLandscape,
  },
  // iPhone 14 pro max (1290x2796 px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhone14proMaxSplash,
  },
  // iPhone 14 pro max (1290x2796 px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhone14proMaxSplashLandscape,
  },
  // 7.9" iPad mini, 9.7" iPad, 9.7" iPad Air, 9.7" iPad Pro (1536px x 2048px)
  {
    rel: 'apple-touch_startup_image',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadMiniSplash,
  },
  // 7.9" iPad mini, 9.7" iPad, 9.7" iPad Air, 9.7" iPad Pro  landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadMiniSplashLandscape,
  },
  // 10.5" iPad Pro, 11" iPad Pro (1668px 2388px )
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadPro1Splash,
  },
  // 10.5" iPad Pro, 11" iPad Pro (1668px 2388px ) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadPro1SplashLandscape,
  },
  // iPad Pro 12.9" (2048px x 2732px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadPro2Splash,
  },
  // iPad Pro 12.9" (2732px x 2048px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadPro2SplashLandscape,
  },
  // iPad 10.2" (1620x2160 px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadPro3Splash,
  },
  // iPad 10.2" (1620x2160 px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadPro3SplashLandscape,
  },
  // iPadAir 10.5" (1668x2224 px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadAirSplash,
  },
  // iPad Air 10.5" (1668x2224 px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadAirSplashLandscape,
  },
  {
    rel: 'alternate',
    type: 'application/atom+xml',
    href: 'https://www.cash.ch/rss-article.xml',
    title: 'Cash RSS Feed',
  },
];

export const softwareApplicationSchema = (
  operatingSystem: string,
): {
  applicationScript: Record<string, any>;
  imageScript: Record<string, any>;
} => {
  let url = '',
    logo;

  if (operatingSystem === 'ANDROID') {
    url = 'https://play.google.com/store/apps/details?id=ch.cash.app';
    logo = androidIcon;
  } else if (operatingSystem === 'IOS') {
    url = 'https://apps.apple.com/ch/app/cash-ch/id1363762718';
    logo = appleIcon;
  }

  const imageSchema = getImageObjectSchema({
    staticUrl: `https://www.cash.ch${logo}`,
    width: 192,
    height: 192,
  });

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_SOFTWARE,
    name: 'cash.ch | Wirtschaft & Börse',
    url: url,
    operatingSystem: operatingSystem,
    applicationCategory: 'EntertainmentApplication',
    applicationSubcategory: 'NewsApplication',
    image: {
      '@type': 'ImageObject',
      '@id': `https://www.cash.ch${logo}`,
    },
    publisher: {
      '@type': ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
      '@id': `https://www.cash.ch/#/schema/Organization/1`,
    },
  };

  return {
    applicationScript: applicationSchema,
    imageScript: imageSchema,
  };
};

export const STRUCTURED_META_DATA: StructuredData = {
  sameAs: [
    'https://www.facebook.com/cashFinanzportal',
    'https://twitter.com/cashch',
    'https://www.xing.com/news/pages/cash-ch-268',
    'https://www.linkedin.com/company/cash-ch',
    'https://de.wikipedia.org/wiki/Cash_(Publikation)',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Flurstrasse 55',
    addressLocality: 'Zürich',
    addressRegion: 'Zürich',
    postalCode: '8048',
    addressCountry: 'CH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+41 (0) 58 269 20 00',
    email: 'office@cash.ch',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.cash.ch/suche/alle/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};
