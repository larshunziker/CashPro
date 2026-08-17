import { ReactElement } from 'react';
import { InfoBoxParagraphProps } from '../../typings';

export type DefaultBoxFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper: string;
  ParagraphWrapper: string;
};

export type DefaultBoxFactoryOptions = {
  title?: ReactElement | ((props: InfoBoxParagraphProps) => ReactElement);
  paragraphsRenderer: (props: InfoBoxParagraphProps) => ReactElement;
  styles:
    | DefaultBoxFactoryOptionsStyles
    | ((props: InfoBoxParagraphProps) => DefaultBoxFactoryOptionsStyles);
};
