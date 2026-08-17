import { ComponentType, ReactElement } from 'react';
import { DocumentNode } from 'graphql';
import { IconComponent } from '../Icon/typings';
import { CommentComponent } from './components/Comment/typings';
import { CommentSortComponent } from './components/CommentSort/typings';
import { CommentingComponent } from './components/Commenting/typings';

export type CommentsProps = {
  articleId: string;
  gcid: string;
  commentStatus: string;
  isInView?: boolean;
  lastDate?: string;
};

type PagerProps = {
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
  updatePage: Function;
  text: string;
  isLoading: boolean;
};

export type CommentsQueryComponentProps = {
  commentsById: CommentConnection;
};

export type CommentsFactoryOptions = {
  grid: Record<string, any>;
  styles: CommentsFactoryOptionsStyles;
  Icon: IconComponent;
  Comment: CommentComponent;
  Commenting: CommentingComponent;
  CommentSort: CommentSortComponent;
  Pager: React.ComponentType<any>;
  pagerType: string;
  setCommentsCountAction: Function;
  GET_COMMENTS: DocumentNode;
  pager?: (props: PagerProps) => ReactElement;
};

export type CommentsFactoryOptionsStyles = {
  Container: string;
  Column: string;
  Icon: string;
  Inner: string;
  Pager: string;
  Title: string;
  Counter?: string;
  Info?: string;
  TitleWrapper?: string;
  ViafouraContainer?: string;
};

export type CommentsComponent = ComponentType<CommentsProps>;
