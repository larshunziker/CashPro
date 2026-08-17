import React, { memo } from 'react';
import classnames from 'classnames';
import Tooltip from '../../../../../Tooltip';
import DataField from './components/DataField';
import styles from './styles.legacy.css';
import { PriceDataProps } from './typings';

const PriceData = ({
  fields,
  loading,
  error,
  isAlertForm,
  curr,
  instrument,
}: PriceDataProps) => {
  const isLoading = loading || !!error;

  return (
    <>
      <div
        className={classnames(styles.Wrapper, {
          [styles.IsAlertForm]: isAlertForm,
          [styles.NoMarginBottom]: instrument?.scGrouped === 'IND',
        })}
      >
        <div>
          <div className={styles.Label}>Kurs {curr}</div>
          <div>
            <DataField
              isLoading={isLoading}
              fields={[fields?.lval, fields?.lvalDatetime]}
            />
          </div>
        </div>

        <div className={styles.Middle}>
          <div className={styles.Label}>Eröffnung</div>
          <DataField
            isLoading={isLoading}
            fields={[fields?.open, fields?.openDatetime]}
            greyValue
          />
        </div>

        <div className={styles.Right}>
          <div className={styles.Label}>
            Vortag{' '}
            <Tooltip content="Tag an dem das Instrument zuletzt gehandelt wurde im Vergleich zum aktuellen Tag" />
          </div>
          <DataField
            isLoading={isLoading}
            fields={[fields?.dayBefore, fields?.dayBeforeDate]}
            greyValue
          />
        </div>
      </div>
    </>
  );
};

export default memo<PriceDataProps>(PriceData);
