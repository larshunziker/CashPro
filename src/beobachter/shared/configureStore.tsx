import { Action, Store, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import urlMod from 'url';
import connectToDevTools from '../../shared/helpers/connectToDevTools';
import { parseSearchQuery } from '../../shared/helpers/parseSearchQuery';
import { commentInitialState } from '../../shared/reducers/comment';
import { initialState as headerInitialState } from '../../shared/reducers/header';
import { initialState as pianoInitialState } from '../../shared/reducers/piano';
import { windowInitialState } from '../../shared/reducers/window';
import createReducer from './reducers';
import { mapPathSegmentToVertical, routeInitialState } from './reducers/route';
import { DEFAULT, HOME } from './actions/route';
import { PUBLICATION_BEO } from '../../shared/constants/publications';

type RasStore<S, A extends Action> = Store<S, A> & {
  asyncReducers: Object;
};
type ConfigureServerStore = {
  url: any;
};

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

export const configureServerStore = ({ url }: ConfigureServerStore) => {
  const initialState = JSON.parse(
    JSON.stringify({
      header: headerInitialState,
      window: windowInitialState,
      route: routeInitialState,
      piano: pianoInitialState,
      comment: commentInitialState,
    }),
  );

  const parsedUri = urlMod.parse(url);

  // set route/location state on ssr
  // INFO: if you make changes, make sure to implement it here as well: src/beobachter/shared/decorators/withReachRouterRedux.js
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
  initialState.piano.pageMetadata.publication = PUBLICATION_BEO;

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

  // if the whole path is explicitly === "/" -> then we're on HOME!
  if (parsedUri.pathname === '/') {
    vertical = HOME;
  }

  initialState.route.vertical = vertical;

  return configureStore(initialState);
};

// ---------------------------------------------------------------------------------- //
// HELPERS
// ---------------------------------------------------------------------------------- //

const devToolsExtension =
  (__CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__) ||
  (() =>
    (noop: any): any =>
      noop);

export const configureStore = (initialState = {}) => {
  const enhancers: Array<any> = [applyMiddleware(thunk)];

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
