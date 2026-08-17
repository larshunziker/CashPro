import React from 'react';
import { useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { replaceValues } from '../FullquotePage/helpers';
import { prepareBody, prepareMetaData } from './helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import AppNexus from '../../components/AppNexus';
import Paragraphs from '../../components/Paragraphs';
import StatusPage from '../StatusPage';
import { TOP_AD_1 } from '../../../../../shared/constants/adZone';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import { DROPDOWN_QUOTES } from '../../components/Widgets/components/QuoteList/constants';
import { QUOTE_LIST_PAGE_TYPE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { QuoteListPageProps } from './typings';

const QuoteListPage = ({
  data,
  error,
  loading,
  location,
}: QuoteListPageProps) => {
  const dispatch = useDispatch();
  /* @ts-ignore TODO: TS2339 ->  Property 'pathname' does not exist on type 'Partial<RaschRouterLocation> | undefined'. */
  const { pathname } = location;
  const { quoteList } = data;

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (location.pathname === '/kurse') {
    const smiPath = DROPDOWN_QUOTES['Schweiz'][0].path;
    if (__SERVER__) {
      dispatch(setStatusCode(301, smiPath));
      return null;
    }
    global.location.href = smiPath;
    return null;
  }

  const widgetParams = pathname.replace(/\/kurse\/?/, '');
  const routeByPathObject = (data?.environment?.quoteListSubPage?.object ||
    data?.environment?.routeByPath?.object ||
    null) as LandingPage;

  const errorStatusCode =
    error?.networkError?.statusCode ||
    error?.graphQLErrors?.[0]?.extensions?.code;

  if (
    !routeByPathObject ||
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    routeByPathObject?.body?.length <= 0 ||
    (widgetParams && !quoteList && (!errorStatusCode || errorStatusCode < 500))
  ) {
    if (loading) {
      return null;
    }
    return <StatusPage statusCode={404} />;
  }

  if (errorStatusCode >= 500) {
    if (__SERVER__) {
      dispatch(setStatusCode(errorStatusCode));
    }

    return <StatusPage statusCode={503} />;
  }

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  routeByPathObject.body = routeByPathObject?.body.map((item: any) => {
    if (item.__typename === 'SectionParagraph') {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'bodyItem' implicitly has an 'any' type. */
      item.body.map((bodyItem) => {
        if (bodyItem.__typename === 'WidgetParagraph') {
          if (
            bodyItem.widget?.url.path.includes('/esi-widgets/list') ||
            bodyItem.widget?.url.path.includes('/esi-widgets/top-flop/') ||
            bodyItem.link.path.includes('/esi-widgets/top-flop/')
          ) {
            bodyItem.quoteList = quoteList;
          }
        }
      });
    }
    return item;
  });

  return (
    <>
      {(!routeByPathObject?.channel?.suppressAds && (
        <div className="ad-wrapper ad-wrapper-mobile">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}

      {routeByPathObject?.body && (
        <Paragraphs
          pageBody={prepareBody(routeByPathObject.body, widgetParams)}
          colStyle={classNames(grid.ColXs24)}
          landingPagePullOut
          origin={QUOTE_LIST_PAGE_TYPE}
        />
      )}
    </>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => {
      const routeByPathObject = (mapProps.data?.environment?.quoteListSubPage
        ?.object ||
        mapProps.data?.environment?.routeByPath?.object ||
        null) as LandingPage;
      const widgetParams = mapProps.location.pathname.replace(/\/kurse\/?/, '');
      const quoteList = mapProps.data?.quoteList;

      // Return node with empty metaLinks to prevent canonical tag generation on 404 pages
      // This mirrors the 404 condition in the component
      const is404 =
        !routeByPathObject ||
        (routeByPathObject?.body?.length ?? 0) <= 0 ||
        (widgetParams && !quoteList);

      if (is404) {
        return { metaLinks: [] };
      }

      // TODO: we need to fetch some data from gql service like we do on fullqout pages so we get more information on quote list page
      let replacedRouteByPathObject = replaceValues(
        routeByPathObject,
        widgetParams || '',
      );
      replacedRouteByPathObject = prepareMetaData(
        mapProps.location.pathname,
        replacedRouteByPathObject,
      );
      return {
        ...replacedRouteByPathObject,
        metaCanonicalUrl: mapProps.location.href,
      };
    },
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({ parseTrackingData }),
)(QuoteListPage);
