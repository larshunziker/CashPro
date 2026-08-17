import {
  BOOKING_PAGE_DIVORCE,
  BOOKING_PAGE_INHERITANCE,
} from '../BookingFormParagraph/factory/BookingFormParagraph/constants';

export const getDateSectionDescription = (
  type: string,
  dateMaxInDays: number,
  maxDateLocaleString: string,
): string => {
  switch (type) {
    case BOOKING_PAGE_INHERITANCE:
      return `Wählen Sie das halbstündige Zeitfenster für Ihre Erbrechtsberatung. Wir vergeben Termine maximal ${dateMaxInDays} Tage im Voraus, das heisst bis zum ${maxDateLocaleString}. Der nächstmögliche Termin für den Rückruf ist bereits markiert.`;

    case BOOKING_PAGE_DIVORCE:
      return `Wählen Sie das halbstündige Zeitfenster für Ihre Scheidungsberatung. Wir vergeben Termine maximal ${dateMaxInDays} Tage im Voraus, das heisst bis zum ${maxDateLocaleString}. Der nächstmögliche Termin für den Rückruf ist bereits angegeben.`;

    default:
      return `Wählen Sie das halbstündige Zeitfenster für Ihre Beratung. Wir vergeben Termine maximal ${dateMaxInDays} Tage im Voraus, das heisst bis zum ${maxDateLocaleString}. Der nächstmögliche Termin für den Rückruf ist bereits angegeben.`;
  }
};
