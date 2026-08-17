import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { generateMetaLinks } from '../../../../../shared/helpers/withHelmet';
import { sort } from '../MyCash/components/Table/helpers';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import AppNexus from '../../components/AppNexus';
import Breadcrumbs from '../../components/Breadcrumbs';
import Helmet from '../../components/Helmet';
import Paragraphs from '../../components/Paragraphs';
import OverviewPageHeader from '../LandingPage/components/OverviewPageHeader';
import StatusPage from './../StatusPage';
import { TOP_AD_1 } from '../../../../../shared/constants/adZone';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { ROUTE_TRADING_IDEAS } from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TradingIdeasProps } from './typings';

type DictionaryPropsInner = TradingIdeasProps;

const TradingIdeas = ({ data, location, error }: DictionaryPropsInner) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'RaschRouterLocation | undefined' is not assignable to parameter of type 'Partial<RaschRouterLocation> */
  const metaLinks = generateMetaLinks(location, ROUTE_TRADING_IDEAS);
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const landingPage =
    (data?.environment?.routeByPath?.object as LandingPage) || null;

  const customOrderRef = useRef(null);
  if (data?.portfolio?.portfolioSettings?.customOrder) {
    customOrderRef.current = JSON.parse(
      data?.portfolio?.portfolioSettings?.customOrder,
    );
  }

  if (
    customOrderRef.current &&
    data?.portfolio?.calculatedFields?.instruments
  ) {
    data.portfolio.calculatedFields.instruments = sort(
      data?.portfolio?.calculatedFields?.instruments,
      'instrumentKey',
      'asc',
      customOrderRef.current,
    );
  }

  const body =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    data?.portfolio?.calculatedFields?.instruments?.length > 0
      ? [
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          landingPage?.body[0],
          data?.portfolio?.name
            ? {
                ...data.portfolio,
                __typename: `${data.portfolio.__typename}Summary`,
              }
            : undefined,
          data?.portfolio?.name ? data?.portfolio : undefined,
          {
            // hardcoded paragraph to show before transactions
            id: `${landingPage?.id}-section-paragraph`,
            title: 'Letzte Transaktionen',
            __typename: 'SectionParagraph',
          },
          data?.portfolio?.name
            ? {
                ...data?.portfolio,
                __typename: `${data.portfolio.__typename}TransactionsBuy`,
              }
            : undefined,
          data?.portfolio?.name
            ? {
                ...data?.portfolio,
                __typename: `${data.portfolio.__typename}TransactionsSell`,
              }
            : undefined,
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          ...landingPage?.body.slice(1),
        ].filter(Boolean)
      : landingPage?.body;

  if (error) {
    return <StatusPage statusCode={503} logMessage={error} />;
  }

  return (
    <>
      {(!landingPage?.channel?.suppressAds && (
        <div className="ad-wrapper ad-wrapper-mobile">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}

      <div className={styles.PageWrapper}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs24, styles.Print)}>
            <Helmet
              title={landingPage?.title || ''}
              link={metaLinks}
              socialMetaValues={{
                field_short_title: landingPage?.title || '',
              }}
            />

            {(!isHybridApp && (
              <Breadcrumbs
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                pageUrl={landingPage?.preferredUri}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
                items={landingPage?.activeMenuTrail}
              />
            )) ||
              null}

            <OverviewPageHeader
              title={landingPage?.title || ''}
              lead={landingPage?.lead || ''}
            />

            <div data-testid="trading-ideas-wrapper">
              <div>
                <Paragraphs hasContainer={false} pageBody={body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default compose<any>(
  withParams,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
      }),
  }),
  withHelmet({
    getNode: (mapProps: DictionaryPropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(TradingIdeas);
