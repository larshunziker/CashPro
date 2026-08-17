import React, { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import {
  DATE_FORMAT_DEFAULT,
  formatDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { formatPrice } from '../../../../../Highcharts/helpers';
import styles from './styles.legacy.css';

const INITIAL_STYLES = {
  point: { left: '50%' },
  value: { left: '50%' },
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'barWidth' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'position' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'halfWidth' implicitly has an 'any' type. */
const calculateStyles = ({ barWidth, position, halfWidth }) => {
  if (!barWidth) {
    return INITIAL_STYLES;
  }

  const correction = position - (position >= barWidth / 2 ? 11 : 9);
  const point: React.CSSProperties = { left: `${correction}px` };
  let value: React.CSSProperties = {
    left: `${position - halfWidth}px`,
  };

  if (position - halfWidth < 0) {
    value = {};
  }

  if (position + halfWidth > barWidth) {
    value = { right: 0 };
  }

  return { value, point };
};

const ChunkProgressBar = ({
  min,
  max,
  current,
  scGrouped,
  startDate,
  endDate,
  variant,
  format = DATE_FORMAT_DEFAULT,
}: {
  min: number;
  max: number;
  current: number;
  scGrouped?: string;
  startDate: string;
  endDate: string;
  variant: 'blue' | 'grey';
  format?: string;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [calculatedStyles, setCalculatedStyles] =
    useState<Record<'point' | 'value', React.CSSProperties>>(INITIAL_STYLES);

  const percent = ((current - min) / (max - min)) * 100;
  const isCurrentWithinRange = current >= min && current <= max;

  const calculatePositions = useCallback(() => {
    const barWidth = barRef?.current?.getBoundingClientRect()?.width;

    const currentValueHalfWidth =
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      valueRef?.current?.getBoundingClientRect()?.width / 2 || 0;

    const currentPercent =
      percent > 0 ? Math.min(percent, 100) : Math.max(percent, 0);

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const currentPosition = (barWidth * currentPercent) / 100;

    setCalculatedStyles(
      calculateStyles({
        barWidth,
        position: currentPosition,
        halfWidth: currentValueHalfWidth,
      }),
    );
  }, [barRef, percent]);

  useEffect(() => {
    calculatePositions();
  }, [calculatePositions]);

  useEffect(() => {
    window.addEventListener('resize', calculatePositions);
    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [calculatePositions]);

  return (
    <>
      <div className={styles.BarWrapper}>
        <div
          ref={barRef}
          className={classnames(styles.Bar, {
            [styles.Blue]: variant === 'blue',
            [styles.Grey]: variant === 'grey',
          })}
        >
          {isCurrentWithinRange && (
            <>
              <div
                style={calculatedStyles.point}
                className={classnames(styles.Point, {
                  [styles.Blue]: variant === 'blue',
                  [styles.Grey]: variant === 'grey',
                })}
              ></div>
              <div
                ref={valueRef}
                className={styles.Value}
                style={calculatedStyles.value}
              >
                {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'null | undefined'. */}
                {formatPrice(current, scGrouped)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.LabelWrapper}>
        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'null | undefined'. */}
        <p className={styles.Value}>{formatPrice(min, scGrouped)}</p>
        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'null | undefined'. */}
        <p className={styles.Value}>{formatPrice(max, scGrouped)}</p>
      </div>
      <div className={styles.LabelWrapper}>
        <p className={styles.DateLabel}>{formatDate(startDate, format)}</p>
        <p className={styles.DateLabel}>{formatDate(endDate, format)}</p>
      </div>
    </>
  );
};

export default ChunkProgressBar;
