declare type Keyword = {
  canonicalUri?: string;
  entities?: SearchableUnionGraphList;
  id?: string;
  tid?: string;
  image?: File;
  label?: string;
  preferredUri?: string;
  settings?: TermSettings;
  media?: Array<ParagraphInterface> | null;
  activeMenuTrail?: ActiveMenuTrail;
  __typename?: string;
};

declare type KeywordGraphList = {
  edges?: Array<KeywordGraphListItem>;
};

declare type KeywordGraphListItem = {
  node?: Keyword;
};
