declare type SearchableUnionGraphList = {
  count?: number;
  edges?: SearchableUnionGraphListItem[];
};

declare type SearchableUnionGraphListItem = {
  node?: SearchableUnionNode;
};

declare type SearchableUnionNode =
  | Article
  | Dossier
  | ExplainingArticle
  | ImageGallery
  | LandingPage
  | NativeAdvertising
  | Organization
  | Page
  | Person
  | Product
  | Recipe
  | Sponsor
  | Topic;
