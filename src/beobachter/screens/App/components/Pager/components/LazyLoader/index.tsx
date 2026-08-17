import pagerFactory from '../../../../../../../common/components/Pager/components/LazyLoader/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

const LazyLoader = pagerFactory({
  Icon,
  styles: {
    IconArrowRotateRight: styles.IconArrowRotateRight,
    LoadMore: styles.LoadMore,
  },
});

export default LazyLoader;
