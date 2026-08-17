import pagerFactory from '../../../../../../../common/components/Pager/components/LazyLoading/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

const LazyLoading = pagerFactory({
  Icon,
  styles: {
    IconArrowRotateRight: styles.IconArrowRotateRight,
    IsLoading: styles.IsLoading,
  },
});

export default LazyLoading;
