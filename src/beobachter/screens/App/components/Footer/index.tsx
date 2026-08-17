import React from 'react';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import footerFactory from '../../../../../common/components/Footer/factory';
import Icon from '../Icon';
import SocialMediaBar from '../SocialMediaBar';
import FooterInner from './components/FooterInner';
import RefetchGqlDataLink from '../RefetchGqlDataLink';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/beobachter/scre */
import { GET_FOOTER } from './queries.preload';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import footerLogo from '../../assets/graphics/logo.svg';
import { FooterProps } from './typings';

export type FooterPropsInner = FooterProps;
export const Logo = () => {
  return (
    <RefetchGqlDataLink title="Startseite" ariaLabel="Startseite" path="/">
      <img className={styles.FooterLogo} src={footerLogo} alt={`beobachter`} />
    </RefetchGqlDataLink>
  );
};

const Footer = footerFactory({
  Logo,
  Icon,
  SocialMediaBar,
  FooterInner,
  styles: {
    Wrapper: classNames(styles.Footer, grid.HideForPrint),
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
    Open: styles.Open,
    ExpansionIcon: styles.ExpansionIcon,
    ExpansionIconOpen: styles.ExpansionIconOpen,
    ListItem: styles.ListItem,
    Link: styles.Link,
  },
  morePublicationsLabel: 'weitere Publikationen Anzeigen',
});

const withData = withProps(GET_FOOTER);

export default withData(Footer);
