import React, { memo, useMemo, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import autoUpdateStateSelector from '../../../../../../../../shared/selectors/autoUpdateStateSelector';
import styles from './styles.legacy.css';

export type InstrumentFieldProps = {
  instrumentKey: string;
  initialValue: string | number;
  field: string;
  formatFn?: (value: string | number) => any;
  defaultUpdateStatus?: 'positive' | 'negative' | 'neutral';
  defaultValue?: any;
};

const InstrumentField = ({
  instrumentKey = '',
  defaultValue = <>&ndash;</>,
  initialValue = 0,
  field,
  formatFn = (val) => String(val),
  defaultUpdateStatus,
}: InstrumentFieldProps) => {
  const val = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => autoUpdateStateSelector(state).data?.[instrumentKey]?.[field],
    shallowEqual,
  );

  const prevVal = useRef(parseFloat(`${initialValue}`) || 0);
  const valParsed =
    (field?.toLowerCase().indexOf('date') && val) || parseFloat(val) || 0;

  let status =
    !valParsed ||
    valParsed === prevVal.current ||
    field?.toLowerCase().indexOf('date') > -1 ||
    valParsed === 0
      ? 'neutral'
      : valParsed > prevVal.current
        ? 'positive'
        : 'negative';

  if (defaultUpdateStatus) {
    status = defaultUpdateStatus;
  }

  // update the reference after the status was set!
  if (valParsed) {
    prevVal.current = valParsed;
  }

  const value = useMemo(
    () => formatFn(valParsed || initialValue) || valParsed,
    [valParsed, initialValue, formatFn],
  );

  return (
    <span
      key={`${value}-instrument-field-${instrumentKey}-${field}`}
      className={classNames({
        [styles.AnimatePositive]: val && status === 'positive',
        [styles.AnimateNegative]: val && status === 'negative',
        [styles.AnimateNeutral]: val && status === 'neutral',
      })}
    >
      <>{(value && <>{value}</>) || <>{defaultValue}</>}</>
    </span>
  );
};

export default memo(InstrumentField);
