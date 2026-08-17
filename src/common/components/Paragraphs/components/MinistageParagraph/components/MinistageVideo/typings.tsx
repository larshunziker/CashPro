import { ReactElement } from 'react';
import { VideoStageComponent } from '../../../../../VideoStage/typings';

export type MinistageVideoProps = {
  id: string;
  ministageParagraph: MinistageParagraph;
  scrollOffset: number;
  origin?: string;
  isSplittedPageLayout?: boolean;
};

export type MinistageVideoComponent = (
  props: MinistageVideoProps,
) => ReactElement | null;

export type MinistageVideoFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper?: string;
};
export type MinistageVideoFactoryOptions = {
  VideoStage: VideoStageComponent;
  styles:
    | MinistageVideoFactoryOptionsStyles
    | ((props: MinistageVideoProps) => MinistageVideoFactoryOptionsStyles);
};
