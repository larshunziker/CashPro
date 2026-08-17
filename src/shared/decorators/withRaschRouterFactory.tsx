import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { FetchPolicy, QueryOptions, gql, useQuery } from '@apollo/client';
import {
  defaultOptions,
  scrollToAnchorElement,
} from '../../common/components/SmoothScroll/helpers';
import { parseSearchQuery } from '../helpers/parseSearchQuery';
import { getTealiumData } from '../helpers/tealium/helper';
import { setCookie } from '../helpers/utils';
import { WithRaschRouter } from '../@types/gql';
import { useSSRContext } from '../../common/components/SSRContext';
import { setIsRefetchingData } from '../actions/route';
import { useSrollToLinkElement } from '../hooks/useScrollToLinkElement';
import useRaschRouterLocation from '../hooks/useRaschRouterLocation';
import locationStateSelector from '../selectors/locationStateSelector';

export type RaschApolloConfig<T = {}> = {
  options: ({
    location,
  }: {
    location?: RaschRouterLocation | Record<string, any>;
    params?: Record<string, string>;
    props?: T;
  }) => QueryOptions & {
    additionalQuery?: QueryOptions['query'];
    additionalVariables?: QueryOptions['variables'];
  };
};

type RouterConfigValue = {
  path: string;
  apolloConfig?: RaschApolloConfig;
  fetchPolicies?: Partial<Record<FetchPolicy, string[]>>;
  ignoreLoadingState?: boolean;
  hasCustomTracking?: boolean;
  parseTealiumData?: any;
  enrichData?: any;
};

type MatchPath = {
  params: Record<string, string>;
  matches: boolean;
};

export type RaschRouterConfig = Record<string, RouterConfigValue>;

type WithRaschRouterFactoryOptions = {
  routerConfig: RaschRouterConfig;
  onLocationChange: (location?: RaschRouterLocation) => Action;
  setScreenReady: (
    screenReady: boolean,
    tealiumData: Record<string, any>,
    hasCustomTracking?: boolean,
  ) => Action;
  setLoading: (loading: boolean) => Action;
};

// when apolloConfig is not provided, we must pass this config to useQuery hook anyway
// query doesn't matter, as it should always be skipped
export const skipQueryConfig = {
  query: gql`
    query Skip {
      __schema {
        queryType {
          name
          description
        }
      }
    }
  `,
  skip: true,
};

