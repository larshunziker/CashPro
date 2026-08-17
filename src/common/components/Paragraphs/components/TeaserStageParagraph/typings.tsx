import { SVGIconComponent } from '../../../SVGIcon/typings';

export type TeaserStageParagraphProps = {
  teaserStage: any; // TODO: use TeaserStageParagraph as soon as it works;
  paragraphIndex?: number;
  origin?: string;
  pageLayoutType?: string;
};

export type TeaserStageParagraphFactoryOptionsStyles = {
  Wrapper?: string;
  SectionTitle: string;
  TitleLink: string;
  Container?: string;
  SVGImage?: string;
  TitleWrapper?: string;
  SponsorWrapper?: string;
  SponsorImage?: string;
  SponsorPrefix?: string;
  SponsorLink?: string;
  Icon?: string;
};

export type TeaserStageParagraphFactoryOptionsStylesByProps<T> = (
  props: T,
) => TeaserStageParagraphFactoryOptionsStyles;

export type TeaserStageParagraphFactoryOptions<T> = {
  ensureTeaserInterface: Function;
  gridConfig?: GridConfig | ((props: TeaserStageParagraphProps) => GridConfig);
  gridLayout?: (props: TeaserStageParagraphProps) => string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  TeaserGridRenderer: () => (props) => JSX.Element;
  SVGIcon?: SVGIconComponent;
  styles:
    | TeaserStageParagraphFactoryOptionsStyles
    | TeaserStageParagraphFactoryOptionsStylesByProps<T>;
};
