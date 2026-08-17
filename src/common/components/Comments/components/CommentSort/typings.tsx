import { ComponentType } from 'react';

export type CommentSortProps = {
  isDescending: boolean;
  toggleSortOrder: Function;
  isReverseClientSide: boolean;
  isClientSideSorted: boolean;
  setClientSideSorted: (isClientSideSorted: boolean) => void;
};

export type CommentSortFactoryOptions = {
  Icon: any;
  styles: CommentSortFactoryOptionsStyles;
};

export type CommentSortFactoryOptionsStyles = {
  Action: string;
  Icon: string;
  Sort: string;
  Text: string;
};

export type CommentSortComponent = ComponentType<CommentSortProps>;
