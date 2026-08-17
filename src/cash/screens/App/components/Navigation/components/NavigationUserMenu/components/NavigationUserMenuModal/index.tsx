import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import { setNavigationVisible } from '../../../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import Logo from '../../../../../Logo';
import MenuItem from '../MenuItem';
import MenuListHeader from '../MenuListHeader';
import { links } from '../../constants';
import styles from './styles.legacy.css';
import {
  MenuHeaderLogoProps,
  NavigationUserMenuProps,
} from '../../../../../../../../../common/components/NavigationUserMenu/typings';

type NavigationUserMenuPropsInner = NavigationUserMenuProps & {
  setNavigationVisible: (visibleNavigation: string) => void;
};

export const MenuHeaderLogo = ({ closeNavigation }: MenuHeaderLogoProps) => (
  <div className={styles.HeaderLogoContent}>
    <Link path="/" className={styles.HeaderLogo} onClick={closeNavigation}>
      <Logo />
    </Link>
  </div>
);

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
    MenuItem,
    MenuHeaderLogo,
    MenuListHeader,
    links,
    closeNavigation: closeNavigationByProps,
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
    },
  }),
);

export default connect(null, mapDispatchToProps)(NavigationUserMenu);
