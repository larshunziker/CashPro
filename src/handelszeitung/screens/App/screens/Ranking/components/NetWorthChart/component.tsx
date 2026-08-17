import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import classNames from 'classnames';
import { getOptions } from './helpers';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'x' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'y' implicitly has an 'any' type. */
const NetWorthChart = ({ x, y, addClass = null }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        /* @ts-ignore TODO: TS2339 ->  Property 'chart' does not exist on type 'never'. */
        if (chartRef.current?.chart) {
          /* @ts-ignore TODO: TS2339 ->  Property 'chart' does not exist on type 'never'. */
          chartRef.current.chart.reflow();
        }
      });

      resizeObserver.observe(containerRef.current);

      // Cleanup the observer on component unmount
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      className={classNames(styles.ChartWrapper, { [addClass]: addClass })}
    >
      <HighchartsReact
        ref={chartRef}
        containerProps={{ className: styles.Chart }}
        highcharts={Highcharts}
        options={getOptions(x, y)}
      />
    </div>
  );
};

export default NetWorthChart;
