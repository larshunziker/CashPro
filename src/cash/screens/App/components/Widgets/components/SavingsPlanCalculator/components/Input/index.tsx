import React, { useCallback, useRef, useState } from 'react';
import { format, getNumericValue } from '../../helpers';
import Tooltip from '../../../../../Tooltip';
import StepButton from '../StepButton';
import { WIDGET_SAVINGS_PLAN_CALCULATOR } from '../../../../constants';
import styles from './styles.legacy.css';
import { InputProps } from './typings';

const Input = (props: InputProps) => {
  const {
    idx,
    label,
    value,
    handleChange,
    inputMode = 'numeric',
    roundingDigits = 2,
    tooltip = null,
    min = 0,
    unit = null,
    step = null,
    explanation = null,
  } = props;

  const ref = useRef(null);
  const [inputVal, setInputVal] = useState(format(value, roundingDigits));
  const explanationArray = explanation?.split('\n') || [];

  const incrementAndSaveValueBy = useCallback(
    (incrementBy: number) => {
      const newVal = Math.max(getNumericValue(inputVal) + incrementBy, min);

      const result = format(newVal, roundingDigits);

      setInputVal(result);
      return newVal;
    },
    [inputVal, min, roundingDigits],
  );

  return (
    <>
      <p className={styles.InputLabel}>
        {label}
        {tooltip && (
          <Tooltip origin={WIDGET_SAVINGS_PLAN_CALCULATOR} content={tooltip} />
        )}
      </p>
      <div className={styles.InputRow}>
        <div
          tabIndex={0}
          role="button"
          className={styles.Input}
          /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
          onKeyUp={() => ref?.current?.focus()}
          /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
          onClick={() => ref?.current?.focus()}
        >
          <input
            value={inputVal}
            min={min}
            ref={ref}
            type="text"
            inputMode={inputMode as 'numeric' | 'decimal'}
            onChange={(event) => setInputVal(event.target.value)}
            onFocus={() => setInputVal(format(getNumericValue(value), 1))}
            onBlur={() => handleChange(idx, incrementAndSaveValueBy(0))}
          />
          <span className={styles.InputUnit}>{unit}</span>
        </div>
        <StepButton
          iconType="IconMinusThin"
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          onClick={() => handleChange(idx, incrementAndSaveValueBy(-step))}
        />
        <StepButton
          iconType="IconPlusThin"
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | null' is not assignable to parameter of type 'number'. */
          onClick={() => handleChange(idx, incrementAndSaveValueBy(step))}
        />
      </div>
      {explanationArray.map((e, idx) => (
        <span
          key={idx}
          className={styles.Explanation}
          dangerouslySetInnerHTML={{ __html: e }}
        />
      ))}
    </>
  );
};

export default Input;
