import { ReactElement } from 'react';
import { BrightcoveProps } from '../../../Brightcove/typings';

export type VideoParagraphProps = {
  isFirst?: boolean;
  origin?: string;
  addClass?: string; // @TODO: this addClass is not used in this factory anymore. however it's still used in VideoLoopParagraph. it can be removed as soon as VideoLoopParagraph has been refactored as well.
  suppressSource?: boolean;
};

type VideoParagraphComponentProps = VideoParagraphProps & BrightcoveProps;

export type VideoParagraphComponent = (
  props: VideoParagraphComponentProps,
) => ReactElement;

export type VideoParagraphFactoryOptions = {
  Video: any; //TODO: add VideoComponent typing here
  styles:
    | VideoParagraphFactoryOptionsStyles
    | ((props: VideoParagraphProps) => VideoParagraphFactoryOptionsStyles);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  ImageCaption?: (props) => JSX.Element;
  hasTitle?: boolean | ((props: VideoParagraphProps) => boolean);
  hasShortTitle?: boolean | ((props: VideoParagraphProps) => boolean);
  shouldAutoPlay?: boolean | ((props: VideoParagraphProps) => boolean);
  muted?: boolean | ((props: VideoParagraphProps) => boolean);
  shouldHideCaption?: boolean | ((props: VideoParagraphProps) => boolean);
  accountId?: string;
  playerId?: string;
};

export type VideoParagraphFactoryOptionsStyles = {
  Wrapper: string;
  OuterWrapper?: string;
  TitleWrapper?: string;
  VideoTitle?: string;
  ShortTitle?: string;
  CaptionWrapper?: string;
  VideoCaption?: string;
  VideoCredit?: string;
  VideoLink?: string;
};
