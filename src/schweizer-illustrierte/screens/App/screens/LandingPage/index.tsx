import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import { useQuery } from '@apollo/client';
// import { render } from '@testing-library/react';
import classNames from 'classnames';
import { DocumentNode } from 'graphql';
import { enrichOverviewBodyWithADs } from '../../../../../shared/helpers/ads';
import { latestNativeAdvertisingsGenerator } from '../../../../../shared/helpers/latestNativeAdvertisings';
import { latestNACounter } from '../../../../../shared/helpers/useLatestNativeAdvertisings';
import { getAllArticles } from '../../../../../shared/helpers/withHelmet';
import { getChannelSponsorItems } from '../../../../shared/helpers/ministageChannelSponsorItems';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import Error from '../../components/Error';
import OverviewPage from '../../components/OverviewPage';
import Paragraphs from '../../components/Paragraphs';
import MinistageChannelSponsor from '../../components/Paragraphs/components/MinistageParagraph/components/MinistageChannelSponsor';
import PartnerBanner from '../../components/PartnerBanner';
import Teaser from '../../components/Teaser';
import TeaserGrid from '../../components/TeaserGrid';
import OverviewPageHeader, {
  OVERVIEW_PAGE_HEADER_BLOG_KEY,
  OVERVIEW_PAGE_HEADER_DEFAULT,
  OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY,
} from '../../components/OverviewPageHeader';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { TeaserLayout } from '../../components/TeaserGrid/gridConfigs';
import { GRID_LAYOUT_TEASER_S_4X4 } from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { ENTITY_QUEUE_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { PUBLICATION_GROUP_SI } from '../../../../../shared/constants/publications';
import { RECOMMENDATION_OPERATION } from '../../../../../shared/constants/recommendations';
import {
  ROOT_SCHEMA_TYPE_ORGANIZATION,
  ROOT_SCHEMA_TYPE_WEB_PAGE,
} from '../../../../../shared/constants/structuredData';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_ENTERTAINMENT,
  MAIN_CHANNEL_FAMILY,
  MAIN_CHANNEL_HOME,
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_SPECIALS,
  ROUTE_BODY_HEALTH,
  ROUTE_ENTERTAINMENT,
  ROUTE_FAMILY,
  ROUTE_PEOPLE,
  ROUTE_STYLE,
  ROUTE_VIDEOS,
} from '../../../App/constants';
import { TEASER_LAYOUT_SPECIAL_HERO } from '../../components/../../../../shared/constants/teaser';
import {
  ENTITY_QUEUE_STYLE_SPLIT_BOTTOM,
  ENTITY_QUEUE_STYLE_SPLIT_TOP,
} from '../../components/Paragraphs/components/EntityQueueParagraph/constants';
import {
  BLOG_PAGE_SIZE,
  SPECIALS_PAGE_SIZE,
  VIDEO_BLOG_PAGE_SIZE,
} from '../../components/TeaserGrid/constants';
import {
  GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3,
  GRID_LAYOUT_LANDSCAPE_SPECIAL,
  GRID_LAYOUT_TEASER_BLOG_POST_MEDIUM_4X4,
  GRID_LAYOUT_TEASER_PORTRAIT_4X4,
} from '../../components/TeaserGrid/gridConfigs/constants';
import {
  CHANNEL_TYPE_BLOG,
  CHANNEL_TYPE_SPECIAL,
  CHANNEL_TYPE_VIDEO_BLOG,
} from '../Channel/constants';
import {
  LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
  LANDING_PAGE_TYPE,
} from './constants';
import {
  GET_BLOG_ENTITIES,
  GET_SPECIAL_ENTITIES,
  GET_VIDEO_BLOG_ENTITIES,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
} from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsNode } from '../../../../../shared/hooks/useRecommendations/typings';
import { ActiveMainChannel } from '../../../../shared/types';
import { MinistageChannelSponsorItem } from '../../components/Paragraphs/components/MinistageParagraph/components/MinistageChannelSponsor/typings';
import { TeaserProps } from '../../components/Teaser/typings';
import { LandingPageProps } from './typings';

type LandingPagePropsInner = LandingPageProps & {
  activeMainChannel: ActiveMainChannel;
  isBlogChannel: boolean;
  isVideoBlogChannel: boolean;
  isSpecialChannel: boolean;
  isTopicOverview: boolean;
  shouldDisplayGridItems: boolean;
  hasToRenderChannelBreadcrumbs: boolean;
  hasToRenderSpecialBreadcrumbs: boolean;
};

