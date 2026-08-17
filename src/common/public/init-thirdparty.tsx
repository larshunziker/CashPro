/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'uuid'. '/Users/bhs/code/work/rasch-stack/node_modules/uuid/dist/index.js' */
import { v4 as uuidv4 } from 'uuid';
import { cleanCorruptedUtagCookies } from './utils.ts';

('strict');
/* eslint-disable no-console */
(function () {
  const RC_EMAIL = 'rc:email';
  const MOBILE_BREAKPOINT_TO = 759; // must be the same value as on the stylesheet breakpoint definition!
  const ENV_PRODUCTION = 'production';
  const env =
    (document &&
      document.currentScript &&
      document.currentScript.getAttribute('data-env')) ||
    ENV_PRODUCTION;
  const serviceUrl =
    document &&
    document.currentScript &&
    document.currentScript.getAttribute('data-auth-service-url');

  let ENABLE_LOGS = false;

  if (document.cookie && document.cookie.indexOf('RASCHDEBUG') > -1) {
    ENABLE_LOGS = true;
  }

  cleanCorruptedUtagCookies();

  function setSideBar() {
    document.body && document.body.classList.add('side-bar');
  }

  function resetSideBar() {
    document.body && document.body.classList.remove('side-bar');
  }

  function resetWelcomeAd() {
    document.body && document.body.classList.remove('welcome-ad');
    const topSpecial1 = document.getElementById('top_special_1');
    if (topSpecial1) {
      topSpecial1.classList.remove('welcome-ad-wrapper');
      topSpecial1.innerHTML = '';
    }
  }

  function setWelcomeAd() {
    document.body && document.body.classList.add('welcome-ad');

    if (initialConfig.platform === 'MobileWeb') {
      const slotMTA1 = document.getElementById('mta-1-slot');
      slotMTA1 && slotMTA1.classList.add('welcome-ad-wrapper');
    } else {
      const slotTA1 = document.getElementById('ta-1-slot');
      slotTA1 && slotTA1.classList.add('welcome-ad-wrapper');
    }
    const topSpecial1 = document.getElementById('top_special_1');
    topSpecial1 && topSpecial1.classList.add('welcome-ad-wrapper');
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
  function storageAvailable(type) {
    if (!window) {
      return false;
    }

    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      /* @ts-ignore TODO: TS2339 ->  Property 'setItem' does not exist on type 'Window'. */
      storage.setItem(x, x);
      /* @ts-ignore TODO: TS2339 ->  Property 'removeItem' does not exist on type 'Window'. */
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  function getOlid() {
    const RC_SUB = 'rc:sub';
    const inactiveUserSub =
      storageAvailable('localStorage') && window.localStorage.getItem(RC_SUB);

    if (window.Ads?.config?.ikjuzglkjfroef === false) {
      return '2';
    }

    if (inactiveUserSub) {
      return '1';
    }
    return '0';
  }

  /**
   * @description Set brandingday based on the given options. This function will first reset all DOM nodes and css classes that were set by setBrandingday or setSidebar
   *
   * @param {Object} brandingdayOptions
   * @param {string} brandingdayOptions.bgColor - background color as hex or rgba value (will be set as css background)
   * @param {string} brandingdayOptions.bgImgUrl - background image as string or object {960: "img url for 960px - 1679px", 1680: "img url for 1680px and above"}
   * @param {string} brandingdayOptions.bgFixed [default value true] - set background fixed (css background-attachment: fixed)
   * @param {number} brandingdayOptions.paddingTop [default value 0] - padding top (above the header)
   * @param {string} brandingdayOptions.clickUrl [default value ''] - clickUrl for the clickable areas ontop of the brandingday background
   * @param {string} brandingdayOptions.bgCover [default value false] - set background to cover the whole browser window
   * @param {string} brandingdayOptions.hideHpa [default value true] - show or hide the HPA ad when the branding day is active
   * @param {string} brandingdayOptions.debug [default value false] - adds color highlighting to the clickable areas to visualize them
   */
  function setBrandingDay({
    bgColor = '',
    bgImgUrl = '',
    bgFixed = true,
    paddingTop = 0,
    clickUrl = '',
    bgCover = false,
    hideHpa = true,
    debug = false,
  }) {
    resetAll();

    const imageUrls = {
      960: bgImgUrl && bgImgUrl['960'] ? bgImgUrl['960'] : bgImgUrl,
      1680: bgImgUrl && bgImgUrl['1680'] ? bgImgUrl['1680'] : bgImgUrl,
    };

    const isImageUrlPresent =
      (!!imageUrls['960'] && !!imageUrls['1680']) || false;

    if (!isImageUrlPresent && !bgColor) {
      return;
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<style id="brandingday-css"></style>`,
    );

    const brandingdayCss = document.querySelector('#brandingday-css');

    document.body.classList.add('branding-day');

    if (clickUrl) {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<a id="brandingday-top-header-click-wrapper" target="_blank" rel="noopener" href="${clickUrl}"></a>
        <a id="brandingday-top-click-wrapper" target="_blank" rel="noopener" href="${clickUrl}"></a>
        <a id="brandingday-left-click-wrapper" target="_blank" rel="noopener" href="${clickUrl}"></a>
        <a id="brandingday-right-click-wrapper" target="_blank" rel="noopener" href="${clickUrl}"></a>
        `,
      );
    }

    const appBrandingDayCss =
      typeof window.getBrandingDayCss === 'function' &&
      window.getBrandingDayCss({
        imageUrls,
        bgColor,
        bgFixed,
        paddingTop,
        bgCover,
        hideHpa,
        debug,
        isImageUrlPresent,
      });

    if (clickUrl) {
      const img: any = new Image();
      img.onload = function () {
        /* @ts-ignore TODO: TS2339 ->  Property 'expandTopClickWrapper' does not exist on type 'false | { brandingDayCss */
        appBrandingDayCss.expandTopClickWrapper();
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        brandingdayCss.innerHTML = `
        ${brandingdayCss?.innerHTML}
        ${appBrandingDayCss ? appBrandingDayCss?.smallImageCss : ''}
        `;
      };
      img.src = imageUrls['960'];

      if (imageUrls['960'] !== imageUrls['1680']) {
        img.onload = function () {
          /* @ts-ignore TODO: TS2339 ->  Property 'expandTopClickWrapper' does not exist on type 'false | { brandingDayCss */
          appBrandingDayCss.expandTopClickWrapper();
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          brandingdayCss.innerHTML = `
          ${brandingdayCss?.innerHTML}
          ${appBrandingDayCss ? appBrandingDayCss?.largeImageCss : ''}
          `;
        };
        img.src = imageUrls['1680'];
      }
    }

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    brandingdayCss.innerHTML = `
      ${brandingdayCss?.innerHTML}
      ${appBrandingDayCss ? appBrandingDayCss?.brandingDayCss : ''}
    `;
  }

  function resetBrandingDay() {
    document.body && document.body.classList.remove('branding-day');

    if (document.querySelector('#brandingday-css')) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      document.querySelector('#brandingday-css').remove();
    }
    if (document.querySelector('#brandingday-left-click-wrapper')) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      document.querySelector('#brandingday-left-click-wrapper').remove();
    }
    if (document.querySelector('#brandingday-right-click-wrapper')) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      document.querySelector('#brandingday-right-click-wrapper').remove();
    }
    if (document.querySelector('#brandingday-top-click-wrapper')) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      document.querySelector('#brandingday-top-click-wrapper').remove();
    }
    if (document.querySelector('#brandingday-top-header-click-wrapper')) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      document.querySelector('#brandingday-top-header-click-wrapper').remove();
    }
  }

  function resetAll() {
    resetBrandingDay();
    resetSideBar();
    resetWelcomeAd();
  }

  // read config
  window.Ads = (env === ENV_PRODUCTION &&
    window.__INITIAL_ADS_CONFIG__ &&
    JSON.parse(JSON.stringify(window.__INITIAL_ADS_CONFIG__))) || {
    config: {
      platform: getAdPlatformByWindowWidth(),
      channel: 'Home',
      vastUrl: null,
      ikjuzglkjfroef: true, // are ads enabled (ad-free logic) check templates.ejs
    },
    tracking: {
      uuid: '',
      loadSlotInitThirdParty: 0,
      screenReady: 0,
      callLoadSlot: 0,
      initialStartTime: '',
    },
    targeting: {},
    helpers: {},
  };

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global.Ads.tracking) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.Ads.tracking.initialStartTime = Date.now();
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.Ads.tracking.uuid = uuidv4();
  }
  const isHybridApp = window?.__INITIAL_STATE__?.route?.isHybridApp || false;

  // override initial platform config (ssr has to return platform for other apps to work)
  window.Ads.config.platform = getAdPlatformByWindowWidth();
  // override initial ad-free config (ikjuzglkjfroef true = ads enabled)
  window.Ads.config.ikjuzglkjfroef =
    window.location.host.indexOf('preview.') === -1;

  window.Ads.config.targeting = {
    ...window.Ads.config.targeting,
    // @ts-ignore
    olid: window.olid || getOlid(),
  };

  if (ENABLE_LOGS) {
    console.warn(
      'init-thirdparty',
      'window scope initialized',
      JSON.stringify({ ...window.Ads.config, isHybridApp }, null, 2),
    );
  }

  const initialConfig: Record<string, any> = window.Ads.config || {};

  function getAdPlatformByWindowWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= MOBILE_BREAKPOINT_TO) {
      return 'MobileWeb';
    }
    return 'Desktop';
  }

  function initAppNexusTagManager() {
    if (ENABLE_LOGS) {
      console.warn('init-thirdparty', 'appnexus loading...');
    }

    if (ENABLE_LOGS) {
      console.warn('init-thirdparty', 'adTagManagerLoader loaded');
    }
    if (env === ENV_PRODUCTION && !initialConfig.isAdSuppressed) {
      registerInitAds();
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'object' implicitly has an 'any' type. */
    function removeEmptyKeysFromObject(object) {
      return Object.keys(object)
        .filter(function (key) {
          return object[key] !== null;
        })
        .reduce(function (newObject, key) {
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
          newObject[key.toLowerCase()] =
            typeof object[key] === 'object'
              ? removeEmptyKeysFromObject(object[key])
              : object[key];
          return newObject;
        }, {});
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
    function getPageType(type) {
      switch (type) {
        case 'LandingPage':
        case 'Dossier':
        case 'Ranking':
        case 'Sponsor':
        case 'Keyword':
        case 'Partners':
        case 'Person':
        case 'Restaurants':
        case 'RestaurantsMap':
        case 'RestaurantsSearch':
        case 'Search':
        case 'Videos':
        case 'ImageGallery':
        case 'Sponsors':
        case 'EventsCalendar':
        case 'Channel':
          return 'overview';
        case 'NotFound':
          return 'notfound';
        default:
          return 'article';
      }
    }

    async function registerInitAds() {
      const isIOS =
        isHybridApp &&
        [
          /cfnetwork\/.+darwin/i,
          /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
        ].some((item) => item.test(global.navigator.userAgent));

      let nativeWebapp: 'mobileweb' | 'ios' | 'android' | undefined;
      const isMobileWeb = initialConfig.platform === 'MobileWeb';
      if (isMobileWeb && !isHybridApp) {
        nativeWebapp = 'mobileweb';
      } else if (isHybridApp) {
        if (isIOS) {
          nativeWebapp = 'ios';
        } else {
          nativeWebapp = 'android';
        }
      }

      const rc_email = localStorage.getItem(RC_EMAIL);
      let oneId = '';

      if (rc_email) {
        try {
          const parsed = JSON.parse(rc_email);

          if (typeof parsed === 'string') {
            // Case: '"abc123"'
            oneId = parsed;
          } else if (parsed && typeof parsed === 'object') {
            // Case: {"oneId":"abc123"} or {"oneId":{"oneId":"abc123"}}
            oneId = parsed.oneId?.oneId || parsed.oneId || '';
          }
        } catch {
          // Case: plain string like "abc123" (not JSON)
          oneId = rc_email;
        }
      }

      if (serviceUrl && (!oneId || oneId === 'undefined')) {
        try {
          const response = await fetch(
            `${serviceUrl.replace(/^(https?):\/\//, '//')}/userLoggedIn`,
            {
              credentials: 'include',
            },
          );
          const data = await response.json();

          if (data?.email_encoded) {
            localStorage.setItem(
              RC_EMAIL,
              JSON.stringify({ oneId: data.email_encoded, source: 'onelog' }),
            );
          }
        } catch {}
      }

      window.admTagMan.q.push(function () {
        if (ENABLE_LOGS) {
          console.warn(
            'init-thirdparty',
            'init ads for channel ' + initialConfig.channel,
            'init ads for platform ' + initialConfig.platform,
          );
        }
        const targeting = removeEmptyKeysFromObject(
          initialConfig.targeting || {},
        ) as Record<string, any>;
        if (targeting && targeting.keywords) {
          const keywords = Object.keys(targeting.keywords).map(
            function (index) {
              return targeting.keywords[index];
            },
          );

          targeting.keywords = keywords;
        }

        // force ads for tests
        if (document.cookie && document.cookie.indexOf('RASCHFORCEADS') > -1) {
          targeting.admforce = 'qa';
        }

        // appNexus init with current platform (Desktop/MobileWeb)
        // and channel: (channel/vertical/subVertical/section) such as /arbeit, /people, /unternehmen...
        // channel in targeting is used for the publication targeting on admeira jira/../AD-7
        window.admTagMan.init({
          platform: initialConfig.platform,
          channel: initialConfig.channel,
          ...(oneId ? { oneId } : {}),
          targeting: {
            ...targeting,
            pagetype: getPageType(targeting.articletype),
            channel: targeting.publication,
            olid: window.olid || getOlid(),
            ...(nativeWebapp ? { native_webapp: nativeWebapp } : {}),
          },
        });
        if (nativeWebapp) {
          window.Ads.config.native_webapp = nativeWebapp;
        }
      });

      // appNexus function to push our slots
      window.admTagMan.q.push(function () {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const isAdFree = global.Ads?.config?.ikjuzglkjfroef === false;

        if (ENABLE_LOGS) {
          console.log('init-thirdparty', 'ad-free user (isAdFree)', !!isAdFree);
        }

        if (!isAdFree) {
          const slots = [...document.querySelectorAll('.ad-wrapper')];

          /* @ts-ignore TODO: TS2322 ->  Type '({ excludeSizes */
          const slotsToRegister: AppNexusSlot[] = slots.map((elem) => {
            const slot = elem.querySelector('[data-slot-name]');
            if (!slot) {
              if (ENABLE_LOGS) {
                console.warn(
                  'init-thirdparty',
                  'Ad-Slot without devicetype found',
                  JSON.stringify(elem, null, 2),
                );
              }
              return;
            }
            const slotName = slot.getAttribute('data-slot-name');
            const excludeSizes = slot.getAttribute('data-slot-exclude-sizes');
            const deviceType = slot.getAttribute('data-device-type') as
              | 'mobile'
              | 'tabletDesktop';
            const container = slot.id;

            return {
              excludeSizes,
              container,
              deviceType,
              slot: slotName,
            };
          });

          const deviceType =
            initialConfig.platform === 'MobileWeb' ? 'mobile' : 'tabletDesktop';

          slotsToRegister.unshift({
            slot: 'top_special_1',
            container: 'top_special_1',
            deviceType,
          });

          const filteredSlots = slotsToRegister.filter(function (item) {
            if (!item) {
              return;
            }
            return item.deviceType === deviceType;
          });

          if (ENABLE_LOGS) {
            console.warn(
              'init-thirdparty',
              'start register slots',
              JSON.stringify(filteredSlots, null, 2),
            );
          }

          filteredSlots.forEach(function (item) {
            if (document.getElementById(item.container)) {
              if (ENABLE_LOGS) {
                console.warn('init-thirdparty', 'registerSlot ' + item.slot);
              }

              window.admTagMan.registerSlot(item);
            } else if (ENABLE_LOGS) {
              console.warn(
                'init-thirdparty',
                'registerSlot ' + item.container + ' not found in DOM!',
              );
            }
          });

          if (ENABLE_LOGS) {
            console.log('init-thirdparty', 'load slots');
          }
          window.admTagMan.loadSlots();
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          if (global?.Ads?.tracking) {
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.Ads.tracking.loadSlotInitThirdParty = Date.now();
          }
        }
      });
    }
  }

  // init adblock check
  document.cookie =
    '__adblocker=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + 60 * 5 * 1000);

  const head = document.getElementsByTagName('head')[0];
  const advertisingScript = document.createElement('script');
  advertisingScript.async = true;
  advertisingScript.src = '/advertising.js';
  advertisingScript.onerror = function () {
    document.cookie =
      '__adblocker=true; expires=' + expireDate.toUTCString() + '; path=/';
  };
  advertisingScript.onload = function () {
    document.cookie =
      '__adblocker=false; expires=' + expireDate.toUTCString() + '; path=/';
  };
  head.appendChild(advertisingScript);

  window.Ads.helpers = {
    setSideBar,
    resetSideBar,
    setBrandingDay,
    resetBrandingDay,
    resetAll,
    setWelcomeAd,
    resetWelcomeAd,
  };

  // init ads when they are enabled
  if (initialConfig.ikjuzglkjfroef) {
    initAppNexusTagManager();
  }
})();
