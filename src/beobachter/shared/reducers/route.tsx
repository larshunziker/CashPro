import { trackGtm } from '../../../shared/helpers/googleTagManager';
import { parseSearchQuery } from '../../../shared/helpers/parseSearchQuery';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { hasTealiumData } from '../../../shared/helpers/tealium/helper';
import {
  doHandlePWATracking,
  isNativeContent,
} from '../../../shared/helpers/tracking';
import { log, removeReferrer } from '../../../shared/helpers/utils';
import { SET_REFETCHING_DATA } from '../../../shared/actions/route';
import {
  DEFAULT,
  HOME,
  ON_LOCATION_CHANGE,
  RouteStateActionBEO,
  SET_LOADING,
  SET_SCREEN_READY,
  SET_VERTICAL,
  SOS_BEOBACHTER,
  URL_SEGMENT_TO_VERTICAL_MAP,
} from '../actions/route';
import { dispatchHybridAppEvent } from '../../../common/components/HybridAppProvider';
import { dismissAllToasts } from '../../screens/App/components/Toast';
import { FULLSCREEN_HASH } from '../../../shared/constants/fullscreen';
import { ADMEIRA_IN_READ_VIDEO_WRAPPER_ID } from '../../screens/App/constants';

/**
 * Route reducer.
 *
 * The reducer merges route location changes into our state.
 */

/**
 * @desc  map path segment read from url and map it to app constants
 */
export const mapPathSegmentToVertical = (pathSegment: string): string => {
  // create map url segment : constant
  const map = URL_SEGMENT_TO_VERTICAL_MAP;
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ ahviv */
  return map[pathSegment] || DEFAULT;
};

/**
 * @desc  map path segment read from url and map it to app constants on onmeda
 */

/* @ts-ignore TODO: TS7006 ->  Parameter 'payload' implicitly has an 'any' type. */
const getCurrentVerticalByActionPayload = (payload) => {
  let vertical: string = payload.pathname
    .split('/')
    .reduce(
      (prev: string, current: string): string =>
        prev === DEFAULT && current.length > 0
          ? mapPathSegmentToVertical(current)
          : prev,
      DEFAULT,
    ); // better detect DEFAULT as fallback as we just don't know where we are

  // if the whole path is explicitly === "/" -> then we're on HOME!
  if (payload.pathname === '/') {
    vertical = HOME;
  }

  return vertical;
};

let initialVertical = HOME;
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

if (__DEVELOPMENT__) {
  initialVertical = getCurrentVerticalByActionPayload(
    initialLocationBeforeTransitions,
  );
}

// Initial routing state
export const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    ...initialLocationBeforeTransitions,
  },
  vertical: initialVertical,
  screenReady: false,
  isInitialPage: true,
  loading: true,
  isCrawler: false,
  isHybridApp: false,
  hasCustomTracking: false,
};

const timeOnPageProps: TimeOnPageTrackProp = {
  timeStamp: null,
  payload: null,
};

/**
 * @desc register event listeners which are needed for time_on_page tracking and pwa tracking
 */
const registerEventListener = (): void => {
  if (__CLIENT__) {
    global.addEventListener('beforeunload', () => {
      doHandleTimeOnPageTealium(timeOnPageProps);
    });

    global.addEventListener('blur', () => {
      doHandleTimeOnPageTealium(timeOnPageProps);
    });

    global.addEventListener('focus', () => {
      resetTimeStamp();
    });

    global.addEventListener('appinstalled', () => {
      doHandlePWATracking(
        'pwa_appinstalled',
        'add to homescreen',
        global?.location?.href,
      );
    });

    global.addEventListener('beforeinstallprompt', () => {
      doHandlePWATracking(
        'pwa_beforeinstallprompt',
        'show install bar',
        global?.location?.href,
      );
    });
  }
};

registerEventListener();

/**
 * Merge route into the global application state.
 */
