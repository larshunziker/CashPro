import { ComponentType, ReactElement } from 'react';
import { IconComponent } from '../Icon/typings';
import { SocialMediaBarComponent } from '../SocialMediaBar/typings';

export type FooterProps = {
  footerPrimaryMenu: Menu;
  footerPrimaryMenuFr?: Menu;
  publicationsMenu: Menu;
  publication?: string;
  isMarketingPage?: boolean;
};

export type FooterInnerProps = {
  footerPrimaryMenu: Menu;
  footerPrimaryMenuFr?: Menu;
};

type LogoProps = {
  publication?: string;
};

export type FooterFactoryOptions = {
  FooterInner: ComponentType<FooterInnerProps>;
  SocialMediaBar: SocialMediaBarComponent;
  Logo: (props: LogoProps) => ReactElement;
  Icon: IconComponent;
  FOOTER_ID?: string;
  styles: FooterFactoryOptionsStyles;
  morePublicationsLabel?: ReactElement | string;
  raschLabel?: ReactElement | string;
};

export type FooterFactoryOptionsStyles = {
  Wrapper: string;
  FooterHeader: string;
  LogoWrapper: string;
  SocialMediaBarWrapper: string;
  MenuSection?: string;
  PublicationSection: string;
  PublicationCollapseHeader: string;
  PublicationCollapseHeaderCol: string;
  Disclaimer: string;
  CollapseToggleWrapper: string;
  PublicationToggle: string;
  PublicationToggleIsOpen: string;
  PublicationCollapseBody: string;
  PublicationCollapseBodyIsOpen: string;
  PublicationList: string;
  Open: string;
  ExpansionIcon: string;
  ExpansionIconOpen: string;
  ListItem: string;
  Link: string;
};
