import React, { useContext, useEffect, useRef, useState } from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import {
  IntraDayFillUp,
  ensureValorItems,
  fetchData,
  getRangeByActiveTab,
} from './helpers';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import EsiContext from '../../../../../common/components/EsiRenderer/context';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import ChartComparison from './components/ChartComparison';
import InteractiveChart from './components/InteractiveChart';
import InteractiveChartIntraday from './components/InteractiveChartIntraday';
import LineChart from './components/LineChart';
import Tabs from './components/Tabs';
import { FULLQUOTE_PAGE_TYPE } from '../../screens/FullquotePage/constants';
import { LABEL_MAPPING } from './components/Tabs/constants';
import {
  HIGHCHART_INTERACTIVE_CHART,
  HIGHCHART_INTERACTIVE_INTRADAY_CHART,
  HIGHCHART_LINE_CHART,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_CHART_INTRADAY, GET_CHART_TIMESERIE } from './queries';
import styles from './styles.legacy.css';
import { HighchartsWrapperProps, TimeRange, Variant } from './typings';

const getInitialTabButtons = (
  data: WidgetParagraph,
  variant: Variant,
): { type: TimeRange | string; label: string }[] => {
  const ensuredValorItems = ensureValorItems(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Maybe<Valor>[]> | undefined' is not assignable to parameter of type 'Valor[]'. */
    data?.widget?.valors?.items || data?.valors?.items,
  );
  const timePeriodes = data?.widget?.timePeriodValues || data?.timePeriodValues;
  let buttons =
    timePeriodes &&
    timePeriodes.map((type) => ({
      type,
      /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
      label: LABEL_MAPPING[type],
    }));
  if (variant === 'multipleValors') {
    buttons = ensuredValorItems.map(({ type, label }) => ({
      type,
      label,
    }));
  }

  /* @ts-ignore TODO: TS2322 ->  Type '{ type */
  return buttons;
};

// hook to force update when clicking outside of react context (fi-box-widget)
const useForceUpdate = () => {
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'listingIds' implicitly has an 'any' type. */
const getColorSet = (listingIds) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  return listingIds.reduce((acc, listingId, index) => {
    acc[listingId] = index;
    return acc;
  }, {});
};

