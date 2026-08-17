import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import camelCase from 'lodash.camelcase';
import smoothscroll from 'smoothscroll-polyfill';
import { getDateWithWeekdayName } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import isPhoneNumberValid from '../../../../../../../../../shared/helpers/isPhoneNumberValid';
import scrollToError from '../../../../../../../../../shared/helpers/scrollToError';
import { getServiceUrl } from '../../../../../../../../../shared/helpers/serviceUrl';
import storageAvailable from '../../../../../../../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../../../../../shared/selectors/authStateSelector';
import { setBookingConfirmation } from '../../../../../../../../../shared/actions/booking';
import LoadingSpinner from '../../../../../LoadingSpinner';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import {
  CONFIRMATION,
  DATE_FIELD_ID,
  ERROR_FIELD_CLASSNAME,
  FETCH_TIMESLOTS_ERROR_ID,
  PHONE_FIELD_ID,
  SUBMIT_BOOKING_ERROR_ID,
  TIME_FIELD_ID,
  defaultErrorMessage,
  errorMessages,
} from './constants';
import { TimeSlots } from '../TimeSlots/typings';
import {
  BookingData,
  BookingFormParagraphFactoryOptions,
  BookingFormProps,
  DateBooking,
  TimeSlotsRange,
} from './typings';

const NUMBER_OF_MILISECONDS_PER_DAY = 86400000;
const NUMBER_OF_MILISECONDS_BEFORE_BOOK_TIME = 14700000;
const getLocalStorageBookingDataKey = (serviceName: string) =>
  `${serviceName.toLowerCase()}:bookingData`;
const isLocalStorageAvailable = storageAvailable('localStorage');

const scrollToTop = () => {
  global.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
};

const countDays = (date: string) => {
  const dateTime = new Date(date).getTime();
  const nowTime = new Date().getTime();
  return date
    ? Math.ceil((dateTime - nowTime) / NUMBER_OF_MILISECONDS_PER_DAY)
    : 0;
};

