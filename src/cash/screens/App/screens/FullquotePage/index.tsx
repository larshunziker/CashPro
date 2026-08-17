import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import compose from 'recompose/compose';
import { enrichOverviewBodyWithADs } from '../../../../../shared/helpers/ads';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { isWarning } from '../LandingPage/helpers';
import { breadcrumbItems, enrichBody, getFullquoteHelmetNode } from './helpers';
import { getResolvedLongFullquotePath } from '../../../../shared/helpers/fullquote';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { useInitialLoading } from '../../../../../shared/hooks/useInitialLoading';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import EsiContext from '../../../../../common/components/EsiRenderer/context';
import Redirect from '../../../../../common/components/Redirect';
import Breadcrumbs from '../../../../screens/App/components/Breadcrumbs';
import AppNexus from '../../components/AppNexus';
import Paragraphs from '../../components/Paragraphs';
import TeaserGrid from '../../components/TeaserGrid';
import StatusPage from '../StatusPage';
import CreateValorButton from './components/CreateValorButton';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import { items } from './items';
import { TOP_AD_1 } from '../../../../../shared/constants/adZone';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import {
  getAdSlotNameByEntryIndex,
  getAdSlotNameByEntryIndexOnError,
} from '../../components/AppNexus/constants';
import { FULLQUOTE_PAGE_TYPE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { FullquotePageProps } from './typings';

const FullquotePage = ({
  data,
  market,
  currency,
  pageType,
  valorName,
  location,
  error,
}: FullquotePageProps) => {
  const { isSSR } = useSSRContext();
  const dispatch = useDispatch();
  const loading = useInitialLoading();
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const [esiContextObject] = useState({ timeout: 32000 }); // https://reactjs.org/docs/context.html#caveats
  const navigate = useStableNavigate();
  const { getFullquotePage } = data;
  const pageTypeFromPath = location.pathname.replace(/^\/+/, '').split('/')[0];
  const resolvedMarket =
    market || getFullquotePage?.mMarket?.toLowerCase() || '';
  const resolvedCurrency =
    currency || getFullquotePage?.mCur?.toLowerCase() || '';

  useEffect(() => {
    if (location.hash === '#chart__comparision') {
      const longFullquotePath = getResolvedLongFullquotePath({
        pageType: pageTypeFromPath,
        valorName,
        market,
        currency,
        fullquotePage: getFullquotePage,
      });

      if (longFullquotePath) {
        navigate(`${longFullquotePath}/chart`);
      }
    }
  }, [
    currency,
    getFullquotePage,
    location.hash,
    market,
    navigate,
    pageTypeFromPath,
    valorName,
  ]);

  const routeByPathObject = (data?.environment?.routeByPathSubPage?.object ||
    data?.environment?.routeByPath?.object ||
    null) as LandingPage;
  const fullQuoteType = (location.href || '').split(`/${valorName}`)?.[0];
  const widgetParams = `${fullQuoteType}/${valorName}/${resolvedMarket}/${resolvedCurrency}`;

  if (
    getFullquotePage?.redirectUri &&
    location.pathname.replace(/\/$/, '') === widgetParams.replace(/\/$/, '')
  ) {
    if (isSSR) {
      dispatch(setStatusCode(301, `/${getFullquotePage.redirectUri}`));
      return null;
    } else {
      global.history.replaceState({}, '', `/${getFullquotePage.redirectUri}`);
      return <Redirect to={`/${getFullquotePage.redirectUri}`} />;
    }
  }

  const errorStatusCode =
    error?.networkError?.statusCode ||
    error?.graphQLErrors?.[0]?.extensions?.code;

  if (
    !getFullquotePage ||
    !routeByPathObject ||
    !valorName ||
    !resolvedMarket ||
    !resolvedCurrency ||
    !location.href
  ) {
    if (loading) {
      return null;
    }

    // Return 404 if:
    // 1. There's no server error (or error < 500) AND either routeByPath or getFullquotePage is missing
    // 2. Or the error status code is explicitly 404
    // This ensures proper 404 handling for non-existent stock/instrument pages
    if (
      ((!errorStatusCode || errorStatusCode < 500) &&
        (!routeByPathObject || !getFullquotePage)) ||
      errorStatusCode === 404
    ) {
      return <StatusPage statusCode={404} />;
    }
  }

  if (__SERVER__ && errorStatusCode >= 500) {
    dispatch(setStatusCode(errorStatusCode));
  }

  // All fullquote subtypes have their own entityqueue in the CMS. The `/derivate/simulator` page is a special case, because we only render a fullquote header widget and an 3rd party iframe. This pages does not have its own teasergrid layout, therefore we're only rendering the necessary paragraphs, the /simulator page is also fully hardcoded in the frontend, there is no landingpage for it in the CMS
  const useTeaserGrid = pageType === 'fullquoteDerivateSimulator';
  const itemCopy = structuredClone(items);
  const gridItems: any =
    useTeaserGrid &&
    Array.isArray(items[pageType]) &&
    itemCopy[pageType].map((item: any) => {
      item = enrichBody({
        body: item,
        /* @ts-ignore TODO: TS2322 ->  Type '{ valorName */
        data: {
          ...getFullquotePage,
          valorName,
          market: resolvedMarket,
          currency: resolvedCurrency,
          pageType: fullQuoteType.slice(1),
        },
      });
      return item;
    });

  const adEnrichedBody =
    (routeByPathObject &&
      routeByPathObject?.body &&
      enrichOverviewBodyWithADs({
        pageBody: enrichBody({
          body: routeByPathObject?.body,
          /* @ts-ignore TODO: TS2322 ->  Type '{ valorName */
          data: {
            ...getFullquotePage,
            valorName,
            market: resolvedMarket,
            currency: resolvedCurrency,
            pageType: fullQuoteType.slice(1),
          },
        }),
        ignoreFirstIndexLogic: true,
        enhanceAdslotByEntryIndex: isWarning(routeByPathObject?.body)
          ? getAdSlotNameByEntryIndexOnError
          : getAdSlotNameByEntryIndex,
        noLastSlotOverride: true,
      })) ||
    null;

  return (
    <>
      {(!routeByPathObject?.channel?.suppressAds && (
        <div className="ad-wrapper ad-wrapper-mobile">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}

      <div className={styles.Wrapper} key={`fullquote-${widgetParams}`}>
        {isWarning(routeByPathObject.body) || isHybridApp ? null : (
          <div className={styles.Breadcrumbs}>
            <Breadcrumbs
              pageUrl={location}
              /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
              items={breadcrumbItems(getFullquotePage)}
            />
          </div>
        )}
        {(routeByPathObject?.editContentUri && (
          <CreateValorButton fullquoteParam={widgetParams} />
        )) ||
          null}
        {/* on fullquote pages, we want to show the fullquote teaser grid layout by given pageType
        pls ensure you choose a page type where a teaserLayout exists */}
        {!useTeaserGrid && adEnrichedBody && (
          <EsiContext.Provider
            value={{ ...esiContextObject, fullquoteUrl: widgetParams }}
          >
            <Paragraphs
              pageBody={adEnrichedBody}
              origin={`${FULLQUOTE_PAGE_TYPE}-${pageType}`}
              colStyle={grid.ColXs24}
              landingPagePullOut
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              isAdSuppressed={routeByPathObject?.channel?.suppressAds}
            />
          </EsiContext.Provider>
        )}
        {useTeaserGrid && (
          <div className={styles.InnerWrapper}>
            <TeaserGrid items={gridItems} layout={pageType} />
          </div>
        )}
      </div>
    </>
  );
};

export default compose<any, any>(
  withParams,
  withHelmet({
    getNode: getFullquoteHelmetNode,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({ parseTrackingData }),
)(FullquotePage);
