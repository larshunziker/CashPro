import React from 'react';
import { useSelector } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../../../common/components/NavigationUserMenu/factory';
import Icon from '../../../../../../components/Icon';
import MenuItem from '../MenuItem';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import { getHybridAppEpaperRedirectUrl } from '../../../../../../../../shared/helpers/hybridAppRedirectToEpaper';
import { links } from '../../constants';
import { URL_EPAPER_DESKTOP } from '../../../../../../constants';
import styles from './styles.legacy.css';

const navigationUserMenuOptions = {
  Icon,
  MenuItem,
  closeNavigation: () => noop,
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
};

// Both link sets and their factory components are created once at module level.
// This guarantees stable component references regardless of isHybridApp changes,
// avoiding React unmounting the subtree when isHybridApp transitions false → true.
const hybridLinks = links.map((item) => {
  if (item.link === URL_EPAPER_DESKTOP) {
    return { ...item, link: getHybridAppEpaperRedirectUrl() };
  }
  return item;
});

const DefaultNavigationUserMenu = navigationUserMenuFactory({
  ...navigationUserMenuOptions,
  links,
});

const HybridNavigationUserMenu = navigationUserMenuFactory({
  ...navigationUserMenuOptions,
  links: hybridLinks,
});

const NavigationUserMenu = () => {
  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state)?.isHybridApp || false,
  );

  return isHybridApp ? (
    <HybridNavigationUserMenu />
  ) : (
    <DefaultNavigationUserMenu />
  );
};

export default NavigationUserMenu;
