export type LinkType = Link & {
  linkRel?: string;
};

export type LinkGraphList = {
  edges?: LinkGraphListItem[];
};

export type LinkGraphListItem = {
  node?: Link;
};
