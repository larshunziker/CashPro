import { ReactElement } from 'react';
import { LinkComponent } from '../Link/typings';

export type EditButtonsProps = {
  editContentUri: string;
  editRelationUri?: string;
  cloneContentUri?: string;
  origin?: string;
};

export type EditButtonsFactoryOptionsStyles = Readonly<{
  Wrapper: string;
  WrapperInner: string;
  ListWrapper: string;
  ListItem: string;
  Link: string;
  CloseButtonWrapper: string;
  CloseButton: string;
}>;

export type EditButtonsFactoryOptions = {
  closeIcon?: ReactElement;
  styles:
    | ((props: any) => EditButtonsFactoryOptionsStyles)
    | EditButtonsFactoryOptionsStyles;
  Link: LinkComponent;
};
