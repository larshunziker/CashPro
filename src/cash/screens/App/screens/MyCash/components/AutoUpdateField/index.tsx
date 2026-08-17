import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { getTrendClass } from '../Table/components/helpers';
import styles from './styles.legacy.css';
import tableStyles from '../Table/components/tableStyles.legacy.css';
import { AutoUpdateFieldProps } from './types';

const AutoUpdateField = ({
  value,
  formatFn = (val) => String(val),
  useTrendClass = false,
}: AutoUpdateFieldProps) => {
  const prevValue = useRef<number | null>(null);

  useEffect(() => {
    if (value !== prevValue?.current) {
      const timerId = setTimeout(() => {
        prevValue.current = parseFloat(value.toString());
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [value]);

  const valParsed =
    (value?.toString().endsWith('Z') && value) ||
    parseFloat(value?.toString()) ||
    0;

  const valueFormatted = useMemo(
    () => formatFn(valParsed || value) || valParsed,
    [valParsed, value, formatFn],
  );

  const status =
    !valParsed ||
    valParsed === prevValue?.current ||
    valParsed === 0 ||
    typeof valParsed === 'string' ||
    prevValue?.current === null
      ? 'neutral'
      : valParsed > (prevValue?.current || 0)
        ? 'positive'
        : 'negative';

  return (
    <span
      key={`${value}-instrument-field`}
      className={classNames({
        [styles.AnimatePositive]: value && status === 'positive',
        [styles.AnimateNegative]: value && status === 'negative',
        [styles.AnimateNeutral]: value && status === 'neutral',
        [getTrendClass(
          `${value}`,
          classNames(tableStyles.Positive, tableStyles.Up),
          classNames(tableStyles.Negative, tableStyles.Down),
        )]: useTrendClass,
      })}
    >
      <>{(valueFormatted && <>{valueFormatted}</>) || <>{value}</>}</>
    </span>
  );
};

export default AutoUpdateField;
