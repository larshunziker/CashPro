import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../shared/helpers/ads';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ZODIAC_SIGNS_DATA } from '../../../../shared/helpers/zodiacSigns';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../components/Breadcrumbs';
import OverviewPage from '../../components/OverviewPage';
import Paragraphs from '../../components/Paragraphs';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { SITE_TITLE } from '../../constants';
import { HOROSCOPE_DEFAULT, HOROSCOPE_DEFAULT_TITLE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HoroscopeProps } from './typings';
import { BreadcrumbsItems } from '../../../../../common/components/Breadcrumbs/typings';

type HoroscopePropsInner = HoroscopeProps & {
  data: QueryRoot & {
    environment: Route & {
      routeByPath: Route;
    };
    loading: boolean;
  };
};

// Accept LandingPage | undefined for fallback title
const getFallbackTitle = (landingPage: LandingPage | undefined) =>
  `${landingPage?.title || HOROSCOPE_DEFAULT_TITLE} - ${SITE_TITLE}`;

const Horoscope = ({ data, location }: HoroscopePropsInner) => {
  if (
    data.loading ||
    !data.environment ||
    !data.environment.routeByPath ||
    !data.environment.routeByPath.object
  ) {
    return null;
  }

  // landingPage can be undefined, but guarded above
  const landingPage = data.environment.routeByPath.object as
    | LandingPage
    | undefined;

  const termSettings: TermSettings = {
    title: landingPage?.title || HOROSCOPE_DEFAULT_TITLE,
    lead: landingPage?.lead,
  };

  const routeObject: Channel = ZODIAC_SIGNS_DATA.reduce(
    (routeObject, zodiac) => {
      // @ts-ignore
      routeObject.entities.edges.push({
        node: zodiac,
      });
      return routeObject;
    },
    {
      entities: {
        edges: [],
      },
    },
  );

  const enrichedLandingPageBody = landingPage?.body
    ? enrichOverviewBodyWithADs({ pageBody: landingPage.body })
    : [];

  return (
    <TestFragment data-testid="horoscope-container">
      {landingPage?.preferredUri && landingPage?.activeMenuTrail && (
        <TestFragment data-testid="horoscope-breadcrumbs-container">
          <Breadcrumbs
            pageUrl={landingPage.preferredUri}
            items={landingPage.activeMenuTrail as BreadcrumbsItems}
          />
        </TestFragment>
      )}

      <div className={styles.OverviewPageWrapper}>
        <OverviewPage
          location={location}
          routeObject={routeObject}
          termSettings={termSettings}
          gridConfig="horoscope4x3"
          paragraphType="HoroscopeScreen"
        />
      </div>
      {landingPage?.body &&
        Array.isArray(landingPage.body) &&
        landingPage.body.length > 0 && (
          <div data-testid="paragraphs-container">
            <div className={grid.Container}>
              <div className={grid.Row}>
                <div
                  className={classNames(
                    grid.ColXs24,
                    grid.ColSm20,
                    grid.ColOffsetSm2,
                    grid.ColXl14,
                    grid.ColOffsetXl5,
                  )}
                >
                  <Paragraphs
                    pageBody={enrichedLandingPageBody}
                    origin={HOROSCOPE_DEFAULT}
                    hasContainer={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: HoroscopePropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    getFallbackTitle: (mapProps: HoroscopePropsInner): string =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<RouteObjectInterface> | undefined' is not assignable to parameter of type 'LandingPage'. */
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps): number =>
      mapProps.data?.environment?.routeByPath?.object.entities?.count || 0,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps?.data?.environment?.routeObject?.entities?.edges || [],
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(Horoscope);