type LandingPageQueryComponentProps = {
  environment: Route & {
    routeByPath: Route;
  };
};

const SPLIT_ENTITY_QUEUE_BY_ITEMS = 12;

const SPLIT_MAP_BY_CHANNEL = {
  [MAIN_CHANNEL_PEOPLE]: 9,
  [MAIN_CHANNEL_ENTERTAINMENT]: 7,
  [MAIN_CHANNEL_FAMILY]: 3,
  [MAIN_CHANNEL_BODY_HEALTH]: 3,
};

/**
 * prepare body
 * @description splits the body by entityqueue items and merges x paragraphs between those entity queues
 * @param {ParagraphInterface} body
 * @param {string} paragraphsSubsetSize
 */
const prepareBody = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'body' implicitly has an 'any' type. */
  body,
  paragraphsSubsetSize = '',
  activeMainChannel: string,
) => {
  if (
    !body ||
    !Array.isArray(body) ||
    body.length === 0 ||
    body[0].__typename !== ENTITY_QUEUE_PARAGRAPH
  ) {
    return body;
  }

  // do deep copy of items to get ride of mutations
  const bodyCopy = JSON.parse(JSON.stringify(body));

  // we need this overwrite here for the gridOptions
  bodyCopy[0].style = ENTITY_QUEUE_STYLE_SPLIT_TOP;
  const splitParagraphId = bodyCopy[0].id;
  bodyCopy[0].id = splitParagraphId + ENTITY_QUEUE_STYLE_SPLIT_TOP;
  // do deep copy of items to get ride of mutations
  const entityQueueCopy = JSON.parse(JSON.stringify(bodyCopy[0]));
  entityQueueCopy.style = ENTITY_QUEUE_STYLE_SPLIT_BOTTOM;
  entityQueueCopy.id = splitParagraphId + ENTITY_QUEUE_STYLE_SPLIT_BOTTOM;

  // split and remove array items by given number of items
  bodyCopy[0]?.entityQueue?.items &&
    Array.isArray(bodyCopy[0].entityQueue?.items.edges) &&
    bodyCopy[0].entityQueue.items.edges.splice(
      SPLIT_MAP_BY_CHANNEL[activeMainChannel] || SPLIT_ENTITY_QUEUE_BY_ITEMS,
    );

  entityQueueCopy?.entityQueue?.items &&
    Array.isArray(entityQueueCopy.entityQueue.items.edges) &&
    entityQueueCopy.entityQueue.items.edges.splice(
      0,
      SPLIT_MAP_BY_CHANNEL[activeMainChannel] || SPLIT_ENTITY_QUEUE_BY_ITEMS,
    );

  // if we don't have to split the body we do it anyway because of no duplications of grid config
  // as we dont have to merge paragraphs into the body we have to push the split on last position
  if (body.length <= 2) {
    bodyCopy.push(entityQueueCopy);
  } else {
    bodyCopy.splice(parseInt(paragraphsSubsetSize) + 1, 0, entityQueueCopy);
  }

  return bodyCopy;
};

export const getTermSettings = (channel: Channel): TermSettings | null => {
  if (channel.channelType === CHANNEL_TYPE_BLOG) {
    return {
      headerLayout: OVERVIEW_PAGE_HEADER_BLOG_KEY,
      headerImage:
        channel?.authors?.edges?.[0]?.node?.imageParagraph?.image || null,
      title: channel?.settings?.title || '',
      lead: channel?.settings?.lead || '',
    };
  }
  if (channel.channelType === CHANNEL_TYPE_VIDEO_BLOG) {
    return {
      headerLayout: OVERVIEW_PAGE_HEADER_VIDEO_BLOG_KEY,
      headerImage:
        channel?.authors?.edges?.[0]?.node?.imageParagraph?.image || null,
      title: channel?.settings?.title || '',
      lead: channel?.settings?.lead || '',
    };
  }

  return channel?.settings || null;
};

let latestNAGenerator: Generator<RecommendationsNode> | null = null;

const recommendationsOperation =
  RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS;

type LandingPageTeaserProps = {
  gqlQuery: DocumentNode;
  gqlVariables: Record<string, unknown>;
  page: RouterProps['page'];
  pageSize?: number;
  gridConfig?: TeaserLayout;
  location: Partial<RaschRouterLocation>;
};

