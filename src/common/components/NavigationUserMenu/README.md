# Navigation User Menu Factory

The Navigation User Menu is used to display the usercockpit for users which are logged in with their Ringier Connect account.

## Props

There are actually no props, just make sure that you connect the action to close the menu :)

## Usage

NavigationUserMenu factory call inside of the **APP**:

```jsx
import React, { type Element } from 'react';
import { connect } from 'react-redux';
import navigationUserMenuFactory from 'NavigationUserMenu/factory';
import { setNavigationVisible } from 'actions/navigation';
import MenuItem from 'NavigationUserMenu/components/MenuItem';
import Icon from 'Icon';
import Img from 'Img';
import Link from 'LinkLegacy';
import grid from '@grid.legacy.css';
import styles from './styles.legacy.css';
import beoLogo from 'graphics/logo_beobachter.svg';
import {
  type NavigationUserMenuProps,
  MenuHeaderProps,
  UserCockpitMenuItem,
} from 'NavigationUserMenu/typings';

type NavigationUserMenuPropsInner = NavigationUserMenuProps & {
  setNavigationVisible: Function,
};

const MenuHeaderLogo = ({ closeNavigation }: MenuHeaderProps): Element<any> => (
  <div className={styles.HeaderLogoContent}>
    <Link link={{ path: '/' }} onClick={closeNavigation}>
      <span className={styles.LogoPrefix}>Mein Logo</span>
    </Link>
  </div>
);

const closeNavigationByProps = ({
  setNavigationVisible,
}: NavigationUserMenuPropsInner) => (): void => {
  setNavigationVisible(null);
};

const links: Array<UserCockpitMenuItem> = [
  {
    name: 'Newsletter',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile/brand-profile?lang=de`,
    iconType: 'IconEnvelope',
    trackingClass: 'link-usercockpit-newsletter',
  },
  {
    name: 'E-Mail-Alerts',
    link: '/profile/alerts',
    iconType: 'IconBell',
    trackingClass: 'link-usercockpit-email-alerts',
  },
  {
    name: 'Profil bearbeiten',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
    iconType: 'IconGear',
    trackingClass: 'link-usercockpit-profile',
  },
];

const mapDispatchToProps: Object = {
  setNavigationVisible,
};

export default connect(
  null,
  mapDispatchToProps,
)(
  navigationUserMenuFactory({
    Icon,
    MenuItem,
    MenuHeaderLogo,
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
      MenuListWrapper: styles.MenuListWrapper,
      MenuItem: styles.MenuItem,
      CloseButton: styles.CloseButton,
      CloseIcon: styles.CloseIcon,
    },
  }),
);
```

Component usage:

```jsx
<NavigationUserMenu />
```
