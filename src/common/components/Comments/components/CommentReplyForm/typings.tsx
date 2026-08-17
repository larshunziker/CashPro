import { ComponentType } from 'react';
import { CommentFormComponent } from '../CommentForm/typings';
import { CommentReplyLinkComponent } from '../CommentReplyLink/typings';
import { CommentsQueryComponentProps } from '../../typings';

export type CommentReplyFormProps = {
  articleId: string;
  gcid: string;
  commentId: string;
  name: string;
  commentsData?: CommentsQueryComponentProps;
};

export type CommentReplyFormFactoryOptions = {
  styles:
    | CommentReplyFormFactoryOptionsStyles
    | ((props: Record<string, any>) => CommentReplyFormFactoryOptionsStyles);
  CommentForm: CommentFormComponent;
  CommentReplyLink: CommentReplyLinkComponent;
  placeholder?: string;
  loginMessage?: string;
};

export type CommentReplyFormFactoryOptionsStyles = {
  Form: string;
  FormWrapper: string;
};

export type CommentReplyFormComponent = ComponentType<CommentReplyFormProps>;
