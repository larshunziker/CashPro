import pagerFactory from '../../../../../../../common/components/Pager/components/PageLoader/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

const PageLoader = pagerFactory({
  Icon,
  styles: {
    Wrapper: styles.Wrapper,
    PageLink: styles.PageLink,
    PagerPlaceholder: '',
    PrevButton: styles.PrevButton,
    NextButton: styles.NextButton,
    Icon: '',
    Disabled: styles.Disabled,
    ActiveItem: styles.ActiveItem,
  },
});

export default PageLoader;
