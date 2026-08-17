import React from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { getArticleDate } from '../../../../../../../../../shared/helpers/utils';
import { getAllAuthors } from '../../../../shared/helpers';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../../../common/components/Link';
import {
  ANCHOR_SHORT_TITLE,
  ANCHOR_TITLE,
} from '../../../../../../../../../shared/constants/content';
import {
  ARTICLE_TYPE_BLOG_A,
  ARTICLE_TYPE_BLOG_B,
  ARTICLE_TYPE_BLOG_C,
  ARTICLE_TYPE_BLOG_D,
  ARTICLE_TYPE_BLOG_E,
  ARTICLE_TYPE_BLOG_F,
  ARTICLE_TYPE_BLOG_G,
  ARTICLE_TYPE_BLOG_GENERIC,
  ARTICLE_TYPE_BLOG_H,
  ARTICLE_TYPE_BLOG_I,
  ARTICLE_TYPE_BLOG_J,
  ARTICLE_TYPE_BLOG_K,
  ARTICLE_TYPE_BLOG_L,
  ARTICLE_TYPE_BLOG_M,
  ARTICLE_TYPE_BLOG_N,
  ARTICLE_TYPE_BLOG_O,
  ARTICLE_TYPE_BLOG_P,
  ARTICLE_TYPE_BLOG_Q,
  BLOG_DATA,
  OVERRULE_POSTFIX_FALLBACK_HANDLING,
} from '../../../../../../constants';
// eslint-disable-next-line
import styles from './styles.legacy.css';
// eslint-disable-next-line
import stylesBlogA from './stylesBlogA.legacy.css';
// eslint-disable-next-line
import stylesBlogB from './stylesBlogB.legacy.css';
// eslint-disable-next-line
import stylesBlogQ from './stylesBlogQ.legacy.css';
import { ArticleLeadProps, ArticleType } from '../../typings';

type ArticleLeadBlogPropsInner = ArticleLeadProps & {
  intl: IntlShape;
  language: string;
};

type BlogLeadProps = {
  article: ArticleType;
  intl: IntlShape;
  language: string;
  blogStyles?: { ShortTitle: string; ShortTitleBold: string; Link: string };
};

const BlogLead = ({ article, blogStyles = styles, intl }: BlogLeadProps) => {
  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );

  const blog =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`${string}_undefined` | `${string}_${string}`' can't b */
    BLOG_DATA[`${article.subtypeValue}_${language}`] ||
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ blog_a_de */
    BLOG_DATA[article.subtypeValue] ||
    {};
  const { title, url, postfix = null } = blog;
  const urlPrefix =
    article?.preferredUri?.startsWith('/fr/bella-italia/') &&
    !url.startsWith('/fr/')
      ? '/fr'
      : '';

  const shortTitle =
    article?.subtypeValue === ARTICLE_TYPE_BLOG_GENERIC &&
    article?.shortTitle ? (
      ` | ${article.shortTitle}`
    ) : postfix === OVERRULE_POSTFIX_FALLBACK_HANDLING ? (
      ''
    ) : postfix ? (
      <> | {postfix}</>
    ) : (
      (article?.authors &&
        Array.isArray(article.authors.edges) &&
        article.authors.edges.length > 0 && (
          <span>
            {' | '}
            {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<AuthorEdge>[]' is not assignable to parameter of type '(AuthorEdge | PersonEdge)[]'. */}
            {getAllAuthors(article, article.authors.edges, intl, false)}
            {language !== 'fr' && ' '}
            {language !== 'fr' && (
              <FormattedMessage
                id="app.article.blogging.other"
                description="When a person is blogging"
                defaultMessage="{authorsCount, plural, one {bloggt} other {bloggen}}"
                values={{
                  authorsCount: article.authors?.edges?.length || 0,
                }}
              />
            )}
          </span>
        )) ||
      (article?.shortTitle && ` | ${article.shortTitle}`)
    );

  return (
    <div id={ANCHOR_SHORT_TITLE} className={blogStyles.ShortTitle || ''}>
      <span className={blogStyles.ShortTitleBold}>
        <Link path={url && `${urlPrefix}/${url}`} className={blogStyles.Link}>
          {title}
        </Link>
      </span>
      {shortTitle}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'language' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
const getOverline = (article: ArticleType, language, intl) => {
  if (!article || !article?.subtypeValue) {
    return 'Blog';
  }

  switch (article.subtypeValue) {
    case ARTICLE_TYPE_BLOG_A:
      return (
        <BlogLead
          article={article}
          language={language}
          intl={intl}
          blogStyles={stylesBlogA}
        />
      );
    case ARTICLE_TYPE_BLOG_B:
      return (
        <BlogLead
          article={article}
          language={language}
          intl={intl}
          blogStyles={stylesBlogB}
        />
      );
    case ARTICLE_TYPE_BLOG_Q:
      return (
        <BlogLead
          article={article}
          language={language}
          intl={intl}
          blogStyles={stylesBlogQ}
        />
      );
    case ARTICLE_TYPE_BLOG_C:
    case ARTICLE_TYPE_BLOG_D:
    case ARTICLE_TYPE_BLOG_E:
    case ARTICLE_TYPE_BLOG_F:
    case ARTICLE_TYPE_BLOG_G:
    case ARTICLE_TYPE_BLOG_H:
    case ARTICLE_TYPE_BLOG_I:
    case ARTICLE_TYPE_BLOG_J:
    case ARTICLE_TYPE_BLOG_K:
    case ARTICLE_TYPE_BLOG_L:
    case ARTICLE_TYPE_BLOG_M:
    case ARTICLE_TYPE_BLOG_N:
    case ARTICLE_TYPE_BLOG_O:
    case ARTICLE_TYPE_BLOG_P:
    case ARTICLE_TYPE_BLOG_GENERIC:
      return <BlogLead article={article} language={language} intl={intl} />;
    default:
      return 'Blog';
  }
};

const ArticleLeadBlog = ({
  article,
  language,
  intl,
  articleColStyle,
}: ArticleLeadBlogPropsInner) => (
  <div
    className={classNames(
      'article-lead',
      `article-lead-${article.subtypeValue}`,
      articleColStyle,
      styles.Wrapper,
    )}
  >
    {getOverline(article, language, intl)}

    <h1 id={ANCHOR_TITLE} className={styles.Title}>
      {article.title || ''}
    </h1>

    <p className={styles.Lead}>{article.lead || ''}</p>

    <div className={styles.DateWrapper}>
      {getFormattedElapsedDate({
        createDate: getArticleDate(article),
        format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
        language: language.toUpperCase(),
      })}
    </div>
  </div>
);

export default compose<any, any>(injectIntl)(ArticleLeadBlog);
