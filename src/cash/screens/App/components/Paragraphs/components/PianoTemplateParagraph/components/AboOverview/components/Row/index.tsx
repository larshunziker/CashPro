import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../../../../Icon';
import Tooltip from '../Tooltip';
import styles from './styles.legacy.css';
import { RowProps } from '../../typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'ticks' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
const Tick = ({ ticks, index }) => {
  return (
    <span className={styles.Cell}>
      {(ticks[index] && (
        <span
          className={classNames(
            styles.Icon,
            (index < 3 && styles.BorderRight) || null,
          )}
        >
          <Icon type="IconCheck" />
        </span>
      )) || (
        <span
          className={classNames(
            styles.Icon,
            (index < 3 && styles.BorderRight) || null,
          )}
        >
          &zwnj;
        </span>
      )}
    </span>
  );
};

const Row = ({
  text,
  ticks,
  tooltip,
  tooltipState,
  toggleTooltip,
}: RowProps & {
  tooltipState: boolean;
  toggleTooltip: (index: number) => void;
}) => {
  return (
    <>
      <span className={styles.Cell}>
        <span className={styles.Text}>{text}</span>
        {(tooltip && (
          <Tooltip
            text={tooltip}
            active={tooltipState}
            toggle={toggleTooltip}
          />
        )) ||
          null}
      </span>
      <Tick ticks={ticks} index={0} />
      <Tick ticks={ticks} index={1} />
      <Tick ticks={ticks} index={2} />
      <Tick ticks={ticks} index={3} />
    </>
  );
};

export default Row;
