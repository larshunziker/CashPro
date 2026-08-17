import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from '../../helpers';
import { defaultOptions } from './constants';
import styles from './styles.legacy.css';
import { ChartProps } from './typings';

const Chart = (props: ChartProps) => {
  const { data } = props;

  const options = useMemo(() => {
    if (!data) return defaultOptions;
    const {
      yearsArray,
      returnsSavingsAccount,
      returnsProduct,
      investmentsArray,
    } = data;

    const returnsProductWithInvestments = returnsProduct.map(
      (value, idx) => value + investmentsArray[idx],
    );

    const returnsSavingsAccountWithInvestments = returnsSavingsAccount.map(
      (value, idx) => value + investmentsArray[idx],
    );

    const newOptions = { ...defaultOptions };
    newOptions.xAxis[1].categories = yearsArray;
    newOptions.series[0].data = returnsSavingsAccountWithInvestments;
    newOptions.series[1].data = returnsProduct;
    newOptions.series[2].data = investmentsArray;
    newOptions.plotOptions.line.marker.enabled = investmentsArray?.length === 1;
    /* @ts-ignore TODO: TS7006 ->  Parameter 'this' implicitly has an 'any' type. */
    newOptions.tooltip.formatter = function (this) {
      return (
        `Jahr ${this.x}<br/><br/>` +
        `<b>Gesamteinzahlung:</b> CHF ${format(
          investmentsArray[this.x - 1],
        )}<br/>` +
        `<b>Gesamtbetrag Sparplan:</b> CHF ${format(
          returnsProductWithInvestments[this.x - 1],
        )}<br />` +
        `<b>Gesamtbetrag Sparkonto:</b> CHF ${format(
          returnsSavingsAccountWithInvestments[this.x - 1],
        )}`
      );
    };
    return newOptions;
  }, [data]);

  return (
    <div className={styles.ChartsWrapper}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        updateArgs={[true, true, { duration: 800 }]}
      />
    </div>
  );
};

export default Chart;
