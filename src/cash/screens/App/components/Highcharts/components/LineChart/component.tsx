/* istanbul ignore file */

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, {
  DashStyleValue,
  YAxisPlotLinesOptions,
} from 'highcharts/highstock';
import annotations from 'highcharts/modules/annotations';
import {
  DATE_FORMAT_FULL,
  DATE_FORMAT_TIME,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { log } from '../../../../../../../shared/helpers/utils';
import { IntraDayFillUp, fetchData, formatPrice } from '../../helpers';
import { useSrollToLinkElement } from '../../../../../../../shared/hooks/useScrollToLinkElement';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../ButtonWithLoading';
import { stockChartOptions } from '../../defaultConfig';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { AUTOUPDATE_INTERVAL } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/co */
import { GET_CHART_AUTOUPDATE } from '../../queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/ra */
import variables from '../../../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { Price, TimeRange } from '../../typings';
import { LineChartProps } from './typings';

if (typeof Highcharts === 'object') {
  annotations(Highcharts);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'x' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'y' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'w' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'h' implicitly has an 'any' type. */
  Highcharts.SVGRenderer.prototype.symbols.line = (x, y, w, h) => {
    return ['M', x, y + h / 2, 'L', x + w, y + h / 2, 'z'];
  };
  Highcharts.setOptions(stockChartOptions);
}

const dateFormatOptionByTimeRange = (timeRange: TimeRange) => {
  switch (timeRange) {
    case 'intraday':
    case 'allIntraday':
      return '%H:%M';

    default:
      return '%d.%m.%y';
  }
};

const plotLine = (
  value: number,
  text: string,
  color: string,
  labelPos: 'above' | 'below',
  dashStyle: DashStyleValue = 'ShortDash',
  lineWidth = 2,
  zIndex = 1,
  align = 'center',
  textAlign = 'right',
): YAxisPlotLinesOptions => {
  return {
    value: value,
    color: color,
    dashStyle: dashStyle,
    width: lineWidth,
    label: {
      // @ts-ignore
      align,
      // @ts-ignore
      textAlign,
      useHTML: true,
      text: text,
      y: labelPos === 'above' ? -5 : 18,
      style: {
        color: 'rgba(106, 110, 113, 1)',
        background: 'white',
        zIndex: zIndex,
      },
    },
    zIndex: 8,
  };
};

const getOptions = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
  data,
  timeRange: TimeRange,
  chartHeight: string | number,
  fullquoteUrl: string,
  navigate: (url: string) => void,
  pushToLinkStack: (element: HTMLElement) => void,
  chartRef: any,
  isFullquotePage: boolean,
) => {
  const isTouchDevice =
    global.innerWidth < 759 || 'ontouchstart' in document.documentElement;

  // A stock can never have a negative value.
  // So the value will not show up if not defined.
  let minValue = -100;
  let maxValue = -100;
  let endValue = -100;
  let isMarketOpen = false;
  if (data?.prices) {
    const validValues = data?.prices
      /* @ts-ignore TODO: TS7006 ->  Parameter 'price' implicitly has an 'any' type. */
      .map((price) => price.close)
      /* @ts-ignore TODO: TS7006 ->  Parameter 'price' implicitly has an 'any' type. */
      .filter((price) => price);

    minValue = [...validValues].sort((price1, price2) => price1 - price2)[0];
    maxValue = [...validValues].sort((price1, price2) => price2 - price1)[0];
    endValue = validValues[validValues.length - 1];
    isMarketOpen = data?.prices[data?.prices.length - 1]?.currentPrice;
  }

  const plotLineLabel = (isMarketOpen && 'Aktuell') || 'Vortag';

  const isIntraDay = timeRange === 'allIntraday';
  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        if (this.y === endValue && timeRange !== 'intraday') {
          return `<b style="font-size:14px; color:rgba(16, 123, 142, 1);font-weight: bold;">${
            (isMarketOpen && plotLineLabel) || 'Last'
          } </b><br><br>${formatDate(
            /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
            new Date(this.x),
            undefined,
          )}<br>${formatDate(
            /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
            new Date(this.x),
            DATE_FORMAT_TIME,
          )} Uhr: <b style="font-weight: bold;">${formatPrice(
            this.y,
            data?.scGrouped,
          )}</b>`;
        }
        return `${formatDate(
          /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
          new Date(this.x),
          timeRange === 'intraday' ? DATE_FORMAT_FULL : undefined,
        )}<br>${
          (timeRange !== 'intraday' && 'close:&nbsp;') || ''
        }<b style="font-weight: bold;">${formatPrice(
          this.y,
          data?.scGrouped,
        )}</b>`;
      },
    },
    yAxis: [
      {
        className: styles.AxisLabels,
        title: {
          text: '',
        },
        showLastLabel: true,
        /* @ts-ignore TODO: TS2322 ->  Type '(this */
        tickPositioner: function () {
          let ticks = this.tickPositions;
          if (endValue > 0) {
            let delta = 0;
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            ticks.push(endValue);
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            ticks.sort(function (a, b) {
              return a - b;
            });
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            const tickDistance = (ticks[1] - ticks[0]) / 3;
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            const index = ticks.indexOf(endValue);
            if (index > 0) {
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              delta = ticks[index] - ticks[index - 1];
              if (delta < tickDistance) {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                ticks = ticks.filter((_, i) => i !== index - 1);
              }
            }
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            if (index < ticks.length - 1) {
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              delta = ticks[index + 1] - ticks[index];
              if (delta < tickDistance) {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                ticks = ticks.filter((_, i) => i !== index + 1);
              }
            }
          }
          return ticks;
        },
        labels: {
          style: {
            color: '',
            fontSize: '14px',
          },
          distance: '15',
          formatter: (props) => {
            if (props.tick.pos === endValue) {
              return (
                '<span style="stroke: rgba(16, 123, 142, 1);stroke-width: 1px;">' +
                formatPrice(props.value, data?.scGrouped) +
                '</span>'
              );
            }

            return formatPrice(props.value, data?.scGrouped);
          },
        },
        plotLines: [
          plotLine(
            maxValue,
            `Hoch: ${formatPrice(maxValue, data?.scGrouped)}`,
            'rgba(0, 128, 0, 0.3)',
            'above',
          ),
          plotLine(
            minValue,
            `Tief: ${formatPrice(minValue, data?.scGrouped)}`,
            'rgba(255, 0, 0, 0.3)',
            'below',
          ),
        ],
      },
      {
        //This creates a white line on the y axis that overwrites
        // the border on the right side of the plot to follow the design
        lineWidth: 3,
        lineColor: '#fff',
        offset: -1,
        opposite: true,
        title: {
          text: '',
        },
      },
    ],
    xAxis: [
      {
        type: 'datetime',
        offset: 10,
        ordinal: timeRange === 'intraday' ? false : true, // gets rid of gaps in the chart (e.g. weekends)
        className: styles.AxisLabels,
        labels: {
          rotation: 0,
          style: {
            textOverflow: 'none',
            color: '',
            fontSize: '14px',
          },
          formatter: function () {
            const format = dateFormatOptionByTimeRange(timeRange);

            return Highcharts.dateFormat(format, Number(this.value));
          },
        },
      },
      {
        //This creates a white line on the x axis that overwrites
        // the border on top of the plot to follow the design
        lineWidth: 3,
        lineColor: '#fff',
        offset: -1,
        opposite: true,
        title: {
          text: '',
        },
      },
    ],
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    time: {
      useUTC: false,
      timezone: 'Europe/Zurich',
      timezoneOffset: new Date().getTimezoneOffset(), // Timezone offset in minutes (will update correctly with daylight saving time)
    },
    chart: {
      zooming: {
        mouseWheel: false,
      },
      // if needed add this for the backgroundWattermark
      // className: lineChartStyles.Wrapper,
      className: classNames({
        [styles.LinkedChart]: fullquoteUrl && !isFullquotePage,
      }),
      type: 'line',
      height: chartHeight,
      animation: true,
      plotBorderWidth: 0,
      plotBorderColor: '#000',
      backgroundColor: 'rgba(0,0,0,0)',
      events: {
        redraw: function () {
          const points = this.series[0].points;
          const lastPoint = points[points.length - 1];
          if (lastPoint) {
            lastPoint.update(
              {
                marker: {
                  radius: 4,
                  lineWidth: 0,
                  animation: false,
                  symbol: 'diamond',
                  fillColor:
                    (timeRange !== 'intraday' && variables.secondaryA) ||
                    variables.primaryA,
                  lineColor:
                    (timeRange !== 'intraday' && variables.secondaryA) ||
                    variables.primaryA,
                  color:
                    (timeRange !== 'intraday' && variables.secondaryA) ||
                    variables.primaryA,
                },
              },
              false,
            );
          }
          const ticks = this?.yAxis[0].ticks;
          Object.keys(ticks).forEach((key) => {
            if (ticks[key].pos === endValue) {
              const tick = ticks[key];

              tick.axis.addPlotLine(
                plotLine(
                  tick.pos,
                  (timeRange !== 'intraday' &&
                    `<b style="color: ${variables.secondaryA};">${plotLineLabel}</b>`) ||
                    '',
                  variables.secondaryA,
                  'above',
                  'ShortDash',
                  3,
                  -1,
                  'left',
                  'left',
                ),
              );
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              tick.label = tick.label.css({
                color: variables.secondaryA,
                zIndex: -1,
              });
            }
          });
        },
        click: function () {
          if (fullquoteUrl && !isFullquotePage) {
            const url = fullquoteUrl.startsWith('/')
              ? fullquoteUrl
              : `/${fullquoteUrl}`;
            if (chartRef.current) {
              pushToLinkStack(chartRef.current);
            }

            return navigate(url);
          }
        },
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        /* @ts-ignore TODO: TS2322 ->  Type 'boolean | ""' is not assignable to type 'boolean | undefined'. */
        enableMouseTracking: fullquoteUrl && isFullquotePage,
        inactive: {
          opacity: 1,
        },
        events: {
          legendItemClick: function () {
            if (isTouchDevice && fullquoteUrl && !isFullquotePage) {
              const url = fullquoteUrl.startsWith('/')
                ? fullquoteUrl
                : `/${fullquoteUrl}`;

              return navigate(url);
            }
            return !isTouchDevice;
          },
        },
        borderWidth: 1,
        color: variables.primaryA,
        marker: {
          enabled: false,
          lineWidth: 1,
          radius: 2,
          fillColor: variables.primaryA,
          color: variables.primaryA,
          lineColor: variables.primaryA,
        },
      },
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },

    series: [
      {
        type: 'line',
        ...{ data: parseChartData(data), showInLegend: false },
        states: {
          hover: {
            lineWidth: 1,
          },
        },
      },
    ],
  };

  if (isIntraDay) {
    let colorM = '';
    /* @ts-ignore TODO: TS7034 ->  Variable 'volumes' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    const volumes = [];
    let hasVolume = false;
    data &&
      Array.isArray(data.prices) &&
      data.prices.length > 0 &&
      /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'i' implicitly has an 'any' type. */
      data.prices.forEach(function (point, i) {
        volumes.push([
          new Date(point.date).getTime(), // the date
          point.open, // open
          point.high, // high
          point.low, // low
          point.close, // close
        ]);
        if (typeof point.volume !== 'undefined') {
          if (!hasVolume) {
            hasVolume = true;
          }

          if (i === 0) {
            colorM = '#CCCCCC';
            if (point.close >= point.open) {
              colorM = '#228b22';
            } else {
              colorM = '#EA4335';
            }
            volumes.push([
              new Date(point.date).getTime(), // the date
              point.volume, // the volume
              {
                m: true,
                close: point.close,
                open: point.open,
                fillColor: colorM,
                color: colorM,
              },
            ]);
          } else {
            if (data.prices[i].close >= data.prices[i - 1].close) {
              colorM = '#228b22';
            } else {
              colorM = '#EA4335';
            }

            volumes.push([
              new Date(point.date).getTime(), // the date
              point.volume, // the volume
              {
                m: data.prices[i].close >= data.prices[i - 1].close,
                close: point.close,
                open: point.open,
                fillColor: colorM,
                color: colorM,
              },
            ]);
          }
        }
      });
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'YAxisOptions | YAxisOp */
    options.yAxis[0].tickInterval = 100;
    options.rangeSelector = {
      allButtonsEnabled: true,
      enabled: true,
      selected: 0,
      inputEnabled: false,
      buttons: [
        {
          type: 'millisecond',
          count: 100,
          text: 'Tick',
          dataGrouping: {
            forced: true,
            units: [['minute', [1]]],
          },
        },
        {
          type: 'minute',
          count: 5,
          text: '5min',
          dataGrouping: {
            forced: true,
            units: [['minute', [1]]],
          },
        },
        {
          type: 'minute',
          count: 15,
          text: '15min',
          dataGrouping: {
            forced: true,
            units: [['minute', [1]]],
          },
        },
        {
          type: 'hour',
          count: 1,
          text: '1h',
          dataGrouping: {
            forced: true,
            units: [['minute', [5]]],
          },
        },
      ],
    };
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    options.series.push({
      type: 'column',
      id: 'test-volume',
      /* @ts-ignore TODO: TS7005 ->  Variable 'volumes' implicitly has an 'any[]' type. */
      data: volumes,
      turboThreshold: Number.MAX_VALUE,
      yAxis: 1,
      getExtremesFromAll: true,
      dataGrouping: {
        enabled: true,
        forced: true,
        // @ts-ignore
        units: [['second', [Array.from(Array(59).keys())]]],
        approximation: 'sum',
      },
    });
  }

  return options;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
