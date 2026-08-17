import React, { ComponentType } from 'react';
import { VideoStagePropsInner } from './factory';
import { LinkComponent } from '../Link/typings';

export type VideoStageType = MinistageVideo & {
  id?: string;
  title?: string;
};

export type VideoStageProps = {
  videoStage: VideoStageType;
  scrollOffset: number;
  origin?: string;
  isSplittedPageLayout?: boolean;
};

export type VideoStageFactoryOptionsStyles = {
  Wrapper: string;
  Container?: string;
  Title: string;
  ShortTitle: string;
  Items: string;
  IsActive: string;
  LeftBoxCols: string;
  RightBoxCols: string;
  InnerWrapper: string;
  HeadingWrapper: string;
  Heading: string;
  StageWrapper: string;
  ContentWrapper: string;
  DetailWrapper?: string;
  UtilityBarWrapper?: string;
};

export type VideoStageComponent = ComponentType<VideoStageProps>;

export type VideoStageFactoryOptions = {
  grid: any;
  VideoPlayer: React.ComponentType<any>;
  Link: LinkComponent;
  Teaser: React.ComponentType<any>;
  SmoothScroll: React.ComponentType<any>;
  ImageCaption: React.ComponentType<any>;
  UtilityBar?: React.ComponentType<any>;
  isCaptionVisible: boolean;
  isObserveForAutoplayEnabled?: boolean;
  hasToLazyLoadBrightcoveScript?: boolean;
  teaserLayout: string;
  viewportsToPerformAnchorScroll: string;
  styles:
    | VideoStageFactoryOptionsStyles
    | ((props: VideoStagePropsInner) => VideoStageFactoryOptionsStyles);
  shouldRerender?: (
    prevProps: VideoStagePropsInner,
    nextProps: VideoStagePropsInner,
  ) => boolean;
};

export type VideoStageState = {
  activeIndex: number;
  prevIndex: number;
  currentId: string;
  isSSR: boolean;
};
