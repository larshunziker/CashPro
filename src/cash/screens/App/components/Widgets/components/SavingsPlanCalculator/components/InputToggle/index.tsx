import React from 'react';
import classNames from 'classnames';
import Tooltip from '../../../../../Tooltip';
import { WIDGET_SAVINGS_PLAN_CALCULATOR } from '../../../../constants';
import styles from './styles.legacy.css';
import { InputToggleProps } from './typings';

const InputToggle = (props: InputToggleProps) => {
  const { idx, label, options = [], handleChange, tooltip = null } = props;

  return (
    <>
      <p className={styles.InputLabel}>
        {label}
        {tooltip && (
          <Tooltip origin={WIDGET_SAVINGS_PLAN_CALCULATOR} content={tooltip} />
        )}
      </p>
      <div className={styles.InputRow}>
        <div className={styles.ToggleWrapper}>
          {options.map(({ label, active }, optionIdx) => (
            <button
              key={optionIdx}
              onClick={() => handleChange(idx, `${optionIdx}`, 'toggle')}
              className={classNames(styles.Toggle, {
                [styles.IsActive]: active,
              })}
            >
              {label}
            </button>
          ))}
          <div className={styles.ToggleBackground} />
        </div>
      </div>
    </>
  );
};

export default InputToggle;