const withRaschRouterFactory = ({
  routerConfig,
  onLocationChange,
  setScreenReady,
  setLoading,
}: WithRaschRouterFactoryOptions) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
  const withRaschRouter = (WrappedComponent) => {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    const WithRaschRouterHoC = (props) => {
      const { isSSR } = useSSRContext();
      const location = useRaschRouterLocation();
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      location.query = parseSearchQuery(location.search);

      if (!isSSR && location.query?.sovReqToken) {
        setCookie('sovReqToken', location.query?.sovReqToken);
      }

      // location provided to Reach Router in app/index
      const [lastLocation, setLastLocation] = useState(location);
      const ignoreNextLocationChange = useRef(null);
      const loading = useSelector(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        (state) => locationStateSelector(state).loading,
      );
      const screenReady = useSelector(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        (state) => locationStateSelector(state).screenReady,
      );
      const isInitialPage = useSelector(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        (state) => locationStateSelector(state).isInitialPage,
      );
      const isHybridApp = useSelector(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        (state) => locationStateSelector(state).isHybridApp,
      );
      const { srollToLinkElement } = useSrollToLinkElement();

      const dispatch = useDispatch();

      // map of pages showing which page is currently active
      const pages = useMemo(() => {
        const pagesMap = {};

        Object.keys(routerConfig).forEach((item) => {
          const originalPath = routerConfig[item]?.path || '';
          const routeConfigPath = originalPath.startsWith('/')
            ? originalPath
            : `/${originalPath}`;
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          const match = matchPath(routeConfigPath, location.pathname);

          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
          pagesMap[item] = {
            params: match?.params || {},
            matches: !!match,
          };
        });

        return pagesMap;
      }, [location.pathname]);

      const activePageIndex = Object.values(pages).findIndex(
        (item: MatchPath) => !!item.matches,
      );
      const activePage = Object.keys(pages)[activePageIndex] || 'default';
      const isStatic = !routerConfig[activePage].apolloConfig;

      const [data, setData] = useState<
        Pick<WithRaschRouter, 'data'> | Record<string, any>
      >({});

      const ignoreLoadingState = routerConfig[activePage].ignoreLoadingState;
      const fetchPolicies = routerConfig[activePage].fetchPolicies;
      const {
        query,
        additionalQuery = null,
        additionalVariables = null,
        ...options
      } = (routerConfig[activePage].apolloConfig?.options({
        location,
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
        params: pages[activePage].params,
        props: { ...props, isHybridApp },
      }) as any) || skipQueryConfig;

      if (!isInitialPage && fetchPolicies) {
        const fetchPolicy = Object.keys(fetchPolicies).find((key) => {
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Partial<Record<Fe */
          if (Array.isArray(fetchPolicies[key])) {
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Partial<Record<Fe */
            return fetchPolicies[key].includes(location.pathname);
          }
          return null;
        });
        if (fetchPolicy) {
          options.fetchPolicy = fetchPolicy;
        }
      }

      let {
        loading: apolloLoading,
        data: newData,
        refetch,
        error,
      } = useQuery(query, options);

      const additionalQueryOptions = {
        skip: options.skip,
        ssr: options.ssr !== false,
      };

      const {
        loading: loadingAdditional,
        data: dataAdditional,
        error: errorAdditional,
      } = useQuery(
        additionalQuery || skipQueryConfig.query,
        additionalQuery
          ? // @ts-ignore
            {
              variables: additionalVariables,
              ...additionalQueryOptions,
            } || { variables: {}, ...additionalQueryOptions }
          : { skip: true },
      );

      apolloLoading = apolloLoading || loadingAdditional;
      newData = Object.assign({}, newData, dataAdditional) || newData;
      refetch = refetch || null;
      error = Object.assign({}, error, errorAdditional) || null;
      const hasErrors = error && Object.keys(error).length > 0;
      const hasNewData = newData && Object.keys(newData).length > 0;

      // backend server error handling
      if (
        !isSSR &&
        hasNewData &&
        !apolloLoading &&
        !hasErrors &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.apolloInitialErrorStatus
      ) {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.apolloInitialErrorStatus = undefined;
      }

      if (
        !apolloLoading &&
        (hasNewData || (hasErrors && !hasNewData)) &&
        !ignoreNextLocationChange.current &&
        !isStatic
      ) {
        const withTealiumTracking =
          (!hasErrors &&
            ((newData?.environment?.routeByPath &&
              !newData?.getFullquotePage &&
              getTealiumData(newData.environment.routeByPath)) ||
              (newData.routeByPath && getTealiumData(newData.routeByPath)) ||
              (routerConfig[activePage]?.parseTealiumData &&
                routerConfig[activePage]?.parseTealiumData({
                  ...props,
                  location,
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
                  params: pages[activePage].params,
                  newData,
                })))) ||
          {};

        dispatch(setLoading(false));

        // we got status code 404 if we don't use the hydrated data initially
        if (!__CLIENT__ && isInitialPage) {
          setData(JSON.parse(JSON.stringify(newData)));
        }

        if (
          // set screen ready after location change
          (!screenReady && __CLIENT__) ||
          // tealium track needs this for the initial tracking
          (isInitialPage && __CLIENT__ && __PRODUCTION__ && screenReady)
        ) {
          dispatch(
            setScreenReady(
              true,
              {
                ...withTealiumTracking,
                pathname: location.pathname,
              },
              !!routerConfig[activePage]?.hasCustomTracking,
            ),
          );
          setData(JSON.parse(JSON.stringify(newData)));
          if (location.action === 'POP') {
            srollToLinkElement();
          }
        }
      } else if (
        isStatic &&
        !ignoreNextLocationChange.current &&
        (!screenReady ||
          (loading && isInitialPage && (!isSSR || ignoreLoadingState)))
      ) {
        setData(JSON.parse(JSON.stringify({ isStatic })));

        if (!ignoreLoadingState) {
          dispatch(setLoading(false));
          dispatch(
            setScreenReady(
              true,
              {
                ...location,
              },
              !!routerConfig[activePage]?.hasCustomTracking,
            ),
          );
          if (location.action === 'POP') {
            srollToLinkElement();
          }
        }
      }

      if (refetch) {
        // write the GQL refetch function to the globalscope for easy accessibility in other components
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.refetchGQL = async () => {
          dispatch(setLoading(true));
          dispatch(setIsRefetchingData(true));
          const { data: refetchData, loading: refetchLoading } = await refetch(
            options.variables,
          );

          if (refetchData && !refetchLoading) {
            const withTealiumTracking =
              (!hasErrors &&
                ((refetchData?.environment?.routeByPath &&
                  !refetchData?.getFullquotePage &&
                  getTealiumData(refetchData.environment.routeByPath)) ||
                  (refetchData.routeByPath &&
                    getTealiumData(refetchData.routeByPath)) ||
                  (routerConfig[activePage]?.parseTealiumData &&
                    routerConfig[activePage]?.parseTealiumData({
                      ...props,
                      location,
                      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
                      params: pages[activePage].params,
                      refetchData,
                    })))) ||
              {};

            const mergedRefetchData =
              Object.assign({}, newData, refetchData) || refetchData;
            setData(JSON.parse(JSON.stringify(mergedRefetchData)));
            dispatch(setLoading(false));
            dispatch(setIsRefetchingData(false, withTealiumTracking));
          }
        };
      }

      // dispatch setLoading and onLocationChange actions whenever location changes
      useEffect(() => {
        if (
          ignoreNextLocationChange.current &&
          (lastLocation.href !== location.href ||
            JSON.stringify(lastLocation.query) !==
              JSON.stringify(location.query) ||
            lastLocation.hash !== location.hash)
        ) {
          /* @ts-ignore TODO: TS2322 ->  Type 'false' is not assignable to type 'null'. */
          ignoreNextLocationChange.current = false;
          dispatch(onLocationChange({ ...location }));
          dispatch({ type: 'auto-update/clear-instrument-keys' });
          toast.dismiss();
          if (
            !ignoreLoadingState &&
            (lastLocation.pathname !== location.pathname ||
              JSON.stringify(lastLocation.query) !==
                JSON.stringify(location.query))
          ) {
            dispatch(setLoading(true));
          }
        } else if (
          ignoreNextLocationChange.current &&
          lastLocation.pathname === location.pathname &&
          (location.action === 'REPLACE' || location.action === 'PUSH') &&
          !lastLocation.hash &&
          !location.hash &&
          !location?.state?.preventScroll &&
          !lastLocation?.state?.preventScroll
        ) {
          // scroll top on same page click
          scrollToAnchorElement('app', { ...defaultOptions, replace: false });
        }
      }, [
        dispatch,
        lastLocation,
        location,
        isInitialPage,
        isStatic,
        ignoreLoadingState,
      ]);
      // we must ignore initial location change to prevent App re-render on click

      if (
        (isInitialPage &&
          !ignoreNextLocationChange.current &&
          !loading &&
          !isStatic) ||
        (isInitialPage &&
          isStatic &&
          ignoreLoadingState &&
          !ignoreNextLocationChange.current &&
          loading)
      ) {
        /* @ts-ignore TODO: TS2322 ->  Type 'true' is not assignable to type 'null'. */
        ignoreNextLocationChange.current = true;
      }

      useEffect(() => {
        if (!ignoreNextLocationChange.current && !loading) {
          if (location.href !== lastLocation.href) {
            setLastLocation(location);
          }

          /* @ts-ignore TODO: TS2322 ->  Type 'true' is not assignable to type 'null'. */
          ignoreNextLocationChange.current = true;
        }
      }, [loading, location, lastLocation]);

      // backend server error handling
      if (
        !isSSR &&
        data &&
        !loading &&
        !hasErrors &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.apolloInitialErrorStatus
      ) {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.apolloInitialErrorStatus = undefined;
      }

      if (routerConfig[activePage]?.enrichData) {
        routerConfig[activePage]?.enrichData(data, {
          ...props,
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
          params: pages[activePage].params,
        });
      }
      const page = parseInt(location?.query?.page);
      const raschRouterProps = {
        page: isNaN(page) ? 1 : page,
        loading,
        lastLocation,
        data,
        error:
          (!loading &&
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            ((!isSSR && global?.apolloInitialErrorStatus) ||
              (hasErrors && error))) ||
          null,
      };
      return <WrappedComponent {...props} {...raschRouterProps} />;
    };

    return WithRaschRouterHoC;
  };

  return withRaschRouter;
};

export default withRaschRouterFactory;
