import { PageScreenProps } from '../../typings';

export type PageScreenBookingProps = PageScreenProps & {
  bookingFormEntry: InputFormParagraph;
  bookingConfirmation: BookingState;
};
