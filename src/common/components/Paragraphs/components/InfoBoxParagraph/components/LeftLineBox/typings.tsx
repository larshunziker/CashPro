import { ReactElement, ReactNode } from 'react';
import { InfoBoxParagraphProps } from '../../typings';

export { InfoBoxParagraphProps };

export type LeftLineBoxFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper: string;
  Border: string;
  Devider: string;
  ParagraphWrapper: string;
};

export type LeftLineBoxFactoryOptions = {
  paragraphsRenderer: (props: LeftLineBoxProps) => ReactElement;
  styles:
    | LeftLineBoxFactoryOptionsStyles
    | ((props: LeftLineBoxProps) => LeftLineBoxFactoryOptionsStyles);
};

export type LeftLineBoxProps = {
  infoBoxParagraph: InfoBoxParagraph;
  articleColStyle?: string;
  origin?: string;
  children?: ReactNode;
};
