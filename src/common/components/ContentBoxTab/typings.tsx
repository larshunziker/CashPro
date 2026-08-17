import { ComponentType, ReactElement } from 'react';
import { ContentBoxProps } from '../ContentBox/typings';

export type ContentBoxTabProps = ContentBoxProps;

export type ContentBoxTabFactoryOptionsStyles = {
  Wrapper: string;
  Title: string;
  Link?: string;
  TabWrapper: string;
  TabTitleWrapper: string;
  ActiveTab: string;
  TabTitle: string;
};

export type ContentBoxTabFactoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ContentBoxBodyRenderer: () => (props) => ReactElement;
  title?: string | ((node: ContentBox) => string);
  styles:
    | ContentBoxTabFactoryOptionsStyles
    | ((props: ContentBoxTabProps) => ContentBoxTabFactoryOptionsStyles);
  SingleTeaser?: ComponentType<
    TeaserInterface & {
      component: string;
      node?: TeaserInterface;
      origin?: string;
      itemIndex?: number;
    }
  >;
};
