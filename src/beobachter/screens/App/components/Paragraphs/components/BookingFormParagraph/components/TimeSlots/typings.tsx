import { Dispatch, SetStateAction } from 'react';
import { TimeSlots } from '../../factory/TimeSlots/typings';
import { BookingData } from '../../factory/BookingFormParagraph/typings';

export type TimeslotsProps = {
  availableTimes: TimeSlots;
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
  id: string;
  addClass?: string;
  hasError?: boolean;
  isTimeSlotLoading: boolean;
};
