import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { getScrollOffset } from '../../../../shared/helpers/getScrollOffset';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import { WithPagePagerProps } from '../../../../../shared/decorators/@types/withPagePager';
import withHelmet from '../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../shared/decorators/withScrollToAnchor';
import Breadcrumbs from '../../components/Breadcrumbs';
import TeaserGrid from '../../components/TeaserGrid';
import VideoStage from '../../components/VideoStage';
import StatusPage from './../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { WithRaschRouter } from '../../../../../shared/@types/gql';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import {
  GRID_LAYOUT_TEASER_3X4,
  GRID_LAYOUT_VIDEO_BLOGS,
} from '../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../constants';
import { ITEMS_PER_PAGE, VIDEO_STAGE_ITEMS } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { VideoStageType } from '../../../../../common/components/VideoStage/typings';

type VideosPropsInner = RouterProps &
  WithPagePagerProps &
  ApolloConfigProps & { viewportLabel: string; loading: boolean } & Pick<
    WithRaschRouter,
    'data'
  > & {
    data: {
      environment: {
        routeByPath: Route & {
          object: Partial<NodeInterface> & {
            activeMenuTrail: ActiveMenuTrailItemConnection;
          };
        };
        videoStageSearch: VideoConnection | null;
        globalSearch: SearchableUnionConnection;
        termsByVocabulary: ChannelConnection;
      };
    };
  };

const PAGER_ANCHOR_SCROLL_ID = 'page';
/* @ts-ignore TODO: TS7006 ->  Parameter 'landingPage' implicitly has an 'any' type. */
const getFallbackTitle = (landingPage) =>
  `${landingPage?.title || 'Videos'} - ${SITE_TITLE}`;

const Videos = ({ data, page, loading, viewportLabel }: VideosPropsInner) => {
  const scrollOffset = getScrollOffset(viewportLabel);

  if (
    !data.environment ||
    !data.environment.routeByPath ||
    !data.environment.routeByPath.object
  ) {
    return loading ? null : <StatusPage />;
  }

  const globalSearch = data.environment.globalSearch;
  const videoStage = data.environment?.videoStageSearch || null;
  const landingPage = data.environment.routeByPath.object;
  const gridItems = globalSearch?.edges || null;
  const videoStageParagraph: VideoStageType = {
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
    id: landingPage.id,
    items: videoStage,
    title: 'Videos',
  };

  const videoBlogs = data.environment?.termsByVocabulary || null;

  const teaserGrid = (videoBlogs?.edges || []).reduce(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'teaserGrid' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'videoBlog' implicitly has an 'any' type. */
    (teaserGrid, videoBlog) => {
      const edges = teaserGrid.routeObject.entities.edges;

      const videoBlogNode = videoBlog.node || null;

      if (videoBlogNode?.showOnVideoOverview) {
        // add TeaserChannel at first place in row
        edges.push({ node: videoBlogNode });

        // if blog has blog posts add them to gridConfig
        /* @ts-ignore TODO: TS7006 ->  Parameter 'blogPost' implicitly has an 'any' type. */
        (videoBlogNode?.entities?.items || []).forEach((blogPost) => {
          edges.push({ node: blogPost });
        });
      }

      return teaserGrid;
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
    <div className={styles.Section} data-testid="videos-wrapper">
      {landingPage.preferredUri && landingPage.activeMenuTrail && (
        <div
          className={styles.BreadcrumbsContainer}
          data-testid="videos-breadcrumbs-wrapper"
        >
          <Breadcrumbs
            pageUrl={landingPage.preferredUri}
            items={landingPage.activeMenuTrail}
          />
        </div>
      )}

      {(videoStage &&
        videoStage.edges &&
        Array.isArray(videoStage?.edges) &&
        videoStage.edges.length > 0 && (
          <div
            className={styles.VideoStageWrapper}
            data-testid="video-stage-paragraph-wrapper"
          >
            <VideoStage
              scrollOffset={scrollOffset}
              videoStage={videoStageParagraph}
            />
          </div>
        )) ||
        null}

      {(videoBlogs &&
        videoBlogs.edges &&
        Array.isArray(videoBlogs.edges) &&
        videoBlogs.edges.length > 0 && (
          <div className={grid.Container} data-testid="video-blogs-wrapper">
            <h1
              data-testid="video-blogs-header"
              className={styles.SectionTitleVideoBlogs}
            >
              Unsere Serien
            </h1>
            <TeaserGrid
              layout={GRID_LAYOUT_VIDEO_BLOGS}
              items={teaserGrid.routeObject.entities.edges}
            />
          </div>
        )) ||
        null}

      {(globalSearch?.count &&
        gridItems &&
        Array.isArray(gridItems) &&
        gridItems.length > 0 && (
          <div
            id={PAGER_ANCHOR_SCROLL_ID}
            data-testid="search-results-containter"
          >
            <h2 className={styles.SectionTitle}>Weitere Videos</h2>
            <TeaserGrid
              layout={GRID_LAYOUT_TEASER_3X4}
              items={ensureTeaserInterface(gridItems)}
            />
            <Pager
              component={PAGER_TYPE_PAGE_LOADER}
              currentPage={page}
              itemsCount={
                globalSearch.count &&
                Math.abs(globalSearch.count - VIDEO_STAGE_ITEMS)
              }
              itemsPerPage={ITEMS_PER_PAGE}
              anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
            />
          </div>
        )) ||
        null}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  loading: locationStateSelector(state).loading,
});

export default compose<any, any>(
  withScrollToAnchor(),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) =>
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      (!!mapProps?.data?.environment?.globalSearch?.count &&
        Math.abs(
          parseInt(mapProps.data.environment.globalSearch.count) -
            VIDEO_STAGE_ITEMS,
        )) ||
      0,
    pageSize: ITEMS_PER_PAGE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  connect(mapStateToProps),
)(Videos);
