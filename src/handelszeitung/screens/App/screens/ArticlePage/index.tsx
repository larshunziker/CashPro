import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import lodashSlice from 'lodash/slice';
import { enrichArticleBodyWithADs } from '../../../../../shared/helpers/ads';
import { isNativeAdvertising as isNativeAdvertisingFunction } from '../../../../../shared/helpers/sharePanel';
import { getScrollOffset } from '../../../../shared/helpers/getScrollOffset';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import { WithHeaderProps } from '../../../../../shared/decorators/@types/withHeader';
import withHeaderProps from '../../../../shared/decorators/withHeaderProps';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import useImpressionTracking from '../../../../../shared/hooks/useImpressionTracking';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import AppNexus from '../../components/AppNexus';
import Comments from '../../components/Comments';
import EditButtons from '../../components/EditButtons';
import Helmet from '../../components/Helmet';
import MagazineIssueSection from '../../components/MagazineIssueSection';
import Paragraphs from '../../components/Paragraphs';
import PianoRestrictedDrawer from '../../components/PianoRestrictedDrawer';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import ArticleHeader from '../Article/components/ArticleHeader';
import RecommendedContentSection from '../Article/components/RecommendedContentSection';
import AuthorsTeaser from './components/AuthorsTeaser';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../common/screens/PageTemplate/constants';
import { MHPA_2, MMR_1 } from '../../../../../shared/constants/adZone';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_STATUS_HIDDEN,
} from '../../../../../shared/constants/comments';
import {
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../../../shared/constants/content';
import { TEXT_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../../../shared/constants/piano';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { TRACKING_CLASS_ARTICLE_BODY } from '../../../../../shared/constants/tracking';
import { ARTICLE_RECOMMENDATION_TITLE } from '../../components/Paragraphs/components/ParagraphsRenderer/constants';
import { PARAGRAPHS_FOR_FREE } from '../Article/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import type { ArticleProps } from './typings';

export type ArticlePropsInner = ArticleProps &
  WithHeaderProps & {
    setHeaderData: (props: HeaderState) => void;
    resetHeaderData: () => void;
    locationPathname: string;
    screenReady: boolean;
  } & {
    hasSubscriptions: boolean;
    isCrawler: boolean;
    isHybridApp: boolean;
    viewportLabel: string;
  };

export { PUBLICATION_SWISS_INSURANCE } from '../../../../../shared/constants/publications';

export const getIsReferrerWhitelisted = () => {
  let result: RegExpMatchArray;

  try {
    /* @ts-ignore TODO: TS2322 ->  Type 'RegExpMatchArray | null' is not assignable to type 'RegExpMatchArray'. */
    result = document.referrer.match(
      /(smd.ch|pro.swissdox.ch|essentials.swissdox.ch)/,
    );
  } catch (e) {
    // catch on ssr only
  }
  /* @ts-ignore TODO: TS2454 ->  Variable 'result' is used before being assigned. */
  return result;
};

const ArticlePage = ({
  article,
  locationPathname,
  screenReady,
  setHeaderData,
  resetHeaderData,
  hasSubscriptions,
  isCrawler,
  viewportLabel,
  pageLayoutType,
}: ArticlePropsInner) => {
  const {
    id,
    gcid,
    subtypeValue = '',
    channel,
    commentStatus,
    preferredUri,
    socialMediaTitle,
    title,
    shortTitle,
    lead,
    __typename,
    restrictionStatus,
    createDate,
  } = article;

  const isNativeAdvertising: boolean = isNativeAdvertisingFunction(article);
  useImpressionTracking({
    trackingDetailImpression: article?.trackingDetailImpression,
    pathname: locationPathname,
    screenReady,
    isNativeAdvertising,
  });

  const isPaywallDrawerVisible = useSelector(
    (state: Record<string, any>) =>
      pianoStateSelector(state).isPaywallDrawerVisible,
  );

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
        restrictionStatus,
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
    restrictionStatus,
    hasSubscriptions,
    createDate,
    id,
  ]);

  const isSplittedPageLayout = pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE;

  const isRestrictedArticle = [
    RESTRICTION_STATUS_PAID,
    RESTRICTION_STATUS_REGISTERED,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  ].includes(article?.restrictionStatus);
  const shouldHideContent =
    !hasSubscriptions && !getIsReferrerWhitelisted() && isRestrictedArticle;

  const body =
    (shouldHideContent &&
      !isCrawler &&
      lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE)) ||
    article.body;

  const enrichedArticleBody = isNativeAdvertising
    ? body
    : enrichArticleBodyWithADs({ pageBody: body });

  const scrollOffset = getScrollOffset(viewportLabel);
  const isOpinion = subtypeValue === 'opinion';

  const publication =
    article.publication === PUBLICATION_BIL
      ? 'BIL'
      : article.publication === PUBLICATION_SWISS_INSURANCE
      ? 'SV'
      : article.publication === PUBLICATION_HZB
      ? 'HZB'
      : 'HZ';

  const newsArticleSchema = {
    '@type': 'NewsArticle',
    isAccessibleForFree: !isRestrictedArticle,
    publisher: {
      '@type': 'Organization',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Organization/1`,
    },
    isPartOf: {
      '@type': ['CreativeWork', 'Product'],
      name: 'Handelszeitung',
      productID: 'handelszeitung.ch:showcase',
    },
  };

  const lastDate =
    article.publicationDate && article.publicationDate > article.changeDate
      ? article.publicationDate
      : article.changeDate;

  return (
    <div className={`article-detail ${styles.Wrapper}`}>
      {shouldHideContent && !isCrawler && isPaywallDrawerVisible && (
        <PianoRestrictedDrawer />
      )}
      <div className={styles.ArticleInner}>
        <EditButtons
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          editContentUri={article.editContentUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          editRelationUri={article.editRelationUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          cloneContentUri={article.cloneContentUri}
        />
        <Helmet
          script={[
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify(newsArticleSchema),
            },
          ]}
        />

        {!isNativeAdvertising && (
          <div className="ad-wrapper ad-wrapper-mobile header-apn-zone">
            <AppNexus slot={MMR_1} deviceType="mobile" />
          </div>
        )}

        <div
          className={classNames({
            [styles.OpinionArticleHeaderBackground]: isOpinion,
          })}
        />
        <div
          className={classNames({ [grid.Container]: !isSplittedPageLayout })}
        >
          <ArticleHeader article={article} />
        </div>

        <div
          className={classNames(
            styles.BodyWrapper,
            TRACKING_CLASS_ARTICLE_BODY,
          )}
        >
          <Paragraphs
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            contentGcid={article.gcid}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<KeywordConnection> | undefined' is not assignable to type 'KeywordConnection | undefined'. */
            articleKeywords={article.keywords}
            publication={publication}
            pageBody={enrichedArticleBody}
            colStyle={classNames(grid.ColMd18, grid.ColXl17)}
            origin={article?.subtypeValue || article.__typename}
            showCap
            activeChannel={article?.channel?.title || ''}
            paragraphsForFree={
              (shouldHideContent && PARAGRAPHS_FOR_FREE) || null
            }
            isAdSuppressed={
              article?.channel?.suppressAds || isNativeAdvertising
            }
            pageLayoutType={pageLayoutType}
          />

          <AuthorsTeaser
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */
            authors={article.authors?.edges || []}
            publication={publication}
          />

          {article.issue?.nid &&
            (!shouldHideContent || (isCrawler && shouldHideContent)) && (
              <div
                className={`${
                  (isRestrictedArticle && 'restricted-') || ''
                }article-magazin-issue`}
              >
                <MagazineIssueSection issueId={article.issue.nid} />
              </div>
            )}
          {shouldHideContent && !isCrawler && (
            <div
              className={classNames(
                styles.Paywall,
                'paywall-wrapper-with-print-info',
                {
                  [styles.HiddenPaywall]: !shouldHideContent,
                },
              )}
            >
              <div
                className={classNames({
                  [grid.Container]: !isSplittedPageLayout,
                })}
              >
                <div
                  className={classNames({ [grid.Row]: !isSplittedPageLayout })}
                >
                  <div
                    className={classNames({
                      [grid.ColXl17]: !isSplittedPageLayout,
                    })}
                  >
                    <div
                      id={PIANO_CONTAINER_INLINED}
                      className={PIANO_PLACEHOLDER_INLINED}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={sections.Section}>
          {article?.topics?.edges &&
            (!shouldHideContent || (isCrawler && shouldHideContent)) &&
            Array.isArray(article.topics.edges) &&
            article.topics.edges.length > 0 && (
              <div
                className={classNames(
                  `${
                    (isRestrictedArticle && 'restricted-') || ''
                  }article-alerts`,
                  styles.ArticleAlertsContainer,
                )}
              >
                <div
                  className={classNames({
                    [grid.Container]: !isSplittedPageLayout,
                  })}
                >
                  <ArticleAlerts
                    items={article.topics.edges}
                    isSplittedPageLayout={isSplittedPageLayout}
                  />
                </div>
              </div>
            )}

          <SmoothScroll anchorId={COMMENTS_ANCHOR_ID} offset={scrollOffset} />
          {!isNativeAdvertising &&
            (!shouldHideContent || (isCrawler && shouldHideContent)) &&
            article.commentStatus &&
            article.commentStatus !== COMMENT_STATUS_HIDDEN && (
              <div
                className={`${
                  (isRestrictedArticle && 'restricted-') || ''
                }article-comments`}
              >
                <div
                  className={classNames({
                    [grid.Container]: !isSplittedPageLayout,
                  })}
                >
                  <Comments
                    articleId={article.id || ''}
                    gcid={gcid || ''}
                    commentStatus={article.commentStatus || ''}
                    lastDate={lastDate}
                  />
                </div>
              </div>
            )}
          {article.canonicalUri && (
            <div
              className={classNames(
                {
                  [grid.Container]: !isSplittedPageLayout,
                },
                grid.HideForPrint,
              )}
            >
              <div
                className={classNames(
                  'ad-wrapper',
                  styles.ItemWrapperBorder,
                  `ad-wrapper-mobile`,
                )}
              >
                <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
              </div>
              <RecommendedContentSection
                article={{
                  canonicalUri: article.canonicalUri,
                  keywords: article.keywords,
                  preferredUri: article.preferredUri,
                  relatedArticles: article.relatedArticles,
                  gcid: article.gcid,
                }}
                title={ARTICLE_RECOMMENDATION_TITLE}
                limit={12}
                nativeAdvertisingConfig={[3, 7, 10, 11]}
                type={RECOMMENDATION_TYPE.NATGOAL}
                operation={RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT}
                hasRelatedContentField={false}
                skipInArticleRecommendations={0}
                isSplittedPageLayout={isSplittedPageLayout}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'hasSubscriptions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isCrawler' implicitly has an 'any' type. */
const getRootSchemaRestricted = ({
  article,
  hasSubscriptions,
  isCrawler,
}: {
  article: {
    restrictionStatus: string;
    body: Array<ParagraphInterface & TextParagraph>;
    issue?: { nid?: string };
    topics?: { edges?: any[] };
    commentStatus?: string;
  };
  hasSubscriptions: boolean;
  isCrawler: boolean;
}) => {
  const isRestrictedArticle = [RESTRICTION_STATUS_PAID].includes(
    article?.restrictionStatus,
  );

  let shouldHideContent = !hasSubscriptions && isRestrictedArticle;

  if (isCrawler) {
    shouldHideContent = false;
  }

  const body =
    (shouldHideContent && lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE)) ||
    article.body;

  const jsonLd: {
    isAccessibleForFree: boolean;
    hasPart: Array<{
      '@type': string;
      isAccessibleForFree: boolean | string;
      cssSelector: string;
    }>;
    articleBody: string;
  } = {
    isAccessibleForFree: !isRestrictedArticle,
    hasPart: [],
    articleBody: '',
  };

  article.body.forEach((bodyParagraph: ParagraphInterface & TextParagraph) => {
    const strippedHtmlBody =
      (bodyParagraph.__typename === TEXT_PARAGRAPH &&
        bodyParagraph.text?.replace(/<[^>]*>?/gm, '')) || // regex to strip html tags
      '';

    if (strippedHtmlBody) {
      jsonLd.articleBody = jsonLd.articleBody.concat(
        `${bodyParagraph.header || ''} ${strippedHtmlBody}`,
      );
    }
  });

  if (isRestrictedArticle) {
    for (let index = 1; index < body.length; index++) {
      if (index >= PARAGRAPHS_FOR_FREE + 1) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: false,
          cssSelector: `.restricted-section-${index}`,
        });
      } else {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: true,
          cssSelector: `.section-${index}`,
        });
      }
    }

    if (!shouldHideContent) {
      if (article.issue?.nid) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: false,
          cssSelector: '.restricted-article-magazin-issue',
        });
      }

      if (
        Array.isArray(article?.topics?.edges) &&
        article.topics.edges.length > 0
      ) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: false,
          cssSelector: '.restricted-article-alerts',
        });
      }
      if (
        article?.commentStatus &&
        article.commentStatus !== COMMENT_STATUS_HIDDEN
      ) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: false,
          cssSelector: '.restricted-article-comments',
        });
      }
    }
  }

  return jsonLd;
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const mapStateToProps = (state: ReduxState) => ({
  locationPathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  screenReady: locationStateSelector(state).screenReady,
  hasSubscriptions:
    authStateSelector(state).hasSubscriptions ||
    pianoStateSelector(state).isAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
  isHybridApp: locationStateSelector(state)?.isHybridApp || false,
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default compose<any, any>(
  withHeaderProps,
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ArticlePropsInner) => mapProps.article,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    getRootSchemaRestricted,
  }),
)(ArticlePage);
