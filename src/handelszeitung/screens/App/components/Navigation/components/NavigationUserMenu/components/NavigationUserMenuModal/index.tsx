import { ComponentType } from 'react';
import { connect } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import { setNavigationVisible } from '../../../../../../../../../shared/actions/navigation';
import Icon from '../../../../../Icon';
import MenuItem from '../MenuItem';
import { links } from '../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
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

const mapDispatchToProps = {
  setNavigationVisible,
};

const NavigationUserMenu: ComponentType<any> = connect(
  null,
  mapDispatchToProps,
)(
  navigationUserMenuFactory({
    Icon,
    /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<MenuItemProps>' is not assignable to type '(props */
    MenuItem,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '((props */
    MenuHeaderLogo: null,
    links,
    closeNavigation: closeNavigationByProps,
    styles: {
      Wrapper: styles.Wrapper,
      MenuHeader: styles.MenuHeader,
      MenuHeaderContent: styles.MenuHeaderContent,
      MenuBodyWrapper: '',
      UserInformationWrapper: styles.UserInformationWrapper,
      UserName: styles.UserName,
      UserCredentials: styles.UserCredentials,
      MenuWrapper: styles.MenuWrapper,
      Container: grid.Container,
      MenuItem: styles.MenuItem,
      MenuItemHiddenOnApp: styles.MenuItemHiddenOnApp,
      CloseButton: styles.CloseButton,
      CloseIcon: styles.CloseIcon,
    },
  }),
);

export default NavigationUserMenu;
