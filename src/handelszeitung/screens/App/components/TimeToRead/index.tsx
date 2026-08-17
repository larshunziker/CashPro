import timeToReadFactory from './../../../../../../src/common/components/TimeToRead/factory';
import Icon from '../Icon';
// @ts-ignore-next-line
import styles from './styles.legacy.css';

const TimeToRead = timeToReadFactory({
  Icon,
  styles: {
    Wrapper: styles.Wrapper,
    IconClock: styles.IconClock,
  },
});

export default TimeToRead;