const HighchartsWrapper = ({
  activeState = 0,
  isTabVisible = true,
  isInterActiveButtonVisible = true,
  component,
  widgetParagraph,
  origin,
  externalFullquoteUrl,
}: HighchartsWrapperProps) => {
  const location = useRaschRouterLocation();
  const { fullquoteUrl: esiFullquoteUrl } = useContext(EsiContext);
  const forceUpdate = useForceUpdate();
  const timePeriodes =
    widgetParagraph?.widget?.timePeriodValues ||
    widgetParagraph?.timePeriodValues;
  const ensuredValorItems = ensureValorItems(
    (widgetParagraph?.widget?.valors?.items ||
      widgetParagraph?.valors?.items) as Valor[],
  );

  // we store the listingId in a ref to build the chart url dynamically.
  // - the listingId is either read from the context (if the widgetParagraph.link.path was enriched [listingId] variable)
  // - or, if there is only one valor set on widgetParagraph?.valors?.items
  // multiple valors are read from "activeTab"
  const listingIdRef = useRef(null);
  const variantRef = useRef<Variant>(null);
  const initialIntradayDataCheckRef = useRef(false);
  const loadingRef = useRef(true);

  if (!variantRef.current) {
    let variant;
    // check if url has enriched listingId
    if (widgetParagraph?.link?.path) {
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'null'. */
      listingIdRef.current = widgetParagraph.link.path.match(
        /[0-9]{2,12}-[0-9]+-[0-9]+/,
      )?.[0];
      if (listingIdRef.current) {
        variant = 'context';
      }
    }
    if (variant !== 'context' && ensuredValorItems.length > 1) {
      variant = 'multipleValors';
    }

    if (ensuredValorItems.length === 1) {
      /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'null'. */
      listingIdRef.current = ensuredValorItems[0].type;
      variant = 'singleValor';
    }

    /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
    variantRef.current = variant;
  }

  const listingIds = [
    listingIdRef.current,
    ...((location?.query?.comparisons &&
      location?.query?.comparisons.split(',')) ||
      []),
  ];

  const [colorSet, setColorSet] = useState(() => getColorSet(listingIds));
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState(() => {
    if (variantRef.current === 'multipleValors') {
      return ensuredValorItems[activeState].type;
    } else {
      return (timePeriodes && timePeriodes[activeState]) || 'intraday';
    }
  });
  const [lastTimeRange, setLastTimeRange] = useState(activeTab);

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ intraday */
  let timeRange = getRangeByActiveTab[activeTab];

  if (variantRef.current === 'multipleValors') {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
    timeRange = getRangeByActiveTab[timePeriodes[0]];
  }

  useEffect(() => {
    /* @ts-ignore TODO: TS7034 ->  Variable 'listingIdsToFetch' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    const listingIdsToFetch = [];
    /* @ts-ignore TODO: TS7034 ->  Variable 'finalFetch' implicitly has type 'any' in some locations where its type cannot be determined. */
    let finalFetch;
    /* @ts-ignore TODO: TS7034 ->  Variable 'intradayVariables' implicitly has type 'any' in some locations where its type cannot be determined. */
    let intradayVariables;
    const currentTimeRange =
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      variantRef.current === 'multipleValors' ? timePeriodes[0] : activeTab;
    loadingRef.current = true;

    finalFetch = {
      query: GET_CHART_TIMESERIE,
      variables: {
        id:
          listingIdRef?.current ||
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ intraday */
          (!getRangeByActiveTab[activeTab] && activeTab) ||
          null,
        ...timeRange,
      },
    };
    intradayVariables = {
      query: GET_CHART_INTRADAY,
      id:
        listingIdRef?.current ||
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ intraday */
        (!getRangeByActiveTab[activeTab] && activeTab) ||
        null,
      frequency: '30s',
    };
    if (currentTimeRange === 'intraday' || currentTimeRange === 'allIntraday') {
      finalFetch = {
        query: GET_CHART_INTRADAY,
        variables: {
          id:
            listingIdRef?.current ||
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ intraday */
            (!getRangeByActiveTab[activeTab] && activeTab) ||
            null,
          ...timeRange,
        },
      };
      intradayVariables = null;
    }

    // in intraday we need to fetch multiple listingIds so we can show the comparison chart
    // thats why we use here the fetch all api
    if (
      listingIdRef?.current &&
      component === HIGHCHART_INTERACTIVE_CHART &&
      activeTab !== 'allIntraday'
    ) {
      listingIdsToFetch.push({
        id: listingIdRef.current,
        ...timeRange,
      });
      const comparisons = location?.query?.comparisons || null;
      if (comparisons) {
        /* @ts-ignore TODO: TS7006 ->  Parameter 'comparison' implicitly has an 'any' type. */
        comparisons.split(',').forEach((comparison) => {
          listingIdsToFetch.push({
            id: comparison,
            ...timeRange,
          });
        });
      }
      const result = Promise.all(
        listingIdsToFetch.map((item) => fetchData(GET_CHART_TIMESERIE, item)),
      );
      result
        .then((apolloData: any) => {
          loadingRef.current = false;
          setChartData(apolloData);
          setActiveTab(lastTimeRange);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            `[RaschStack][logHighchartFetchError – ChartComparision] error fetching chartData with these parameters: ${JSON.stringify(
              /* @ts-ignore TODO: TS7005 ->  Variable 'listingIdsToFetch' implicitly has an 'any[]' type. */
              listingIdsToFetch,
            )} – error: ${JSON.stringify(error)}`,
          );
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'never[]' is not assignable to parameter of type 'SetStateAction<null>'. */
          setChartData([]);
          loadingRef.current = false;
        });
    } else {
      // not in intraday mode we use the simple fetch api so we don't loose the performance
      const result = fetchData(finalFetch?.query, finalFetch?.variables);
      result
        .then((apolloData) => {
          let data = JSON.parse(
            JSON.stringify(
              apolloData?.data?.integration?.solid?.chart?.intraday ||
                apolloData?.data?.integration?.solid?.chart?.timeserie ||
                null,
            ),
          );
          if (currentTimeRange === 'intraday') {
            // check if last item in data.prices date is from yesterday this means the market is closed today for the intraday
            const lastDateInCurrentSet =
              data?.prices &&
              data?.prices.length > 0 &&
              new Date(data?.prices[data?.prices.length - 1].date);
            const isLastDateInCurrentSetFromYesterday =
              lastDateInCurrentSet &&
              lastDateInCurrentSet.getTime() <
                new Date(new Date().setHours(0, 0, 0, 0)).getTime();
            // On initial render, in case "intraday" returns no data, we want to switch to "threeMonths" or the first available timeRange
            if (
              !initialIntradayDataCheckRef.current &&
              (!data?.prices ||
                data?.prices?.length === 0 ||
                isLastDateInCurrentSetFromYesterday)
            ) {
              initialIntradayDataCheckRef.current = true;
              if (variantRef.current !== 'multipleValors') {
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                if (timePeriodes.includes('threeMonths')) {
                  setLastTimeRange(
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string>' is not assignable to parameter of type 'SetStateAction<string>'. */
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    timePeriodes[timePeriodes.indexOf('threeMonths')],
                  );
                } else {
                  const timePeriodesCopy = JSON.parse(
                    JSON.stringify(timePeriodes),
                  );
                  timePeriodesCopy.splice(
                    timePeriodesCopy.indexOf('intraday'),
                    1,
                  );
                  setLastTimeRange(timePeriodesCopy[0] || 'intraday');
                }
              }
            }
            // the intraday xAxis should always span from exchange opening - closing hours. we automatically fill up with empty data points
            data = IntraDayFillUp(data);
          }
          /* @ts-ignore TODO: TS7005 ->  Variable 'intradayVariables' implicitly has an 'any' type. */
          if (intradayVariables) {
            const result = fetchData(
              /* @ts-ignore TODO: TS7005 ->  Variable 'intradayVariables' implicitly has an 'any' type. */
              intradayVariables?.query,
              /* @ts-ignore TODO: TS7005 ->  Variable 'intradayVariables' implicitly has an 'any' type. */
              intradayVariables,
            );
            result.then((apolloData) => {
              const intradayData: any = JSON.parse(
                JSON.stringify(
                  apolloData?.data?.integration?.solid?.chart?.intraday || null,
                ),
              );
              // add last intradayData item into data
              if (intradayData?.prices?.length > 0) {
                const lastIntradayDataItem =
                  intradayData.prices[intradayData.prices.length - 1];

                // check if last item in data.prices date is from yesterday this means the market is closed today for the intraday
                const lastDateInCurrentSet =
                  data?.prices &&
                  lastIntradayDataItem?.date &&
                  new Date(lastIntradayDataItem.date);
                const isLastDateInCurrentSetFromYesterday =
                  lastDateInCurrentSet &&
                  lastDateInCurrentSet.getTime() <
                    new Date(new Date().setHours(0, 0, 0, 0)).getTime();

                if (
                  !isLastDateInCurrentSetFromYesterday &&
                  lastIntradayDataItem
                ) {
                  data.prices.push({
                    ...lastIntradayDataItem,
                    currentPrice: true,
                  });
                }
              }
              setChartData(data);
              setActiveTab(lastTimeRange);
              loadingRef.current = false;
            });
          } else {
            loadingRef.current = false;
            setChartData(data);
            setActiveTab(lastTimeRange);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            `[RaschStack][logHighchartFetchError] error fetching chartData with these parameters: ${JSON.stringify(
              /* @ts-ignore TODO: TS7005 ->  Variable 'finalFetch' implicitly has an 'any' type. */
              finalFetch?.variables,
            )} – error: ${JSON.stringify(error)}`,
          );
          loadingRef.current = false;
          setActiveTab(lastTimeRange);
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'never[]' is not assignable to parameter of type 'SetStateAction<null>'. */
          setChartData([]);
        });
    }
  }, [
    activeTab,
    lastTimeRange,
    timePeriodes,
    component,
    timeRange,
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    location.query.comparisons,
  ]);

  let fullquoteUrl = ensuredValorItems.find(({ type }) => {
    return type === activeTab;
  })?.fullquoteUrl;

  const isFullquotePage =
    origin && origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1;

  if (!fullquoteUrl && isFullquotePage) {
    fullquoteUrl = esiFullquoteUrl || global.location.pathname;
  }

  if (!variantRef.current) {
    return null;
  }

  return (
    <div
      className={classNames({
        [styles.NoTabsPadding]:
          !isTabVisible || (timePeriodes && timePeriodes.length === 0),
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        [styles.Border]: !location.pathname.includes('/chart'),
      })}
    >
      {isTabVisible && timePeriodes && timePeriodes.length > 0 && (
        <Tabs
          activeTab={activeTab}
          setActiveTab={(activeTab) => {
            setLastTimeRange(activeTab);
          }}
          buttons={getInitialTabButtons(widgetParagraph, variantRef.current)}
          origin={origin}
          fullquoteUrl={
            externalFullquoteUrl ? externalFullquoteUrl : fullquoteUrl
          }
        />
      )}
      <Switch
        key={`some-key-${loadingRef.current}${JSON.stringify(colorSet)}`}
        colorSet={colorSet}
        forceUpdate={forceUpdate}
        setColorSet={setColorSet}
        loading={loadingRef.current}
        fullquoteUrl={fullquoteUrl}
        data={chartData}
        timeRange={
          variantRef.current === 'multipleValors'
            ? /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              widgetParagraph.timePeriodValues[0]
            : activeTab
        }
        component={
          activeTab === 'allIntraday' ? `${component}/${activeTab}` : component
        }
        origin={origin}
        isInterActiveButtonVisible={isInterActiveButtonVisible}
      />

      {(component === HIGHCHART_INTERACTIVE_CHART && (
        <ChartComparison
          key={`comparisons-key-${location?.query?.comparisons}`}
          location={location}
          currentListingId={listingIdRef.current}
          listingIds={listingIds}
        />
      )) ||
        null}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
const withUpdatePolicy = shouldUpdate((props: any, nextProps) => {
  if (JSON.stringify(props.data) !== JSON.stringify(nextProps.data)) {
    return true;
  }

  return false;
});

const Switch = withUpdatePolicy(
  createComponentSwitch({
    [HIGHCHART_LINE_CHART]: LineChart,
    [HIGHCHART_INTERACTIVE_CHART]: InteractiveChart,
    [HIGHCHART_INTERACTIVE_INTRADAY_CHART]: InteractiveChartIntraday,
  }),
);

export default HighchartsWrapper;
