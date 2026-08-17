import { Action, Store, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import urlMod from 'url';
import connectToDevTools from '../../shared/helpers/connectToDevTools';
import { parseSearchQuery } from '../../shared/helpers/parseSearchQuery';
import { initialState as pianoInitialState } from '../../shared/reducers/piano';
import { windowInitialState } from '../../shared/reducers/window';
import createReducer from './reducers';
import {
  mapPathSegmentFullPath,
  mapPathSegmentToVertical,
  routeInitialState,
} from './reducers/route';
import { DEFAULT, HOME } from './actions/route';
import { PUBLICATION_CASH } from '../../shared/constants/publications';

// https://dev.to/ibrahimshamma99/write-your-own-custom-asyncdispatch-middleware-5dbk
/* @ts-ignore TODO: TS7006 ->  Parameter 'store' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'action' implicitly has an 'any' type. */
export const asyncDispatchMiddleware = (store) => (next) => (action) => {
  let syncActivityFinished = false;
  /* @ts-ignore TODO: TS7034 ->  Variable 'actionQueue' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  let actionQueue = [];

  function flushQueue() {
    /* @ts-ignore TODO: TS7005 ->  Variable 'actionQueue' implicitly has an 'any[]' type. */
    actionQueue.forEach((a) => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'asyncAction' implicitly has an 'any' type. */
  function asyncDispatch(asyncAction) {
    /* @ts-ignore TODO: TS7005 ->  Variable 'actionQueue' implicitly has an 'any[]' type. */
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

type RasStore<S, A extends Action> = Store<S, A> & {
  asyncReducers: Object;
};

type ConfigureServerStore = {
  url: any;
};

export const DEFAULT_WINDOW_WIDTH_DESKTOP = 1920;
export const DEFAULT_WINDOW_HEIGHT_DESKTOP = 1024;
export const DEFAULT_WINDOW_WIDTH_TABLET = 760;
export const DEFAULT_WINDOW_HEIGHT_TABLET = 1024;
export const DEFAULT_WINDOW_WIDTH_SMARTPHONE = 320;
export const DEFAULT_WINDOW_HEIGHT_SMARTPHONE = 480;

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
  if (__DEVELOPMENT__ && !!document.cookie.includes('RASCHHYBRIDAPP')) {
    initialState.route = { ...routeInitialState, isHybridApp: true };
  }
  return configureStore(initialState);
};

/**
 * configure server store
 *
 * @desc    prepare store for server
 * @param   {Object}  initialState
 * @returns {Store}
 */
export const configureServerStore = ({ url }: ConfigureServerStore) => {
  const initialState = JSON.parse(
    JSON.stringify({
      window: windowInitialState,
      route: routeInitialState,
      piano: pianoInitialState,
    }),
  );
  const parsedUri = urlMod.parse(url);

  // set route/location state on ssr
  initialState.route.locationBeforeTransitions.action = 'PUSH';
  initialState.route.locationBeforeTransitions.pathname = parsedUri.pathname;
  initialState.route.locationBeforeTransitions.search = parsedUri.search || '';
  initialState.route.locationBeforeTransitions.query = parseSearchQuery(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
    parsedUri.search,
  );
  initialState.route.screenReady = true; // everything ready due to SSR pre-rendering

  // set piano/pageMetadata state on ssr
  initialState.piano.pageMetadata.pathname = parsedUri.pathname;
  initialState.piano.pageMetadata.publication = PUBLICATION_CASH;

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

  initialState.route.vertical = vertical;

  return configureStore(initialState);
};

/**
 * Inject an asynchronously loaded reducer.
 */
export const injectAsyncReducer = (
  store: RasStore<any, any>,
  name: string,
  asyncReducer: Object,
): void => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'. */
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(store.asyncReducers));
};

const devToolsExtension =
  (__CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__) ||
  (() =>
    (noop: any): any =>
      noop);

/**
 * configure store
 *
 * @desc    configures store with passed props
 * @param   {Object}  initialState
 * @returns {Store}
 */
export const configureStore = (initialState = {}) => {
  const enhancers: Array<any> = [
    applyMiddleware(thunk),
    applyMiddleware(asyncDispatchMiddleware),
  ];

  if (connectToDevTools) {
    enhancers.push(devToolsExtension());
  }

  // Create the store with the enhancers.
  const store: Store<any, any> = createStore(
    createReducer({}),
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
