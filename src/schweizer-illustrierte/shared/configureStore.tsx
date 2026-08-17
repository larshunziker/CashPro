import { Action, Store, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import urlMod from 'url';
import { parseSearchQuery } from '../../shared/helpers/parseSearchQuery';
import { initialState as pianoInitialState } from '../../shared/reducers/piano';
import { windowInitialState } from '../../shared/reducers/window';
import createReducer from '../shared/reducers';
import { routeInitialState } from '../shared/reducers/route';
import { settingsInitialState } from '../shared/reducers/settings';
import { PUBLICATION_SI } from '../../shared/constants/publications';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_HOME,
} from '../screens/App/constants';

type RasStore<S, A extends Action> = Store<S, A> & {
  asyncReducers: Object;
};

type ConfigureServerStore = {
  url: any;
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
export const configureServerStore = ({ url }: ConfigureServerStore) => {
  const initialState = JSON.parse(
    JSON.stringify({
      settings: settingsInitialState,
      window: windowInitialState,
      route: routeInitialState,
      piano: pianoInitialState,
    }),
  );
  const parsedUri = urlMod.parse(url);

  // set route/location state on ssr
  // INFO: if you make changes, make sure to implement it here as well: src/schweizer-illustrierte/shared/decorators/withReachRouterRedux.js
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
  initialState.piano.pageMetadata.publication = PUBLICATION_SI;

  // set the activeMainChannel for ssr
  if (parsedUri.pathname && parsedUri.pathname === '/') {
    initialState.settings.activeMainChannel = MAIN_CHANNEL_HOME;
  } else if (parsedUri.pathname) {
    // slice the leading slash and split the uri
    const splitedPath: Record<string, any> = parsedUri.pathname
      .slice(1)
      .split('/');
    const channel: string = splitedPath[0];
    const firstCharUpper: string = channel.charAt(0).toUpperCase();
    initialState.settings.activeMainChannel =
      (channel === 'body-health' && MAIN_CHANNEL_BODY_HEALTH) ||
      firstCharUpper + channel.slice(1);
  }

  return configureStore(initialState);
};

/**
 * Inject an asynchronously loaded reducer.
 */
export const injectAsyncReducer = (
  store: RasStore<any, any>,
  name: string,
  asyncReducer: Object,
) => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'. */
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
