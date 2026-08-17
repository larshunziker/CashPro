import { LinkComponent } from 'src/common/components/Link/typings';
import { ComponentType } from 'react';

export type AlphabetProps = {
  activeLetter: string;
  layout: string;
  url: string;
  theme?: string;
};

export type AlphabetFactoryOptionsStyles = {
  ActiveLink: string;
  Link: string;
  MobileWrapper: string;
  Wrapper: string;
};

export type AlphabetFactoryOptions = {
  Link: LinkComponent;
  styles:
    | AlphabetFactoryOptionsStyles
    | ((props: AlphabetProps) => AlphabetFactoryOptionsStyles);
};

export type AlphabetComponent = ComponentType<AlphabetProps>;
