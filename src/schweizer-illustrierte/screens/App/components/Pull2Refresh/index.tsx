import pull2RefreshFactory from '../../../../../common/components/Pull2Refresh/factory';
import LoadingSpinner from '../LoadingSpinner';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const Pull2Refresh = pull2RefreshFactory({
  Icon,
  LoadingSpinner,
  styles,
});

export default Pull2Refresh;
