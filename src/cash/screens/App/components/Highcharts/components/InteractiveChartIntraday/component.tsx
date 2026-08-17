/* istanbul ignore file */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import indicatorsAll from 'highcharts/indicators/indicators-all';
import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
import fullScreen from 'highcharts/modules/full-screen';
import priceIndicator from 'highcharts/modules/price-indicator';
import stockTools from 'highcharts/modules/stock-tools';
import {
  DATE_FORMAT_FULL,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import {
  DEVICE_TYPE_ANDROID,
  generateRandomNumber,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import { formatPrice } from '../../helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { stockChartOptions } from '../../defaultConfig';
import styles from './styles.legacy.css';
import { InteractiveChartIntradayProps } from './typings';
if (typeof Highcharts === 'object') {
  indicatorsAll(Highcharts);
  annotationsAdvanced(Highcharts);
  priceIndicator(Highcharts);
  fullScreen(Highcharts);
  stockTools(Highcharts);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'x' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'y' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'w' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'h' implicitly has an 'any' type. */
  Highcharts.SVGRenderer.prototype.symbols.line = (x, y, w, h) => {
    return ['M', x, y + h / 2, 'L', x + w, y + h / 2, 'z'];
  };
  Highcharts.setOptions(stockChartOptions);
}

const FREQUENCIES = {
  0: 'Tick',
  1: '1min',
  5: '5min',
  15: '15min',
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

const InteractiveChartIntraday = ({
  data,
  timeRange,
}: InteractiveChartIntradayProps) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const [options, setOptions] = useState({});
  const [frequency, setFrequency] = useState<number>(0); // 0 = tick, 1, 5, 15 min
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const randomKey = generateRandomNumber(1)[0];

  useEffect(() => {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'groupedYAxisData' implicitly has an 'any' type. */
    const colorizeVolume = (groupedYAxisData) => {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
      return function (point) {
        const groupIdx = point.index;
        let colorM;

        if (groupIdx === 0) {
          colorM = '#a3a3a3'; // neutral
        } else {
          if (groupedYAxisData[groupIdx] >= groupedYAxisData[groupIdx - 1]) {
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
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
    const getOptions = (data, isHybridApp: boolean): Highcharts.Options => {
      /* @ts-ignore TODO: TS7034 ->  Variable 'volumes' implicitly has type 'any[]' in some locations where its type cannot be determined. */
      const volumes = [];
      let hasVolume = true;
      data &&
        Array.isArray(data.prices) &&
        data.prices.length > 0 &&
        /* @ts-ignore TODO: TS7006 ->  Parameter 'point' implicitly has an 'any' type. */
        data.prices.forEach(function (point) {
          volumes.push([
            new Date(point.date).getTime(), // the date
            point.volume, // the volume
          ]);
        });

      data &&
        Array.isArray(data.prices) &&
        data.prices.length > 0 &&
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        data.prices.every((item) => {
          if (item.volume === 0 || item.volume === undefined) {
            hasVolume = false;
          }
        });

      const dataGroupingOptions =
        frequency === 0 ? undefined : [['minute', [frequency]]];

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
              // @ts-ignore
              units: dataGroupingOptions,
            },
            compare: undefined,
          },
          line: {
            compare: undefined,
          },
        },
        rangeSelector: {
          inputEnabled: false,
          allButtonsEnabled: true,
          selected: 0,
          buttons: [],
        },
        stockTools: {
          gui: {
            enabled: false, // disable the built-in toolbar
          },
        },
        chart: {
          className: styles.Wrapper,
          height: 600,
          animation: true,
          type: 'line',
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
              const volSeries = this.series.find(function (serie) {
                return serie?.userOptions?.id?.includes('-volume');
              });

              if (!volSeries) {
                return null;
              }

              // @ts-ignore
              volSeries.pointAttribs = colorizeVolume(volSeries.processedYData);
              // @ts-ignore
            },
            load: function () {
              const volSeries = this.series.find(function (s) {
                return s?.userOptions?.id?.includes('-volume');
              });
              if (!volSeries) {
                return null;
              }
              // @ts-ignore
              volSeries.pointAttribs = colorizeVolume(volSeries.processedYData);
              this.update({});
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
            minorTicks: true,
            minRange: frequency === 0 ? 1 : frequency * 60000 * 5, // frequency in min * 5
          },
        ],
        yAxis: [
          {
            labels: {
              align: 'left',
            },
            top: '0%',
            height: hasVolume ? '80%' : '100%',
            lineWidth: 0,
            resize: {
              enabled: true,
            },
          },
        ],
        tooltip: {
          formatter: function () {
            return `${formatDate(
              /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
              new Date(this.x),
              DATE_FORMAT_FULL,
            )}<br><b>Preis: ${formatPrice(this.y, data?.scGrouped)}</b>`;
          },
        },
        series: [
          {
            type: 'line',
            name: 'Preis',
            color: '#b10f2a',
            dataGrouping: {
              enabled: true,
            },
            ...{ data: parseChartData(data), showInLegend: false },
            dataLabels: {
              style: {
                textOutline: '0',
              },
              enabled: true,
              formatter: function () {
                const points = this.series.points;
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                const max = [...points].sort((a, b) => b.y - a.y)[0];
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                const min = [...points].sort((a, b) => a.y - b.y)[0];
                const end = points[points.length - 1];
                if (this.x === max.x) {
                  return `<span style="color: #36853F; font-size: 18px">${formatPrice(
                    max.y,
                    data?.scGrouped,
                  )}</span>`;
                } else if (this.x === min.x) {
                  //This moves the lable under the chart
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  this.point.plotY = this.point.plotY + 40;
                  return `<span style="color: #B11029; font-size: 18px">${formatPrice(
                    min.y,
                    data?.scGrouped,
                  )}</span>`;
                } else if (this.x === end.x) {
                  return `<span style="color: #292E32; font-size: 18px">${formatPrice(
                    end.y,
                    data?.scGrouped,
                  )}</span>`;
                }
                return null;
              },
            },
          },
        ],
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
                  ],
            },
          },
          filename: 'interactive_intraday_chart_by_cash',
          chartOptions: {
            chart: {
              backgroundColor: '#fff',
              // changed image -> 'https://www.cash.ch/sh/512/sites/default/files/media/field_image/2022-09/cash_interactive_chart_wattermark.png' to base64 because of donwloading cors issues by https://export.highcharts.com
              plotBackgroundImage:
                'data:image/png;base64,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',
            },
          },
        },
      };

      if (hasVolume) {
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
          name: ' Volume',
          id: 'highcharts-stock-chart-volume',
          /* @ts-ignore TODO: TS7005 ->  Variable 'volumes' implicitly has an 'any[]' type. */
          data: volumes,
          getExtremesFromAll: true,
          dataGrouping: {
            enabled: true,
            forced: true,
            approximation: 'sum',
          },
          turboThreshold: Number.MAX_VALUE,
          yAxis: 1,
          colors: ['#EA4335', '#228b22'],
        });
      }
      return options;
    };

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
    setOptions(getOptions(data, isHybridApp));
  }, [data, timeRange, frequency, isHybridApp]);

  return (
    <>
      <div className={styles.FrequencyWrapper}>
        <span>Frequenz: </span>
        {Object.keys(FREQUENCIES)
          .map(Number)
          .map((freq) => (
            <button
              className={classNames(styles.FrequencyButton, {
                [styles.Active]: frequency === freq,
              })}
              key={`freq-${freq}`}
              onClick={() => setFrequency(freq)}
            >
              {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ 0 */}
              {FREQUENCIES[freq]}
            </button>
          ))}
      </div>
      <div
        className={classNames('highchart-wrapper', styles.HighchartsWrapper)}
      >
        {data?.companyName && (!data?.prices || data?.prices?.length === 0) ? (
          <div className={styles.NoData}>Keine Daten vorhanden</div>
        ) : null}
        <HighchartsReact
          key={randomKey}
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      </div>
    </>
  );
};

export default InteractiveChartIntraday;
