declare type BookmarkTeaserData = {
  id: string;
  title: string;
  shortTitle: string;
  lead: string;
  createDate: string;
  revisionDate: string;
  changedDate: string;
  showUpdated: boolean;
  hasVideo: boolean;
  teaserImage: ImageParagraph;
  preferredUri: string;
};

declare type Bookmark = {
  id: string;
  read: boolean;
  dateAdded: number;
  node?: BookmarkTeaserData;
};

declare type BookmarkGraphList = {
  edges?: Array<Bookmark>;
};
