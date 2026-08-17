import { ReactElement } from 'react';

export type AdvantagesItemFactoryOptionsStyles = {
  Icon: string;
  Text: string;
  Wrapper: string;
};

export type AdvantagesItemProps = {
  item: AdvantagesItemParagraph;
  isWide?: boolean;
};

export type AdvantagesItemFactoryOptionsStylesByProps<T> = (
  props: T,
) => AdvantagesItemFactoryOptionsStyles;

export type AdvantagesItemFactoryOptions<T> = {
  styles:
    | AdvantagesItemFactoryOptionsStyles
    | AdvantagesItemFactoryOptionsStylesByProps<T>;
};

export type AdvantagesItemComponent = (
  props: AdvantagesItemProps,
) => ReactElement;
