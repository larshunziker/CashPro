/**
 * Create the store with asynchronously loaded reducers.

 */

/* istanbul ignore file */

import { Action, applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import url from 'url';
import { isFrenchRoute } from '../shared/helpers/language';
import { parseSearchQuery } from '../../shared/helpers/parseSearchQuery';

import createReducer from './reducers';
import { initialState as headerInitialState } from '../shared/reducers/header';
import {
  mapPathSegmentFullPath,
  mapPathSegmentToVertical,
  routeInitialState,
} from '../shared/reducers/route';
import { initialState as windowInitialState } from '../shared/reducers/window';
import { DEFAULT, HOME, HOME_FR } from '../shared/actions/route';

type RasStore<S, A extends Action> = Store<S, A> & {
  asyncReducers: Object;
};
type ConfigureServerStore = {
  url: any;
  headers?: Record<string, string | string[]>;
};

/**
 * configure client store
 *
 * @desc    prepare store for client
 * @param   {Object}  initialState
 * @returns {Store}
 */
export const configureClientStore = () => {
  const initialState =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (global.__INITIAL_STATE__ &&
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      JSON.parse(JSON.stringify(global.__INITIAL_STATE__))) ||
    {};
  return configureStore(initialState);
};

/**
 * configure server store
 *
 * @desc    prepare store for server
 * @param   {Object}  initialState
 * @returns {Store}
 */
export const configureServerStore = ({
  url: urlParam,
  headers,
}: ConfigureServerStore) => {
  const initialState = JSON.parse(
    JSON.stringify({
      window: windowInitialState,
      route: routeInitialState,
      header: headerInitialState,
    }),
  );

  const parsedUri = url.parse(urlParam);

  // set route/location state on ssr
  // INFO: if you make changes, make sure to implement it here as well: src/gaultmillau/shared/decorators/withReachRouterRedux.js
  initialState.route.locationBeforeTransitions.action = 'PUSH';
  initialState.route.locationBeforeTransitions.pathname = parsedUri.pathname;
  initialState.route.locationBeforeTransitions.search = parsedUri.search || '';
  initialState.route.locationBeforeTransitions.query = parseSearchQuery(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
    parsedUri.search,
  );
  initialState.route.screenReady = true; // everything ready due to SSR pre-rendering

  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  let vertical = parsedUri.pathname
    .split('/')
    .reduce(
      (prev, current) =>
        prev === DEFAULT && current.length > 0
          ? mapPathSegmentToVertical(current)
          : prev,
      DEFAULT,
    ); // better detect DEFAULT as fallback as we just don't know where we are

  // update vertical and specify if we're on onmeda
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
  vertical = mapPathSegmentFullPath(vertical, parsedUri.pathname);

  // if the whole path is explicitly === "/" -> then we're on HOME!
  if (parsedUri.pathname === '/') {
    vertical = HOME;
  }

  // if the whole path is explicitly === "/fr" -> then we're on HOME_FR!
  if (
    parsedUri.pathname === '/fr' ||
    parsedUri.pathname === '/fr/' ||
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    parsedUri.pathname.startsWith('/fr?')
  ) {
    vertical = HOME_FR;
  }

  initialState.route.vertical = vertical;

  const initialLanguage =
    isFrenchRoute(urlParam) ||
    (headers?.host as string).startsWith('preview.fr.')
      ? 'fr'
      : 'de';

  initialState.settings = {
    language: initialLanguage,
  };

  return configureStore(initialState);
};

/**
 * Inject an asynchronously loaded reducer.
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'store' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'name' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'asyncReducer' implicitly has an 'any' type. */
export const injectAsyncReducer = (store, name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(store.asyncReducers));
};

// ---------------------------------------------------------------------------------- //
// HELPERS
// ---------------------------------------------------------------------------------- //

const devToolsExtension =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'noop' implicitly has an 'any' type. */
  (__CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__) || (() => (noop) => noop);

/**
 * configure store
 *
 * @desc    configures store with passed props
 * @param   {Object}  initialState
 * @returns {Store}
 */
export const configureStore = (initialState = {}) => {
  const enhancers: Array<any> = [applyMiddleware(thunk)];

  if (__DEVELOPMENT__) {
    enhancers.push(devToolsExtension());
  }

  // Create the store with the enhancers.
  const store: Store<any, any> = createStore(
    createReducer(),
    initialState,
    compose<any>(...enhancers),
  );

  // Extend the store with asynchronous reducers.
  const extendedStore: RasStore<any, any> = {
    ...store,
    asyncReducers: {},
  };

  return extendedStore;
};
