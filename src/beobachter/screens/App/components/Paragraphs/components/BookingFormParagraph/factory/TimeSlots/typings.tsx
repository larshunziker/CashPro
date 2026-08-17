import { Dispatch, SetStateAction } from 'react';
import { BookingData } from '../BookingFormParagraph/typings';
import { LoadingSpinnerComponent } from '../../../../../../../../../common/components/LoadingSpinner/typings';

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type TimeSlots = {
  beforeNoon?: TimeSlot[];
  afterNoon?: TimeSlot[];
};

export type TimeSlotsProps = {
  availableTimes: TimeSlots;
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
  id: string;
  addClass?: string;
  hasError?: boolean;
  isTimeSlotLoading: boolean;
};

export type TimeSlotsComponent = (props: TimeSlotsProps) => JSX.Element;

export type TimeslotListFactoryOptions = {
  LoadingSpinner: LoadingSpinnerComponent;
  styles: TimeslotListFactoryOptionsStyles;
};

export type TimeslotListFactoryOptionsStyles = {
  TimeInput: string;
  TimeLabel: string;
  TimeOfDayLabel: string;
  ErroredTimeSlotsWrapper: string;
  NotAvailableLabel: string;
  DateInfoLabel: string;
  NoTimeSlotsInfo: string;
};
