import React, { ReactElement, ReactNode } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import videoDetailFactory from '../../../../../common/screens/Video/factory';
import { getRecommendationItems } from './helpers';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import Breadcrumbs from '../../components/Breadcrumbs';
import Error from '../../components/Error';
import Paragraphs from '../../components/Paragraphs';
import Recommendations from '../../components/Recommendations';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_RECOMMENDATIONS } from '../../../../../shared/constants/teaser';
import {
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_SHARE,
} from '../../../../../shared/constants/utilitybar';
import { UTILITYBAR_OVERLAY_CONFIG } from '../../components/UtilityBar/constants';
import { DEFAULT_PUBLICATION, ROUTE_VIDEOS, SITE_TITLE } from '../../constants';
import { VIDEO_PAGE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_ALL_VIDEO_RECOMMENDATIONS } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsProps } from '../../../../../common/components/Recommendations/components/Recommendations/typings';
import { UtilityBarProps } from '../../../../../common/components/UtilityBar/typings';
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

const getArticleHeaderByProps = ({
  title,
  shortTitle,
  lead,
}: ArticleHeaderMock): ReactElement => (
  <>
    <p className={styles.ShortTitle}>{shortTitle}</p>
    <h2 className={styles.Title}>{title}</h2>
    <p className={styles.Lead}>{lead}</p>
  </>
);

const getLinkButtonByProps = ({
  link,
  label,
  children,
}: LinkButtonMock): ReactElement => (
  <Link className={styles.Button} {...link} label={label}>
    {children}
  </Link>
);

const SocialBarByProps = (props: UtilityBarProps): ReactElement => {
  const UTILITYBAR_CONFIG = [UTILITY_TYPE_SHARE, UTILITY_TYPE_BOOKMARKS];
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  if (isHybridApp) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  return (
    <BodyClassName className={styles.ArticleBody}>
      <UtilityBar {...props} enabledUtilities={UTILITYBAR_CONFIG}>
        {({ isOverlayVisible, toggleOverlayVisible, visibleId }) => (
          <UtilityOverlay
            visibleId={visibleId}
            overlayTitle="Artikel teilen"
            isOverlayVisible={isOverlayVisible}
            toggleOverlayVisible={toggleOverlayVisible}
            enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
          />
        )}
      </UtilityBar>
    </BodyClassName>
  );
};

const getRecommendationsByProps = (
  props: RecommendationsProps,
): ReactElement => {
  return (
    <Recommendations
      {...props}
      moreRecommendations
      teaserLayout={TEASER_LAYOUT_RECOMMENDATIONS}
      trackingOrigin="bottom"
    />
  );
};

const VideoDetail = videoDetailFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ items, isLongRead, } */
  ArticleAlerts,
  ArticleHeader: getArticleHeaderByProps,
  Breadcrumbs,
  ErrorMessage: Error,
  getRecommendationItems,
  LinkButton: getLinkButtonByProps,
  Paragraphs,
  SocialBar: SocialBarByProps,
  Recommendations: getRecommendationsByProps,
  publication: DEFAULT_PUBLICATION,
  origin: VIDEO_PAGE,
  styles: {
    BreadcrumbsContainer: styles.BreadcrumbsContainer,
    Container: styles.Container,
    Row: styles.Row,
    VideoContainer: classNames(grid.ColSm24, styles.VideoContainer),
    ArticleAlertsWrapper: classNames(
      styles.ArticleAlertsWrapper,
      grid.HideForPrint,
    ),
    SocialBarWrapper: styles.SocialBarWrapper,
    RecommendationsWrapper: styles.RecommendationsWrapper,
    CTAWrapper: styles.CTAWrapper,
  },
  videosRouteUrl: ROUTE_VIDEOS,
  videoRecommendationsQuery: GET_ALL_VIDEO_RECOMMENDATIONS,
  appMessageMoreVideos: 'Mehr Videos',
});

const ComposedVideoDetail = compose<any, any>(
  withHelmet({
    getNode: (mapProps: VideoPropsInner): Video => mapProps.video,
    getFallbackTitle: (mapProps: VideoPropsInner) =>
      mapProps.video ? `${mapProps.video.title} - ${SITE_TITLE}` : SITE_TITLE,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,

    /* @ts-ignore TODO: TS2322 ->  Type '(mapProps */
    getImage: (mapProps: VideoPropsInner) =>
      mapProps.video?.channel?.settings?.headerImage?.file,
  }),
)(VideoDetail);

export default (props: VideoPropsInner): ReactElement => {
  return (
    <div className={styles.PageWrapper}>
      <ComposedVideoDetail {...props} />
    </div>
  );
};
