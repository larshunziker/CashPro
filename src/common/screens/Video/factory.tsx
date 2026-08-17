import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import renderTopic from '../../../shared/helpers/topic';
import { getRestrictedClassName } from '../../../shared/helpers/withHelmet';
import { resetHeaderData, setHeaderData } from '../../../shared/actions/header';
import TestFragment from '../../../shared/tests/components/TestFragment';
import grid from '../../assets/styles/grid.legacy.css';
import { VideoDetailFactoryOptions, VideoProps } from './typings';

type VideoPropsInner = VideoProps & {
  resetHeaderData: Function;
  setHeaderData: Function;
};

type VideoQueryProps = {
  environment: Route & {
    routeByPath: {
      object: {
        newer?: VideoConnection;
        older?: VideoConnection;
      };
    };
  };
};

const VideoRecommendations = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'appMessageLoadingVideos' implicitly has an 'any' type. */
  appMessageLoadingVideos,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'appMessageMoreVideos' implicitly has an 'any' type. */
  appMessageMoreVideos,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'appMessageVideosOfChannel' implicitly has an 'any' type. */
  appMessageVideosOfChannel,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'channelType' implicitly has an 'any' type. */
  channelType,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'getRecommendationItems' implicitly has an 'any' type. */
  getRecommendationItems,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
  location,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'publication' implicitly has an 'any' type. */
  publication,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'styles' implicitly has an 'any' type. */
  styles,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'video' implicitly has an 'any' type. */
  video,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'videoBlogChannelType' implicitly has an 'any' type. */
  videoBlogChannelType,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'videoRecommendationsQuery' implicitly has an 'any' type. */
  videoRecommendationsQuery,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'videosRouteUrl' implicitly has an 'any' type. */
  videosRouteUrl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'ErrorMessage' implicitly has an 'any' type. */
  ErrorMessage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'Recommendations' implicitly has an 'any' type. */
  Recommendations,
}) => {
  const gqlVariables = {
    publication,
    path:
      location &&
      location.pathname.substr(1) +
        ((!__TESTING__ && '?videoRecommendations') || ''),
    termId:
      channelType === videoBlogChannelType ? Number(video.channel.tid) : null,
  };

  const { data, loading, error } = useQuery<VideoQueryProps>(
    videoRecommendationsQuery,
    {
      variables: gqlVariables,
    },
  );

  const object = data?.environment?.routeByPath?.object;

  const recommendationItems: Array<RecommendationListItem> =
    getRecommendationItems(
      object?.newer?.edges || [],
      object?.older?.edges || [],
    );

  return (
    <div
      className={styles.RecommendationsWrapper}
      data-testid="recommendations-query-wrapper"
    >
      {loading && (
        <div className={styles.Loading}>{appMessageLoadingVideos}</div>
      )}

      {!loading && error && !object && __DEVELOPMENT__ && (
        <ErrorMessage msg={`Apollo <Query> component error: ${error}`} />
      )}

      {(!loading && object && (
        <TestFragment data-testid="recommendations-wrapper">
          <Recommendations
            items={recommendationItems}
            title={
              channelType === videoBlogChannelType
                ? appMessageVideosOfChannel
                : appMessageMoreVideos
            }
            titleLinkPath={
              channelType === videoBlogChannelType
                ? video?.channel?.landingPage?.preferredUri
                : `/${videosRouteUrl}`
            }
            trackingOrigin="bottom"
          />
        </TestFragment>
      )) ||
        null}
    </div>
  );
};

