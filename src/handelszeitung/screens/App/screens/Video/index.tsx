import React, { ReactElement, ReactNode } from 'react';

import { compose } from 'recompose';
import classNames from 'classnames';
import videoDetailFactory from '../../../../../common/screens/Video/factory';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import Breadcrumbs from '../../components/Breadcrumbs';
import Error from '../../components/Error';
import Paragraphs from '../../components/Paragraphs';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { DEFAULT_PUBLICATION, ROUTE_VIDEOS, SITE_TITLE } from '../../constants';
import { VIDEO_PAGE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
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
    <span className={styles.ShortTitle}>{shortTitle}</span>
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

const VideoDetail = videoDetailFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ items, isLongRead, isSplittedPageLayout, } */
  ArticleAlerts,
  ArticleHeader: getArticleHeaderByProps,
  Breadcrumbs,
  ErrorMessage: Error,
  LinkButton: getLinkButtonByProps,
  Paragraphs,
  publication: DEFAULT_PUBLICATION,
  origin: VIDEO_PAGE,
  styles: {
    BreadcrumbsContainer: styles.BreadcrumbsContainer,
    Container: styles.Container,
    Row: styles.Row,
    VideoContainer: classNames(
      grid.ColSm22,
      grid.ColXl24,
      grid.ColOffsetSm1,
      grid.ColOffsetXl0,
      styles.VideoContainer,
    ),
    ArticleAlertsWrapper: classNames(
      styles.ArticleAlertsWrapper,
      grid.HideForPrint,
    ),
    SocialBarWrapper: styles.SocialBarWrapper,
    RecommendationsWrapper: styles.RecommendationsWrapper,
    CTAWrapper: styles.CTAWrapper,
  },
  videosRouteUrl: ROUTE_VIDEOS,
});

export default compose<any, any>(
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
