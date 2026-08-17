/**
 * @file   VideoDetail factory tests
 * @author Karol Stępień <karol.stepien@dreamlab.pl>
 * @date   2019-05-31
 */

import React from 'react';
import { gql } from '@apollo/client';
import { render, waitFor } from '@testing-library/react';
import componentFactory from '../factory';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import MockedProvider from '../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import queryComponentResponseData from './queryComponentResponse.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'defaultComponentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determin */
let defaultComponentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

const apolloConfig = {
  options: {
    variables: {
      publication: 'SI',
      path: 'video',
      termId: null,
    },
  },
};

let initialState = {};

const initialWindowState = {
  height: 500,
  scrollTop: 0,
  viewport: {
    label: 'viewport/xs',
    from: 0,
    to: 759,
  },
  imageBreakpoint: {
    label: '0',
    from: 0,
    to: 759,
  },
  width: 320,
};

const query = gql`
  query VideoDetailRecommendationsAllVideos(
    $publication: PublicationEnum
    $path: String!
    $termId: Int
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        object {
          ... on Video {
            id
            newer: timeRelatedContent(
              mode: Newer
              channelIds: [$termId]
              limit: 4
            ) {
              edges {
                node {
                  id
                }
              }
            }
            older: timeRelatedContent(
              mode: Older
              channelIds: [$termId]
              limit: 4
            ) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

beforeEach(() => {
  defaultComponentFactoryOptions = {
    styles: {
      SocialBarWrapper: '',
      RecommendationsWrapper: '',
      CTAWrapper: '',
      Loading: '',
    },
    ArticleAlerts: () => <div className="ArticleAlerts" />,
    ArticleHeader: () => <div className="ArticleHeader" />,
    Breadcrumbs: () => <div className="Breadcrumbs" />,
    ErrorMessage: () => <div className="Error" />,
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ styles */
    Link: () => <div className="Link" />,
    LinkButton: () => <div className="LinkButton" />,
    OverviewPageHeader: () => <div className="OverviewPageHeader" />,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getRecommendationItems: () => {},
    grid: {},
    Paragraphs: () => <div className="Paragraphs" />,
    Recommendations: () => <div className="Recommendations" />,
    SocialBar: () => <div className="SocialBar" />,
    videoBlogChannelType: '',
    videoRecommendationsQuery: query,
    videosRouteUrl: '',
    origin: 'video-page',
    publication: apolloConfig.options.variables.publication,
  };
  initialProps = {
    video: JSON.parse(JSON.stringify(mockData)),
    setHeaderData: () => null,
    resetHeaderData: () => null,
    location: {
      pathname: `/${apolloConfig.options.variables.path}`,
    },
  };

  initialState = {
    window: initialWindowState,
  };

  Component = componentFactory(defaultComponentFactoryOptions);
});

describe('[Common] VideoDetail factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull;
  });

  it('Should render correctly', async () => {
    const { queryAllByTestId, queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query,
              variables: apolloConfig.options.variables,
            },
            result: queryComponentResponseData,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(queryAllByTestId('video-container')).toHaveLength(1);
      expect(
        queryByTestId('video-screen-article-alerts-wrapper'),
      ).not.toBeNull();
      expect(queryByTestId('video-breadcrumbs-wrapper')).not.toBeNull();
      expect(queryByTestId('video-detail-page-wrapper')).not.toBeNull();
    });
  });

  it('Should not render keywords', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.video.keywords;
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query,
              variables: apolloConfig.options.variables,
            },
            result: queryComponentResponseData,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(queryByTestId('video-screen-article-alerts-wrapper')).toBeNull();
    });
  });

  it('Should render video detail with recommendations', async () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query,
              variables: apolloConfig.options.variables,
            },
            result: queryComponentResponseData,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() =>
      expect(queryByTestId('recommendations-wrapper')).not.toBeNull(),
    );
  });

  it('Should render video blog detail with video blog header', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'defaultComponentFactoryOptions' implicitly has an 'any' type. */
    defaultComponentFactoryOptions.videoBlogChannelType = 'video_blog';

    /* @ts-ignore TODO: TS2322 ->  Type '5776' is not assignable to type 'null'. */
    apolloConfig.options.variables.termId = 5776;
    /* @ts-ignore TODO: TS7005 ->  Variable 'defaultComponentFactoryOptions' implicitly has an 'any' type. */
    const NewComponent = componentFactory(defaultComponentFactoryOptions);

    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query,
              variables: apolloConfig.options.variables,
            },
            result: queryComponentResponseData,
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <NewComponent {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(queryByTestId('overview-page-header-wrapper')).not.toBeNull();
      expect(queryByTestId('recommendations-wrapper')).not.toBeNull();
    });
  });
});
