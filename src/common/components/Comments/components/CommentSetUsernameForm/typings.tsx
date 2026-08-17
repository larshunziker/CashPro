import { ComponentType, ReactElement } from 'react';

export type CommentSetUsernameFormProps = {
  message?: string | ReactElement;
};

export type CommentSetUsernameFormFactoryOptions = {
  styles: CommentSetUsernameFormFactoryOptionsStyles;
  Button?: ({
    clickHandler,
    text,
  }: {
    clickHandler: any;
    text: string;
  }) => ReactElement;
  commentUsernameMessage?: string | ReactElement;
};

export type CommentSetUsernameFormFactoryOptionsStyles = {
  Button?: string;
  ButtonWrapper: string;
  Message: string;
};

export type CommentSetUsernameFormComponent =
  ComponentType<CommentSetUsernameFormProps>;