export default (
  state: LocationState = routeInitialState,
  action: RouteStateActionBEO<any>,
): LocationState => {
  const isFullscreenGallery =
    (__CLIENT__ && global?.location?.hash.includes(FULLSCREEN_HASH)) || false;
  /* @ts-ignore TODO: TS2322 ->  Type 'string | boolean' is not assignable to type 'boolean'. */
  const doesContainAnchor: boolean =
    global?.location?.hash && global.location.hash.includes('#');
  switch (action.type) {
    case ON_LOCATION_CHANGE: {
      log('router', ['location change start', action.payload, state], 'green');

      // do nothing further when we're on the same path (incl. query string)
      if (
        state.locationBeforeTransitions &&
        state.locationBeforeTransitions.pathname &&
        state.locationBeforeTransitions.pathname === action.payload.pathname &&
        JSON.stringify(state.locationBeforeTransitions.query) ===
          JSON.stringify(action.payload.query)
      ) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );

        return state;
      }

      // map the new location to a possible vertical
      const vertical = getCurrentVerticalByActionPayload(action.payload);

      // check if ad div is in dom if so den remove it
      if (__CLIENT__ && vertical !== SOS_BEOBACHTER) {
        const adDivLeftLayer: HTMLElement | null =
          document.getElementById('adDivLeftLayer');
        const adDivRightLayer: HTMLElement | null =
          document.getElementById('adDivRightLayer');
        const adDivTopLayer: HTMLElement | null =
          document.getElementById('adDivTopLayer');
        const adDivSpotSiteBar: HTMLElement | null =
          document.getElementById('adspot_sitebar');
        const adDivSpotEox: HTMLElement | null = document.getElementById(
          'eox_pageAdContainer',
        );
        const adDivInReadVideo: HTMLElement | null = document.getElementById(
          ADMEIRA_IN_READ_VIDEO_WRAPPER_ID,
        );
        const adDivSpotInReadVideo: any =
          document.getElementsByClassName('bb_iawr');
        // @TODO: this is a hotfix. We should contact RIAD that they'll use their own div elements
        // instead of manipulating our div wrappers.
        const adDivVideoHead = document.querySelector(
          '[data-codev-name="staticContainer"]',
        );

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
        if (adDivInReadVideo) {
          while (adDivInReadVideo.firstChild) {
            adDivInReadVideo.removeChild(adDivInReadVideo.firstChild);
          }
        }
        if (adDivSpotInReadVideo) {
          [...adDivSpotInReadVideo].forEach((item: HTMLElement): boolean => {
            item.remove();
            return true;
          });
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
        (action.payload.hash.includes(FULLSCREEN_HASH) &&
          isFullscreenGallery &&
          state.locationBeforeTransitions?.pathname ===
            action.payload.pathname) ||
        (state.locationBeforeTransitions &&
          state.locationBeforeTransitions.pathname &&
          state.locationBeforeTransitions.pathname ===
            action.payload.pathname &&
          JSON.stringify(state.locationBeforeTransitions.query) ===
            JSON.stringify(action.payload.query) &&
          state.isInitialPage) ||
        false;

      const isInitialPage: boolean = screenReady && __SERVER__;

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
        if (!state.isInitialPage) {
          window.eventQueueDataLayer = [];
          // @ts-ignore
          window.eventQueueDataLayer.push = function (event) {
            if (event) {
              window.dataLayer?.push(event);
            }
          };
        }
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
        locationBeforeTransitions: action.payload as LocationBeforeTransitions,
        vertical,
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

    case SET_SCREEN_READY: {
      log('router', ['set screen ready start', action.payload, state], 'green');
      const screenReady: boolean = action.payload.screenReady || false;

      if (screenReady) {
        dispatchHybridAppEvent('navigate', {
          href: window.location.href,
        });
      }

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
        !isFullscreenGallery &&
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
    case SET_LOADING:
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

    case SET_VERTICAL:
      log('router', ['set vertical', action.payload, state], 'green');

      return {
        ...state,
        vertical: action.payload.vertical,
      };

    default:
      return state;
  }
};

const doHandleTealium = (
  action: RouteStateActionBEO<TaeliumData> & { hit_type?: string },
  forceTracking = false,
): void => {
  if (hasTealiumData(action.payload)) {
    tealiumTrackEvent({
      payload: {
        cms_preferredUri: action.payload.preferredUri,
        cms_page_id: action.payload.typeId,
        cms_node_id: action.payload.nodeId,
        cms_page_title: action.payload.pageTitle,
        cms_page_type: action.payload.pageType,
        cms_content_title: action.payload.contentTitle,
        cms_content_shortTitle: action.payload.contentShortTitle,
        cms_article_type: action.payload.subtypeValue,
        cms_channel: action.payload.channel,
        cms_channel_level_1:
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'ChannelConnection'. */
          action.payload.channelHierarchy[0]?.node?.title || '',
        cms_channel_level_2:
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '1' can't be used to index type 'ChannelConnection'. */
          action.payload.channelHierarchy[1]?.node?.title || '',
        cms_channel_level_3:
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '2' can't be used to index type 'ChannelConnection'. */
          action.payload.channelHierarchy[2]?.node?.title || '',
        cms_channel_level_4:
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '3' can't be used to index type 'ChannelConnection'. */
          action.payload.channelHierarchy[3]?.node?.title || '',
        cms_create_date: action.payload.createDate,
        cms_change_date: action.payload.changeDate,
        cms_changed_date: action.payload.changedDate,
        cms_publication: action.payload.publication,
        cms_publication_date: action.payload.publicationDate,
        cms_article_age: action.payload.amountOfDaysPublished,
        cms_restriction_status: action.payload.restrictionStatus,
        cms_keywords: action.payload.keywords?.length
          ? action.payload.keywords
          : undefined,
        cms_authors: action.payload.authors?.length
          ? action.payload.authors
          : undefined,
        cms_comment_status: action.payload.commentStatus,
        cms_show_updated: action.payload.showUpdated,
        cms_page_sponsor: action.payload.pageSponsor,
        cms_login_status: action.payload.loginStatus,
        cms_user_id: action.payload.userId,
        cms_time_to_read_sec: action.payload.timeToReadSec,
        cms_time_to_read_label: action.payload.timeToReadLabel,
        cms_article_source: action.payload.source,
        cms_teaser_pos_paid: action.payload.restrictionStatusList,
        cms_print_article: action.payload.isPrintArticle,
        hit_type: action.hit_type || 'page_view',
        event_name: action.hit_type || 'page_view',
      },
    });

    // send customEvent to hybrid app
    dispatchHybridAppEvent('get-meta-info', {
      title: action.payload.pageTitle,
      preferredUri: action.payload.preferredUri,
      nid: action.payload.nodeId || '',
      gcid: action.payload?.typeId || '',
      contentType: action.payload?.pageType,
      subtypeValue: action.payload?.subtypeValue,
      restrictionStatus: action.payload?.restrictionStatus,
    });

    return;
  }

  if (forceTracking) {
    tealiumTrackEvent({});
  }
};

const doHandleTimeOnPageTealium = (
  timeOnPageProps: TimeOnPageTrackProp,
): void => {
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

const resetTimeOnPage = (
  action: RouteStateActionBEO<Record<string, any>>,
): void => {
  if (isNativeContent(action)) {
    timeOnPageProps.payload = { ...action.payload };
    resetTimeStamp();
  } else {
    timeOnPageProps.timeStamp = null;
    timeOnPageProps.payload = null;
  }
};

const resetTimeStamp = (): void => {
  log('tealium', ['time on page is reset'], 'green');
  timeOnPageProps.timeStamp = new Date();
};
