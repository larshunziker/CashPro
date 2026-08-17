declare type CommentConnection = {
  pageInfo?: PageInfo;
  edges?: Array<CommentGraphListItem> | null;
  count?: number;
  totalCount?: number;
};

declare type CommentBody = {
  id?: string;
  body?: string;
  createDate?: string;
  name?: string;
  cid?: string;
  canonicalUri?: string;
  __typename?: string;
};

declare type CommentReply = CommentBody;

declare type CommentReplyGraphListItem = {
  node?: CommentReply;
  __typename?: string;
};

declare type CommentReplyGraphList = {
  edges?: Array<CommentReplyGraphListItem>;
  __typename?: string;
};

declare type CommentGraphList = {
  edges?: Array<CommentGraphListItem>;
  count?: number;
};

declare type CommentGraphListItem = {
  node?: Comment;
};
