import bookingFormParagraphFactory from './factory/BookingFormParagraph/factory';
import { displayErrorToast } from '../../../Toast';
import InputField from '../WebformParagraph/components/InputField';
import TimeSlotsList from './components/TimeSlots';
import Button from '../../../ButtonWithLoading';
import { getDateSectionDescription } from './helpers';
import { DEFAULT_PUBLICATION } from '../../../../constants';
import styles from './styles.legacy.css';

const BookingFormParagraph = bookingFormParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '(message? */
  displayErrorToast,
  TimeSlotsList: TimeSlotsList,
  publication: DEFAULT_PUBLICATION,
  styles: {
    SubHeadline: styles.SubHeadline,
    Info: styles.Info,
    ButtonWrapper: styles.ButtonWrapper,
    InputWrapper: styles.InputWrapper,
    DateWrapper: styles.DateWrapper,
    Step: styles.Step,
    ErrorLabel: styles.ErrorLabel,
    LoadingWrapper: styles.LoadingWrapper,
  },
  InputField,
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<ButtonProps>' is not assignable to type 'ButtonComponent'. */
  Button,
  getDateSectionDescription,
});

export default BookingFormParagraph;