const LandingPageTeaser = ({
  gqlQuery,
  gqlVariables,
  page,
  pageSize,
  gridConfig,
  location,
}: LandingPageTeaserProps) => {
  const { data, loading, error } = useQuery<LandingPageQueryComponentProps>(
    gqlQuery,
    {
      variables: gqlVariables,
    },
  );

  if (loading) {
    return null;
  }

  const object = data?.environment?.routeByPath?.object as LandingPage;

  if (!object) {
    return null;
  }

  if (error) {
    return __DEVELOPMENT__ ? (
      <Error msg={`Apollo <Query> component error: ${error}`} />
    ) : null;
  }

  return (
    <>
      {object?.channel?.channelType === CHANNEL_TYPE_SPECIAL && (
        <div
          className={classNames(grid.Container, styles.SpecialHeaderWrapper)}
        >
          <Teaser
            component={TEASER_LAYOUT_SPECIAL_HERO}
            {...({
              title: object?.title || '',
              shortTitle: object?.shortTitle || object?.channel?.title || '',
              preferredUri: '',
              channel: object?.channel || {},
              teaserImage: object?.teaserImage || {},
            } as TeaserProps)}
          />
        </div>
      )}

      {object?.channel && (
        <OverviewPage
          location={location}
          page={page}
          pageSize={pageSize}
          routeObject={object?.channel}
          termSettings={getTermSettings(object?.channel)}
          gridConfig={gridConfig}
          paragraphType="LandingPageScreen"
          paragraphIndex={0}
        />
      )}
    </>
  );
};

