import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import { BookingData } from '../BookingFormParagraph/typings';
import {
  TimeSlot,
  TimeslotListFactoryOptions,
  TimeSlotsProps,
} from './typings';

type TimeslotProps = Pick<TimeSlotsProps, 'bookingData' | 'setBookingData'> & {
  customIndex: string;
  availableTime: TimeSlot;
  key: string;
};

enum TIME_OF_DAY {
  BEFORE_NOON = 'before-noon',
  AFTER_NOON = 'after-noon',
}

const formatTimeSlot = (time: string) => time.substr(0, 5);

const TimeslotListFactory = ({
  LoadingSpinner,
  styles,
}: TimeslotListFactoryOptions) => {
  const TimeslotItem = ({
    bookingData,
    setBookingData,
    availableTime,
    customIndex,
  }: TimeslotProps): JSX.Element => (
    <label>
      <input
        data-testid={`available-time-element-${customIndex}`}
        className={styles.TimeInput}
        type="radio"
        name={availableTime.time}
        value={availableTime.time}
        checked={bookingData.time === availableTime.time}
        onChange={(e) => {
          setBookingData((data: BookingData) => ({
            ...data,
            time: e.target.value,
          }));
        }}
        disabled={!availableTime.available}
      />
      <span className={styles.TimeLabel}>
        {formatTimeSlot(availableTime.time)}
        {!availableTime.available && (
          <span className={styles.NotAvailableLabel}>gebucht</span>
        )}
      </span>
    </label>
  );

  const TimeslotsList = ({
    bookingData,
    setBookingData,
    availableTimes = {},
    id,
    addClass,
    hasError,
    isTimeSlotLoading,
  }: TimeSlotsProps): ReactElement => {
    const { beforeNoon, afterNoon } = availableTimes;

    const renderTimeSlots = (times: TimeSlot[], timeOfDay: TIME_OF_DAY) =>
      times?.length > 0 && (
        <TestFragment data-testid={`available-times-wrapper-${timeOfDay}`}>
          <div className={styles.TimeOfDayLabel}>
            {timeOfDay === TIME_OF_DAY.BEFORE_NOON
              ? 'Vormittags'
              : 'Nachmittags'}
          </div>
          {times.map((time, index) => (
            <TimeslotItem
              key={time.time}
              availableTime={time}
              bookingData={bookingData}
              customIndex={`${timeOfDay}-${index}`}
              setBookingData={setBookingData}
            />
          ))}
        </TestFragment>
      );

    return (
      <>
        {(isTimeSlotLoading && !__TESTING__ && <LoadingSpinner />) || (
          <>
            <span className={styles.DateInfoLabel}>
              {bookingData.weekdayFormat}
            </span>
            <div
              id={id}
              className={classNames(addClass, {
                [styles.ErroredTimeSlotsWrapper]: hasError,
              })}
              data-testid="available-times-wrapper"
            >
              {/* @ts-ignore TODO: TS2345 ->  Argument of type 'TimeSlot[] | undefined' is not assignable to parameter of type 'TimeSlot[]'. */}
              {renderTimeSlots(beforeNoon, TIME_OF_DAY.BEFORE_NOON)}
              {/* @ts-ignore TODO: TS2345 ->  Argument of type 'TimeSlot[] | undefined' is not assignable to parameter of type 'TimeSlot[]'. */}
              {renderTimeSlots(afterNoon, TIME_OF_DAY.AFTER_NOON)}

              {!(beforeNoon?.length || afterNoon?.length) && (
                <span className={styles.NoTimeSlotsInfo}>
                  An diesem Tag sind keine freien Termine verfügbar.
                </span>
              )}
            </div>
          </>
        )}
      </>
    );
  };

  return TimeslotsList;
};

export default TimeslotListFactory;
