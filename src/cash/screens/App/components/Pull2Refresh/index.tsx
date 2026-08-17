import pull2RefreshFactory from '../../../../../common/components/Pull2Refresh/factory';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import styles from './styles.legacy.css';

const Pull2Refresh = pull2RefreshFactory({
  Icon,
  LoadingSpinner,
  styles: {
    PullTip: styles.PullTip,
    Spinner: styles.Spinner,
  },
});

export default Pull2Refresh;