const LandingPage = ({
  page,
  origin,
  location,
  landingPage,
  activeMainChannel,
  isAdSuppressed,
  isBlogChannel,
  isVideoBlogChannel,
  isSpecialChannel,
  isTopicOverview,
  shouldDisplayGridItems,
  hasToRenderChannelBreadcrumbs,
  hasToRenderSpecialBreadcrumbs,
}: LandingPagePropsInner) => {
  const { recommendations, fetchRecommendations } = useRecommendations();
  const fetchRecommendationsRef = useRef(fetchRecommendations);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Maybe<ParagraphInterface>[]> | undefined' is not assignable to parameter of type 'any[]'. */
  const recommendationsLimit = latestNACounter(landingPage?.body);
  useEffect(() => {
    if (recommendationsLimit <= 0) {
      return;
    }
    fetchRecommendationsRef.current({
      publication: PUBLICATION_GROUP_SI,
      articleKeywords: {},
      contentId: '1', // random number as it gets igonred by mostread anyway
      operation: recommendationsOperation,
      limit: recommendationsLimit,
    });
  }, [recommendationsLimit]);

  if (!landingPage || Object.keys(landingPage).length === 0) {
    return null;
  }

  latestNAGenerator = latestNativeAdvertisingsGenerator(recommendations);

  const gridItems = landingPage.grid?.edges;
  // const channel: Channel = landingPage.channel;

  const shouldUseQuery =
    isBlogChannel || isSpecialChannel || isVideoBlogChannel;

  const activeMenuTrail: ActiveMenuTrailItemConnection =
    (landingPage?.activeMenuTrail && {
      ...JSON.parse(JSON.stringify(landingPage.activeMenuTrail)),
    }) ||
    null;

  if (isVideoBlogChannel && activeMenuTrail) {
    // add "Videos" to the breadcrumbs at the first position
    activeMenuTrail.edges &&
      Array.isArray(activeMenuTrail.edges) &&
      activeMenuTrail.edges.length >= 2 &&
      activeMenuTrail.edges.splice(0, 1, {
        node: {
          id: 'videos',
          label: 'Videos',
          link: `/${ROUTE_VIDEOS}`,
        },
      });
  }
  const gqlQuery: DocumentNode = isBlogChannel
    ? GET_BLOG_ENTITIES
    : isSpecialChannel
    ? GET_SPECIAL_ENTITIES
    : isVideoBlogChannel
    ? GET_VIDEO_BLOG_ENTITIES
    : null;

  const overviewPageSize = isBlogChannel
    ? BLOG_PAGE_SIZE
    : isSpecialChannel
    ? SPECIALS_PAGE_SIZE
    : isVideoBlogChannel
    ? VIDEO_BLOG_PAGE_SIZE
    : 0;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const overviewPageOffset = (page - 1) * overviewPageSize;

  /**
   * Sub-pages like /specials/wallis request the same landingPage again later
   * which is then wrongly served from hydration with the originally requested landingPage
   * because it has the same path. Which results in a 404 flashing on SSR.
   * This landingPageCachebuster prevents that.
   */
  const landingPageCachebuster = isVideoBlogChannel
    ? '?isVideoBlogChannel'
    : isSpecialChannel
    ? '?isSpecialChannel'
    : '?isBlogChannel';

  const gqlVariables = {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    path: location && location.pathname.substr(1) + landingPageCachebuster,
    overviewPageSize: overviewPageSize,
    overviewPageOffset: overviewPageOffset,
    filter: isVideoBlogChannel
      ? [VIDEO_CONTENT_TYPE]
      : isSpecialChannel
      ? [
          ARTICLE_CONTENT_TYPE,
          IMAGE_GALLERY_CONTENT_TYPE,
          NATIVE_ADVERTISING_CONTENT_TYPE,
        ]
      : [ARTICLE_CONTENT_TYPE],
  };

  let gridConfig: TeaserLayout;
  if (isBlogChannel) {
    gridConfig = GRID_LAYOUT_TEASER_BLOG_POST_MEDIUM_4X4;
  } else if (isSpecialChannel) {
    gridConfig = GRID_LAYOUT_LANDSCAPE_SPECIAL;
  } else if (isVideoBlogChannel) {
    gridConfig = GRID_LAYOUT_TEASER_S_4X4;
  } else if (isTopicOverview) {
    gridConfig = GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3;
  } else {
    gridConfig = GRID_LAYOUT_TEASER_PORTRAIT_4X4;
  }

  const isChannelHome = [
    '/',
    `/${ROUTE_PEOPLE}`,
    `/${ROUTE_ENTERTAINMENT}`,
    `/${ROUTE_STYLE}`,
    `/${ROUTE_FAMILY}`,
    `/${ROUTE_BODY_HEALTH}`,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(location.pathname);

  const preparedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: prepareBody(
      landingPage.body,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | undefined'. */
      landingPage.paragraphsSubsetSize,
      activeMainChannel,
    ),
    hasEQsWithMMR: true,
  });

  const isHome = activeMainChannel === MAIN_CHANNEL_HOME;
  const channelSponsorItems: MinistageChannelSponsorItem[] =
    getChannelSponsorItems(activeMainChannel);

  return (
    <TestFragment data-testid="landing-page-wrapper">
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage.cloneContentUri}
      />

      {hasToRenderChannelBreadcrumbs && (
        <TestFragment data-testid="channel-breadcrumbs-wrapper">
          <Breadcrumbs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            pageUrl={landingPage.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
            items={activeMenuTrail}
          />
        </TestFragment>
      )}

      {hasToRenderSpecialBreadcrumbs && (
        <TestFragment data-testid="specials-breadcrumbs-wrapper">
          <Breadcrumbs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            pageUrl={landingPage.preferredUri}
            // @ts-ignore
            items={{
              edges: [{ node: { id: '', label: MAIN_CHANNEL_SPECIALS } }],
            }}
          />
        </TestFragment>
      )}

      {landingPage?.channel?.sponsors?.edges &&
        Array.isArray(landingPage?.channel?.sponsors?.edges) && (
          <TestFragment data-testid="landing-page-partnerbanner-wrapper">
            <PartnerBanner
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<SponsorEdge>[]' is not assignable to type 'SponsorEdge[]'. */
              sponsors={landingPage?.channel?.sponsors?.edges || []}
            />
          </TestFragment>
        )}

      {gqlQuery && shouldUseQuery && (
        <LandingPageTeaser
          gqlQuery={gqlQuery}
          gqlVariables={gqlVariables}
          page={page}
          pageSize={overviewPageSize}
          gridConfig={gridConfig}
          location={location}
        />
      )}

      {shouldDisplayGridItems && gridItems && gridItems.length > 0 && (
        <TestFragment data-testid="landing-page-grid">
          <OverviewPageHeader
            title={landingPage?.title || ''}
            lead={landingPage?.lead || ''}
            component={OVERVIEW_PAGE_HEADER_DEFAULT}
          />
          <TeaserGrid
            layout={GRID_LAYOUT_LANDINGPAGE_SPECIAL_4X3}
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            items={gridItems.map((item) => ensureTeaserInterface(item.node))}
            origin={origin}
          />
          <div className={grid.Container}>
            <Pager
              component={PAGER_TYPE_PAGE_LOADER}
              currentPage={page}
              itemsCount={landingPage?.grid?.count || 0}
              itemsPerPage={LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE}
            />
          </div>
        </TestFragment>
      )}

      {preparedBodyWithAds &&
        Array.isArray(preparedBodyWithAds) &&
        preparedBodyWithAds.length > 0 && (
          <>
            <TestFragment data-testid="landing-page-paragraphs">
              <Paragraphs
                latestNAGenerator={latestNAGenerator}
                pageBody={preparedBodyWithAds}
                forceUpdate={recommendations?.[recommendationsOperation]}
                origin={origin || LANDING_PAGE_TYPE}
                hasContainer={false}
                isAdSuppressed={
                  landingPage?.channel?.suppressAds || isAdSuppressed
                }
              />
            </TestFragment>
            {isChannelHome &&
              channelSponsorItems &&
              Array.isArray(channelSponsorItems) &&
              channelSponsorItems.length > 0 && (
                <div className={styles.MinistageChannelSponsorWrapper}>
                  <MinistageChannelSponsor
                    asSlider={isHome}
                    items={channelSponsorItems}
                  />
                </div>
              )}
          </>
        )}
    </TestFragment>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const withMapProps = () =>
  mapProps((props: LandingPagePropsInner) => {
    const isBlogChannel =
      props.landingPage?.channel?.channelType === CHANNEL_TYPE_BLOG;
    const isVideoBlogChannel =
      props.landingPage?.channel?.channelType === CHANNEL_TYPE_VIDEO_BLOG;
    const isSpecialChannel =
      props.landingPage?.channel?.channelType === CHANNEL_TYPE_SPECIAL;
    const isTopicOverview =
      props.landingPage?.grid?.edges?.[0]?.node?.__typename === 'Topic'; // TODO: identify overview page by a landingpage property (ask CMS team)
    const shouldDisplayGridItems =
      isTopicOverview ||
      (!isBlogChannel &&
        !isVideoBlogChannel &&
        !isSpecialChannel &&
        props.activeMainChannel === MAIN_CHANNEL_SPECIALS); // TODO: add this again and check with the CMS team if we can get the used filters from the CMS

    const hasToRenderChannelBreadcrumbs =
      (isBlogChannel || isSpecialChannel || isVideoBlogChannel) &&
      props.landingPage.preferredUri &&
      props.landingPage.activeMenuTrail;

    const hasToRenderSpecialBreadcrumbs =
      shouldDisplayGridItems &&
      props.landingPage.preferredUri &&
      !isTopicOverview;

    return {
      ...props,
      isBlogChannel,
      isVideoBlogChannel,
      isSpecialChannel,
      isTopicOverview,
      shouldDisplayGridItems,
      hasToRenderChannelBreadcrumbs,
      hasToRenderSpecialBreadcrumbs,
    };
  });

export default compose<any, any>(
  connect(mapStateToProps),
  withMapProps(),
  withHelmet({
    getNode: ({ landingPage }: LandingPagePropsInner): LandingPage =>
      landingPage,
    getImage: ({ landingPage }: LandingPagePropsInner) => {
      // Because of wrong ParagraphInterface typing we have to type it like this right now
      const landingPageBody = landingPage?.body as any;
      return (
        landingPage?.teaserImage?.image?.file ||
        landingPageBody?.[0]?.entityQueue?.items?.edges?.[0]?.node?.teaserImage
          ?.image?.file
      );
    },
    getNodesCount: ({ landingPage }: LandingPagePropsInner) =>
      landingPage?.grid?.count || 0,
    pageSize: LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
    getRootSchemaType: ({ activeMainChannel }: LandingPagePropsInner) =>
      activeMainChannel === MAIN_CHANNEL_HOME
        ? ROOT_SCHEMA_TYPE_ORGANIZATION
        : ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: ({ landingPage }: LandingPagePropsInner) =>
      getAllArticles(landingPage),
    hasBreadcrumbs: (props: LandingPagePropsInner) =>
      props.hasToRenderChannelBreadcrumbs ||
      props.hasToRenderSpecialBreadcrumbs,
  }),
)(LandingPage);
