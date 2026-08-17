/* istanbul ignore file */

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import indicatorsAll from 'highcharts/indicators/indicators-all';
import annotations from 'highcharts/modules/annotations';
import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
import exporting from 'highcharts/modules/exporting';
import exportingData from 'highcharts/modules/export-data';
import fullScreen from 'highcharts/modules/full-screen';
import priceIndicator from 'highcharts/modules/price-indicator';
import stockTools from 'highcharts/modules/stock-tools';
import {
  DEVICE_TYPE_ANDROID,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import { formatPrice } from '../../helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
// import { generateRandomNumber } from '../../../../../../../shared/helpers/utils';
// eslint-disable-next-line
import './highcharts.css';
import { stockChartOptions } from '../../defaultConfig';
import styles from './styles.legacy.css';
import { InteractiveChartProps } from './typings';

if (typeof Highcharts === 'object') {
  indicatorsAll(Highcharts);
  annotationsAdvanced(Highcharts);
  priceIndicator(Highcharts);
  fullScreen(Highcharts);
  stockTools(Highcharts);
  annotations(Highcharts);
  exporting(Highcharts);
  exportingData(Highcharts);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'x' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'y' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'w' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'h' implicitly has an 'any' type. */
  Highcharts.SVGRenderer.prototype.symbols.line = (x, y, w, h) => {
    return ['M', x, y + h / 2, 'L', x + w, y + h / 2, 'z'];
  };
  Highcharts.setOptions(stockChartOptions);
}

// TODO: check this what was the purpose of this function
// const randomKey = generateRandomNumber(1)[0];
const getOptions = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
  data,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'colorSet' implicitly has an 'any' type. */
  colorSet,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'setColorSet' implicitly has an 'any' type. */
  setColorSet,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'forceUpdate' implicitly has an 'any' type. */
  forceUpdate,
  isHybridApp: boolean,
): Highcharts.Options => {
  // @ts-ignore
  window.currenColorSet = colorSet;
  const firstData = JSON.parse(
    JSON.stringify(
      data?.[0]?.data?.integration?.solid?.chart?.intraday ||
        data?.[0]?.data?.integration?.solid?.chart?.timeserie ||
        null,
    ),
  );

  // all data object but first one
  const restData = data?.slice(1);
  /* @ts-ignore TODO: TS7034 ->  Variable 'ohlc' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const ohlc = [];
  let colorM = '';
  /* @ts-ignore TODO: TS7034 ->  Variable 'volumes' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const volumes = [];
  /* @ts-ignore TODO: TS7034 ->  Variable 'series' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const series = [];
  let hasVolume = false;
  firstData &&
    Array.isArray(firstData?.prices) &&
    firstData.prices.length > 0 &&
    /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'i' implicitly has an 'any' type. */
    firstData.prices.forEach(function (point, i) {
      ohlc.push([
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
          if (firstData.prices[i].close >= firstData.prices[i - 1].close) {
            colorM = '#228b22';
          } else {
            colorM = '#EA4335';
          }
          if (point.volume) {
            volumes.push([
              new Date(point.date).getTime(), // the date
              point.volume, // the volume
              {
                m: firstData.prices[i].close >= firstData.prices[i - 1].close,
                close: point.close,
                open: point.open,
                fillColor: colorM,
                color: colorM,
              },
            ]);
          }
        }
      }
    });

  const getToolsToggleButton = (
    chart: Highcharts.Chart,
  ): HTMLElement | null => {
    const btn = chart.container.getElementsByClassName(
      'highcharts-toggle-toolbar',
    );
    if (btn.length > 0) {
      return btn[0] as HTMLElement;
    }
    return null;
  };

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        dataGrouping: {
          units: [['day', [1]]],
        },
        compare: undefined,
      },
      line: {
        compare: undefined,
      },
    },
    rangeSelector: {
      allButtonsEnabled: true,
      inputEnabled: true,
      inputPosition: {
        y: 30,
        align: 'left',
      },
      buttonPosition: {
        x: isHybridApp ? 45 : 0,
      },
      buttonTheme: {
        visibility: 'hidden',
      },
      selected: 3,
      inputDateFormat: '%d.%m.%Y',
      inputEditDateFormat: '%d.%m.%Y',
      buttons: [
        {
          type: 'week',
          count: 1,
          text: '1w',
          title: '1w',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
          title: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
          title: '3m',
        },
        {
          type: 'month',
          count: 6,
          text: '6m',
          title: '6m',
        },
        {
          type: 'ytd',
          text: 'YTD',
          title: 'YTD',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
          title: '1y',
        },
        {
          type: 'all',
          text: 'All',
          title: 'All',
        },
      ],
    },
    stockTools: {
      gui: {
        enabled: true, // disable the built-in toolbar
        definitions: {
          typeChange: {
            items: ['typeLine', 'typeOHLC', 'typeCandlestick'],
          },
        },
        buttons: [
          'typeChange',
          'indicators',
          'separator',
          'simpleShapes',
          'lines',
          'crookedLines',
          'measure',
          'advanced',
          'toggleAnnotations',
          'separator',
          'verticalLabels',
          'flags',
          'separator',
          'zoomChange',
          'fullScreen',
          'separator',
          'currentPriceIndicator',
        ].concat(isHybridApp ? [] : ['saveChart']),
      },
    },
    chart: {
      className: styles.Wrapper,
      height: 600,
      animation: true,
      type: 'ohlc',
      plotBorderWidth: 1,
      backgroundColor: 'rgba(0,0,0,0)',
      styledMode: false,
      zooming: { type: 'x' },
      style: {
        fontFamily: '"Source Sans Pro",Helvetica,Arial,sans-serif',
        fontSize: '14px',
      },
      events: {
        redraw: function () {
          if (isHybridApp) {
            // set hybrid class to increase size on hybrid app
            const btn = getToolsToggleButton(this);
            btn?.classList?.add('hybrid-toolbar');
          }
          const volSeries = this.series.find(function (serie) {
            return serie?.userOptions?.id?.includes('-volume');
          });

          if (!volSeries) {
            return null;
          }

          const points = this.series[0];

          // @ts-ignore
          volSeries.pointAttribs = (function () {
            return function (point: any) {
              let colorM;

              if (point.series.hasGroupedData) {
                let prev;
                let groupIdx = point.index;
                const datagroup = point.dataGroup;
                groupIdx = point.series.groupMap.indexOf(datagroup);
                if (groupIdx && points.points[groupIdx]) {
                  prev = groupIdx - 1;
                  if (
                    groupIdx < points.points.length &&
                    prev >= 0 &&
                    points.points[groupIdx] &&
                    points.points[prev] &&
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    points.points[groupIdx].y >= points.points[prev].y
                  ) {
                    colorM = '#228b22';
                  } else {
                    colorM = '#EA4335';
                  }
                } else {
                  const sig = point.index + 1;
                  if (
                    points.points[point.index] &&
                    points.points[sig] &&
                    sig < points.points.length &&
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    points.points[sig].y >= points.points[point.index].y
                  ) {
                    colorM = '#228b22';
                  } else {
                    colorM = '#EA4335';
                  }
                }
              } else {
                /* @ts-ignore TODO: TS7006 ->  Parameter 's' implicitly has an 'any' type. */
                const prices = point.series.chart.series.find(function (s) {
                  return s.userOptions.id === 'OHLC';
                });
                if (
                  prices.data[point.index]?.close >=
                  prices.data[point.index - 1]?.close
                ) {
                  colorM = '#228b22'; // green
                } else {
                  colorM = '#EA4335'; // red
                }
              }
              return {
                ...point?.r,
                fill: colorM,
              };
            };
            // @ts-ignore
          })(volSeries.pointAttribs);
        },
        load: function () {
          if (isHybridApp) {
            // collaps toolbar on the left side if hybridapp
            const btn = getToolsToggleButton(this);
            btn?.click();
          }
          const volSeries = this.series.find(function (s) {
            return s?.userOptions?.id?.includes('-volume');
          });
          if (!volSeries) {
            return null;
          }

          const points = this.series[0];
          // @ts-ignore
          volSeries.pointAttribs = (function () {
            /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
            return function (point) {
              let groupIdx = point.index;
              let prev, colorM;
              if (point.series.hasGroupedData) {
                const datagroup = point.dataGroup;
                groupIdx = point.series.groupMap.indexOf(datagroup);

                if (groupIdx && points.points[groupIdx]) {
                  prev = groupIdx - 1;
                  if (
                    groupIdx < points.points.length &&
                    prev >= 0 &&
                    points.points[groupIdx] &&
                    points.points[prev] &&
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    points.points[groupIdx].y >= points.points[prev].y
                  ) {
                    colorM = '#228b22';
                  } else {
                    colorM = '#EA4335';
                  }
                } else {
                  const sig = point.index + 1;
                  if (
                    points.points[point.index] &&
                    points.points[sig] &&
                    sig < points.points.length &&
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    points.points[sig].y >= points.points[point.index].y
                  ) {
                    colorM = '#228b22';
                  } else {
                    colorM = '#EA4335';
                  }
                }
              } else {
                /* @ts-ignore TODO: TS7006 ->  Parameter 's' implicitly has an 'any' type. */
                const prices = point.series.chart.series.find(function (s) {
                  return s.userOptions.id === 'OHLC';
                });
                if (
                  prices.data[point.index]?.close >=
                  prices.data[point.index - 1]?.close
                ) {
                  colorM = '#228b22'; // green
                } else {
                  colorM = '#EA4335'; // red
                }
              }
              return {
                ...point?.r,
                fill: colorM,
              };
            };
            // @ts-ignore
          })(volSeries.pointAttribs);

          // this is used to update line colors by selecting a new color in the charts comparison table
          // @ts-ignore
          window.chartUpdateColors = (colorSet) => {
            setColorSet(colorSet);
            forceUpdate();
          };
        },
      },
    },
    navigator: {
      enabled: true,
    },
    time: {
      timezone: 'Europe/Zurich',
      timezoneOffset: new Date().getTimezoneOffset(), // Timezone offset in minutes (will update correctly with daylight saving time)
    },
    credits: {
      enabled: false,
    },
    xAxis: [
      {
        gridLineColor: '#ccc',
        gridLineWidth: 1,
        gridLineDashStyle: 'ShortDash',
        ordinal: true,
        endOnTick: true,
        startOnTick: true,
        maxPadding: 0,
        minPadding: 0,
      },
    ],
    yAxis: [
      {
        labels: {
          align: 'left',
          formatter: function () {
            if (restData && restData.length > 0) {
              return `${this.value}%`;
            }
            return `${formatPrice(this.value, firstData?.scGrouped)}`;
          },
        },
        top: '0%',
        height: hasVolume ? '80%' : '100%',
        lineWidth: 0,
        resize: {
          enabled: true,
        },
      },
    ],
    /* @ts-ignore TODO: TS7005 ->  Variable 'series' implicitly has an 'any[]' type. */
    series: series,
    exporting: {
      enabled: !(
        getMobileOperatingSystem() === DEVICE_TYPE_ANDROID && isHybridApp
      ),
      buttons: {
        contextButton: {
          menuItems: isHybridApp
            ? ['viewFullscreen']
            : [
                'viewFullscreen',
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadPDF',
                'downloadSVG',
                'separator',
                'downloadCSV',
                'downloadXLS',
              ],
        },
      },
      filename: 'interactive_chart_by_cash',
      chartOptions: {
        legend: {
          enabled: true,
        },
        chart: {
          backgroundColor: '#fff',
          // changed image -> 'https://www.cash.ch/sh/512/sites/default/files/media/field_image/2022-09/cash_interactive_chart_wattermark.png' to base64 because of donwloading cors issues by https://export.highcharts.com
          plotBackgroundImage:
            'data:image/png;base64,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',
        },
      },
    },
    navigation: {
      events: {
        /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
        selectButton: function (event) {
          if (
            event.target.selectedButton.className === 'highcharts-save-chart'
          ) {
            // @ts-ignore
            event.target.chart.exportChart();
          }
          if (
            event.target.selectedButton.className ===
            'highcharts-current-price-indicator'
          ) {
            // force redraw to update volume color on "currentPriceIndicator" click. setTimeout to wait for next frame
            setTimeout(() => event.target.chart.redraw(), 0);
          }
        },
      },
    },
  };

  series.push({
    type: 'line',
    name: data?.[0]?.name || 'OHLC',
    id: 'OHLC',
    colorIndex: colorSet?.[firstData?.listingKey],
    turboThreshold: Number.MAX_VALUE,
    /* @ts-ignore TODO: TS7005 ->  Variable 'ohlc' implicitly has an 'any[]' type. */
    data: ohlc,
    tooltip: {
      pointFormatter: function () {
        return `
          <div>
            <span style="color: ${this.color}">●</span>
            <b> ${this.series.name}</b>
            <br />
            Open: ${formatPrice(this.open, data?.[0]?.scGrouped)}
            <br />
            High: ${formatPrice(this.high, data?.[0]?.scGrouped)}
            <br />
            Low: ${formatPrice(this.low, data?.[0]?.scGrouped)}
            <br />
            Close: ${formatPrice(this.close, data?.[0]?.scGrouped)}
            <br />
          </div>`;
      },
    },
    useOhlcData: true,
  });
  if (restData && restData.length > 0) {
    /* @ts-ignore TODO: TS2339 ->  Property 'compare' does not exist on type '{ type */
    series[0].compare = 'percent';
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    const compareData = restData.map((item) => {
      if (item?.data?.integration?.solid?.chart?.timeserie) {
        return item?.data?.integration?.solid?.chart?.timeserie;
      } else if (item?.data?.integration?.solid?.chart?.intraday) {
        return item?.data?.integration?.solid?.chart?.intraday;
      }
      return null;
    });
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    compareData.forEach((item) => {
      series.push({
        type: 'line',
        name: item.name,
        id: item.listingKey,
        colorIndex: colorSet?.[item?.listingKey],
        compare: 'percent',
        plotOptions: {
          line: {
            compare: 'percent',
            showInNavigator: true,
          },
        },
        data:
          item?.prices &&
          /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
          item?.prices.map((point) => [
            new Date(point.date).getTime(), // the date
            point.close,
          ]),
      });
    });
  }

  if (volumes.length > 0) {
    // @ts-ignore
    options.yAxis.push({
      labels: {
        align: 'left',
      },
      top: '80%',
      height: '20%',
      offset: 0,
    });
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    options.series.push({
      type: 'column',
      name: `Volume${(data?.[0]?.name && ': ' + data?.[0]?.name) || ''}`,
      id: 'highcharts-stock-chart-volume',
      /* @ts-ignore TODO: TS7005 ->  Variable 'volumes' implicitly has an 'any[]' type. */
      data: volumes,
      turboThreshold: Number.MAX_VALUE,
      yAxis: 1,
      colors: ['#EA4335', '#228b22'],
    });
  }
  return options;
};

const InteractiveChart = ({
  data,
  timeRange,
  colorSet,
  setColorSet,
  forceUpdate,
}: InteractiveChartProps) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const forceUpdateRef = useRef(forceUpdate);
  const [options, setOptions] = useState(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
    getOptions(data, colorSet, setColorSet, forceUpdate, isHybridApp),
  );
  useEffect(() => {
    setOptions(
      getOptions(
        data,
        colorSet,
        setColorSet,
        forceUpdateRef.current,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
        isHybridApp,
      ),
    );
  }, [data, timeRange, colorSet, setColorSet, forceUpdateRef, isHybridApp]);

  return (
    <div className="highchart-wrapper">
      <HighchartsReact
        key={`hichchartInteractive-${Math.random()}`}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
};

export default InteractiveChart;
