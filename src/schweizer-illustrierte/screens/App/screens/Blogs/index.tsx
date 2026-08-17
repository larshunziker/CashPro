import React, { ReactElement } from 'react';
import compose from 'recompose/compose';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Breadcrumbs from '../../components/Breadcrumbs';
import OverviewPage from '../../components/OverviewPage';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_BLOGS } from '../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../constants';
import { PAGE_SIZE } from './constants';
import { BlogsProps } from './typings';

type BlogsPropsInner = BlogsProps & {
  data: QueryRoot & {
    loading: boolean;
    environment: Route & {
      routeByPath: Route;
      termsByVocabulary: Channel;
    };
  };
};

const getFallbackTitle = (landingPage: LandingPage) =>
  `${landingPage?.title || 'Blogs'} - ${SITE_TITLE}`;

const Blogs = ({ data, location, page }: BlogsPropsInner): ReactElement => {
  if (
    !data ||
    !data.environment ||
    !data.environment.termsByVocabulary ||
    !data.environment.routeByPath ||
    !data.environment.routeByPath.object
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const blogs: ChannelConnection = data.environment.termsByVocabulary;
  const landingPage: LandingPage = data.environment.routeByPath.object;

  const termSettings: TermSettings = {
    title: landingPage.title || 'Blogs',
    lead: landingPage.lead,
  };

  const updatedData: {
    routeObject: Channel;
  } = (blogs.edges || []).reduce(
    (updatedData, blog: ChannelEdge) => {
      const edges = updatedData.routeObject.entities.edges;

      const blogNode = blog.node || null;

      if (blogNode && blogNode.showOnBlogsOverview) {
        // add TeaserChannel at first place in row
        /* @ts-ignore TODO: TS2322 ->  Type 'Channel' is not assignable to type 'never'. */
        edges.push({ node: blogNode });

        // we start with placeholders to keep grid: 1 channel teaser, then three teasers with articles
        const blogArticles = [null, null, null];

        if (blogNode.entities?.items) {
          blogNode.entities.items.forEach(
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<SearchableUnion>' is not assignable to type 'null'. */
            (blogPost, index) => (blogArticles[index] = blogPost),
          );
        }

        // if blog has blog posts add them to gridConfig
        /* @ts-ignore TODO: TS2345 ->  Argument of type '(blogPost */
        blogArticles.forEach((blogPost: Article) => {
          /* @ts-ignore TODO: TS2322 ->  Type 'Article' is not assignable to type 'never'. */
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
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  updatedData.routeObject.entities.count =
    data.environment.termsByVocabulary.count;
  return (
    <TestFragment data-testid="blogs-container">
      {landingPage.preferredUri && landingPage.activeMenuTrail && (
        <Breadcrumbs
          pageUrl={landingPage.preferredUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
          items={landingPage.activeMenuTrail}
        />
      )}

      <OverviewPage
        location={location}
        routeObject={updatedData.routeObject}
        termSettings={termSettings}
        gridConfig={GRID_LAYOUT_BLOGS}
        paragraphType="BlogsScreen"
        page={page}
        pageSize={PAGE_SIZE}
      />
    </TestFragment>
  );
};

export default compose<any, any>(
  withPagePager,
  withHelmet({
    getNode: (mapProps: BlogsPropsInner): RouteObjectInterface | null =>
      mapProps.data?.environment?.routeByPath?.object || null,
    getFallbackTitle: (mapProps: BlogsPropsInner): string =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<RouteObjectInterface> | undefined' is not assignable to parameter of type 'LandingPage'. */
      getFallbackTitle(mapProps.data?.environment?.routeByPath?.object),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps): number =>
      mapProps.data?.environment?.routeByPath?.object.entities?.count || 0,
    pageSize: () => PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps?.data?.environment?.routeObject?.entities?.edges || [],
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(Blogs);
