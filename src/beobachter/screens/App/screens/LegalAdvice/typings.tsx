import { ArticleType } from './components/LegalAdviceArticleTypes/typings';

export type LegalAdviceCategory = {
  descriptionLong?: string;
  title?: string;
  count?: number;
  id: string;
  level?: number;
  slug?: string;
  sortKey?: string;
  parentId?: string;
  path?: string;
  isKMU?: boolean;
  parent?: LegalAdviceCategory;
  children?: LegalAdviceCategory[];
};

export type LegalAdviceSearchResult = {
  id: string;
  description?: string;
  title: string;
  summary: string;
  typeCode: string;
  cat1Ids: string[];
  cat2Ids: string[];
  cat3Ids: string[];
  specialInterest?: string[];
  restrictionStatus?: string;
};

export type LegalAdviceSearchResponse = {
  items: any;
  articlesSearchResults: {
    articles: LegalAdviceSearchResult[];
    resultsNav: {
      totalResults: number;
      resultsEnd: number;
    };
  };
  category?: LegalAdviceCategory;
  articleTypes: ArticleType[];
};

export type RelatedContentLegalAdvice = {
  data?: RelatedContentUnionConnection & {
    node?: RelatedContentLegalAdviceEdge;
  };
};

export type RelatedContentLegalAdviceEdge = {
  node?: RelatedContentUnion & {
    toolTypeLabel?: string;
  };
};
