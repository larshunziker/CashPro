import React from 'react';
import { TimeSlot, TimeSlots, TimeSlotsComponent } from '../TimeSlots/typings';
import { ToastLink } from '../../../../../../../../../common/components/ToastContent/typings';
import { ButtonComponent } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

export type BookingData = {
  date: string;
  time: string;
  phone: string;
  weekdayFormat: string;
  description?: string;
};

export type TimeSlotsRange = {
  maxDate: string;
  minDate: string;
  slots: {
    [date: string]: TimeSlot[];
  };
};

export type DateBooking = {
  [date: string]: TimeSlots;
};

export type BookingFormParagraphFactoryOptions = {
  displayErrorToast: (
    message: string,
    link: ToastLink,
    toastId: string,
  ) => void;
  publication: string;
  styles: BookingFormParagraphFactoryOptionsStyles;
  InputField: React.ComponentType<any>;
  TimeSlotsList: TimeSlotsComponent;
  Button: ButtonComponent;
  getDateSectionDescription: (
    type: string,
    dateMaxInDays: number,
    maxDateLocaleString: string,
  ) => string;
};

export type BookingFormParagraphFactoryOptionsStyles = {
  SubHeadline: string;
  Info: string;
  ButtonWrapper: string;
  InputWrapper: string;
  DateWrapper: string;
  Step: string;
  ErrorLabel: string;
  LoadingWrapper: string;
};

export type BookingFormProps = {
  entry: {
    bookingForm: string;
    title: string;
    text: string;
  };
  setBookingConfirmation: (props: BookingState) => void;
};
