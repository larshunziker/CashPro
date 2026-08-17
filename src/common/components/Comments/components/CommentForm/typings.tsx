import React, { ComponentType, ReactElement } from 'react';
import { MutationFunction } from '@apollo/client';

export type CommentFormProps = {
  articleId: string;
  gcid: string;
  type: string;
  commentId?: string;
  buttonText?: string;
  errorMessage?: string;
  placeholder?: string;
  loginMessage?: string;
  successMessage?: string;
  required?: boolean;
  rows?: number;
  commentsData?: Record<string, any>;
  mutate?: MutationFunction;
};

export type CommentFormFactoryOptions = {
  styles: CommentFormFactoryOptionsStyles;
  InputField: React.ComponentType<any>;
  CommentLoginForm: React.ComponentType<any>;
  CommentSetUsernameForm: React.ComponentType<any>;
  appSuccessMessageBox?: ({
    successMessage,
  }: {
    successMessage: string;
  }) => ReactElement;
  Button?: ({
    clickHandler,
    text,
    isLoading,
  }: {
    clickHandler: any;
    text: string;
    isLoading: boolean;
  }) => ReactElement;
  appSuccessMessage?: string;
  isFullnameRequired?: boolean;
};

export type CommentFormFactoryOptionsStyles = {
  Button?: string;
  InputField: string;
  Label: string;
  LabelAbove: string;
  SuccessMessage: string;
};

export type CommentFormComponent = ComponentType<CommentFormProps>;
