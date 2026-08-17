import React from 'react';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import footerFactory from '../../../../../common/components/Footer/factory';
import Link from '../../../../../common/components/LinkLegacy';
import Icon from '../Icon';
import SocialMediaBarBIL from '../SocialMediaBar/components/SocialMediaBarBIL';
import SocialMediaBarHZ from '../SocialMediaBar/components/SocialMediaBarHZ';
import SocialMediaBarIns from '../SocialMediaBar/components/SocialMediaBarINS';
import FooterInner from './components/FooterInner';
import {
  PUBLICATION_BIL,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../shared/constants/publications';
import { ROUTE_BIL } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/ */
import { GET_FOOTER } from './queries.preload';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import footerLogoBIL from '../../assets/graphics/bilanz-logo-white.svg';
import footerLogoHZ from '../../assets/graphics/hz-logo-white.svg';
import footerLogoINS from '../../assets/graphics/hz_insurance_logo_white.svg';

/* @ts-ignore TODO: TS7031 ->  Binding element 'publication' implicitly has an 'any' type. */
export const Logo = ({ publication }) => {
  const getLogoByPublication = {
    [PUBLICATION_BIL]: footerLogoBIL,
    [PUBLICATION_SWISS_INSURANCE]: footerLogoINS,
  };

  const getLinkByPublication = {
    [PUBLICATION_BIL]: ROUTE_BIL,
    [PUBLICATION_SWISS_INSURANCE]: '/insurance',
  };

  return (
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ bilanz */
    <Link link={{ path: getLinkByPublication[publication] || '/' }}>
      <img
        className={classNames(styles.FooterLogo, {
          [styles.LogoBilanz]: publication === PUBLICATION_BIL,
          [styles.LogoInsurance]: publication === PUBLICATION_SWISS_INSURANCE,
        })}
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ bilanz */
        src={getLogoByPublication[publication] || footerLogoHZ}
        alt={`Logo von ${publication}`}
      />
    </Link>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'publication' implicitly has an 'any' type. */
const SocialMediaBar = ({ publication }) => {
  switch (publication) {
    case PUBLICATION_BIL:
      return <SocialMediaBarBIL />;
    case PUBLICATION_SWISS_INSURANCE:
      return <SocialMediaBarIns />;
    default:
      return <SocialMediaBarHZ />;
  }
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
});

const withData = withProps(GET_FOOTER);

export default withData(Footer);
