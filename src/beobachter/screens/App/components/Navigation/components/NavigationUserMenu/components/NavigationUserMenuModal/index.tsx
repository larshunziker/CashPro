import { connect } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import { setNavigationVisible } from '../../../../../../../../../shared/actions/navigation';
import Icon from '../../../../../../components/Icon';
import MenuItem from '../MenuItem';
import { links } from '../../constants';
import styles from './styles.legacy.css';
import { NavigationUserMenuProps } from '../../../../../../../../../common/components/NavigationUserMenu/typings';

type NavigationUserMenuPropsInner = NavigationUserMenuProps & {
  setNavigationVisible: (visibleNavigation: string) => void;
};

const closeNavigationByProps =
  ({ setNavigationVisible }: NavigationUserMenuPropsInner) =>
  () => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
    setNavigationVisible(null);
  };

const NavigationUserMenu = navigationUserMenuFactory({
  Icon,
  MenuItem,
  links,
  closeNavigation: closeNavigationByProps,
  // MenuListHeader,
  closeOnOutsideClick: true,
  styles: {
    Wrapper: styles.Wrapper,
    MenuHeader: styles.MenuHeader,
    MenuHeaderContent: styles.MenuHeaderContent,
    MenuBodyWrapper: '',
    UserInformationWrapper: styles.UserInformationWrapper,
    UserName: styles.UserName,
    UserCredentials: styles.UserCredentials,
    MenuWrapper: styles.MenuWrapper,
    Container: styles.Container,
    MenuItem: styles.MenuItem,
    CloseButton: styles.CloseButton,
    CloseIcon: styles.CloseIcon,
  },
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default connect(null, mapDispatchToProps)(NavigationUserMenu);
