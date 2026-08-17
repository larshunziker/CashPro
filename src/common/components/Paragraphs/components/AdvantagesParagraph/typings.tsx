import { AdvantagesItemComponent } from '../../../AdvantagesItem/typings';

export type AdvantagesParagraphFactoryOptions = {
  AdvantagesItem: AdvantagesItemComponent;
  styles: AdvantagesParagraphFactoryOptionsStyles;
  getGridConfig?: (count: number, index: number) => string;
};

export type AdvantagesParagraphFactoryOptionsStyles = {
  Title: string;
  Wrapper: string;
  OuterWrapper: string;
  ItemWrapper?: ((count: number, index: number) => string) | string;
};

export type AdvantagesParagraphProps = {
  entry: AdvantagesParagraph;
};
