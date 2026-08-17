import { ComponentType } from 'react';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import Icon from '../../../../../Icon';
import MenuItem from '../MenuItem';
import { links } from '../../constants';
import styles from './styles.legacy.css';
import { NavigationUserMenuProps } from '../../../../../../../../../common/components/NavigationUserMenu/typings';

const NavigationUserMenu: ComponentType<NavigationUserMenuProps> =
  navigationUserMenuFactory({
    Icon,
    /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<MenuItemProps>' is not assignable to type '(props */
    MenuItem,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '((props */
    MenuHeaderLogo: null,
    links,
    closeNavigation: () => noop,
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
      MenuItemHiddenOnApp: styles.MenuItemHiddenOnApp,
    },
  });

export default NavigationUserMenu;
