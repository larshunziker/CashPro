import { trackGtm } from '../../../shared/helpers/googleTagManager';
import { parseSearchQuery } from '../../../shared/helpers/parseSearchQuery';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { hasTealiumData } from '../../../shared/helpers/tealium/helper';
import {
  doHandlePWATracking,
  isNativeContent,
} from '../../../shared/helpers/tracking';
import { log, removeReferrer } from '../../../shared/helpers/utils';
import {
  ON_LOCATION_CHANGE,
  SET_LOADING,
  SET_REFETCHING_DATA,
  SET_SCREEN_READY,
} from '../actions/route';
import { dismissAllToasts } from '../../screens/App/components/Toast';
import { FULLSCREEN_HASH } from '../../../shared/constants/fullscreen';

/**
 * Route reducer.
 *
 * The reducer merges route location changes into our state.
 */

const initialLocationBeforeTransitions: LocationBeforeTransitions =
  __DEVELOPMENT__
    ? {
        pathname: global.location.pathname,
        search: global.location.search,
        hash: global.location.hash,
        action: 'POP',
        key: null,
        query: parseSearchQuery(global.location.search),
      }
    : {
        pathname: '/',
        search: '',
        hash: '',
        action: 'POP',
        key: null,
        query: {},
      };

// Initial routing state
export const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    ...initialLocationBeforeTransitions,
  },
  screenReady: false,
  isRefetchingData: false,
  isInitialPage: true,
  vertical: '',
  loading: true,
  isCrawler: false,
  hasCustomTracking: false,
};

const timeOnPageProps: TimeOnPageTrackProp = {
  timeStamp: null,
  payload: null,
};

const doHandleTimeOnPageTealium = (timeOnPageProps: TimeOnPageTrackProp) => {
  const { payload, timeStamp } = timeOnPageProps;
  if (timeStamp && payload && hasTealiumData(payload)) {
    const timeOnPage = Math.round(
      (new Date().getTime() - timeStamp.getTime()) / 1000,
    );

    if (timeOnPage > 0) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'time_on_page',
          tealium_event: 'time_on_page',
          cms_preferredUri: payload.preferredUri,
          cms_page_id: payload.typeId,
          cms_page_title: payload.pageTitle,
          cms_page_type: payload.pageType,
          cms_page_sponsor: payload.pageSponsor,
          time_on_page: timeOnPage,
        },
      });
    }
  }
};

const resetTimeStamp = () => {
  log('tealium', ['time on page is reset'], 'green');
  timeOnPageProps.timeStamp = new Date();
};

const resetTimeOnPage = (action: Record<string, any>) => {
  if (isNativeContent(action)) {
    timeOnPageProps.payload = { ...action.payload };
    resetTimeStamp();
  } else {
    timeOnPageProps.timeStamp = null;
    timeOnPageProps.payload = null;
  }
};

/**
 * @desc register event listeners which are needed for time_on_page tracking and pwa tracking
 */
const registerEventListener = () => {
  if (__CLIENT__) {
    window.addEventListener('beforeunload', () => {
      doHandleTimeOnPageTealium(timeOnPageProps);
    });

    window.addEventListener('blur', () => {
      doHandleTimeOnPageTealium(timeOnPageProps);
    });

    window.addEventListener('focus', () => {
      resetTimeStamp();
    });

    window.addEventListener('appinstalled', () => {
      doHandlePWATracking(
        'pwa_appinstalled',
        'add to homescreen',
        global?.location?.href,
      );
    });

    window.addEventListener('beforeinstallprompt', () => {
      doHandlePWATracking(
        'pwa_beforeinstallprompt',
        'show install bar',
        global?.location?.href,
      );
    });
  }
};

registerEventListener();

