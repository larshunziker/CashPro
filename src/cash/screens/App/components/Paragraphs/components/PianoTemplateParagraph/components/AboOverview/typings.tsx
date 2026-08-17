export type AboOverviewProps = {
  desktopData: DesktopDataProps;
  mobileData: MobileDataProps;
  id?: string;
};

export type DesktopDataProps = {
  titleRows: TitleRowProps[];
  rows: RowProps[];
  footerRows: FooterRowProps[];
};

export type MobileDataProps = {
  cards: CardProps[];
  id?: string;
};

export type TitleRowProps = {
  title: string;
  subtitle1: string;
  subtitle2: string;
  buttonText: string;
  buttonIcon: string;
  buttonStyle: 'primary' | 'secondary';
  buttonPath: string;
  bankPath: string;
  hideButton?: boolean;
  hasBadge?: boolean;
};

export type RowProps = {
  text: string;
  ticks: boolean[];
  tooltip: string;
};

export type FooterRowProps = {
  text: string;
  path: string;
};

export type AdvantageProps = {
  text: string;
  info: string;
};

export type CardProps = {
  title: string;
  text: string;
  price: string;
  buttonIcon: string;
  buttonText: string;
  buttonStyle: 'primary' | 'secondary';
  buttonPath: string;
  pianoTemplateId: string;
  advantages: AdvantageProps[];
  linkText: string;
  linkPath: string;
  profi: boolean;
  hideButton?: boolean;
  hasBadge?: boolean;
};

export type TooltipProps = {
  text: string;
  active: boolean;
  toggle: (index: number | void) => void;
};
