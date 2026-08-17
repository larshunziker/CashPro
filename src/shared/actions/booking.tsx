export const SET_BOOKING_DATA = 'booking/set-booking-data';
export const RESET_BOOKING_DATA = 'booking/reset-booking-data';

type BookingStateActionTypes =
  | 'booking/set-booking-data'
  | 'booking/reset-booking-data';

export type BookingStateAction<T> = {
  type: BookingStateActionTypes;
  payload: T;
};

export const setBookingConfirmation = (
  data: BookingState,
): BookingStateAction<BookingState> => ({
  type: SET_BOOKING_DATA,
  payload: data,
});

export const resetBookingConfirmation = (
  data: BookingState,
): BookingStateAction<BookingState> => ({
  type: RESET_BOOKING_DATA,
  payload: data,
});