export const doHandleTealium = (
  action: Record<string, any>,
  forceTracking = false,
) => {
  if (hasTealiumData(action.payload)) {
    tealiumTrackEvent({
      payload: {
        cms_preferredUri: action.payload.preferredUri,
        cms_article_type: action.payload.subtypeValue,
        cms_authors: action.payload.authors?.length
          ? action.payload.authors
          : undefined,
        cms_change_date: action.payload.changeDate,
        cms_publication_date: action.payload.publicationDate,
        cms_article_age: action.payload.amountOfDaysPublished,
        cms_channel: action.payload.channel,
        cms_main_channel: action.payload.mainChannel,
        cms_channel_level_1:
          action.payload.channelHierarchy[0]?.node?.title || '',
        cms_channel_level_2:
          action.payload.channelHierarchy[1]?.node?.title || '',
        cms_channel_level_3:
          action.payload.channelHierarchy[2]?.node?.title || '',
        cms_channel_level_4:
          action.payload.channelHierarchy[3]?.node?.title || '',
        cms_create_date: action.payload.createDate,
        cms_keywords: action.payload.keywords?.length
          ? action.payload.keywords
          : undefined,
        cms_page_id: action.payload.typeId,
        cms_node_id: action.payload.nodeId,
        cms_page_title: action.payload.pageTitle,
        cms_page_type: action.payload.pageType,
        cms_content_shortTitle: action.payload.contentShortTitle,
        cms_content_title: action.payload.contentTitle,
        cms_channel_sponsor: action.payload.channelSponsors,
        cms_page_sponsor: action.payload.pageSponsor,
        cms_login_status: action.payload.loginStatus,
        cms_user_id: action.payload.userId,
        cms_print_article: action.payload.isPrintArticle,
        cms_article_source: action.payload.source,
        cms_restriction_status: action.payload.restrictionStatus,
        hit_type: action.hit_type || 'page_view',
        event_name: action.hit_type || 'page_view',
      },
    });

    return;
  }

  if (forceTracking) {
    tealiumTrackEvent({});
  }
};

