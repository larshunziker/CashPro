// TODO: rethink reco handling! this forceUpdate hack should be removed and the data fetched
// within the reco component and not on this screen to avoid heavy re-renderings

import React, { ReactElement, useEffect, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { enrichArticleBodyWithADs } from '../../../../../shared/helpers/ads';
import { getAllAuthors } from '../../../../../shared/helpers/authors';
import {
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import renderTopic from '../../../../../shared/helpers/topic';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import useImpressionTracking from '../../../../../shared/hooks/useImpressionTracking';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import ArticleHeader from '../../components/ArticleHeader';
import AuthorBox from '../../components/AuthorBox';
import Badge from '../../components/Badge';
import BloggerProfileBox from '../../components/BloggerProfileBox';
import Breadcrumbs from '../../components/Breadcrumbs';
import Comments from '../../components/Comments';
import EditButtons from '../../components/EditButtons';
import LoadingSpinner from '../../components/LoadingSpinner';
import MagazineIssueSection from '../../components/MagazineIssueSection';
import Paragraphs from '../../components/Paragraphs';
import PartnerBanner from '../../components/PartnerBanner';
import Recommendations from '../../components/Recommendations';
import Teaser from '../../components/Teaser';
import Tooltip from '../../components/Tooltip';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import ArticleHero from '../Article/components/ArticleHero';
import AuthorsTeaser from './components/AuthorsTeaser';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_STATUS_HIDDEN,
} from '../../../../../shared/constants/comments';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ANCHOR_HERO,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { VIDEO_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { PUBLICATION_GROUP_SI } from '../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import {
  TRACKING_CLASS_CONTENT_BODY,
  TRACKING_CLASS_CONTENT_HEADER,
} from '../../../../../shared/constants/tracking';
import {
  TEASER_LAYOUT_RELATED,
  TEASER_LAYOUT_S,
  TEASER_LAYOUT_SPECIAL_S,
} from '../../components/../../../../shared/constants/teaser';
import { MMR_1 } from '../../components/AppNexus/constants';
import { ADVERTORIAL } from '../../constants';
import {
  ARTICLE_DEFAULT,
  ARTICLE_TYPE_SPECIAL,
  ARTICLE_VIDEO,
  ARTICLE_VIDEO_HERO,
} from '../Article/constants';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_CONFIG_NATIVE_ADVERTISING,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../ArticlePage/constants';
import { CHANNEL_TYPE_BLOG, CHANNEL_TYPE_SPECIAL } from '../Channel/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import {
  RecommendationsItem,
  useRecommendationsResponse,
} from '../../../../../shared/hooks/useRecommendations/typings';
import { ActiveMainChannel } from '../../../../shared/types';
import { ArticlePageProps } from './typings';

export type ArticlePagePropsInner = ArticlePageProps & {
  activeMainChannel: ActiveMainChannel;
  activeContentType: string;
  screenReady: boolean;
  routePathname: string;
  resetHeaderData: () => void;
  setHeaderData: (props: HeaderState) => void;
};

