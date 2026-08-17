import headerFactory from '../../../../../common/components/Header/factory';
import HeaderInner from './components/HeaderInner';
import { HEADER_PLACEHOLDER_ID } from './constants';
import styles from './styles.legacy.css';

const configIsVisible: InViewConfig = {
  rootMargin: `-54px 0px 0px 0px`,
};

const configIsCollapsed: InViewConfig = {
  rootMargin: `200px 0px 0px 0px`,
};

const Header = headerFactory({
  HeaderInner,
  placeholderId: HEADER_PLACEHOLDER_ID,
  observerConfigs: [configIsVisible, configIsCollapsed],
  styles: {
    Wrapper: styles.Wrapper,
    Placeholder: styles.Placeholder,
    IsSticky: styles.IsSticky,
    Header: '',
  },
});

export default Header;
