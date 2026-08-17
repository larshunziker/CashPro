import { ComponentType, ReactElement, ReactNode } from 'react';

export type HeaderProps = {
  children?: ReactNode;
  hasStickiness?: boolean;
  subtypeValue?: string;
  publication?: string;
  isHome?: boolean;
  isMarketingPageReducedHeader?: boolean;
  isMarketingPage?: boolean;
  isPuzzlePage?: boolean;
  contentType?: string;
  channel?: Channel;
  isInArticle?: boolean;
};

type ObserverConfigsByProps = (props: HeaderProps) => Array<InViewConfig>;

export type HeaderFactoryOptionsStylesByProps<T> = (
  props: T,
) => HeaderFactoryOptionsStyles;

export type HeaderFactoryOptions<T> = {
  HeaderInner: ComponentType<T>;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  PartnerClaim?: (props) => ReactElement;
  placeholderId: string;
  observerConfigs?: Array<InViewConfig> | ObserverConfigsByProps;
  reInitObserverOnLocationChange?: [boolean, boolean];
  reInitObserverOnViewportLabelChange?: [boolean, boolean];
  vertical?: string;
  styles: HeaderFactoryOptionsStyles | HeaderFactoryOptionsStylesByProps<T>;
};

export type HeaderFactoryOptionsStyles = {
  Wrapper: string;
  IsSticky: string;
  Header: string;
  Placeholder: string;
};

export type HeaderAreaProps = {
  isStickyEnabled?: boolean;
  isHome?: boolean;
};

export type HeaderAreaComponent = ComponentType<HeaderAreaProps>;
