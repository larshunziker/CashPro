export type ContentLink = {
  anchorLink: string;
  node: HTMLElement;
  active?: boolean;
  isSectionTitle?: boolean;
};

export type HeadingElement = {
  anchorLink: string;
  text: string;
  isSectionTitle?: boolean;
};

export type TableOfContentsProps = {
  headings: (HeadingElement | HeadingElement[])[];
  shouldHideContent: boolean;
  shouldObserve?: boolean;
  customScrollOffset?: number;
};

export type TableOfContentsFactoryOptions = {
  intersectionObserverOptions?: IntersectionObserverInit;
  scrollOffset?: number;
  styles: {
    Wrapper: string;
    InnerWrapper: string;
    Header: string;
    Link: string;
    SecondLevelListEl: string;
    FirstLevelLink: string;
    ActiveLink: string;
    Divider: string;
    HiddenMdUp: string;
  };
};
