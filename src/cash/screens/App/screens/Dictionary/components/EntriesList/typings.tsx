type TitleAliasGraphListItem = {
  node?: TitleAlias;
};

type TitleAliasGraphList = {
  count?: number;
  edges?: TitleAliasGraphListItem[];
};

export type EntriesListProps = {
  list: TitleAliasGraphList;
};
