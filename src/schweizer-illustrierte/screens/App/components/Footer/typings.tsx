type MenuByName = {
  id: string;
  name: string;
  links: MenuTreeItemConnection;
};

export type FooterProps = {
  addClass?: string;
  menuByName: MenuByName;
  isMarketingPageReducedHeader?: boolean;
};
