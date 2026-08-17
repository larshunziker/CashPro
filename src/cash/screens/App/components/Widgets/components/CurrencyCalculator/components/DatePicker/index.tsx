import React from 'react';
import classNames from 'classnames';
import {
  DATE_FORMAT_DEFAULT,
  formatDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { convertDateToIsoString } from '../../helpers';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

type DatePickerProps = {
  useSmallLayout: boolean;
  currentInstrument: Instrument;
  activeState: Record<string, any>;
  onChangeDate: (value: string) => void;
  datePickerRef: React.RefObject<HTMLInputElement>;
};

const DatePicker = ({
  currentInstrument,
  onChangeDate,
  activeState,
  datePickerRef,
}: DatePickerProps) => {
  const oneYearInMilliSeconds = 31556952000;
  const currentDate = convertDateToIsoString(new Date(Date.now()));
  const date10YearAgo = convertDateToIsoString(
    new Date(Date.now() - 10 * oneYearInMilliSeconds),
  );

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const handleOpenDatePicker = (event) => {
    event.target.showPicker();
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.DateInputWrapper}>
        <span className={styles.Label}>Datum</span>
        <input
          ref={datePickerRef}
          type="date"
          required
          className={classNames('datePickerInput', styles.DateInputField)}
          name="currency-calculator-date-picker"
          value={activeState?.value?.date || currentDate}
          min={date10YearAgo}
          max={currentDate}
          onClick={(event) => handleOpenDatePicker(event)}
          onChange={(event) =>
            onChangeDate(
              event.target.value || convertDateToIsoString(new Date()),
            )
          }
        />
      </div>
      {(currentInstrument && (
        <div className={styles.CurrencyInfoWrapper}>
          <Link
            path={`/${currentInstrument?.fullquoteUri}`}
            className={styles.Link}
          >
            {activeState.fromCurrency}/{activeState.toCurrency}
          </Link>
          <span>{`Kurs: ${parseFloat(
            activeState?.value?.last || currentInstrument?.lval,
          ).toFixed(4)} vom ${formatDate(
            activeState?.value?.date || convertDateToIsoString(new Date()),
            DATE_FORMAT_DEFAULT,
          )}`}</span>
        </div>
      )) ||
        null}
    </div>
  );
};

export default DatePicker;
