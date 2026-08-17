import { ComponentType } from 'react';
import { IconComponent } from './../../../Icon/typings';

export type AutocompleteFactoryProps = {
  menuCloseHandler?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  queryString: string;
  theme?: string;
  minQueryLength: number;
  isHybridApp?: boolean;
};

export type AutocompleteFactoryOptions = {
  Icon: IconComponent;
  IconTypes?: {
    CamIcon: string;
    VideoIcon: string;
  };
  styles:
    | AutocompleteFactoryOptionsStyles
    | ((props: AutocompleteFactoryProps) => AutocompleteFactoryOptionsStyles);
};

export type AutocompleteFactoryOptionsStyles = {
  Wrapper: string;
  Link: string;
  LinkWrapper?: string;
  IconStyle?: string;
};

export type AutocompleteComponent = ComponentType<AutocompleteFactoryProps>;
