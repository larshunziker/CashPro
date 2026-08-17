import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { formatPrice } from '../../../../../Highcharts/helpers';
import { defaultOptions } from './constants';
import styles from './styles.legacy.css';
import { ChartProps } from './typings';

const calcTickPosition = (high: number, low: number) => {
  // for values between 0 and 1, we use '0' as our lowest level.
  // for all others we take the lowest  minus 10% of the lowest value
  const calcLow = (low > 0 && low < 1 && 0) || Math.floor(low - low * 0.1);
  // on the highest value we add 10% plus
  const calcHigh = high + high * 0.1;
  const calcMiddle = calcLow + (calcHigh - calcLow) / 2;
  const calcMiddleLower = calcLow + (calcMiddle - calcLow) / 2;
  const calcMiddleUpper = calcHigh - (calcHigh - calcMiddle) / 2;

  const positions = [
    Number(calcLow.toFixed(2)),
    Number(calcMiddleLower.toFixed(2)),
    Number(calcMiddle.toFixed(2)),
    Number(calcMiddleUpper.toFixed(2)),
    Number(calcHigh.toFixed(2)),
  ];

  return positions;
};

type ChartOptions = Omit<typeof defaultOptions, 'yAxis' | 'xAxis'> & {
  xAxis: Array<{ categories?: string[]; title?: { text: string } }>;
  yAxis: (typeof defaultOptions)['yAxis'] & {
    max: number;
    min: number;
    tickPositions: number[];
  };
};

const getOptions = (years: string[], paid: number[], currency: string) => {
  const newOptions = {
    ...JSON.parse(JSON.stringify(defaultOptions)),
  } as ChartOptions;
  const highestPaid = Math.max(...paid);
  const lowestPaid = Math.min(...paid);
  const high = highestPaid;
  const low = lowestPaid;
  const ticks = calcTickPosition(high, low);

  newOptions.xAxis[1].categories = years;
  newOptions.yAxis.max = high;
  newOptions.yAxis.min = low;
  newOptions.yAxis.tickPositions = ticks;
  newOptions.series[0].data = paid;
  newOptions.tooltip.formatter = function (
    this: Highcharts.TooltipFormatterContextObject,
  ) {
    return `<span style="fontWeight: 900;">${formatPrice(
      this.y,
    )} ${currency} </span>`;
  };

  return newOptions;
};

const Chart = ({ data, currency }: ChartProps) => {
  if (!data) {
    return null;
  }

  const { yearsArray, paidPrice } = data;
  const options = getOptions([...yearsArray], [...paidPrice], currency);

  return (
    <div className={styles.ChartsWrapper}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
