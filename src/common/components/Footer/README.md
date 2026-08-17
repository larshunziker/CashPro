# Footer Factory

## Usage

Footer factory call inside of the **APP**:

```jsx
import React from 'react';
import withProps from 'recompose/withProps';
import footerFactory from '../../../../../common/components/Footer/factory';
import Link from '../../../../../common/components/LinkLegacy';
import Icon from '../Icon';
import SocialMediaBar from '../SocialMediaBar/components/SocialMediaBarHZ';
import FooterInner from './components/FooterInner';
import { GET_FOOTER } from './queries.preload';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import footerLogo from 'graphics/hz-logo-with-claim-white.svg';

export const Logo = () => (
  <Link link={{ path: '/' }}>
    <img className={styles.FooterLogo} src={footerLogo} alt="Handelszeitung" />
  </Link>
);

const Footer = footerFactory({
  Logo,
  Icon,
  SocialMediaBar,
  FooterInner,
  styles: {
    Wrapper: styles.Footer,
    FooterHeader: styles.FooterHeader,
    LogoWrapper: styles.LogoWrapper,
    SocialMediaBarWrapper: styles.SocialMediaBarWrapper,
    PublicationSection: sections.PublicationSection,
    PublicationCollapseHeader: styles.PublicationCollapseHeader,
    PublicationCollapseHeaderCol: styles.PublicationCollapseHeaderCol,
    Disclaimer: styles.Disclaimer,
    CollapseToggleWrapper: styles.CollapseToggleWrapper,
    PublicationToggle: styles.PublicationToggle,
    PublicationToggleIsOpen: styles.PublicationToggleIsOpen,
    PublicationCollapseBody: styles.PublicationCollapseBody,
    PublicationCollapseBodyIsOpen: styles.PublicationCollapseBodyIsOpen,
    PublicationList: styles.PublicationList,
    Open: styles.open,
    ExpansionIcon: styles.ExpansionIcon,
    ExpansionIconOpen: styles.ExpansionIconOpen,
    ListItem: styles.ListItem,
    Link: styles.Link,
  },
});

const withData = withProps(GET_FOOTER);

export default withData(Footer);
```

Footer Component usage:

```html
<footer />
```
