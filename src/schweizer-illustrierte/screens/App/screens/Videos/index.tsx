import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import compose from 'recompose/compose';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { getScrollOffset } from '../../../../shared/helpers/getScrollOffset';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../shared/decorators/withScrollToAnchor';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../components/Breadcrumbs';
import OverviewPage from '../../components/OverviewPage';
import Recommendations from '../../components/Recommendations';
import VideoStage from '../../components/VideoStage';
import OverviewPageHeader, {
  OVERVIEW_PAGE_HEADER_DEFAULT,
} from '../../components/OverviewPageHeader';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_S } from '../../../../../shared/constants/teaser';
import { SITE_TITLE } from '../../../App/constants';
import { PAGE_SIZE, VIDEO_STAGE_ITEMS } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { VideoStageType } from '../../../../../common/components/VideoStage/typings';

type VideosProps = RouterProps;

type VideosPropsInner = VideosProps & {
  data: {
    environment: {
      routeByPath: Route;
      videoStageSearch: VideoConnection | null;
      globalSearch: SearchableUnionConnection;
      termsByVocabulary: ChannelConnection;
    };
  };
};

const PAGER_ANCHOR_SCROLL_ID = 'page';
const getFallbackTitle = (landingPage: LandingPage) =>
  `${landingPage?.title || 'Videos'} - ${SITE_TITLE}`;

const Videos = ({ location, data, page }: VideosPropsInner): ReactElement => {
  const viewportLabel = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state).viewport.label,
  );
  if (
    !data ||
    !data.environment ||
    !data.environment.globalSearch ||
    !data.environment.routeByPath ||
    !data.environment.routeByPath.object
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const scrollOffset = getScrollOffset(false, viewportLabel);
  const globalSearch = data.environment.globalSearch;
  const videoStage = data.environment?.videoStageSearch || null;
  const landingPage: LandingPage = data.environment.routeByPath.object;
  const gridItems = globalSearch?.edges || null;
  const videoStageParagraph: VideoStageType = {
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
    id: landingPage.id,
    items: videoStage,
  };
  const videoBlogs = data.environment?.termsByVocabulary || null;

  const updatedData: {
    routeObject: Channel;
  } = (videoBlogs?.edges || []).reduce(
    (updatedData, videoBlog) => {
      const edges: ChannelEdge[] & ArticleEdge[] =
        updatedData.routeObject.entities.edges;

      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const videoBlogNode = videoBlog.node || null;

      if (videoBlogNode?.showOnVideoOverview) {
        // add TeaserChannel at first place in row
        edges.push({ node: videoBlogNode });

        // if blog has blog posts add them to gridConfig
        (videoBlogNode?.entities?.items || []).forEach((blogPost: Article) => {
          edges.push({ node: blogPost });
        });
      }

      return updatedData;
    },
    {
      routeObject: {
        entities: {
          edges: [],
        },
      },
    },
  );

  return (
    <TestFragment data-testid="videos-wrapper">
      {landingPage.preferredUri && landingPage.activeMenuTrail && (
        <TestFragment data-testid="videos-breadcrumbs-wrapper">
          <Breadcrumbs
            pageUrl={landingPage.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
            items={landingPage.activeMenuTrail}
          />
        </TestFragment>
      )}

      <OverviewPageHeader
        title={landingPage.title || 'Videos'}
        lead={landingPage?.lead || ''}
        component={OVERVIEW_PAGE_HEADER_DEFAULT}
      />
      {videoStage?.edges && (
        <TestFragment data-testid="video-stage-paragraph-wrapper">
          <VideoStage
            scrollOffset={scrollOffset}
            videoStage={videoStageParagraph}
          />
        </TestFragment>
      )}

      {videoBlogs && (
        <TestFragment data-testid="video-blogs-wrapper">
          <div className={grid.Container}>
            <div
              data-testid="video-blogs-header"
              className={styles.SectionTitle}
            >
              <span>Unsere Serien</span>
            </div>
          </div>
          <OverviewPage
            location={location}
            routeObject={updatedData.routeObject}
            gridConfig="videoBlogs"
            paragraphType="VideosScreen"
          />
        </TestFragment>
      )}

      {globalSearch?.count && gridItems && (
        <div
          id={PAGER_ANCHOR_SCROLL_ID}
          data-testid="search-results-containter"
          className={grid.Container}
        >
          <div className={styles.RecommendationsWrapper}>
            <Recommendations
              items={gridItems.map((item) => ensureTeaserInterface(item))}
              title="WEITERE VIDEOS"
              teaserLayout={TEASER_LAYOUT_S}
            />
          </div>
          <Pager
            component={PAGER_TYPE_PAGE_LOADER}
            currentPage={page}
            itemsCount={
              globalSearch.count &&
              Math.abs(globalSearch.count - VIDEO_STAGE_ITEMS)
            }
            itemsPerPage={PAGE_SIZE}
            anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
          />
        </div>
      )}
    </TestFragment>
  );
};

export default compose<any, any>(
  withScrollToAnchor(),
  withHelmet({
    getNode: (mapProps: VideosPropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    getFallbackTitle: (mapProps: VideosPropsInner) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<RouteObjectInterface> | undefined' is not assignable to parameter of type 'LandingPage'. */
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    getNodesCount: (mapProps: VideosPropsInner) =>
      (!!mapProps?.data?.environment?.globalSearch?.count &&
        Math.abs(
          parseInt(`${mapProps.data.environment.globalSearch.count}`) -
            VIDEO_STAGE_ITEMS,
        )) ||
      0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: VideosPropsInner) =>
      mapProps.data?.environment?.videoStageSearch?.edges || [],
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(Videos);
