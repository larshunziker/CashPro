import React from 'react';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import footerFactory from '../../../../../common/components/Footer/factory';
import Icon from '../Icon';
import RefetchGqlDataLink from '../RefetchGqlDataLink';
import SocialMediaBar from '../SocialMediaBar';
import FooterInner from './components/FooterInner';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/Ap */
import { GET_FOOTER } from './queries.preload';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import footerLogo from '../../assets/graphics/cash-logo-white.svg';

export const Logo = () => {
  return (
    <RefetchGqlDataLink title="Startseite" ariaLabel="Startseite" path="/">
      <img className={styles.FooterLogo} src={footerLogo} alt={`cash`} />
    </RefetchGqlDataLink>
  );
};

const Footer = footerFactory({
  Logo,
  Icon,
  SocialMediaBar,
  FooterInner,
  raschLabel: 'Ringier AG | Ringier Medien Schweiz',
  morePublicationsLabel: 'weitere Publikationen',
  styles: {
    Wrapper: classNames(styles.Footer, grid.HideForPrint),
    FooterHeader: styles.FooterHeader,
    LogoWrapper: styles.LogoWrapper,
    SocialMediaBarWrapper: styles.SocialMediaBarWrapper,
    PublicationSection: styles.PublicationSection,
    PublicationCollapseHeader: styles.PublicationCollapseHeader,
    PublicationCollapseHeaderCol: styles.PublicationCollapseHeaderCol,
    Disclaimer: styles.Disclaimer,
    CollapseToggleWrapper: styles.CollapseToggleWrapper,
    PublicationToggle: styles.PublicationToggle,
    PublicationToggleIsOpen: styles.PublicationToggleIsOpen,
    PublicationCollapseBody: styles.PublicationCollapseBody,
    PublicationCollapseBodyIsOpen: styles.PublicationCollapseBodyIsOpen,
    PublicationList: styles.PublicationList,
    Open: styles.Open,
    ExpansionIcon: styles.ExpansionIcon,
    ExpansionIconOpen: styles.ExpansionIconOpen,
    ListItem: styles.ListItem,
    Link: styles.Link,
  },
});

const withData = withProps(GET_FOOTER);

export default withData(Footer);
