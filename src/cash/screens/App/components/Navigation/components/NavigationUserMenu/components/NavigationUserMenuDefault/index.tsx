import { connect } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import { setNavigationVisible } from '../../../../../../../../../shared/actions/navigation';
import Icon from '../../../../../Icon';
import MenuItem from '../MenuItem';
import MenuListHeader from '../MenuListHeader';
import { links } from '../../constants';
import styles from './styles.legacy.css';

const mapDispatchToProps: Record<string, any> = {
  setNavigationVisible,
};

const NavigationUserMenu = navigationUserMenuFactory({
  Icon,
  MenuItem,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '((props */
  MenuHeaderLogo: null,
  MenuListHeader,
  links,
  closeNavigation: () => noop,
  styles: {
    Wrapper: styles.Wrapper,
    MenuHeader: styles.MenuHeader,
    MenuHeaderContent: styles.MenuHeaderContent,
    MenuBodyWrapper: styles.MenuBodyWrapper,
    UserInformationWrapper: styles.UserInformationWrapper,
    UserName: styles.UserName,
    UserCredentials: styles.UserCredentials,
    MenuWrapper: styles.MenuWrapper,
    MenuListWrapper: '',
    MenuItem: styles.MenuItem,
    Container: '',
    CloseButton: styles.CloseButton,
    CloseIcon: styles.CloseIcon,
    MenuItemHiddenOnApp: styles.MenuItemHiddenOnApp,
  },
});

export default connect(null, mapDispatchToProps)(NavigationUserMenu);
