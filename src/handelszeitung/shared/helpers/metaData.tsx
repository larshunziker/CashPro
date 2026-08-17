/**
 * @TODO
 *
 * 1. Do NOT make this in-line data: attributes. They bloat the response for EVERY browser.
 *    Use an SVG loader or something (or file-loader to copy the to the public folder)
 */

// sonar-disable
// import-sort-ignore
// eslint import/order : off
import { StructuredData } from '../../../shared/decorators/@types/withHelmetFactory';
import { getImageObjectSchema } from '../../../shared/helpers/withHelmet';
import {
  ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
  ROOT_SCHEMA_TYPE_SOFTWARE,
  SHARED_META_DATA,
} from '../../../shared/constants/structuredData';
import { SOCIAL_MEDIA_LINK_FACEBOOK } from '../../screens/App/constants';
import { PUBLISHER } from '../../screens/App/screens/Article/constants';
import android192 from '../../screens/App/assets/graphics/favicon/android-icon-192x192.png';
import appleIcon57 from '../../screens/App/assets/graphics/favicon/apple-icon-57x57.png';
import appleIcon60 from '../../screens/App/assets/graphics/favicon/apple-icon-60x60.png';
import appleIcon72 from '../../screens/App/assets/graphics/favicon/apple-icon-72x72.png';
import appleIcon76 from '../../screens/App/assets/graphics/favicon/apple-icon-76x76.png';
import appleIcon114 from '../../screens/App/assets/graphics/favicon/apple-icon-114x114.png';
import appleIcon144 from '../../screens/App/assets/graphics/favicon/apple-icon-144x144.png';
import appleTouchIcon120 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-120x120.png';
import appleTouchIcon152 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from '../../screens/App/assets/graphics/favicon/apple-touch-icon-180x180.png';
import favicon from '../../screens/App/assets/graphics/favicon/favicon.ico';
import favicon16 from '../../screens/App/assets/graphics/favicon/favicon-16x16.png';
import favicon32 from '../../screens/App/assets/graphics/favicon/favicon-32x32.png';
import favicon96 from '../../screens/App/assets/graphics/favicon/favicon-96x96.png';
import iPadSplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipad_landscape_splash.png';
import iPadSplash from '../../screens/App/assets/graphics/splashscreens/ipad_splash.png';
import iPadPro1SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro1_landscape_splash.png';
import iPadPro1Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro1_splash.png';
import iPadPro2SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro2_landscape_splash.png';
import iPadPro2Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro2_splash.png';
import iPadPro3SplashLandscape from '../../screens/App/assets/graphics/splashscreens/ipadpro3_landscape_splash.png';
import iPadPro3Splash from '../../screens/App/assets/graphics/splashscreens/ipadpro3_splash.png';
import iPhone5SplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone5_landscape_splash.png';
import iPhone5Splash from '../../screens/App/assets/graphics/splashscreens/iphone5_splash.png';
import iPhone6SplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphone6_landscape_splash.png';
import iPhone6Splash from '../../screens/App/assets/graphics/splashscreens/iphone6_splash.png';
import iPhonePlusSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphoneplus_landscape_splash.png';
import iPhonePlusSplash from '../../screens/App/assets/graphics/splashscreens/iphoneplus_splash.png';
import iPhoneXSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonex_landscape_splash.png';
import iPhoneXSplash from '../../screens/App/assets/graphics/splashscreens/iphonex_splash.png';
import iPhoneXRSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonexr_landscape_splash.png';
import iPhoneXRSplash from '../../screens/App/assets/graphics/splashscreens/iphonexr_splash.png';
import iPhoneXSMaxSplashLandscape from '../../screens/App/assets/graphics/splashscreens/iphonexsmax_landscape_splash.png';
import iPhoneXSMaxSplash from '../../screens/App/assets/graphics/splashscreens/iphonexsmax_splash.png';

import ms144 from '../../screens/App/assets/graphics/favicon/ms-icon-144x144.png';
// @ts-ignore
import ieConfig from '../../screens/App/assets/graphics/favicon/browserconfig.xml';

// we have to include this files also via webpack to move them to buid folder. is used in browserconfig.xml!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ms70 from '../../screens/App/assets/graphics/favicon/ms-icon-70x70.png';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ms150 from '../../screens/App/assets/graphics/favicon/ms-icon-150x150.png';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ms310 from '../../screens/App/assets/graphics/favicon/ms-icon-310x310.png';
import appleIcon from '../../screens/App/assets/graphics/favicon/apple-icon.png';
import androidIcon from '../../screens/App/assets/graphics/favicon/android-icon-96x96.png';

/* eslint-enable no-unused-vars */

export const fbAppId = '510312769361097';

const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;

export const metaData = [
  ...SHARED_META_DATA,
  {
    name: 'google-site-verification',
    content: 'WX4CG9NDSPW9a_ZqftWNnVxHM3R1uos81Jwj64FKcbA',
  },
  {
    name: 'msapplication-TileColor',
    content: '#ffffff',
  },
  {
    name: 'msapplication-TileImage',
    content: ms144,
  },
  {
    name: 'theme-color',
    content: '#ffffff',
  },
  {
    name: 'article:publisher',
    content: SOCIAL_MEDIA_LINK_FACEBOOK,
  },
  {
    property: 'fb:app_id',
    content: fbAppId,
  },
  {
    property: 'fb:pages',
    content: '114215121990330',
  },
  {
    property: 'og:description',
    content: '',
  },
  {
    property: 'og:title',
    content: '',
  },
  {
    property: 'og:site_name',
    content: 'Handelszeitung',
  },
  {
    property: 'og:locale',
    content: 'de_DE',
  },
  {
    name: 'twitter:site',
    content: '@Handelszeitung',
  },
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:creator',
    content: '@Handelszeitung',
  },
  {
    name: 'vf:domain',
    content: `${viafouraSubdomain}.handelszeitung.ch`,
  },
];

