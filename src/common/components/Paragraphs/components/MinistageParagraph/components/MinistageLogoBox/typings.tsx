import { TeaserComponent } from '../../../../../Teaser/typings';

export type MinistageLogoBoxProps = {
  ministageParagraph: MinistageParagraph;
  isShuffleEnabled: boolean;
};

export type GetStylesByProps<T> = (
  props: T,
) => MinistageLogoBoxFactoryOptionsStyles;

export type MinistageLogoBoxFactoryOptions<T = {}> = {
  styles: GetStylesByProps<T> | MinistageLogoBoxFactoryOptionsStyles;
  Teaser: TeaserComponent;
};

export type MinistageLogoBoxFactoryOptionsStyles = {
  Title: string;
  SubTitle: string;
  ItemWrapper: string;
};
