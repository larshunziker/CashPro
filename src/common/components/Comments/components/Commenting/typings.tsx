import React, { ComponentType } from 'react';
import { CommentsQueryComponentProps } from '../../typings';

export type CommentingProps = {
  articleId: string;
  gcid: string;
  commentsData?: CommentsQueryComponentProps;
};

export type CommentingFactoryOptions = {
  styles:
    | CommentingFactoryOptionsStyles
    | ((props: CommentingProps) => CommentingFactoryOptionsStyles);
  CommentForm: React.ComponentType<any>;
  Icon: React.ComponentType<any>;
  commentTitle?: string;
  commentFormLabel?: string;
  loginMessage?: string;
};

export type CommentingFactoryOptionsStyles = {
  Icon: string;
  IconChevronUpActive: string;
  Logout: string;
  Status?: string;
  StatusWrapper: string;
  Title: string;
  Wrapper: string;
};

export type CommentingComponent = ComponentType<CommentingProps>;
