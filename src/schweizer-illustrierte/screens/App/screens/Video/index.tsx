import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';

import { compose } from 'recompose';
import classNames from 'classnames';
import videoDetailFactory from '../../../../../common/screens/Video/factory';
import { getRecommendationItems } from './helpers';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import ArrowButton from '../../components/ArrowButton';
import ArticleHeader from '../../components/ArticleHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import Error from '../../components/Error';
import Paragraphs from '../../components/Paragraphs';
import Recommendations from '../../components/Recommendations';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import OverviewPageHeader, {
  OVERVIEW_PAGE_HEADER_VIDEO_BLOG,
} from '../../components/OverviewPageHeader';
import { MMR_1 } from '../../components/AppNexus/constants';
import { ARTICLE_HEADER_THEME_VIDEO_DETAIL } from '../../components/ArticleHeader/constants';
import { DEFAULT_PUBLICATION, ROUTE_VIDEOS, SITE_TITLE } from '../../constants';
import { CHANNEL_TYPE_VIDEO_BLOG } from '../Channel/constants';
import {
  UTILITYBAR_CONFIG_VIDEO,
  UTILITYBAR_OVERLAY_CONFIG_VIDEO,
  VIDEO_PAGE,
} from './constants';
import { TEASER_LAYOUT_S } from '../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_ALL_VIDEO_RECOMMENDATIONS } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsProps } from '../../../../../common/components/Recommendations/components/Recommendations/typings';
import { LinkButtonProps, VideoProps } from './typings';

type VideoPropsInner = VideoProps;

type ArticleHeaderProps = VideoPropsInner & {
  title: string;
  shortTitle: string;
  lead: string;
};

type OverviewPageHeaderProps = VideoPropsInner & {
  title: string;
  lead: string;
  headerImage: Image;
};

export const getArticleHeaderByProps = (
  props: ArticleHeaderProps,
): ReactElement => (
  <TestFragment data-testid="video-article-header-wrapper">
    <div className={'ad-wrapper ad-wrapper-mobile'}>
      <AppNexus slot={MMR_1} deviceType="mobile" />
    </div>
    <ArticleHeader
      title={props.title}
      shortTitle={props.shortTitle}
      lead={props.lead}
      theme={ARTICLE_HEADER_THEME_VIDEO_DETAIL}
    />
  </TestFragment>
);

export const getOverviewPageHeaderByProps = (
  props: OverviewPageHeaderProps,
): ReactElement => (
  <TestFragment data-testid="video-overview-page-header-wrapper">
    <OverviewPageHeader
      title={props.title}
      lead={props.lead}
      headerImage={props.headerImage}
      component={OVERVIEW_PAGE_HEADER_VIDEO_BLOG}
    />
  </TestFragment>
);

export const getSocialBarByProps = (): ReactElement => (
  <div className={grid.Row} data-testid="video-social-bar-wrapper">
    <div className={grid.ColXs24}>
      <div className={styles.UtilityBar}>
        <BodyClassName className={styles.ArticleBody}>
          <UtilityBar enabledUtilities={UTILITYBAR_CONFIG_VIDEO}>
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <UtilityOverlay
                overlayTitle="Artikel teilen"
                isOverlayVisible={isOverlayVisible}
                toggleOverlayVisible={toggleOverlayVisible}
                enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_VIDEO}
              />
            )}
          </UtilityBar>
        </BodyClassName>
      </div>
    </div>
  </div>
);

export const getLinkButtonByProps = ({
  link,
  children,
}: LinkButtonProps): ReactElement => (
  <TestFragment data-testid="video-link-button-wrapper">
    <Link {...link}>
      <ArrowButton large>{children}</ArrowButton>
    </Link>
  </TestFragment>
);

const getRecommendationsByProps = (
  props: RecommendationsProps,
): ReactElement => {
  return <Recommendations {...props} teaserLayout={TEASER_LAYOUT_S} />;
};

const VideoDetail: React.FC<VideoPropsInner> = videoDetailFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ items, theme, } */
  ArticleAlerts,
  ArticleHeader: getArticleHeaderByProps,
  Breadcrumbs,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  EditButtons,
  ErrorMessage: Error,
  LinkButton: getLinkButtonByProps,
  OverviewPageHeader: getOverviewPageHeaderByProps,
  Paragraphs,
  getRecommendationItems,
  publication: DEFAULT_PUBLICATION,
  Recommendations: getRecommendationsByProps,
  SocialBar: getSocialBarByProps,
  origin: VIDEO_PAGE,
  styles: {
    Container: grid.Container,
    Row: grid.Row,
    BreadcrumbsContainer: '',
    VideoContainer: styles.VideoContainer,
    SocialBarWrapper: styles.SocialBarWrapper,
    ArticleAlertsWrapper: classNames(
      grid.Row,
      styles.ArticleAlertsWrapper,
      grid.HideForPrint,
    ),
    ArticleAlertsInnerWrapper: classNames(
      grid.ColSm20,
      grid.ColOffsetSm2,
      grid.ColXl16,
      grid.ColOffsetXl4,
    ),
    RecommendationsWrapper: styles.RecommendationsWrapper,
    CTAWrapper: styles.CTAWrapper,
    Loading: styles.Loading,
    Topic: styles.Topic,
  },
  videoBlogChannelType: CHANNEL_TYPE_VIDEO_BLOG,
  videosRouteUrl: ROUTE_VIDEOS,
  videoRecommendationsQuery: GET_ALL_VIDEO_RECOMMENDATIONS,
});

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: VideoPropsInner): Video => mapProps.video,
    getFallbackTitle: (mapProps: VideoPropsInner) =>
      `${mapProps?.video?.title || ''} - ${SITE_TITLE}`,
    /* @ts-ignore TODO: TS2322 ->  Type '(mapProps */
    getImage: (mapProps: VideoPropsInner) =>
      mapProps.video?.channel?.settings?.headerImage?.file,
  }),
  // @ts-ignore
)(VideoDetail);
