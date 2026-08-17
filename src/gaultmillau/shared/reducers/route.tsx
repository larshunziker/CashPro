import { trackGtm } from '../../../shared/helpers/googleTagManager';
import { parseSearchQuery } from '../../../shared/helpers/parseSearchQuery';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { hasTealiumData } from '../../../shared/helpers/tealium/helper';
import { doHandlePWATracking } from '../../../shared/helpers/tracking';
import { log, removeReferrer } from '../../../shared/helpers/utils';
import { SET_REFETCHING_DATA } from '../../../shared/actions/route';
import {
  DEFAULT,
  HOME,
  HOME_FR,
  ON_LOCATION_CHANGE,
  RouteStateActionGM,
  SET_LOADING,
  SET_SCREEN_READY,
  URL_SEGMENT_TO_FULL_PATH,
  URL_SEGMENT_TO_VERTICAL_MAP,
} from '../actions/route';

/**
 * @desc  map path segment read from url and map it to app constants
 */
export const mapPathSegmentToVertical = (pathSegment: string): string => {
  // create map url segment : constant
  const map: Record<string, any> = URL_SEGMENT_TO_VERTICAL_MAP;
  return map[pathSegment] || DEFAULT;
};

/**
 * @desc  map path segment read from url and map it to app constants on onmeda
 */
export const mapPathSegmentFullPath = (
  vertical: string,
  path: string,
): string => {
  const map: Record<string, any> = URL_SEGMENT_TO_FULL_PATH;
  if (map[path]) {
    return map[path];
  }

  const pathnameArray: Record<string, any> = path.split('/');
  pathnameArray.pop();
  const pathname: string = pathnameArray.join('/');
  return map[pathname] || vertical;
};

const getCurrentVerticalByActionPayload = (payload: any) => {
  const pathname: string = payload.pathname.startsWith('/fr')
    ? payload.pathname.slice(3)
    : payload.pathname;

  // map the new location to a possible vertical
  let vertical: string = pathname
    .split('/')
    .reduce(
      (prev: string, current: string): string =>
        prev === DEFAULT && current.length > 0
          ? mapPathSegmentToVertical(current)
          : prev,
      DEFAULT,
    ); // better detect DEFAULT as fallback as we just don't know where we are

  // update vertical and specify if we're on special urls
  vertical = mapPathSegmentFullPath(vertical, pathname);

  // if the whole path is explicitly === "/" -> then we're on HOME!
  if (payload.pathname === '/') {
    vertical = HOME;
  }

  // if the whole path is explicitly === "/fr" -> then we're on HOME_FR!
  if (
    pathname === '' &&
    (payload.pathname === '/fr' || payload.pathname === '/fr/')
  ) {
    vertical = HOME_FR;
  }

  return vertical;
};

/**
 * Route reducer.
 *
 * The reducer merges route location changes into our immutable state.
 */

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
  // set correct vertical when on development
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
  hasCustomTracking: false,
};

const noScrollTopForHashes: Record<string, any> = ['page'];

/**
 * @desc register event listeners which are needed for time_on_page tracking and pwa tracking
 */
const registerEventListener = (): void => {
  if (__CLIENT__) {
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

const doHandleTealium = (
  action: RouteStateActionGM<Record<string, any>> & { hit_type?: string },
  forceTracking = false,
) => {
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
          action.payload.channelHierarchy[0]?.node?.title || '',
        cms_channel_level_2:
          action.payload.channelHierarchy[1]?.node?.title || '',
        cms_channel_level_3:
          action.payload.channelHierarchy[2]?.node?.title || '',
        cms_channel_level_4:
          action.payload.channelHierarchy[3]?.node?.title || '',
        cms_create_date: action.payload.createDate,
        cms_change_date: action.payload.changeDate,
        cms_publication_date: action.payload.publicationDate,
        cms_keywords: action.payload.keywords?.length
          ? action.payload.keywords
          : undefined,
        cms_authors: action.payload.authors?.length
          ? action.payload.authors
          : undefined,
        cms_sponsor: action.payload.pageSponsor,
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

/**
 * Merge route into the global application state.
 */
const ReducerRoute = (
  state: LocationState = routeInitialState,
  action: RouteStateActionGM<Record<string, any>>,
): Record<string, any> => {
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

      const vertical = getCurrentVerticalByActionPayload(action.payload);

      // set screen ready just to false if pathname and query change (ignore hash changes)
      // and do NOT do this for POP actions because of hydration phase
      const screenReady =
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

      return {
        ...state,
        locationBeforeTransitions: action.payload,
        vertical,
        screenReady,
        isInitialPage,
      };
    }

    case SET_LOADING: {
      log('router', ['set loading start', action.payload, state], 'green');
      if (action.payload.loading && action.payload.loading === state.loading) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );
        return state;
      }
      return {
        ...state,
        loading: action.payload.loading,
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

      // do nothing if new state and current are identical
      if (screenReady === state.screenReady) {
        log(
          'router',
          ['re-use existing state due to no changes', action.payload],
          'green',
        );

        // send tealium tracking as well for initial page after ssr pre-rendering
        if (
          state.isInitialPage &&
          screenReady &&
          !action.payload.hasCustomTracking
        ) {
          log('router', ['track Tealium in isInitialPage'], 'green');
          doHandleTealium(action);
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

      // scroll top (just when hitting a new page and if not hash #page is set)
      if (
        noScrollTopForHashes.indexOf(state.locationBeforeTransitions.hash) ===
          -1 &&
        state.locationBeforeTransitions.action !== 'POP'
      ) {
        global.scrollTo(0, 0);
      }

      if (!action.payload?.hasCustomTracking) {
        log('router', ['track Tealium in !isInitialPage'], 'green');
        doHandleTealium(action, true);
      }

      return {
        ...state,
        screenReady,
      };
    }

    default:
      return state;
  }
};

export default ReducerRoute;
