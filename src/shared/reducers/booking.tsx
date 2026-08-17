import {
  BookingStateAction,
  RESET_BOOKING_DATA,
  SET_BOOKING_DATA,
} from '../actions/booking';

export const bookingInitialState: BookingState = {};

const bookingReducer = (
  state: BookingState = bookingInitialState,
  action: BookingStateAction<BookingState | string>,
): BookingState => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return (action.payload as BookingState) || bookingInitialState;
    case RESET_BOOKING_DATA: {
      if (
        state.phoneNumber !== bookingInitialState.phoneNumber ||
        state.time !== bookingInitialState.time ||
        state.weekdayFormat !== bookingInitialState.weekdayFormat ||
        state.description !== bookingInitialState.description
      ) {
        return bookingInitialState;
      }

      return state;
    }
    default:
      return state;
  }
};

export default bookingReducer;
