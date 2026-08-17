/**
 * @TODO
 *
 * 1. Do NOT make this in-line data: attributes. They bloat the response for EVERY browser.
 *    Use an SVG loader or something (or file-loader to copy the to the public folder).
 */

// sonar-disable
// import-sort-ignore

import { StructuredData } from '../../../shared/decorators/@types/withHelmetFactory';
import { SHARED_META_DATA } from '../../../shared/constants/structuredData';
import android36 from 'App/assets/graphics/favicon/android-icon-36x36.png';
import android48 from 'App/assets/graphics/favicon/android-icon-48x48.png';
import android72 from 'App/assets/graphics/favicon/android-icon-72x72.png';
import android96 from 'App/assets/graphics/favicon/android-icon-96x96.png';
import android144 from 'App/assets/graphics/favicon/android-icon-144x144.png';
import android192 from 'App/assets/graphics/favicon/android-icon-192x192.png';
import appleIcon57 from 'App/assets/graphics/favicon/apple-icon-57x57.png';
import appleIcon60 from 'App/assets/graphics/favicon/apple-icon-60x60.png';
import appleIcon72 from 'App/assets/graphics/favicon/apple-icon-72x72.png';
import appleIcon76 from 'App/assets/graphics/favicon/apple-icon-76x76.png';
import appleIcon114 from 'App/assets/graphics/favicon/apple-icon-114x114.png';
import appleTouchIcon120 from 'App/assets/graphics/favicon/apple-touch-icon-120x120.png';
import appleIcon144 from 'App/assets/graphics/favicon/apple-icon-144x144.png';
import appleTouchIcon152 from 'App/assets/graphics/favicon/apple-touch-icon-152x152.png';
import appleTouchIcon180 from 'App/assets/graphics/favicon/apple-touch-icon-180x180.png';
import mstile70x70 from 'App/assets/graphics/favicon/ms-icon-70x70.png';
import mstile144x144 from 'App/assets/graphics/favicon/ms-icon-144x144.png';
import mstile150x150 from 'App/assets/graphics/favicon/ms-icon-150x150.png';
import mstile310x310 from 'App/assets/graphics/favicon/ms-icon-310x310.png';
// @ts-ignore
import favicon from 'App/assets/graphics/favicon/favicon.ico';
import favicon16 from 'App/assets/graphics/favicon/favicon-16x16.png';
import favicon32 from 'App/assets/graphics/favicon/favicon-32x32.png';
import favicon96 from 'App/assets/graphics/favicon/favicon-96x96.png';
import iPadSplashLandscape from 'App/assets/graphics/splashscreens/ipad_landscape_splash.png';
import iPadSplash from 'App/assets/graphics/splashscreens/ipad_splash.png';
import iPadPro1SplashLandscape from 'App/assets/graphics/splashscreens/ipadpro1_landscape_splash.png';
import iPadPro1Splash from 'App/assets/graphics/splashscreens/ipadpro1_splash.png';
import iPadPro2SplashLandscape from 'App/assets/graphics/splashscreens/ipadpro2_landscape_splash.png';
import iPadPro2Splash from 'App/assets/graphics/splashscreens/ipadpro2_splash.png';
import iPadPro3SplashLandscape from 'App/assets/graphics/splashscreens/ipadpro3_landscape_splash.png';
import iPadPro3Splash from 'App/assets/graphics/splashscreens/ipadpro3_splash.png';
import iPhone5SplashLandscape from 'App/assets/graphics/splashscreens/iphone5_landscape_splash.png';
import iPhone5Splash from 'App/assets/graphics/splashscreens/iphone5_splash.png';
import iPhone6SplashLandscape from 'App/assets/graphics/splashscreens/iphone6_landscape_splash.png';
import iPhone6Splash from 'App/assets/graphics/splashscreens/iphone6_splash.png';
import iPhonePlusSplashLandscape from 'App/assets/graphics/splashscreens/iphoneplus_landscape_splash.png';
import iPhonePlusSplash from 'App/assets/graphics/splashscreens/iphoneplus_splash.png';
import iPhoneXSplashLandscape from 'App/assets/graphics/splashscreens/iphonex_landscape_splash.png';
import iPhoneXSplash from 'App/assets/graphics/splashscreens/iphonex_splash.png';
import iPhoneXRSplashLandscape from 'App/assets/graphics/splashscreens/iphonexr_landscape_splash.png';
import iPhoneXRSplash from 'App/assets/graphics/splashscreens/iphonexr_splash.png';
import iPhoneXSMaxSplashLandscape from 'App/assets/graphics/splashscreens/iphonexsmax_landscape_splash.png';
import iPhoneXSMaxSplash from 'App/assets/graphics/splashscreens/iphonexsmax_splash.png';
import { MetaTag } from '../../../common/components/Helmet/typings';