export const parseChartData = (data) => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'parsedData' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const parsedData = [];
  Array.isArray(data?.prices) &&
    /* @ts-ignore TODO: TS7031 ->  Binding element 'date' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    data.prices.map(({ date, close }) => {
      const d = new Date(date);
      parsedData.push([d.getTime(), close]);
    });
  /* @ts-ignore TODO: TS7005 ->  Variable 'parsedData' implicitly has an 'any[]' type. */
  return parsedData as any;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
const getHeightByOrign = (origin) => {
  switch (origin) {
    case 'cash-article-aside':
      return '100%';
    case 'blick':
      return '250px';
    default:
      return '400px';
  }
};

const LineChart = ({
  data,
  timeRange,
  origin = '',
  isInterActiveButtonVisible,
  fullquoteUrl,
  loading,
}: LineChartProps) => {
  const { pushToLinkStack } = useSrollToLinkElement();
  const pushToLinkStackRef = useRef(pushToLinkStack);
  const [chartData, setChartData] = useState(data);
  const chartDataRef = useRef(chartData);
  chartDataRef.current = chartData;
  const navigate = useStableNavigate();
  const interval = useRef(null);
  const chartHeightByOrigin = getHeightByOrign(origin);
  const chartRef = useRef(null);
  const isFullquotePage =
    fullquoteUrl === global.location.pathname ||
    fullquoteUrl?.replace(/\/[^/]+\/[^/]+$/, '') === global.location.pathname;

  const [options, setOptions] = useState(
    getOptions(
      chartData,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'TimeRange | undefined' is not assignable to parameter of type 'TimeRange'. */
      timeRange,
      chartHeightByOrigin,
      fullquoteUrl,
      navigate,
      pushToLinkStackRef.current,
      chartRef,
      isFullquotePage,
    ),
  );

  useEffect(() => {
    setOptions(
      getOptions(
        data,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'TimeRange | undefined' is not assignable to parameter of type 'TimeRange'. */
        timeRange,
        chartHeightByOrigin,
        fullquoteUrl,
        navigate,
        pushToLinkStackRef.current,
        chartRef,
        isFullquotePage,
      ),
    );
  }, [
    data,
    timeRange,
    chartHeightByOrigin,
    fullquoteUrl,
    navigate,
    isFullquotePage,
  ]);

  useEffect(() => {
    const autoUpdate = async (prices: Price[]) => {
      const filterdPrices = prices.filter((price) => {
        return price.close !== null;
      });
      const timestamp = new Date(
        /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
        filterdPrices[filterdPrices.length - 1].date,
      ).getTime();

      try {
        const autoupdateData = await fetchData(GET_CHART_AUTOUPDATE, {
          id: data?.listingKey,
          from: `${timestamp}`,
        });
        const newData =
          autoupdateData?.data?.integration?.solid?.chart?.autoupdate;
        /* @ts-ignore TODO: TS7006 ->  Parameter 'price' implicitly has an 'any' type. */
        newData.map((price) => {
          filterdPrices.push({
            high: null,
            low: null,
            open: null,
            close: price.close,
            date: new Date(price.timestamp),
            volume: price.volume,
          });
        });

        const newPrices = IntraDayFillUp({ ...data, prices: filterdPrices });
        setOptions(
          getOptions(
            newPrices,
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'TimeRange | undefined' is not assignable to parameter of type 'TimeRange'. */
            timeRange,
            chartHeightByOrigin,
            fullquoteUrl,
            navigate,
            pushToLinkStackRef.current,
            chartRef,
            isFullquotePage,
          ),
        );
        setChartData(newPrices);
      } catch (error) {
        log('chart autoupdate', ['error fetching data'], 'red');
      }
    };

    if (timeRange === 'intraday' && data) {
      /* @ts-ignore TODO: TS2322 ->  Type 'Timer' is not assignable to type 'null'. */
      interval.current = setInterval(() => {
        if (chartDataRef.current?.prices) {
          autoUpdate(chartDataRef.current.prices);
        }
      }, AUTOUPDATE_INTERVAL);
    }
    return () => {
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      clearInterval(interval.current);
    };
  }, [
    data,
    timeRange,
    chartHeightByOrigin,
    fullquoteUrl,
    navigate,
    isFullquotePage,
  ]);

  return (
    <div className={classNames(styles.Wrapper)} ref={chartRef}>
      {isInterActiveButtonVisible && (
        <>
          {(fullquoteUrl && isFullquotePage && (
            <Link
              path={`${fullquoteUrl}/chart`}
              className={styles.ChartAnalyse}
            >
              <ButtonWithLoading
                size="small"
                variant="secondary"
                iconTypeLeft="IconChartArrowUp"
              >
                Chart-Analyse
              </ButtonWithLoading>
            </Link>
          )) || <div className={styles.LinkPlaceHolder} />}
        </>
      )}
      {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"data"' can't be used to index type 'SeriesOptionsType */}
      {!loading && options?.series?.[0]?.['data']?.length === 0 && (
        <div className={styles.NoData}>Keine Daten für diesen Zeitraum</div>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
