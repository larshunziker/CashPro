import React from 'react';
import { connect } from 'react-redux';
import navigationUserMenuFactory from '../../../../../../../common/components/NavigationUserMenu/factory';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import Icon from '../../../Icon';
import MenuItem from './components/MenuItem';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import logoDefault from 'graphics/SI_Logo.svg';
import {
  MenuHeaderLogoProps,
  NavigationUserMenuProps,
  UserCockpitMenuItem,
} from '../../../../../../../common/components/NavigationUserMenu/typings';

type NavigationUserMenuPropsInner = NavigationUserMenuProps & {
  setNavigationVisible: (visibleNavigation: string) => void;
};

const MenuHeaderLogo = ({ closeNavigation }: MenuHeaderLogoProps) => (
  <div className={styles.HeaderLogoContent}>
    <span className={styles.LogoPrefix}>Meine</span>
    <Link path="/" onClick={closeNavigation}>
      <Picture
        url={logoDefault}
        alt="Schweizer Illustrierte Logo"
        className={styles.Image}
      />
    </Link>
  </div>
);

const closeNavigationByProps =
  ({ setNavigationVisible }: NavigationUserMenuPropsInner) =>
  (): void => {
    setNavigationVisible('');
  };

const links: Array<UserCockpitMenuItem> = [
  {
    name: 'Merkliste',
    link: '/profile/merkliste',
    iconType: 'IconBookmark',
    trackingClass: 'link-usercockpit-bookmarks',
  },
  {
    name: 'Newsletter',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile/brand-profile?lang=de`,
    iconType: 'IconInboxFull',
    trackingClass: 'link-usercockpit-newsletter',
  },
  {
    name: 'E-Mail-Alerts',
    link: '/profile/alerts',
    iconType: 'IconBell',
    trackingClass: 'link-usercockpit-email-alerts',
  },
  {
    name: 'E-Paper',
    link: '/epapers',
    iconType: 'IconNewspaper',
    trackingClass: 'link-usercockpit-epaper',
  },
  {
    name: 'Abos und Services',
    link: __AUTH0_SERVICES_URI__,
    iconType: 'IconServices',
    trackingClass: 'link-usercockpit-account',
  },
  {
    name: 'Profil bearbeiten',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
    iconType: 'IconGear',
    trackingClass: 'link-usercockpit-profile',
  },
];

const mapDispatchToProps: Record<string, any> = {
  setNavigationVisible,
};

const NavigationUserMenu = navigationUserMenuFactory({
  Icon,
  MenuItem,
  MenuHeaderLogo,
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
    MenuListWrapper: styles.MenuListWrapper,
    MenuItem: styles.MenuItem,
    Container: grid.Container,
    CloseButton: styles.CloseButton,
    CloseIcon: styles.CloseIcon,
  },
});

export default connect(null, mapDispatchToProps)(NavigationUserMenu);