const VideoFactory = ({
  origin,
  styles,
  videosRouteUrl,
  ArticleAlerts,
  ArticleHeader,
  videoBlogChannelType,
  Breadcrumbs,
  ErrorMessage,
  getRecommendationItems,
  LinkButton,
  EditButtons,
  OverviewPageHeader,
  Paragraphs,
  Recommendations,
  SocialBar,
  videoRecommendationsQuery,
  publication,
  appMessageVideosOfChannel = 'Weitere Videos aus der Serie',
  appMessageMoreVideos = 'Weitere Videos',
  appMessageLoadingVideos = 'Videos werden geladen...',
}: VideoDetailFactoryOptions) => {
  const Video = ({
    video,
    location,
    resetHeaderData,
    setHeaderData,
  }: VideoPropsInner): ReactElement => {
    const {
      channel,
      shortTitle,
      preferredUri,
      title,
      lead,
      gcid,
      __typename,
    }: Video = video;

    const channelType: string = video?.channel?.channelType || '';

    useEffect(() => {
      setHeaderData({
        articleData: {
          gcid,
          title,
          shortTitle,
          lead,
          channel,
          preferredUri,
        },
        contentType: __typename,
      });

      return () => {
        resetHeaderData();
      };
    }, [
      __typename,
      channel,
      gcid,
      preferredUri,
      resetHeaderData,
      setHeaderData,
      title,
      shortTitle,
      lead,
    ]);

    if (!video) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }
    const topicList = video?.relatedTopics?.edges;

    const activeMenuTrail = video?.activeMenuTrail
      ? {
          ...JSON.parse(JSON.stringify(video?.activeMenuTrail)),
        }
      : null;

    // add "Videos" to the breadcrumbs at the last position before the h1 title
    Array.isArray(activeMenuTrail?.edges) &&
      activeMenuTrail.edges.length >= 2 &&
      activeMenuTrail.edges.splice(activeMenuTrail.edges.length - 1, 0, {
        node: {
          label: 'Videos',
          link: `/${videosRouteUrl}`,
        },
      });

    return (
      <TestFragment data-testid="video-container">
        {EditButtons && (
          <EditButtons
            editContentUri={video.editContentUri}
            editRelationUri={video.editRelationUri}
          />
        )}
        {(video?.preferredUri && activeMenuTrail && Breadcrumbs && (
          <div className={styles.BreadcrumbsContainer}>
            <TestFragment data-testid="video-breadcrumbs-wrapper">
              <Breadcrumbs
                pageUrl={video.preferredUri}
                items={activeMenuTrail}
              />
            </TestFragment>
          </div>
        )) ||
          null}

        <div className={getRestrictedClassName(video.__typename)}>
          {(channelType === videoBlogChannelType && OverviewPageHeader && (
            <TestFragment data-testid="overview-page-header-wrapper">
              <OverviewPageHeader
                title={video?.channel?.settings?.title || 'Videos'}
                lead={video?.channel?.settings?.lead || ''}
                headerImage={video?.channel?.settings?.headerImage || null}
              />
            </TestFragment>
          )) ||
            null}
          <div
            className={styles.Container}
            data-testid="video-detail-page-wrapper"
          >
            <div className={styles.Row}>
              <div className={styles.VideoContainer}>
                <Paragraphs
                  pageBody={[video]}
                  origin={origin}
                  hasContainer={false}
                  // this key is needed to force the component to re-render, otherwise the video will not be reloaded when using "history back" on video detail pages on SI
                  key={`video-id-${video.brightcoveId}`}
                />
                {ArticleHeader && (
                  <ArticleHeader
                    shortTitle={video.shortTitle || ''}
                    title={video.title || ''}
                    lead={video.caption || ''}
                  />
                )}
                {(video?.preferredUri && SocialBar && (
                  <div className={styles.SocialBarWrapper}>
                    <SocialBar />
                  </div>
                )) ||
                  null}
              </div>
            </div>

            {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
            {topicList?.length > 0 && (
              <div
                className={classNames(
                  styles.ArticleAlertsWrapper,
                  grid.HideForPrint,
                )}
              >
                <div className={styles.ArticleAlertsInnerWrapper}>
                  <strong className={styles.Topic}>Topics: </strong>
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {topicList.map((topic, index) =>
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<TopicEdge>' is not assignable to parameter of type 'TopicEdge'. */
                    renderTopic(topic, index, styles.Topic),
                  )}
                </div>
              </div>
            )}

            {(video?.keywords?.edges &&
              Array.isArray(video.keywords.edges) &&
              video.keywords.edges.length > 0 &&
              ArticleAlerts && (
                <div
                  className={classNames(
                    styles.ArticleAlertsWrapper,
                    grid.HideForPrint,
                  )}
                  data-testid="video-screen-article-alerts-wrapper"
                >
                  <div className={styles.ArticleAlertsInnerWrapper}>
                    <ArticleAlerts items={video.keywords.edges} />
                  </div>
                </div>
              )) ||
              null}

            {(video?.channel?.tid &&
              Recommendations &&
              videoRecommendationsQuery &&
              getRecommendationItems && (
                <VideoRecommendations
                  appMessageLoadingVideos={appMessageLoadingVideos}
                  appMessageMoreVideos={appMessageMoreVideos}
                  appMessageVideosOfChannel={appMessageVideosOfChannel}
                  channelType={channelType}
                  getRecommendationItems={getRecommendationItems}
                  location={location}
                  publication={publication}
                  styles={styles}
                  video={video}
                  videoBlogChannelType={videoBlogChannelType}
                  videoRecommendationsQuery={videoRecommendationsQuery}
                  videosRouteUrl={videosRouteUrl}
                  ErrorMessage={ErrorMessage}
                  Recommendations={Recommendations}
                />
              )) ||
              null}

            <div className={styles.CTAWrapper}>
              <LinkButton link={{ path: `/${videosRouteUrl}` }}>
                {appMessageMoreVideos}
              </LinkButton>
            </div>
          </div>
        </div>
      </TestFragment>
    );
  };

  const mapDispatchToProps: Record<string, any> = {
    setHeaderData,
    resetHeaderData,
  };

  return connect(null, mapDispatchToProps)(Video);
};

export default VideoFactory;