export const fbAppId = '221714391181050';

const viafouraSubdomain = __DOT_ENV__ === 'master' ? 'www' : __DOT_ENV__;

/**
 * meta data
 *
 * @desc  define meta data
 * @type {Array<Object>}
 */
export const metaData: Array<MetaTag> = [
  ...SHARED_META_DATA,
  {
    name: 'google-site-verification',
    content: '4QM0ylIOUnpsiAnwXTXYyyzvlGcj8xQWIuiU9KU5RZE',
  },
  {
    name: 'msapplication-TileColor',
    content: '#ffffff',
  },
  {
    name: 'theme-color',
    content: '#ffffff',
  },
  {
    name: 'article:publisher',
    content: 'https://www.facebook.com/SchweizerIllustrierte',
  },
  {
    property: 'fb:app_id',
    content: fbAppId,
  },
  {
    property: 'fb:admins',
    content: '69838906408',
  },
  {
    property: 'fb:pages',
    content: '69838906408',
  },
  {
    property: 'og:site_name',
    content: 'Schweizer Illustrierte',
  },
  {
    property: 'og:locale',
    content: 'de_DE',
  },
  {
    name: 'apple-mobile-web-app-title',
    content: 'Schweizer Illustrierte',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'white-translucent',
  },
  {
    name: 'vf:domain',
    content: `${viafouraSubdomain}.schweizer-illustrierte.ch`,
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

type MetaIcons = {
  rel?: string;
  href?: string;
  name?: string;
  title?: string;
  sizes?: string;
  type?: string;
  media?: string;
  content?: string;
};

/**
 * meta links for icons
 *
 * @desc  array of meta links for icons
 * @type {Array<Object>}
 */
export const metaIcons: Array<MetaIcons> = [
  { rel: 'shortcut icon', type: 'image/x-icon', href: favicon },
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
  { rel: 'icon', type: 'image/png', sizes: '36x36', href: android36 },
  { rel: 'icon', type: 'image/png', sizes: '48x48', href: android48 },
  { rel: 'icon', type: 'image/png', sizes: '72x72', href: android72 },
  { rel: 'icon', type: 'image/png', sizes: '96x96', href: android96 },
  { rel: 'icon', type: 'image/png', sizes: '144x144', href: android144 },
  { rel: 'icon', type: 'image/png', sizes: '192x192', href: android192 },
  { name: 'msapplication-square70x70logo', content: mstile70x70 },
  { name: 'msapplication-square144x144logo', content: mstile144x144 },
  { name: 'msapplication-square150x150logo', content: mstile150x150 },
  { name: 'msapplication-square310x310logo', content: mstile310x310 },
  {
    rel: 'alternate',
    type: 'application/atom+xml',
    href: 'https://www.schweizer-illustrierte.ch/rss_feed',
    title: 'Schweizer Illustrierte RSS Feed',
  },
];

/**
 * meta links
 *
 * @desc  array of meta links
 * @type {Array<Object>}
 */
export const metaLinks: Array<Record<string, any>> = [];

export const STRUCTURED_META_DATA: StructuredData = {
  sameAs: [
    'https://www.facebook.com/SchweizerIllustrierte',
    'https://www.instagram.com/schweizer_illustrierte/',
    'https://www.youtube.com/user/SIOnlineYT',
    'https://de.wikipedia.org/wiki/Schweizer_Illustrierte',
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
    telephone: '+41 (0) 58 269 26 26',
    email: 'info@schweizer-illustrierte.ch',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate:
        'https://www.schweizer-illustrierte.ch/suche/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};