const isTimeAvailable = (date: string, time: string) => {
  const nowTime = new Date().getTime();
  return (
    nowTime + NUMBER_OF_MILISECONDS_BEFORE_BOOK_TIME <
    new Date(date + ' ' + time).getTime()
  );
};
const BookingFormParagraphFactory = ({
  displayErrorToast,
  publication,
  styles,
  InputField,
  TimeSlotsList,
  Button,
  getDateSectionDescription,
}: BookingFormParagraphFactoryOptions) => {
  const BookingFormParagraph = (props: BookingFormProps): ReactElement => {
    const {
      entry: { bookingForm },
      setBookingConfirmation,
    } = props;
    const savedBookingData = useRef(null);
    const localStorageBookingDataKey =
      getLocalStorageBookingDataKey(bookingForm);

    if (isLocalStorageAvailable) {
      try {
        savedBookingData.current = JSON.parse(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
          global.localStorage.getItem(localStorageBookingDataKey),
        );
      } catch (e) {}
    }

    /* @ts-ignore TODO: TS2345 ->  Argument of type '() => { date */
    const [bookingData, setBookingData] = useState<BookingData>(() => ({
      /* @ts-ignore TODO: TS2339 ->  Property 'date' does not exist on type 'never'. */
      date: savedBookingData.current?.date || null,
      /* @ts-ignore TODO: TS2339 ->  Property 'time' does not exist on type 'never'. */
      time: savedBookingData.current?.time || null,
      /* @ts-ignore TODO: TS2339 ->  Property 'clientData' does not exist on type 'never'. */
      phone: savedBookingData.current?.clientData?.phone || '',
      /* @ts-ignore TODO: TS2339 ->  Property 'description' does not exist on type 'never'. */
      description: savedBookingData.current?.description || '',
      weekdayFormat:
        getDateWithWeekdayName({
          /* @ts-ignore TODO: TS2339 ->  Property 'date' does not exist on type 'never'. */
          date: savedBookingData.current?.date,
        }) || null,
    }));
    const [isTimeSlotLoading, setTimeSlotLoading] = useState<boolean>(true);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'DateBooking | (() => DateBooking)'. */
    const [availableDates, setAvailableDates] = useState<DateBooking>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isBookingInProgress, setIsBookingInProgress] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isNewDateSelected, setIsNewDateSelected] = useState(false);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | (() => string)'. */
    const [minDate, setMinDate] = useState<string>(null);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | (() => string)'. */
    const [maxDate, setMaxDate] = useState<string>(null);

    const { isAuthenticated, givenName, familyName, email } = useSelector(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      (state) => authStateSelector(state),
    );
    const [formErrors, setFormErrors] = useState({
      date: false,
      time: false,
      timeAlreadyBooked: false,
      phone: false,
    });

    const isPhoneValid = useMemo<boolean>(
      () => isPhoneNumberValid(bookingData.phone),
      [bookingData.phone],
    );

    useEffect(() => {
      setFormErrors({
        date: !bookingData.date,
        time: !bookingData.time,
        timeAlreadyBooked: false,
        phone: !bookingData.phone || !isPhoneValid,
      });
    }, [bookingData.date, bookingData.phone, bookingData.time, isPhoneValid]);

    useEffect(() => {
      setIsNewDateSelected(true);
    }, [bookingData.date]);

    const navigate = useNavigate();

    const isFormInvalid = Object.values(formErrors).some((field) => field);

    const checkTimeSlots = useCallback(
      async (setFirstFreeSlot = true) => {
        setTimeSlotLoading(true);

        const timeSlotsCall = await fetch(
          `${getServiceUrl(
            __COMMERCE_SERVICE_ENDPOINT__,
          )}/appointments/time-slots/${bookingForm}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (timeSlotsCall.status !== 200) {
          return displayErrorToast(
            defaultErrorMessage,
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
            null,
            FETCH_TIMESLOTS_ERROR_ID,
          );
        }

        const timeSlots: TimeSlotsRange = await timeSlotsCall.json();
        const { slots, maxDate, minDate } = timeSlots;

        const possibleDates: DateBooking = {};
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Pick<BookingData, "time" | "date">'. */
        let firstAvailable: Pick<BookingData, 'time' | 'date'> = null;

        for (const date in slots) {
          possibleDates[date] = slots[date]?.reduce(
            (acc: TimeSlots, timeSlot) => {
              timeSlot.available =
                timeSlot.available && isTimeAvailable(date, timeSlot.time);
              if (timeSlot.time < '12:00:00') {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                acc.beforeNoon.push(timeSlot);
              } else {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                acc.afterNoon.push(timeSlot);
              }

              if (timeSlot.available) {
                if (!firstAvailable) {
                  firstAvailable = {
                    time: timeSlot.time,
                    date: date,
                  };
                } else if (firstAvailable.date >= date) {
                  firstAvailable.time =
                    timeSlot.time < firstAvailable.time
                      ? timeSlot.time
                      : firstAvailable.time;
                }
              }

              return acc;
            },
            {
              beforeNoon: [],
              afterNoon: [],
            },
          );
        }

        setAvailableDates(possibleDates);
        setMinDate(minDate);
        setMaxDate(maxDate);

        if (setFirstFreeSlot && firstAvailable?.time) {
          setBookingData((bookingData) => ({
            ...bookingData,
            time: firstAvailable.time,
            date: firstAvailable.date,
            weekdayFormat: getDateWithWeekdayName({
              date: firstAvailable.date,
            }),
          }));
        }

        setTimeSlotLoading(false);
      },
      [bookingForm],
    );

    const book = useCallback(
      async (onCheckoutComplete = false) => {
        setIsTouched(true);
        setIsNewDateSelected(false);
        if (onCheckoutComplete) {
          window.tp.offer.close();
        }
        if (
          !onCheckoutComplete &&
          !isTimeAvailable(bookingData.date, bookingData.time)
        ) {
          await checkTimeSlots(false);
          setFormErrors({ ...formErrors, timeAlreadyBooked: true });
          scrollToError(TIME_FIELD_ID, ERROR_FIELD_CLASSNAME);
          return;
        }
        if (isFormInvalid) {
          scrollToError('', ERROR_FIELD_CLASSNAME);
          return;
        }

        setIsLoading(true);

        const bookingDataSerialized = JSON.stringify({
          service: bookingForm,
          publication: publication,
          date: bookingData.date,
          time: bookingData.time,
          description: bookingData.description,
          clientData: {
            phone: bookingData.phone.replace(/\s/g, ''),
            name: `${givenName} ${familyName}`,
            email,
          },
        });

        if (!isAuthenticated) {
          if (isLocalStorageAvailable) {
            global.localStorage.setItem(
              localStorageBookingDataKey,
              bookingDataSerialized,
            );
          }

          Auth0.login();
          return;
        } else {
          savedBookingData.current = null;
          if (isLocalStorageAvailable) {
            global.localStorage.removeItem(localStorageBookingDataKey);
          }
        }

        const hasVoucherCall = await fetch(
          `${getServiceUrl(
            __COMMERCE_SERVICE_ENDPOINT__,
          )}/payments/${publication}/has-voucher/${bookingForm}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        );

        const hasVoucherCallResponse = await hasVoucherCall.json();

        if (!hasVoucherCallResponse?.granted) {
          window.tp.push(['setCustomVariable', 'product', bookingForm]);
          window.tp.experience.execute();
          return;
        }

        setIsBookingInProgress(true);

        const bookingCall = await fetch(
          `${getServiceUrl(__COMMERCE_SERVICE_ENDPOINT__)}/appointments/book`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: bookingDataSerialized,
          },
        );

        setIsBookingInProgress(false);
        setIsLoading(false);

        switch (bookingCall.status) {
          case 201:
            setIsTouched(false);
            scrollToTop();
            setBookingConfirmation({
              phoneNumber: bookingData.phone,
              time: bookingData.time,
              weekdayFormat: bookingData.weekdayFormat,
              description: bookingData.description,
            });
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'booking_confirmation',
                event_category: 'booking',
                event_action: 'confirmation',
                event_label: [bookingData.date].join(';'),
              },
            });
            navigate(global.location.pathname + `?${CONFIRMATION}`, {
              replace: true,
            });

            break;
          case 410: {
            // goToTimeSlots - timeSlot already booked
            await checkTimeSlots(false);
            setFormErrors({ ...formErrors, timeAlreadyBooked: true });
            scrollToError(TIME_FIELD_ID, ERROR_FIELD_CLASSNAME);
            break;
          }
          default: {
            displayErrorToast(
              defaultErrorMessage,
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
              null,
              SUBMIT_BOOKING_ERROR_ID,
            );
            setIsLoading(false);
            break;
          }
        }
      },
      [
        bookingData.date,
        bookingData.phone,
        bookingData.time,
        bookingData.weekdayFormat,
        bookingData.description,
        checkTimeSlots,
        email,
        familyName,
        formErrors,
        givenName,
        isAuthenticated,
        isFormInvalid,
        setBookingConfirmation,
        bookingForm,
        localStorageBookingDataKey,
        navigate,
      ],
    );

    useEffect(() => {
      (async () => {
        await checkTimeSlots(!savedBookingData.current);
      })();
    }, [checkTimeSlots]);

    useEffect(() => {
      tealiumTrackEvent({
        payload: {
          cms_page_type: `${camelCase(bookingForm)}BookingForm`,
        },
      });
      smoothscroll.polyfill();
    }, [bookingForm]);

    useEffect(() => {
      if (isAuthenticated && savedBookingData.current) {
        book();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
      const checkoutCompleteHandler = () => {
        book(true);
      };

      const experienceExecuteHandler = () => {
        window.tp.push(['setCustomVariable', 'product', '']);
      };

      const checkoutCloseHandler = () => {
        setIsLoading(false);
      };
      const checkoutErrorHandler = () => {
        setIsLoading(false);
      };

      document.addEventListener(
        'RASCH-checkoutComplete',
        checkoutCompleteHandler,
      );
      document.addEventListener(
        'RASCH-experienceExecute',
        experienceExecuteHandler,
      );
      document.addEventListener('RASCH-checkoutClose', checkoutCloseHandler);
      document.addEventListener('RASCH-checkoutError', checkoutErrorHandler);

      return () => {
        document.removeEventListener(
          'RASCH-checkoutComplete',
          checkoutCompleteHandler,
        );
        document.removeEventListener(
          'RASCH-experienceExecute',
          experienceExecuteHandler,
        );
        document.removeEventListener(
          'RASCH-checkoutClose',
          checkoutCloseHandler,
        );
        document.removeEventListener(
          'RASCH-checkoutError',
          checkoutErrorHandler,
        );
      };
    }, [book]);

    const dateMinInDays = countDays(minDate);
    const dateMaxInDays = countDays(maxDate);

    const maxDateLocaleString = new Date(maxDate).toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return (
      <>
        {isBookingInProgress && (
          <div className={styles.LoadingWrapper}>
            <LoadingSpinner height={60} />
          </div>
        )}

        <div data-testid="articlepage-wrapper">
          <div data-testid="articlepage-articleheader-wrapper">
            <div className={styles.Step}>
              <div className={styles.SubHeadline}>
                <h2>Terminwahl</h2>
              </div>
              <div className={styles.DateWrapper}>
                {!isTimeSlotLoading && (
                  <>
                    <p className={styles.Info}>
                      {getDateSectionDescription(
                        bookingForm,
                        dateMaxInDays,
                        maxDateLocaleString,
                      )}
                    </p>
                    <InputField
                      getId={() => DATE_FIELD_ID}
                      getValue={() => bookingData.date}
                      fieldName={DATE_FIELD_ID}
                      title={DATE_FIELD_ID}
                      register={null}
                      value={bookingData.date}
                      initialValue={bookingData.date}
                      type="date"
                      validate={noop}
                      hasError={!bookingData.date}
                      id={DATE_FIELD_ID}
                      /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                      handleChange={(value) => {
                        setBookingData({
                          ...bookingData,
                          date: value,
                          weekdayFormat: getDateWithWeekdayName({
                            date: value,
                          }),
                          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
                          time: null,
                        });
                      }}
                      animatedLabel
                      label="tt.mm.jjjj"
                      errorMessage={errorMessages.date}
                      addClass={classNames(styles.InputWrapper, {
                        [ERROR_FIELD_CLASSNAME]: formErrors.date,
                      })}
                      dateMin={`${dateMinInDays} days`}
                      dateMax={`${dateMaxInDays} days`}
                    />
                  </>
                )}
              </div>

              <TimeSlotsList
                isTimeSlotLoading={isTimeSlotLoading}
                id={TIME_FIELD_ID}
                setBookingData={setBookingData}
                bookingData={bookingData}
                availableTimes={availableDates?.[bookingData.date]}
                addClass={classNames({
                  [ERROR_FIELD_CLASSNAME]: !bookingData.time,
                })}
                hasError={
                  isTouched && (formErrors.time || formErrors.timeAlreadyBooked)
                }
              />

              {isTouched &&
                !isNewDateSelected &&
                (formErrors.time || formErrors.timeAlreadyBooked) && (
                  <span className={styles.ErrorLabel}>
                    {formErrors.time && errorMessages.timeSlots}
                    {formErrors.timeAlreadyBooked &&
                      errorMessages.timeSlotsAlreadyBooked}
                  </span>
                )}
            </div>

            <div className={styles.Step}>
              <div className={styles.SubHeadline}>
                <h2>Anmerkungen zu Ihrem Beratungsanliegen</h2>
              </div>

              <InputField
                animatedLabel
                disabled={false}
                id="description"
                label="Anmerkungen zu Ihrem Beratungsanliegen"
                maxlength={1000}
                type="textarea"
                withErrorIcon={null}
                helperText={null}
                rows={4}
                readonly={false}
                autocomplete={null}
                value={bookingData.description}
                initialValue={bookingData.description}
                /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                handleChange={(value) => {
                  setBookingData({
                    ...bookingData,
                    description: value,
                  });
                }}
              />
            </div>

            <div className={styles.Step}>
              <div className={styles.SubHeadline}>
                <h2>Telefonnummer</h2>
              </div>
              <p className={styles.Info}>
                Damit wir Sie zum gewählten Termin anrufen können, benötigen wir
                Ihre Telefonnummer.
              </p>

              <InputField
                getId={() => PHONE_FIELD_ID}
                getValue={() => bookingData.phone}
                fieldName={PHONE_FIELD_ID}
                title={PHONE_FIELD_ID}
                register={null}
                value={bookingData.phone}
                initialValue={bookingData.phone}
                type="tel"
                validate={noop}
                hasError={isTouched && !isPhoneValid}
                id={PHONE_FIELD_ID}
                /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                handleChange={(value) => {
                  setBookingData({ ...bookingData, phone: value });
                }}
                animatedLabel
                label="Telefonnummer"
                withErrorIcon
                errorMessage={
                  bookingData.phone
                    ? errorMessages.phoneWrong
                    : errorMessages.phoneEmpty
                }
                addClass={classNames(styles.InputWrapper, {
                  [ERROR_FIELD_CLASSNAME]: formErrors.phone,
                })}
              />
            </div>

            <div className={styles.ButtonWrapper}>
              <Button
                loading={isLoading}
                onClick={() => book()}
                mobileFullWidth
              >
                Termin buchen
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mapDispatchToProps = {
    setBookingConfirmation,
  };

  return compose<any>(connect(null, mapDispatchToProps))(BookingFormParagraph);
};

export default BookingFormParagraphFactory;
