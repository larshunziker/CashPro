import React, { ComponentType } from 'react';
import { CommentProps } from '../Comment/typings';

export type CommentReplyFactoryOptions = {
  styles: CommentReplyFactoryOptionsStyles;
  CommentBody: React.ComponentType<any>;
};
export type CommentReplyFactoryOptionsStyles = {
  Inner: string;
  Reply: string;
};

export type CommentReplyComponent = ComponentType<CommentProps>;
