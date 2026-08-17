import { ComponentType, ReactElement } from 'react';

export type ExpansionPanelProps = {
  children?: ReactElement | ReactElement[];
  title?: string | ReactElement;
  addClass?: string;
  duration?: number;
  isOpen?: boolean;
  boldTitle?: boolean;
  origin?: string;
  type?: string;
  theme?: string;
  ariaLabel?: string;
  isFirstMobileHeader?: boolean;
  isHeaderLinkClickable?: boolean;
  path?: string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
  onLinkClick?: (e) => void;
  toggleOnChildrenClick?: boolean;
};

export type ExpansionPanelFactoryOptions = {
  header?: Function | ReactElement;
  footer?: Function | ReactElement;
  initialHeight?: number;
  checkIfContentFitsInHeight?: boolean;
  styles:
    | ExpansionPanelFactoryOptionsStyles
    | ((props: Record<string, any>) => ExpansionPanelFactoryOptionsStyles);
};

export type ExpansionPanelFactoryOptionsStyles = {
  ExpansionPanel: string;
  IsOpen: string;
  Header: string;
  HeaderContentWrapper?: string;
  Title?: string;
  BoldTitle: string;
  Spacer: string;
  Icon: string;
  ArrowIcon: string;
  Content: string;
  LinkWrapper?: string;
  ToggleWrapper?: string;
  NotExpandable?: string;
};

export type ExpansionPanelComponent = ComponentType<ExpansionPanelProps>;
