import timeSlotsListParagraphFactory from '../../factory/TimeSlots/factory';
import LoadingSpinner from '../../../../../LoadingSpinner';
import styles from './styles.legacy.css';

const TimeSlotsList = timeSlotsListParagraphFactory({
  LoadingSpinner,
  styles: {
    TimeInput: styles.TimeInput,
    TimeLabel: styles.TimeLabel,
    TimeOfDayLabel: styles.TimeOfDayLabel,
    ErroredTimeSlotsWrapper: styles.ErroredTimeSlotsWrapper,
    NotAvailableLabel: styles.NotAvailableLabel,
    DateInfoLabel: styles.DateInfoLabel,
    NoTimeSlotsInfo: styles.NoTimeSlotsInfo,
  },
});

export default TimeSlotsList;
