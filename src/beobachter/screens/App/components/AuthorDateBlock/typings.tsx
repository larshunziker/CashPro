export type CreateDateProps = {
  publicationDate: string;
  changeDate: string;
  createDate: string;
  isAuthorVisible?: boolean;
  isModificationDateVisible: boolean;
};

export type AuthorDateBlockProps = {
  article: {
    authors?: AuthorConnection;
    modifyingAuthors?: AuthorConnection;
    publicationDate?: string;
    createDate?: string;
    changeDate?: string;
    showUpdated?: boolean;
    contentTypeLabel?: string;
    source?: string;
    subtypeValue?: string;
  };
  hasContainer?: boolean;
  isAlwaysLeftAligned?: boolean;
  addClass?: string;
};

export type AuthorsProps = {
  authors: AuthorEdge[];
  addClass?: string;
  addClassItem?: string;
};

export type AuthorProps = {
  item: AuthorEdge;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  addClass: string;
  addClassItem: string;
};

export type ModifingyAuthorsProps = {
  authors: AuthorEdge[];
  addClass?: string;
  addClassItem?: string;
};

export type ModifingyAuthorProps = {
  item: AuthorEdge;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  addClass: string;
  addClassItem: string;
};

export type AuthorsImagesProps = {
  authors: AuthorEdge[];
};