/**
 * html attributes
 *
 * @desc  html meta data attributes
 * @type {Object}
 */
export const htmlAttributes: Record<string, any> = {
  lang: 'de-CH',
};

/**
 * meta links
 *
 * @desc  array of meta links
 * @type {Array<Object>}
 */
export const metaLinks = [
  { rel: 'icon', type: 'image/x-icon', href: favicon },
  { rel: 'icon', type: 'image/png', sizes: '192x192', href: android192 },
  { rel: 'apple-touch-icon', sizes: '57x57', href: appleIcon57 },
  { rel: 'apple-touch-icon', sizes: '60x60', href: appleIcon60 },
  { rel: 'apple-touch-icon', sizes: '72x72', href: appleIcon72 },
  { rel: 'apple-touch-icon', sizes: '76x76', href: appleIcon76 },
  { rel: 'apple-touch-icon', sizes: '114x114', href: appleIcon114 },
  { rel: 'apple-touch-icon', sizes: '120x120', href: appleTouchIcon120 },
  { rel: 'apple-touch-icon', sizes: '144x144', href: appleIcon144 },
  { rel: 'apple-touch-icon', sizes: '152x152', href: appleTouchIcon152 },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIcon180 },
  { rel: 'apple-touch-icon', href: appleTouchIcon180 },
  { rel: 'apple-touch-icon-precomposed', href: appleTouchIcon180 },
  // iPhone 5, 5S, SE (640px x 1136px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhone5Splash,
  },
  // iPhone 5, 5S, SE (1136px x 640px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhone5SplashLandscape,
  },
  // iPhone 8, 7, 6s, 6 (750px x 1334px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhone6Splash,
  },
  // iPhone 8, 7, 6s, 6 (1334px x 750px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhone6SplashLandscape,
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
  // iPhone X, Xs (1125px x 2436px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhoneXSplash,
  },
  // iPhone X, Xs (2436px x 1125px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhoneXSplashLandscape,
  },
  // iPhone Xr (828px x 1792px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPhoneXRSplash,
  },
  // iPhone Xr (1792px x 828px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPhoneXRSplashLandscape,
  },
  // iPhone Xs Max (1242px x 2688px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    href: iPhoneXSMaxSplash,
  },
  // iPhone Xs Max (2688px x 1242px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
    href: iPhoneXSMaxSplashLandscape,
  },
  // iPad Mini, Air (1536px x 2048px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadSplash,
  },
  // iPad Mini, Air (2048px x 1536px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadSplashLandscape,
  },
  // iPad Pro 10.5" (1668px x 2224px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadPro1Splash,
  },
  // iPad Pro 10.5" (2224px x 1668p) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
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
  // iPad Pro 11” (1668px x 2388px)
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    href: iPadPro3Splash,
  },
  // iPad Pro 11” (2388px x 1668px) landscape
  {
    rel: 'apple-touch-startup-image',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
    href: iPadPro3SplashLandscape,
  },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon16 },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon32 },
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: favicon96 },
  { name: 'msapplication-config', content: ieConfig },
  { name: 'msapplication-TileColor', content: '#ffffff' },
  { name: 'msapplication-TileImage', content: ms144 },
  { name: 'theme-color', content: '#ffffff' },
];

export const rssLinkPrimary = [
  {
    rel: 'alternate',
    type: 'application/atom+xml',
    href: 'https://www.handelszeitung.ch/google_publisher_center.xml',
    title: 'Handelszeitung RSS Feed',
  },
];

export const rssLinkSecondary = [
  {
    rel: 'alternate',
    type: 'application/atom+xml',
    href: 'https://www.handelszeitung.ch/bilanz/rss_feed',
    title: 'Bilanz RSS Feed',
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
    url =
      'https://play.google.com/store/apps/details?id=ch.ringier.handelszeitung';
    logo = androidIcon;
  } else if (operatingSystem === 'IOS') {
    url = 'https://apps.apple.com/ch/app/handelszeitung/id1631365898';
    logo = appleIcon;
  }

  const imageSchema = getImageObjectSchema({
    staticUrl: `https://www.handelszeitung.ch${logo}`,
    width: 192,
    height: 192,
  });

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_SOFTWARE,
    name: PUBLISHER, // Being Overwritten in withHelmetFactory by publisher
    url: url,
    operatingSystem: operatingSystem,
    applicationCategory: 'EntertainmentApplication',
    applicationSubcategory: 'NewsApplication',
    image: {
      '@type': 'ImageObject',
      '@id': `https://www.handelszeitung.ch${logo}`,
    },
    publisher: {
      '@type': ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
      '@id': `https://www.handelszeitung.ch/#/schema/Organization/1`,
    },
  };

  return {
    applicationScript: applicationSchema,
    imageScript: imageSchema,
  };
};

export const STRUCTURED_META_DATA: StructuredData = {
  sameAs: [
    'https://www.facebook.com/handelszeitung',
    'https://twitter.com/Handelszeitung',
    'https://www.xing.com/news/pages/handelszeitung-ch-1997',
    'https://www.linkedin.com/company/handelszeitung',
    'https://www.instagram.com/handelszeitung/',
    'https://www.youtube.com/channel/UCmTu91eQjJcAxEJOWFD9TQQ',
    'https://de.wikipedia.org/wiki/Handelszeitung',
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
    telephone: '+41 (0) 58 269 25 05',
    email: 'kundenservice@handelszeitung.ch',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.handelszeitung.ch/suche/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};
