import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import urlMod from 'url';
import { replaceAll } from '../../../../../../../shared/helpers/replaceAll';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import InView from '../../../../../../../common/components/InView';
import ContentBoxTab from '../../../ContentBoxTab';
import HighchartsWrapper from '../../../Highcharts';
import ExtendedChart from '../../../Highcharts/components/ExtendedChart';
import MarketTable from '../../../MarketTable';
import Teaser from '../../../Teaser';
import TheScreener from '../../../TheScreener';
import Widgets from '../../../Widgets';
import SponsorIntegration from '../../../Widgets/components/SponsorIntegration';
import EsiComponent from './components/EsiComponent';
import ForumPosts from './components/ForumPosts';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import {
  WIDGET_TYPE_CHART,
  WIDGET_TYPE_EXTENDED_CHART,
  WIDGET_TYPE_FORUM,
  WIDGET_TYPE_TRENDRADAR,
} from '../../../../../../../shared/constants/content';
import { HIGHCHART_LINE_CHART } from '../../../Highcharts/constants';
import { TEASER_UBS_TRENDRADAR } from '../../../Teaser/constants';
import {
  WIDGET_AWP_ANALYSER,
  WIDGET_CHART_TIMESERIES,
  WIDGET_CORPORATE_ACTIONS,
  WIDGET_CURRENCY_CALCULATOR,
  WIDGET_DIVIDEND_CALENDAR,
  WIDGET_FULLQUOTE_HEADER,
  WIDGET_FULLQUOTE_HEADER_BNP,
  WIDGET_INSTRUMENT_ACTIONS,
  WIDGET_INSTRUMENT_GENERIC_DATA,
  WIDGET_INSTRUMENT_HIGH_LOW,
  WIDGET_INSTRUMENT_LATEST_DATA,
  WIDGET_INSTRUMENT_LATEST_DATA_IN_ARTICLE,
  WIDGET_INSTRUMENT_MARKET_PLACES,
  WIDGET_INSTRUMENT_PERFORMANCE,
  WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA,
  WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA_CALLBACK,
  WIDGET_ORDERBOOK,
  WIDGET_QUOTELIST,
  WIDGET_SAVINGS_PLAN_CALCULATOR,
  WIDGET_SECTOR,
  WIDGET_TOP_FLOP,
  WIDGET_TREND_RADAR,
  WIDGET_TREND_RADAR_OVERVIEW,
  WIDGET_VOLUME_TURNOVER,
  WIDGET_WIKIFOLIO,
} from '../../../Widgets/constants';
import styles from './styles.legacy.css';
import { WidgetParagraphProps, WidgetParagraphType } from './typings';

const contentBoxProps = {
  component: 'newest',
  body: [
    {
      sortBy: 'newest',
      mode: 'automatic',
    },
  ],
  origin: 'fullquote-page-fullquoteDefault',
  title: 'Börsen News',
};

