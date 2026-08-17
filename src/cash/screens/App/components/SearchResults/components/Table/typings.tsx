import { SearchCategory } from '../../../../screens/Search/typings';

export type TableProps = {
  items: QuotesUnion[] | IntegrationsUnion[];
  ctaText: string;
  ctaLink: string;
  category: SearchCategory;
  maxItems?: number;
  type?: string;
  hasDropdownIntegration?: boolean;
  ctaLinkStyles?: string;
  count: number;
};
