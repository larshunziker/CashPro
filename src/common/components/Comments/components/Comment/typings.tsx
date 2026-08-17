import { ComponentType } from 'react';
import { CommentsQueryComponentProps } from '../../typings';
import { CommentBodyComponent } from '../CommentBody/typings';
import { CommentRepliesComponent } from '../CommentReplies/typings';
import { CommentReplyFormComponent } from '../CommentReplyForm/typings';

export type CommentProps = {
  articleId?: string;
  gcid?: string;
  id?: string;
  name: string;
  displayName?: string;
  createDate: string;
  body: string;
  commentReplies?: CommentReplyGraphList | null;
  commentStatus?: string;
  commentsData?: CommentsQueryComponentProps;
};

export type CommentFactoryOptions = {
  styles: CommentFactoryOptionsStyles;
  CommentBody: CommentBodyComponent;
  CommentReplies: CommentRepliesComponent;
  CommentReplyForm: CommentReplyFormComponent;
};

export type CommentComponent = ComponentType<CommentProps>;

export type CommentFactoryOptionsStyles = {
  Comment: string;
};
