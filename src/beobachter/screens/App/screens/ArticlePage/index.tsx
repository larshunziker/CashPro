import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import lodashSlice from 'lodash/slice';
import { isNativeAdvertising as isNativeAdvertisingFunction } from '../../../../../shared/helpers/sharePanel';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import withHeaderProps, {
  WithHeaderProps,
} from '../../../../shared/decorators/withHeaderProps';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import useImpressionTracking from '../../../../../shared/hooks/useImpressionTracking';
import ArticlePageDefault from './components/ArticlePageDefault';
import ArticlePageGuide from './components/ArticlePageGuide';
import ArticlePageLegalAdvice from './components/ArticlePageLegalAdvice';
import { COMMENT_STATUS_HIDDEN } from '../../../../../shared/constants/comments';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { PARAGRAPHS_FOR_FREE } from '../Article/constants';
import { ArticlePageProps } from './typings';

type ArticlePagePropsInner = ArticlePageProps &
  WithHeaderProps & { isHybridApp: boolean };

export const getFallbackTitle = () => 'Artikel';

const ArticlePage = ({
  article,
  locationPathname,
  location,
  screenReady,
  resetHeaderData,
  setHeaderData,
  hasSubscriptions,
  isCrawler,
  vertical,
  pageLayoutType,
  hasLegalAdviceAccess,
}: ArticlePagePropsInner) => {
  const isNativeAdvertising: boolean = isNativeAdvertisingFunction(article);

  /* @ts-ignore TODO: TS2322 ->  Type '(Article | NativeAdvertising) & TeaserFactoryProps & { addClass? */
  const {
    id,
    gcid,
    nid,
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
    trackingDetailImpression,
    activeMenuTrail,
    createDate,
  }: (Article | NativeAdvertising) & {
    subtypeValue?: string;
    trackingDetailImpression?: string;
  } = article;
  useImpressionTracking({
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    trackingDetailImpression,
    pathname: locationPathname,
    screenReady,
    isNativeAdvertising,
  });
  useEffect(() => {
    setHeaderData({
      articleData: {
        id,
        gcid,
        nid,
        title,
        shortTitle,
        lead,
        subtypeValue,
        channel,
        commentStatus,
        preferredUri,
        socialMediaTitle,
        restrictionStatus,
        activeMenuTrail,
        createDate,
      },
      contentType: __typename,
    });

    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    channel,
    commentStatus,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    socialMediaTitle,
    subtypeValue,
    title,
    nid,
    gcid,
    shortTitle,
    lead,
    restrictionStatus,
    activeMenuTrail,
    id,
    createDate,
  ]);

  const getIsReferrerWhitelisted = () => {
    let result: RegExpMatchArray;
    try {
      /* @ts-ignore TODO: TS2322 ->  Type 'RegExpMatchArray | null' is not assignable to type 'RegExpMatchArray'. */
      result = document.referrer.match(/mobiliar./);
    } catch (e) {
      // catch on ssr only
    }
    /* @ts-ignore TODO: TS2454 ->  Variable 'result' is used before being assigned. */
    return result;
  };

  const isRestrictedArticle = [
    RESTRICTION_STATUS_PAID,
    RESTRICTION_STATUS_REGISTERED,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(article?.restrictionStatus);

  const shouldHideContent =
    !hasSubscriptions && !getIsReferrerWhitelisted() && isRestrictedArticle;

  const shouldHideLegalAdviceContent =
    !hasLegalAdviceAccess && !getIsReferrerWhitelisted() && isRestrictedArticle;

  // TODO: Legal Advice (Rechtsratgeber) would have different type of subscription than other BEO content
  if (
    [
      ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
      ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    ].includes(article.subtypeValue)
  ) {
    return (
      <ArticlePageLegalAdvice
        article={article}
        shouldHideContent={shouldHideLegalAdviceContent}
        isCrawler={isCrawler}
        isAccessGranted={hasLegalAdviceAccess}
        pageLayoutType={pageLayoutType}
      />
    );
  }

  if (article.subtypeValue === ARTICLE_TYPE_GUIDE) {
    return (
      <ArticlePageGuide
        article={article}
        shouldHideContent={shouldHideContent}
        isCrawler={isCrawler}
        isAccessGranted={hasSubscriptions}
        pageLayoutType={pageLayoutType}
      />
    );
  }

  return (
    <ArticlePageDefault
      article={article}
      vertical={vertical}
      shouldHideContent={shouldHideContent}
      isRestrictedArticle={isRestrictedArticle}
      isCrawler={isCrawler}
      pageLayoutType={pageLayoutType}
      location={location}
      hasSubscriptions={hasSubscriptions}
    />
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'hasSubscriptions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isCrawler' implicitly has an 'any' type. */
const getRootSchemaRestricted = ({ article, hasSubscriptions, isCrawler }) => {
  let shouldHideContent =
    !hasSubscriptions &&
    [RESTRICTION_STATUS_PAID].includes(article?.restrictionStatus);

  if (isCrawler) {
    shouldHideContent = false;
  }

  const body =
    (shouldHideContent && lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE)) ||
    article.body ||
    [];

  const jsonLd: { isAccessibleForFree?: boolean; hasPart?: Object[] } = {
    isAccessibleForFree: true,
  };

  if ([RESTRICTION_STATUS_PAID].includes(article?.restrictionStatus)) {
    jsonLd.isAccessibleForFree = false;
    jsonLd.hasPart = [];

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
      if (
        Array.isArray(article?.keywords?.edges) &&
        article.keywords.edges.length > 0
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

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  locationPathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  vertical: locationStateSelector(state).vertical,
  screenReady: locationStateSelector(state).screenReady,
  hasSubscriptions:
    authStateSelector(state).hasSubscriptions ||
    pianoStateSelector(state).isAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
  isHybridApp: locationStateSelector(state)?.isHybridApp || false,
  hasLegalAdviceAccess:
    authStateSelector(state).hasLegalAdviceAccess ||
    pianoStateSelector(state).isAccessGranted,
});

export default compose<any, any>(
  withHeaderProps,
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ArticlePagePropsInner): Article | NativeAdvertising =>
      mapProps.article || null,
    getFallbackTitle: (mapProps: ArticlePagePropsInner) =>
      (!!mapProps && getFallbackTitle()) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    getRootSchemaRestricted,
  }),
)(ArticlePage);
