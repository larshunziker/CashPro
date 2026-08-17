/* istanbul ignore file */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import footerFactory from '../../../../../common/components/Footer/factory';
import Icon from '../Icon';
import SocialMediaBar from '../SocialMediaBar';
import FooterInner from './components/FooterInner';
import FooterLogo from './components/FooterLogo';
import { FOOTER_ID } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/scr */
import { GET_FOOTER } from './queries.preload';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const Footer = footerFactory({
  Logo: FooterLogo,
  Icon,
  SocialMediaBar,
  FooterInner,
  FOOTER_ID,
  morePublicationsLabel: (
    <FormattedMessage
      id="app.footer.morePublicationsLabel"
      description="The label for the button to show the other Ringier Medien Schweiz publications"
      defaultMessage="weitere Publikationen"
    />
  ),
  styles: {
    Wrapper: classNames(styles.Wrapper, grid.HideForPrint),
    FooterHeader: styles.FooterHeader,
    LogoWrapper: styles.LogoWrapper,
    SocialMediaBarWrapper: styles.SocialMediaBarWrapper,
    MenuSection: styles.MenuSection,
    PublicationSection: '',
    PublicationCollapseHeader: styles.PublicationCollapseHeader,
    PublicationCollapseHeaderCol: styles.PublicationCollapseHeaderCol,
    Disclaimer: styles.Disclaimer,
    CollapseToggleWrapper: styles.CollapseToggleWrapper,
    PublicationToggle: styles.PublicationToggle,
    PublicationToggleIsOpen: styles.PublicationToggleIsOpen,
    PublicationCollapseBody: styles.PublicationCollapseBody,
    PublicationCollapseBodyIsOpen: styles.PublicationCollapseBodyIsOpen,
    PublicationList: styles.PublicationList,
    Open: '',
    ExpansionIcon: styles.ExpansionIcon,
    ExpansionIconOpen: styles.ExpansionIconOpen,
    ListItem: styles.ListItem,
    Link: styles.Link,
  },
});

const withData = withProps(GET_FOOTER);

export default withData(Footer);
