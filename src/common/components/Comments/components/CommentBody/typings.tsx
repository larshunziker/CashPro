import { ComponentType, ReactElement } from 'react';

export type CommentBodyProps = {
  createDate: string;
  body: any;
  name: string;
};

type CommentAccountLogoProps = {
  name: string;
  logo: string;
  logoAlt: string;
};

export type CommentBodyFactoryOptions = {
  publicationAccountName: string;
  logo: any; //TODO: Logo typing here and write first letter in uppercase since it's a component
  logoAlt: string;
  accountLogo?: (props: CommentAccountLogoProps) => ReactElement;
  getFormattedElapsedDate: Function;
  elapsedDateFormat: string;
  styles: CommentBodyFactoryOptionsStyles;
};

export type CommentBodyFactoryOptionsStyles = {
  Body: string;
  Date: string;
  Logo: string;
  Name: string;
  Text: string;
};

export type CommentBodyComponent = ComponentType<CommentBodyProps>;