type DateProps = {
  publicationDate: string;
  changeDate: string;
  showUpdated: boolean;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
const hasVideoParagraph = (item) => item.__typename === VIDEO_PARAGRAPH;

const getFallbackTitle = ({
  subtypeValue = 'Artikel',
}:
  | (NativeAdvertising & { subtypeValue?: string })
  | (Article & { subtypeValue?: string })): string => subtypeValue;

type SourceProps = {
  source: string;
};

export const Source = ({ source }: SourceProps): ReactElement =>
  /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  (source && <span>{`, Quelle: ${source}`}</span>) || null;

const Dates = ({
  publicationDate,
  changeDate,
  showUpdated = false,
}: DateProps): ReactElement => {
  if (!publicationDate) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const isModificationDateVisible =
    !!showUpdated &&
    !!changeDate &&
    new Date(publicationDate).getTime() < new Date(changeDate).getTime();

  return (
    <>
      {getFormattedElapsedDate({
        createDate: publicationDate,
        format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
        prefix: 'am',
      })}
      {publicationDate && isModificationDateVisible ? ', ' : null}
      {publicationDate && isModificationDateVisible ? (
        <TestFragment data-testid="modification-date-wrapper">
          <TestFragment data-testid="modification-date-label">
            {/* TODO: could not get it run with the prefix on getFormattedElapsedDate */}
            aktualisiert&nbsp;
          </TestFragment>
          {getFormattedElapsedDate({
            changeDate: changeDate,
            format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
            maxHours: 23,
          })}
        </TestFragment>
      ) : null}
    </>
  );
};

const getEmptyTeaserPlaceholder = (
  gcid: string | number = Math.random(), // Math.random as fallback if gcid is not set (should actually never happen)
  itemsCount: number,
): Array<any> => {
  return Array(itemsCount)
    .fill({})
    .map((_: any, index: number) => {
      return {
        node: { id: `${gcid}-${index}` },
        skeleton: true,
      };
    });
};

const ArticlePage = ({
  article,
  activeMainChannel,
  activeContentType,
  screenReady,
  routePathname,
  resetHeaderData,
  setHeaderData,
}: ArticlePagePropsInner): ReactElement => {
  const { isSSR } = useSSRContext();

  const gcid: string = article?.gcid || '';
  /* @ts-ignore TODO: TS2322 ->  Type 'KeywordConnection | null' is not assignable to type 'KeywordConnection'. */
  const keywords: KeywordConnection = article?.keywords || null;
  const isBlog = article?.channel?.channelType === CHANNEL_TYPE_BLOG;
  const isSpecial =
    article &&
    article.channel &&
    article.channel.channelType &&
    article.channel.channelType === CHANNEL_TYPE_SPECIAL;
  const isNativeAdvertising =
    activeContentType === NATIVE_ADVERTISING_CONTENT_TYPE;
  const authorPrefix: string = article?.authorPrefix || '';

  // Because our new Ceo pushed for a unification of branding
  // we had to rename all Native Advertising content of type "Advertorial"
  // to "Publireportage". Our backend boys decided to only change the
  // label, but not the value and that is why we still check for advertorial.
  // @see https://github.com/rasch-dtc/rasch-backend/blob/dev/config/sync/field.storage.group_content.field_advertising_type.yml#L15-L16
  const isAdvertorial = article?.subtypeValue === ADVERTISING_TYPE_ADVERTORIAL;
  const recommendationLimit = isBlog || isAdvertorial ? 12 : 14;

  const [recos, setRecos] = useState<Array<RecommendationsItem | any>>([]);

  const [hasFetchedRecos, setHasFetchedRecos] = useState<boolean>(false);

  useImpressionTracking({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    trackingDetailImpression: (article as NativeAdvertising)
      ?.trackingDetailImpression,
    pathname: routePathname,
    screenReady: screenReady,
    isNativeAdvertising,
  });

  const { fetchRecommendations }: useRecommendationsResponse =
    useRecommendations();

  const {
    setRef: inArticleRecosRef,
    isInView: isInArticleRecosInView,
  }: UseInViewResponse = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });
  const {
    setRef: bottomRecosRef,
    isInView: isBottomRecosInView,
  }: UseInViewResponse = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  /* @ts-ignore TODO: TS2322 ->  Type 'Article | NativeAdvertising' is not assignable to type '(ArticleInterface & MetatagProviderInterface & NodeInterf */
  const {
    id,
    subtypeValue = '',
    channel,
    commentStatus,
    preferredUri,
    socialMediaTitle,
    title,
    lead,
    createDate,
    __typename,
  }:
    | (NativeAdvertising & { subtypeValue?: string })
    | (Article & { subtypeValue?: string }) = article;

  const shortTitle: string =
    article?.shortTitle ||
    (!isAdvertorial && (article as NativeAdvertising)?.advertisingTypeLabel) ||
    article?.channel?.title ||
    '';

  useEffect(() => {
    setHeaderData({
      articleData: {
        id,
        gcid,
        title,
        shortTitle,
        lead,
        subtypeValue,
        channel,
        commentStatus,
        preferredUri,
        socialMediaTitle,
        createDate,
      },
      contentType: __typename,
    });

    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    gcid,
    channel,
    commentStatus,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    socialMediaTitle,
    subtypeValue,
    title,
    shortTitle,
    lead,
    createDate,
    id,
  ]);

  // useEffect to fetch recos
  useEffect(() => {
    if (!gcid) {
      return;
    }

    if (
      !hasFetchedRecos &&
      (isInArticleRecosInView === true || isBottomRecosInView === true)
    ) {
      const fetchOperation =
        isBlog || isSpecial
          ? RECOMMENDATION_OPERATION.IN_CHANNEL
          : RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT;
      const nativeAdvertisingConfig =
        isBlog || isAdvertorial ? [1, 3, 7, 10, 11] : [1, 5, 9, 12, 13];

      fetchRecommendations({
        contentId: gcid,
        articleKeywords: keywords,
        publication: PUBLICATION_GROUP_SI,
        limit: recommendationLimit,
        mainChannel: activeMainChannel,
        operation: fetchOperation,
        type:
          (isNativeAdvertising && RECOMMENDATION_TYPE.CBRECO) ||
          RECOMMENDATION_TYPE.NATGOAL,
        nativeAdvertisingConfig,
      }).then((res: Array<RecommendationsItem> = []) => {
        setRecos(res);
      });

      setHasFetchedRecos(true);
    }
  }, [
    isBlog,
    isSpecial,
    isInArticleRecosInView,
    isBottomRecosInView,
    hasFetchedRecos,
    fetchRecommendations,
    gcid,
    keywords,
    isNativeAdvertising,
    isAdvertorial,
    activeMainChannel,
    recommendationLimit,
  ]);

  // useEffect to reset the state if the recos have already been fetched
  useEffect(() => {
    return () => {
      if (gcid) {
        setHasFetchedRecos(false);
        setRecos(getEmptyTeaserPlaceholder(gcid, recommendationLimit));
      }
    };
  }, [gcid, recommendationLimit]);

  if (!article || Object.keys(article).length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  const hasVideo =
    (article?.heroImageBody &&
      article.heroImageBody.filter(hasVideoParagraph).length > 0) ||
    false;
  const articleVariant: string = (hasVideo && ARTICLE_VIDEO) || ARTICLE_DEFAULT;

  const channelUri: string = article.channel?.landingPage?.preferredUri || '';

  /* @ts-ignore TODO: TS2322 ->  Type 'Author | null' is not assignable to type 'Author'. */
  const author: Author =
    article.authors?.edges?.[0]?.node ||
    article.channel?.authors?.edges?.[0]?.node ||
    null;

  /* @ts-ignore TODO: TS2322 ->  Type 'any[] | null' is not assignable to type 'RecommendationsItem[]'. */
  const inArticleRecommendations: Array<RecommendationsItem> =
    isBlog || isAdvertorial ? null : recos.slice(0, 2);
  const bottomArticleRecommendations: Array<RecommendationsItem> =
    isBlog || isAdvertorial ? recos : recos.slice(2);

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[] | null' is not assignable to type 'AuthorEdge[]'. */
  const authorsNodes: Array<AuthorEdge> =
    (article && article.authors && article.authors.edges) || null;

  const topicList = article?.relatedTopics?.edges;

  const shortTitleElement = isNativeAdvertising && (
    <div className={getThemedClass('ShortTitleWrapper')}>
      <Tooltip
        content="Dieser Inhalt wurde von oder in Zusammenarbeit mit einem Werbepartner erstellt."
        link={{
          path: '/werbung-und-inhalte',
          text: 'Mehr erfahren',
        }}
        origin={ADVERTISING_TYPE_NATIVE_ARTICLE}
        activeMainChannel={activeMainChannel}
      >
        {isAdvertorial && (
          <div className={styles.BadgeWrapper}>
            <Badge label={ADVERTORIAL} color="grayD" />
          </div>
        )}
        <span
          className={classNames(
            styles.ShortTitleSI,
            getThemedClass('ShortTitle'),
          )}
        >
          {shortTitle}
        </span>
      </Tooltip>
    </div>
  );

  const articleHeader: ReactElement = (
    <>
      <ArticleHeader
        shortTitle={shortTitle}
        /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | null | undef */
        shortTitleElement={shortTitleElement}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        title={article.title}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        lead={article.lead}
      />
      <BodyClassName className={styles.ArticleBody}>
        <div
          className={classNames(
            'utility-bar-wrapper',
            styles.UtilityBarWrapper,
          )}
        >
          <UtilityBar
            enabledUtilities={
              (isNativeAdvertising && UTILITYBAR_CONFIG_NATIVE_ADVERTISING) ||
              UTILITYBAR_CONFIG_ARTICLE
            }
          >
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <UtilityOverlay
                overlayTitle="Artikel teilen"
                isOverlayVisible={isOverlayVisible}
                toggleOverlayVisible={toggleOverlayVisible}
                enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
              />
            )}
          </UtilityBar>
        </div>
      </BodyClassName>
    </>
  );

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<SponsorEdge>[]' is not assignable to type 'SponsorEdge[]'. */
  const partnerBannerSponsors: Array<SponsorEdge> =
    (isNativeAdvertising &&
      article?.sponsor && [{ node: { ...article.sponsor } }]) ||
    article?.channel?.sponsors?.edges ||
    [];

  const enrichedArticleBody = isNativeAdvertising
    ? article.body
    : enrichArticleBodyWithADs({ pageBody: article.body });

  const lastDate =
    article.publicationDate && article.publicationDate > article.changeDate
      ? article.publicationDate
      : article.changeDate;

  return (
    <div className="article-detail" data-testid="article-page-wrapper">
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={article.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={article.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={article.cloneContentUri}
      />

      {!isNativeAdvertising && (
        <div className="ad-wrapper ad-wrapper-mobile header-apn-zone">
          <AppNexus
            slot={MMR_1}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
            isAdSuppressed={article && article?.channel?.suppressAds}
            deviceType="mobile"
          />
        </div>
      )}
      <div
        data-testid="articlepage-wrapper"
        className={styles.ArticleDefaultWrapper}
      >
        {article.preferredUri && article.activeMenuTrail && (
          <Breadcrumbs
            pageUrl={article.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
            items={article.activeMenuTrail}
          />
        )}

        {partnerBannerSponsors &&
          Array.isArray(partnerBannerSponsors) &&
          partnerBannerSponsors.length > 0 && (
            <TestFragment data-testid="articlepage-partnerbanner-wrapper">
              <PartnerBanner sponsors={partnerBannerSponsors} />
            </TestFragment>
          )}

        {articleVariant === ARTICLE_DEFAULT &&
          shortTitle &&
          article.title &&
          article.lead && (
            <div
              className={grid.Container}
              data-testid="articlepage-articleheader-wrapper"
            >
              <div className={grid.Row}>
                <div
                  className={classNames(
                    TRACKING_CLASS_CONTENT_HEADER,
                    grid.ColOffsetSm2,
                    grid.ColSm20,
                    grid.ColOffsetXl5,
                    grid.ColXl14,
                  )}
                >
                  {articleHeader}
                </div>
              </div>
            </div>
          )}

        {isBlog && article.showAuthorBox && author && (
          <div
            data-testid="blogger-profile-box-wrapper-mobile"
            className={classNames(
              grid.Container,
              styles.BloggerProfileBoxWrapper,
            )}
          >
            <div className={classNames(grid.Row, helpers.PositionRelative)}>
              <BloggerProfileBox
                bloggerProfile={author}
                blogUri={channelUri}
                /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
                format={
                  (article?.heroImageBody?.[0] as ImageParagraph)?.format ||
                  null
                }
              />
            </div>
          </div>
        )}

        {article?.heroImageBody &&
          Array.isArray(article.heroImageBody) &&
          article.heroImageBody.length > 0 && (
            <div id={ANCHOR_HERO}>
              <ArticleHero
                key={`article-hero-key-${article?.id}`}
                origin={
                  articleVariant === ARTICLE_VIDEO
                    ? ARTICLE_VIDEO_HERO
                    : articleVariant
                }
                article={article as Article}
              />
            </div>
          )}
        {isSpecial && (
          <div
            className={grid.Container}
            data-testid="articlepage-paragraph-container"
          >
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColSm16,
                  grid.ColOffsetXl3,
                  grid.ColXl9,
                )}
              >
                <Teaser
                  component={TEASER_LAYOUT_SPECIAL_S}
                  {...(article as TeaserInterface)}
                />
              </div>
            </div>
          </div>
        )}
        {((Array.isArray(article?.body) && article.body.length > 0) ||
          (article.showAuthorBox && author)) && (
          <div
            className={classNames(grid.Container, helpers.PositionRelative)}
            data-testid="articlepage-paragraph-container"
          >
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColSm12,
                  grid.ColOffsetXl3,
                  grid.ColXl9,
                )}
              >
                {article.showAuthorBox && author && !isBlog && (
                  <AuthorBox author={author} />
                )}
              </div>

              {(Array.isArray(article?.body) && article.body.length > 0 && (
                <div
                  className={classNames(
                    TRACKING_CLASS_CONTENT_BODY,
                    grid.ColSm20,
                    grid.ColOffsetSm2,
                    grid.ColXl14,
                    grid.ColOffsetXl5,
                  )}
                >
                  {articleVariant === ARTICLE_VIDEO &&
                    shortTitle &&
                    article.title &&
                    article.lead && (
                      <div data-testid="video-articlepage-head-wrapper">
                        {articleHeader}
                      </div>
                    )}
                  <Paragraphs
                    pageBody={enrichedArticleBody}
                    origin={
                      (isSpecial && ARTICLE_TYPE_SPECIAL) || articleVariant
                    }
                    hasContainer={false}
                    forceUpdate={recos}
                    /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | undefined'. */
                    recommendationsEl={
                      !isBlog &&
                      !isAdvertorial &&
                      inArticleRecommendations && (
                        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
                        <div ref={inArticleRecosRef}>
                          <Recommendations
                            title="Mehr für dich"
                            items={inArticleRecommendations}
                            isInsideParagraph
                            teaserLayout={TEASER_LAYOUT_RELATED}
                          />
                        </div>
                      )
                    }
                    isAdSuppressed={
                      (article && article?.channel?.suppressAds) ||
                      isNativeAdvertising
                    }
                  />

                  {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */}
                  <AuthorsTeaser authors={article.authors?.edges || []} />

                  {(article as Article)?.issue?.nid && (
                    <MagazineIssueSection
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                      issueId={(article as Article).issue.nid}
                    />
                  )}

                  {authorsNodes && (
                    <div
                      className={styles.AuthorWrapper}
                      data-testid="articlepage-author-container"
                    >
                      {(authorsNodes &&
                        getAllAuthors({
                          authors: authorsNodes,
                          isBold: false,
                          authorPrefix,
                        })) ||
                        null}{' '}
                      <Dates
                        publicationDate={article?.publicationDate}
                        changeDate={article?.changeDate}
                        /* @ts-ignore TODO: TS2322 ->  Type 'boolean | null | undefined' is not assignable to type 'boolean'. */
                        showUpdated={article?.showUpdated}
                      />
                      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
                      <Source source={article?.source} />
                    </div>
                  )}
                  {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                  {topicList?.length > 0 && (
                    <div
                      className={classNames(
                        styles.ArticleAlertsWrapper,
                        grid.HideForPrint,
                      )}
                    >
                      <strong className={getThemedClass('Topic')}>
                        Topics:
                      </strong>
                      {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                      {topicList.map((topic, index) =>
                        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<TopicEdge>' is not assignable to parameter of type 'TopicEdge'. */
                        renderTopic(topic, index, getThemedClass('Topic')),
                      )}
                    </div>
                  )}
                </div>
              )) ||
                null}
            </div>

            {/* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
            <div ref={bottomRecosRef}>
              <Recommendations
                items={bottomArticleRecommendations}
                title={isBlog ? 'Related articles' : 'Mehr für dich'}
                teaserLayout={TEASER_LAYOUT_S}
              />
            </div>
            {Array.isArray(article?.body) && article.body.length > 0 && (
              <TestFragment>
                {(!isNativeAdvertising &&
                  article?.commentStatus &&
                  article.commentStatus !== COMMENT_STATUS_HIDDEN && (
                    <SmoothScroll anchorId={COMMENTS_ANCHOR_ID} offset={120}>
                      {(!isSSR && (
                        <Comments
                          articleId={article.id || ''}
                          gcid={gcid || ''}
                          commentStatus={article.commentStatus || ''}
                          lastDate={lastDate}
                        />
                      )) ||
                        (isSSR && (
                          <section>
                            <LoadingSpinner />
                          </section>
                        ))}
                    </SmoothScroll>
                  )) ||
                  null}
                {keywords &&
                  keywords.edges &&
                  Array.isArray(keywords.edges) &&
                  keywords.edges.length > 0 && (
                    <div
                      className={classNames(
                        styles.ArticleAlertsWrapper,
                        grid.HideForPrint,
                      )}
                      data-testid="articlepage-article-alerts-wrapper"
                    >
                      <ArticleAlerts items={keywords?.edges} />
                    </div>
                  )}
              </TestFragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const mapStateToProps = (state: Record<string, any>) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  screenReady: locationStateSelector(state).screenReady,
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
  activeContentType: settingsStateSelector(state).activeContentType,
});

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ArticlePagePropsInner): Article | NativeAdvertising =>
      mapProps.article || null,
    getFallbackTitle: (mapProps: ArticlePagePropsInner) => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Article | NativeAdvertising' */
      return (!!mapProps && getFallbackTitle(mapProps?.article || {})) || '';
    },
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
)(ArticlePage);
