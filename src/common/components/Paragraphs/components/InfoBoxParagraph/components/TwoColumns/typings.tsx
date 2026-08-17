import { ReactElement } from 'react';
import { InfoBoxParagraphProps } from '../../typings';

export type TwoColumnsFactoryOptionsStyles = {
  Wrapper: string;
  LeftWrapper: string;
  RightWrapper: string;
};

export type TwoColumnsFactoryOptions = {
  title?: ReactElement | ((props: InfoBoxParagraphProps) => ReactElement);
  paragraphsRenderer: (
    infoboxBody: Maybe<Array<Maybe<ParagraphInterface>>>,
  ) => ReactElement;
  styles:
    | TwoColumnsFactoryOptionsStyles
    | ((props: InfoBoxParagraphProps) => TwoColumnsFactoryOptionsStyles);
};
