import React, { ReactElement, ReactNode } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';

import { compose } from 'recompose';
import classNames from 'classnames';
import videoDetailFactory from '../../../../../common/screens/Video/factory';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import EditButtons from '../../components/EditButtons';
import Error from '../../components/Error';
import Paragraphs from '../../components/Paragraphs';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import ButtonWithLoading from '../../components/ButtonWithLoading';
import { getRecommendationItems } from './helpers';
import VideoRecommendations from '../../components/Recommendations/components/VideoRecommendations';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_MD } from '../../../../../shared/constants/teaser';
import { DEFAULT_PUBLICATION, ROUTE_VIDEOS, SITE_TITLE } from '../../constants';
import {
  UTILITYBAR_CONFIG_VIDEO,
  UTILITYBAR_OVERLAY_CONFIG_VIDEO,
  VIDEO_PAGE,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_ALL_VIDEO_RECOMMENDATIONS } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsProps } from '../../../../../common/components/Recommendations/components/Recommendations/typings';
import { VideoProps } from './typings';

type VideoPropsInner = VideoProps;

type ArticleHeaderMock = {
  title: string;
  shortTitle: string;
  lead: string;
};

type LinkButtonMock = {
  link: Object;
  label: string;
  children?: ReactNode;
};

export function videoBreadcrumbsData(data: any) {
  const video = data?.environment?.routeByPath?.object;
  const activeMenuTrail = video?.activeMenuTrail
    ? {
        ...JSON.parse(JSON.stringify(video?.activeMenuTrail)),
      }
    : null;

  // add "Videos" to the breadcrumbs at the last position before the h1 title
  activeMenuTrail &&
    activeMenuTrail.edges &&
    Array.isArray(activeMenuTrail.edges) &&
    activeMenuTrail.edges.length >= 2 &&
    activeMenuTrail.edges.splice(activeMenuTrail.edges.length - 1, 0, {
      node: {
        label: 'Videos',
        link: `/${ROUTE_VIDEOS}`,
      },
    });
  if (activeMenuTrail) {
    data.breadcrumbsData = { activeMenuTrail };
  }
}

const getArticleHeaderByProps = ({
  title,
  shortTitle,
  lead,
}: ArticleHeaderMock): ReactElement => (
  <div className={styles.ArticleHeaderContainer}>
    {shortTitle && <span className={styles.ShortTitle}>{shortTitle}</span>}
    <h2 className={styles.Title}>{title}</h2>
    <p className={styles.Lead}>{lead}</p>
  </div>
);

const getLinkButtonByProps = ({
  link,
  children,
}: LinkButtonMock): ReactElement => (
  <Link className={styles.Button} {...link}>
    <ButtonWithLoading variant="primary" size="big">
      {children}
    </ButtonWithLoading>
  </Link>
);

const getSocialBarByProps = (): ReactElement => (
  <div className={grid.Row}>
    <div className={grid.ColXs24}>
      <div
        className={classNames(
          'utility-bar-wrapper',
          styles.UtilityBarWrapper,
          grid.HideForPrint,
        )}
      >
        <BodyClassName className={styles.ArticleBody}>
          <UtilityBar
            enabledUtilities={UTILITYBAR_CONFIG_VIDEO}
            shouldUseSwipeable
          >
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <div className={styles.UtilityOverlayWrapper}>
                <UtilityOverlay
                  overlayTitle="Artikel teilen"
                  isOverlayVisible={isOverlayVisible}
                  toggleOverlayVisible={toggleOverlayVisible}
                  enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_VIDEO}
                />
              </div>
            )}
          </UtilityBar>
        </BodyClassName>
      </div>
    </div>
  </div>
);

const Recommendations = (props: RecommendationsProps) => (
  <VideoRecommendations
    {...props}
    teaserLayout={TEASER_LAYOUT_MD}
    trackingOrigin="bottom"
  />
);

const VideoDetail = videoDetailFactory({
  ArticleHeader: getArticleHeaderByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ items, isLongRead } */
  ArticleAlerts,
  ErrorMessage: Error,
  LinkButton: getLinkButtonByProps,
  Paragraphs,
  getRecommendationItems,
  Recommendations: Recommendations,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  EditButtons,
  SocialBar: getSocialBarByProps,
  publication: DEFAULT_PUBLICATION,
  origin: VIDEO_PAGE,
  styles: {
    BreadcrumbsContainer: styles.BreadcrumbsContainer,
    Container: classNames(styles.Container, grid.Container),
    VideoContainer: styles.VideoContainer,
    ArticleAlertsWrapper: styles.ArticleAlertsWrapper,
    SocialBarWrapper: styles.SocialBarWrapper,
    RecommendationsWrapper: styles.RecommendationsWrapper,
    CTAWrapper: styles.CTAWrapper,
  },
  videosRouteUrl: ROUTE_VIDEOS,
  videoRecommendationsQuery: GET_ALL_VIDEO_RECOMMENDATIONS,
});

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: VideoPropsInner): Video => mapProps.video,
    /* @ts-ignore TODO: TS2322 ->  Type '(mapProps */
    getImage: (mapProps: VideoPropsInner) =>
      mapProps.video?.channel?.settings?.headerImage?.file,
    getFallbackTitle: (mapProps: VideoPropsInner) =>
      mapProps.video ? `${mapProps.video.title} - ${SITE_TITLE}` : SITE_TITLE,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
)(VideoDetail);
