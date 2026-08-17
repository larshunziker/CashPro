import React, { ReactElement, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import lodashSlice from 'lodash/slice';
import { WithHeaderProps } from '../../../../../shared/decorators/@types/withHeader';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Helmet from '../../components/Helmet';
import ArticlePageDefault from './components/Default';
import ArticlePageSwipeable from './components/Swipeable';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import { COMMENT_STATUS_HIDDEN } from '../../../../../shared/constants/comments';
import { RESTRICTION_STATUS_PAID } from '../../../../../shared/constants/content';
import {
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
  ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
} from '../../../../../shared/constants/structuredData';
import { PARAGRAPHS_FOR_FREE } from '../Article/constants';
import { ARTICLE_PAGE_DEFAULT, ARTICLE_PAGE_SWIPEABLE } from './constants';
import { ArticleProps } from './components/Default/typings';

export type ArticlePropsInner = ArticleProps &
  WithHeaderProps & {
    locationPathname: string;
    screenReady: boolean;
    hasSubscriptions: boolean;
    isCrawler: boolean;
    viewportLabel?: string;
  };

const Switch = createComponentSwitch({
  [ARTICLE_PAGE_DEFAULT]: ArticlePageDefault,
  [ARTICLE_PAGE_SWIPEABLE]: ArticlePageSwipeable,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export const ArticlePage = (props): ReactElement => {
  const { article, resetHeaderData, setHeaderData } = props;
  const {
    id,
    gcid,
    title,
    shortTitle,
    lead,
    commentStatus,
    preferredUri,
    socialMediaTitle,
    restrictionStatus,
    createDate,
    __typename,
  } = article;

  useEffect(() => {
    setHeaderData({
      articleData: {
        id,
        gcid,
        title,
        shortTitle,
        lead,
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
    commentStatus,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    socialMediaTitle,
    title,
    gcid,
    shortTitle,
    lead,
    restrictionStatus,
    id,
    createDate,
  ]);

  return (
    <>
      {article.subtypeValue === 'external' && (
        <Helmet
          meta={[
            {
              name: 'robots',
              content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
            },
          ]}
        />
      )}
      <Switch component={props.component} {...props} />
    </>
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
    article.body;

  const jsonLd: { isAccessibleForFree?: boolean; hasPart?: Object[] } = {
    isAccessibleForFree: true,
  };

  if ([RESTRICTION_STATUS_PAID].includes(article?.restrictionStatus)) {
    jsonLd.isAccessibleForFree = false;
    jsonLd.hasPart = [];
    for (let index = PARAGRAPHS_FOR_FREE + 1; index < body.length; index++) {
      jsonLd.hasPart.push({
        '@type': 'WebPageElement',
        isAccessibleForFree: 'False',
        cssSelector: `.restricted-section-${index}`,
      });
    }

    if (!shouldHideContent) {
      if (article.issue?.nid) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: 'False',
          cssSelector: '.restricted-article-magazin-issue',
        });
      }

      if (
        Array.isArray(article?.topics?.edges) &&
        article.topics.edges.length > 0
      ) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: 'False',
          cssSelector: '.restricted-article-alerts',
        });
      }
      if (
        article?.commentStatus &&
        article.commentStatus !== COMMENT_STATUS_HIDDEN
      ) {
        jsonLd.hasPart.push({
          '@type': 'WebPageElement',
          isAccessibleForFree: 'False',
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

export default compose<any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ArticlePropsInner) => mapProps.article,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    getRootSchemaRestricted,
  }),
)(memo(ArticlePage));
