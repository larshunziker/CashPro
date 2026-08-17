import { gql } from '@apollo/client';

export const bookingFormParagraphFragment = gql`
  fragment BookingFormParagraphFragment on InputFormParagraph {
    form
    id
    webform
    title
    text
    bookingForm
    link {
      label
      path
    }
  }
`;
