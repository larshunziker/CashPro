import { ReactElement } from 'react';

export type MinistageAuthorProps = {
  ministageAuthor: MinistageAuthor;
  origin?: string;
};

export type MinistageAuthorFactoryOptionStyles = {
  Container?: string;
  Wrapper: string;
  TitleWrapper: string;
  Title: string;
  Link: string;
};

export type MinistageAuthorStylesByProps = (
  props: MinistageAuthorProps,
) => MinistageAuthorFactoryOptionStyles;

export type MinistageAuthorFactoryOptions = {
  styles: MinistageAuthorFactoryOptionStyles | MinistageAuthorStylesByProps;
  teaserGridLayout: string;
  TeaserGrid: any;
  Icon: ReactElement;
};