export default (
  state: LocationState = routeInitialState,
  action: Record<string, any>,
): Record<string, any> => {
  // since we don't have a hash in locationBeforeTransitions and we want to avoid a repaint, we decided to check the has within the global variable
  const isFullscreenGallery =
    (__CLIENT__ && global?.location?.hash.indexOf(FULLSCREEN_HASH) !== -1) ||
    false;
  const doesContainAnchor =
    global?.location?.hash && global.location.hash.indexOf('#') !== -1;
  switch (action.type) {
    case ON_LOCATION_CHANGE: {
      log('router', ['location change start', action.payload, state], 'green');

      // do nothing further when we're on the same path (incl. query string)
      if (
        state.locationBeforeTransitions &&
        state.locationBeforeTransitions.pathname &&
        state.locationBeforeTransitions.pathname === action.payload.pathname &&
        JSON.stringify(state.locationBeforeTransitions.query) ===
          JSON.stringify(action.payload.query) &&
        state.locationBeforeTransitions.action === action.payload.action
      ) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );

        return state;
      }

      // check if ad div is in dom if so den remove it
      if (__CLIENT__) {
        const admLeftClickLayer = document.getElementById('admLeftClickLayer');
        const admRightClickLayer =
          document.getElementById('admRightClickLayer');
        const adDivLeftLayer = document.getElementById('adDivLeftLayer');
        const adDivRightLayer = document.getElementById('adDivRightLayer');
        const adDivTopLayer = document.getElementById('adDivTopLayer');
        const adDivSpotSiteBar = document.getElementById('adspot_sitebar');
        const adDivSpotEox = document.getElementById('eox_pageAdContainer');
        // @TODO: this is a hotfix. We should contact RIAD that they'll use their own div elements
        // instead of manipulating our div wrappers.
        const adDivVideoHead = document.querySelector(
          '[data-codev-name="staticContainer"]',
        );

        const htmlEl = document.querySelector('html');
        htmlEl && (htmlEl.style.background = 'none');

        if (admLeftClickLayer) {
          admLeftClickLayer.remove();
        }
        if (admRightClickLayer) {
          admRightClickLayer.remove();
        }
        if (adDivLeftLayer) {
          adDivLeftLayer.remove();
        }
        if (adDivRightLayer) {
          adDivRightLayer.remove();
        }
        if (adDivTopLayer) {
          adDivTopLayer.remove();
        }
        if (adDivSpotSiteBar) {
          adDivSpotSiteBar.remove();
        }
        if (adDivSpotEox) {
          adDivSpotEox.remove();
        }
        // @TODO: this is a hotfix. We should contact RIAD that they'll use their own div elements
        // instead of manipulating our div wrappers.
        if (adDivVideoHead) {
          adDivVideoHead.removeAttribute('style');
          adDivVideoHead.removeAttribute('data-codev-name');
        }
      }

      // set screen ready just to false if pathname and query change (ignore hash changes)
      // and do NOT do this for POP actions because of hydration phase
      const screenReady =
        isFullscreenGallery ||
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.isFullscreenGallery ||
        (state.locationBeforeTransitions &&
          state.locationBeforeTransitions.pathname &&
          state.locationBeforeTransitions.pathname ===
            action.payload.pathname &&
          JSON.stringify(state.locationBeforeTransitions.query) ===
            JSON.stringify(action.payload.query) &&
          state.isInitialPage) ||
        false;

      const isInitialPage = screenReady && __SERVER__;

      // remove referrer on in app browsing
      if (!isInitialPage && document.referrer !== '') {
        log('router', 'referrer removed', 'green');
        removeReferrer();
      }

      log(
        'router',
        `screen ready set to ${screenReady.toString()} and is initial page to ${isInitialPage.toString()} on LOCATION_CHANGE`,
        'green',
      );

      if (__CLIENT__) {
        window.eventQueueDataLayer = [];
        // @ts-ignore
        window.eventQueueDataLayer.push = function (event) {
          if (event) {
            window.dataLayer?.push(event);
          }
        };
      }

      // Send a page_navigation event
      trackGtm('link', {
        event_name: 'page_navigation',
        url_from:
          global?.location?.origin + state.locationBeforeTransitions?.pathname,
        url_to: global?.location?.href,
      });

      doHandleTimeOnPageTealium(timeOnPageProps);

      return {
        ...state,
        locationBeforeTransitions: action.payload,
        screenReady,
        isInitialPage,
      };
    }

    case SET_REFETCHING_DATA: {
      log('router', ['set refetch data start', action.payload, state], 'green');
      if (
        !action.payload?.hasCustomTracking &&
        !action.payload.isRefetchingData &&
        state.isRefetchingData
      ) {
        log('router', ['track Tealium in isRefetchingData'], 'green');
        doHandleTealium({ ...action, hit_type: 'site_refresh' }, true);
      }
      return {
        ...state,
        isRefetchingData: action.payload.isRefetchingData,
        isInitialPage: false,
      };
    }
    case SET_LOADING: {
      log('router', ['set loading start', action.payload, state], 'green');
      if (action.payload && action.payload === state.loading) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );
        return state;
      }
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_SCREEN_READY: {
      log('router', ['set screen ready start', action.payload, state], 'green');
      const screenReady: boolean = action.payload.screenReady || false;

      // do nothing if new state and current are identical
      if (screenReady === state.screenReady) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );

        // send tealium tracking as well for initial page after ssr pre-rendering
        if (state.isInitialPage) {
          if (
            screenReady &&
            !isFullscreenGallery &&
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            !global.isFullscreenGallery
          ) {
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.isFullscreenGallery = false;
            if (!action.payload?.hasCustomTracking) {
              log('router', ['track Tealium in isInitialPage'], 'green');
              doHandleTealium(action);
            }
            resetTimeOnPage(action);
          }
        }
        return state;
      }

      // escape if screen was set to not ready
      if (!screenReady || state.screenReady) {
        log(
          'router',
          `escaped because screen ready isn't set to true`,
          'orange',
        );
        return {
          ...state,
          screenReady,
        };
      }

      log('router', 'screen ready set to true on SET_SCREEN_READY', 'green');

      // scroll top (just when hitting a new page and if not hash # is set)
      if (
        !doesContainAnchor &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        !global.isFullscreenGallery &&
        state.locationBeforeTransitions.action !== 'POP'
      ) {
        global.scrollTo(0, 0);
      }

      if (
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        (global.isFullscreenGallery &&
          state.locationBeforeTransitions?.pathname &&
          state.locationBeforeTransitions.pathname ===
            action.payload.pathname) ||
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        (!global.isFullscreenGallery && !isFullscreenGallery)
      ) {
        if (!action.payload?.hasCustomTracking) {
          log('router', ['track Tealium in !isInitialPage'], 'green');
          doHandleTealium(action, true);
        }
        resetTimeOnPage(action);
        dismissAllToasts();
      }

      // reset ads only on state change
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      if (__CLIENT__ && screenReady && global?.Ads?.helpers) {
        // reset ads on each render
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global?.Ads?.helpers &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.Ads.helpers?.resetAll &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          typeof global.Ads.helpers.resetAll === 'function' &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.Ads.helpers.resetAll();
      }

      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.isFullscreenGallery = false;

      return {
        ...state,
        screenReady,
      };
    }

    default:
      return state;
  }
};