const WidgetParagraph = ({
  widgetParagraph,
  subscriptions,
  origin,
}: WidgetParagraphProps & { subscriptions: string[] }) => {
  const widgetParagraphCopy: WidgetParagraphType = JSON.parse(
    JSON.stringify(widgetParagraph),
  );
  const paragraphIndex = useContext(ParagraphIndexContext);
  const esiWidgetRef = useRef<HTMLDivElement>(null);
  const [csFallback, setCsFallback] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const sponsorTitle = widgetParagraphCopy?.sponsor?.title;

  useEffect(() => {
    if (
      sponsorTitle !== 'Credit Suisse' ||
      !esiWidgetRef.current ||
      csFallback
    ) {
      return;
    }

    const observer = new MutationObserver(() => {
      const elements =
        esiWidgetRef.current?.getElementsByClassName?.('fi-box-cs-fallback');
      if (elements && elements.length > 0) {
        setCsFallback(true);
      }
    });

    observer.observe(esiWidgetRef.current, {
      subtree: true,
      childList: true,
    });
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [sponsorTitle, csFallback]);

  // TODO: maybe add a check to only allow fi-box urls? maybe we should do this on gql level for security reasons?
  if (!widgetParagraphCopy?.link?.path) {
    return null;
  }

  const sponsorKey = widgetParagraphCopy?.sponsor?.key;
  // INFO: the sponsorImage relativeOringPath needs to have the same name on develop and stage CMS. The stage env of the FI-BOX will use the stage.cash.ch url to build the img url.
  const sponsorImage =
    widgetParagraphCopy?.sponsor?.teaserImage?.image?.file
      ?.relativeOriginPath ||
    widgetParagraphCopy?.widget?.sponsor?.teaserImage?.image?.file
      ?.relativeOriginPath ||
    '';

  if (sponsorKey || sponsorImage) {
    widgetParagraphCopy.link.path = replaceAll(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      replaceAll(widgetParagraphCopy.link.path, '[sponsorKey]', sponsorKey),
      '[sponsorImage]',
      sponsorImage,
    );
  }

  if (widgetParagraphCopy.link.path.includes(`/sponsor-integration`)) {
    // read out the sponsor from the path query params
    const url = new URL(widgetParagraphCopy.link.path);
    const sponsor = url.searchParams.get('sponsor');
    if (!sponsor) {
      return null;
    }

    return (
      <SponsorIntegration
        sponsor={sponsor}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }

  if (
    widgetParagraphCopy.link.path.includes(
      `/esi-widgets/market-overview-extended`,
    )
  ) {
    return (
      <MarketTable widgetParagraph={widgetParagraphCopy} isExtended={true} />
    );
  }

  if (
    widgetParagraphCopy.link.path.includes(
      `/services/esi-widgets/list-small?type=`,
    )
  ) {
    return <MarketTable widgetParagraph={widgetParagraphCopy} />;
  }
  if (widgetParagraphCopy.link.path.includes('integration=thescreener')) {
    const url = new URL(widgetParagraphCopy.link.path);
    const stockId = url.searchParams.get('symbol');
    const currency = url.searchParams.get('currency');

    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
    return <TheScreener stockId={stockId} currency={currency} />;
  }
  if (widgetParagraphCopy.link.path.includes('/savings-plan-calculator')) {
    return (
      <Widgets
        component={WIDGET_SAVINGS_PLAN_CALCULATOR}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/currency-calculator')) {
    return (
      <Widgets
        component={WIDGET_CURRENCY_CALCULATOR}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/action-buttons')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_ACTIONS}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (
    widgetParagraphCopy.link.path.includes('/multiple-generic-data-callback')
  ) {
    return (
      <Widgets
        component={WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA_CALLBACK}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/multiple-generic-data')) {
    return (
      <Widgets
        component={WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/generic-data')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_GENERIC_DATA}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (
    widgetParagraphCopy.link.path.includes('/latest-data') &&
    widgetParagraphCopy.link.path.includes('caller=article')
  ) {
    // make sure this if condition stays above the other if condition for latest-data
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_LATEST_DATA_IN_ARTICLE}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/latest-data')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_LATEST_DATA}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/summary')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_PERFORMANCE}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/sector')) {
    return (
      <Widgets
        component={WIDGET_SECTOR}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/market-places')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_MARKET_PLACES}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('/comparison-years')) {
    return (
      <Widgets
        component={WIDGET_INSTRUMENT_HIGH_LOW}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  if (widgetParagraphCopy.link.path.includes('integration=awp-analyser')) {
    return (
      <Widgets
        component={WIDGET_AWP_ANALYSER}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }

  if (widgetParagraphCopy.link.path.includes('cdn.fi-box')) {
    const parsedUri = urlMod.parse(widgetParagraphCopy.link.path);
    widgetParagraphCopy.link.path =
      __FI_BOX_SERVICE_ENDPOINT__ + parsedUri.path;
  }

  // only render an <esi:include tag if its not disabled by the cms setting of if the widget paragraph, or if its rendered above the fold (meaning if the widget paragrath is within the first 2 paragraphs)
  const isAboveTheFold = paragraphIndex < 2;
  const clientOnly =
    widgetParagraphCopy?.clientOnly ||
    !isAboveTheFold ||
    origin === 'menu-overlay';

  let markup = <></>;
  const subtypeValue =
    widgetParagraphCopy?.subtypeValue ||
    widgetParagraphCopy?.widget?.subtypeValue ||
    '';

  if (csFallback) {
    markup = (
      <ContentBoxTab
        // @ts-ignore
        node={contentBoxProps}
        component={contentBoxProps.component}
      />
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/charts-json/') ||
    subtypeValue === WIDGET_TYPE_CHART
  ) {
    markup = (
      <div className={classNames(styles.Wrapper, styles.Charts)}>
        <ClientSideOnly>
          <Suspense fallback="">
            <HighchartsWrapper
              origin={origin}
              widgetParagraph={widgetParagraph as any}
              component={HIGHCHART_LINE_CHART}
            ></HighchartsWrapper>
          </Suspense>
        </ClientSideOnly>
      </div>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('forum=woltlab') ||
    subtypeValue === WIDGET_TYPE_FORUM
  ) {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | URL'. */
    const params = new URL(widgetParagraph.link.path).searchParams;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const valor = widgetParagraph.valors?.items[0];
    let path = params.get('path');
    const count = Number(params.get('count'));

    if (valor) {
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | null'. */
      path = valor.fullquoteUrl;
    }

    if (!path || path === '[widgetParams]') {
      return null;
    }
    markup = <ForumPosts path={path} count={count} />;
  } else if (subtypeValue === WIDGET_TYPE_TRENDRADAR) {
    /* @ts-ignore TODO: TS2322 ->  Type '{ component */
    markup = <Teaser {...widgetParagraph} component={TEASER_UBS_TRENDRADAR} />;
  } else if (subtypeValue === WIDGET_TYPE_EXTENDED_CHART) {
    let listingId = '';
    let timePeriod = [];
    if (
      Array.isArray(widgetParagraph.valors?.items) &&
      widgetParagraph.valors?.items
    ) {
      const valor = widgetParagraph.valors?.items[0];
      const number = valor?.valorNumber;
      const market = valor?.valorStockExchange?.originalId;
      const currency = valor?.valorCurrency?.originalId;
      if (number && market && currency) {
        listingId = `${number}-${market}-${currency}`;
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<string>[]> | undefined' is not assignable to type 'any[]'. */
        timePeriod = widgetParagraph.timePeriodValues;
      }
    }
    if (!listingId) {
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      const queryString = widgetParagraph.link.path.split('?')[1];
      const urlParams = new URLSearchParams(queryString);
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
      listingId = urlParams.get('listingid');
    }
    markup = (
      <Suspense>
        <ExtendedChart
          isInternal
          internalData={{ listingId: listingId, timePeriod: timePeriod }}
        />
      </Suspense>
    );
  } else if (widgetParagraphCopy.link.path.includes('/esi-widgets/list/')) {
    markup = (
      <>
        <Widgets
          component={WIDGET_QUOTELIST}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/esi-widgets/orderbook/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_ORDERBOOK}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/esi-widgets/timeseries/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_CHART_TIMESERIES}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (widgetParagraphCopy.link.path.includes('/esi-widgets/header/')) {
    markup = (
      <>
        <Widgets
          component={WIDGET_FULLQUOTE_HEADER}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (widgetParagraphCopy.link.path.includes('/esi-widgets/top-flop/')) {
    markup = (
      <>
        <Widgets
          component={WIDGET_TOP_FLOP}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/esi-widgets/volume-turnover/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_VOLUME_TURNOVER}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/esi-widgets/trend-radar/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_TREND_RADAR}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/widgets/corporate-actions/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_CORPORATE_ACTIONS}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/widgets/dividend-calendar/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_DIVIDEND_CALENDAR}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (
    widgetParagraphCopy.link.path.includes('/widgets/trend-radar-overview/')
  ) {
    markup = (
      <>
        <Widgets
          component={WIDGET_TREND_RADAR_OVERVIEW}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (widgetParagraphCopy.link.path.includes('/widgets/wikifolio/')) {
    markup = (
      <>
        <Widgets
          component={WIDGET_WIKIFOLIO}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else if (widgetParagraphCopy.link.path.includes('/widgets/header-bnp/')) {
    markup = (
      <>
        <Widgets
          component={WIDGET_FULLQUOTE_HEADER_BNP}
          widgetParagraph={widgetParagraph}
        />
      </>
    );
  } else {
    markup = (
      <div ref={esiWidgetRef} className={styles.Wrapper}>
        <EsiComponent
          clientOnly={clientOnly}
          link={widgetParagraphCopy.link}
          subscriptions={subscriptions}
        ></EsiComponent>
      </div>
    );
  }

  return isAboveTheFold ? (
    markup
  ) : (
    <InView config={{ rootMargin: '400px', threshold: 0, triggerOnce: true }}>
      {({ isInView }) => (isInView && markup) || null}
    </InView>
  );
};

const mapStateToProps = (state: Record<string, any>) => {
  const subs = authStateSelector(state).subscriptions;
  return {
    subscriptions: Array.isArray(subs) ? subs : [],
  };
};

export default connect(mapStateToProps)(WidgetParagraph);
