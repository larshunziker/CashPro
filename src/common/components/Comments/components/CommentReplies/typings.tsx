import { ComponentType } from 'react';
import { IconComponent } from 'src/common/components/Icon/typings';
import { CommentReplyComponent } from '../CommentReply/typings';

export type CommentRepliesProps = {
  commentReplies: Array<CommentReplyGraphListItem>;
};

export type CommentRepliesFactoryOptions = {
  styles:
    | CommentRepliesFactoryOptionsStyles
    | ((props: Record<string, any>) => CommentRepliesFactoryOptionsStyles);
  CommentReply: CommentReplyComponent;
  Icon: IconComponent;
};

export type CommentRepliesFactoryOptionsStyles = {
  Icon: string;
  RepliesWrapper: string;
  Toggle: string;
  ToggleLink: string;
  Wrapper: string;
};

export type CommentRepliesComponent = ComponentType<CommentRepliesProps>;
