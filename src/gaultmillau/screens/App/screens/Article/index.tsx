import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../common/components/Picture/helpers';
import { articleColStyle } from './shared/helpers';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import withHeaderProps, {
  WithHeaderProps,
} from '../../../../shared/decorators/withHeaderProps';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../shared/actions/header';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import Picture from '../../../../../common/components/Picture';
import EditButtons from '../../components/EditButtons';
import Helmet from '../../components/Helmet';
import Hero from '../../components/Hero';
import Paragraphs from '../../components/Paragraphs';
import Recommendations from '../../components/Recommendations';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleKeywords from './components/ArticleKeywords';
import ArticleLead from './components/ArticleLead';
import AuthorsTeaser from './components/AuthorsTeaser';
import KeywordDisruptor from './components/KeywordDisruptor';
import { DEFAULT_LANGUAGE } from '../../components/Navigation/components/LanguageSwitch';
import {
  ARTICLE_TYPE_HEADLESS,
  ARTICLE_TYPE_HOT_TEN,
  ARTICLE_TYPE_JOURNALISTIC,
} from '../../../../../shared/constants/content';
import { STYLE_TEASER_1_1 } from '../../../../../shared/constants/images';
import {
  VIDEO_LOOP_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../shared/constants/paragraphs';
import {
  PUBLICATION_GROUP_GM,
  PUBLICATION_GROUP_GM_FR,
} from '../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_ML } from '../../../../../shared/constants/teaser';
import {
  TRACKING_CLASS_ARTICLE_BODY,
  TRACKING_CLASS_ARTICLE_HEADER,
  TRACKING_CLASS_ARTICLE_RECOMMENDATIONS,
} from '../../../../../shared/constants/tracking';
import {
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_SHARE_LABEL_FR,
} from '../../../../../shared/constants/utilitybar';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../components/UtilityBar/constants';
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
} from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { useRecommendationsResponse } from '../../../../../shared/hooks/useRecommendations/typings';
import { ArticleProps } from './typings';

type ArticleType = Article & { subtypeValue: string };
export type ArticlePropsInner = ArticleProps &
  WithHeaderProps & {
    setHeaderData: Function;
    resetHeaderData: Function;
  } & {
    article: ArticleType;
    routeVertical: string;
  };
const BLOG_TYPES = [
  ARTICLE_TYPE_BLOG_A,
  ARTICLE_TYPE_BLOG_B,
  ARTICLE_TYPE_BLOG_C,
  ARTICLE_TYPE_BLOG_D,
  ARTICLE_TYPE_BLOG_E,
  ARTICLE_TYPE_BLOG_F,
  ARTICLE_TYPE_BLOG_G,
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
  ARTICLE_TYPE_BLOG_GENERIC,
];
const getFallbackTitle = (article: ArticleType) => {
  if (!article || !article.subtypeValue) {
    return 'Artikel';
  }
  switch (article?.subtypeValue) {
    case ARTICLE_TYPE_BLOG_A:
    case ARTICLE_TYPE_BLOG_B:
      return 'Blog';
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
    case ARTICLE_TYPE_BLOG_Q:
    case ARTICLE_TYPE_BLOG_GENERIC:
      return BLOG_DATA[article?.subtypeValue].title || 'Blog';
    case ARTICLE_TYPE_HOT_TEN:
      return (
        <FormattedMessage
          id="app.hotTen.teaser.title"
          description="Title of the hot-ten detail page"
          defaultMessage="Hot Ten"
        />
      );
    case ARTICLE_TYPE_JOURNALISTIC:
    default:
      return 'Artikel';
  }
};

const hasHeroImage = (article: ArticleType) =>
  article?.subtypeValue !== ARTICLE_TYPE_HOT_TEN &&
  article?.subtypeValue !== ARTICLE_TYPE_HEADLESS;

const hasBorderSeparator = (article: ArticleType) =>
  article?.subtypeValue === ARTICLE_TYPE_HOT_TEN;

const hasDivider = (article: ArticleType) =>
  article?.subtypeValue === ARTICLE_TYPE_BLOG_C;

const getArticleColStyleByType = (article: ArticleType) => {
  if (article?.subtypeValue === ARTICLE_TYPE_HOT_TEN) {
    return grid.ColXs24;
  }
  return articleColStyle;
};

const FETCH_RECOS_LIMIT = 3;

const getEmptyTeaserPlaceholder = (
  gcid = Math.random().toString(), // Math.random as fallback if gcid is not set (should actually never happen)
  itemsCount = FETCH_RECOS_LIMIT,
) => {
  return Array(itemsCount)
    .fill({})
    .map((_, index) => {
      return {
        node: { id: `${gcid}-${index}` },
        skeleton: true,
      };
    });
};

const ArticleDetail = ({
  article,
  setHeaderData,
  resetHeaderData,
}: ArticlePropsInner) => {
  const {
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
    keywords,
  }: ArticleType = article;

  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );

  const [recos, setRecos] = useState<typeof Recommendations>(
    // @ts-ignore
    gcid && getEmptyTeaserPlaceholder(gcid),
  );
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );
  const [hasFetchedRecos, setHasFetchedRecos] = useState(false);

  const { fetchRecommendations }: useRecommendationsResponse =
    useRecommendations();

  const {
    setRef: bottomRecosRef,
    isInView: isBottomRecosInView,
  }: UseInViewResponse = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  useEffect(() => {
    setHeaderData({
      articleData: {
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
  ]);

  // useEffect to reset the state if the recos have already been fetched
  useEffect(() => {
    return () => {
      if (gcid) {
        setHasFetchedRecos(false);
        // @ts-ignore
        setRecos(getEmptyTeaserPlaceholder(gcid));
      }
    };
  }, [gcid]);

  // useEffect to fetch recos
  useEffect(() => {
    if (!gcid) {
      return;
    }

    if (!hasFetchedRecos && isBottomRecosInView) {
      fetchRecommendations({
        contentId: gcid,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<KeywordConnection> | undefined' is not assignable to type 'KeywordConnection'. */
        articleKeywords: keywords,
        publication:
          language === DEFAULT_LANGUAGE
            ? PUBLICATION_GROUP_GM
            : PUBLICATION_GROUP_GM_FR,
        limit: FETCH_RECOS_LIMIT,
        operation: RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT,
        type: RECOMMENDATION_TYPE.CBRECO,
        hasRelatedContentField: true,
      }).then((res) => {
        // @ts-ignore
        setRecos(res);
      });

      setHasFetchedRecos(true);
    }
  }, [
    isBottomRecosInView,
    hasFetchedRecos,
    fetchRecommendations,
    gcid,
    keywords,
    language,
  ]);

  if (!article) {
    return null;
  }

  const hasVideoLoop =
    (article.heroImageBody?.[0] &&
      Array.isArray(article.heroImageBody) &&
      article.heroImageBody?.[0]?.__typename === VIDEO_LOOP_PARAGRAPH) ||
    false;

  let videoJsonLd = {};
  const thumbnailUrl = assembleAkamaiImgUrl({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    relativeOriginPath:
      article.heroImageBody?.[0]?.image?.file?.relativeOriginPath,
    width: 400,
    height: 400,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointX: article.heroImageBody?.[0]?.image?.file?.focalPointX,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointY: article.heroImageBody?.[0]?.image?.file?.focalPointY,
    clientUrl,
  });
  if (
    article.heroImageBody &&
    Array.isArray(article.heroImageBody) &&
    article.heroImageBody.length > 0 &&
    article.heroImageBody?.[0]?.__typename === VIDEO_PARAGRAPH
  ) {
    videoJsonLd = {
      '@content': 'http://schema.org',
      '@type': 'VideoObject',
      name: article.heroImageBody?.[0]?.title || '',
      description: article.heroImageBody?.[0]?.caption || '',
      contentUrl: preferredUri ? `${global.locationOrigin}${preferredUri}` : '',
      thumbnailUrl: thumbnailUrl,
      uploadDate:
        article.heroImageBody?.[0]?.updatedAt ||
        article.heroImageBody?.[0]?.createdAt ||
        '',
      duration: article.heroImageBody?.[0]?.duration || '',
    };
  }

  return (
    <div className={`article-detail ${styles.Wrapper}`}>
      <Helmet script={[videoJsonLd]} />

      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={article?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={article?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={article?.cloneContentUri}
      />

      <div className={TRACKING_CLASS_ARTICLE_HEADER}>
        {/* hero */}
        {article &&
          hasHeroImage(article) &&
          article.heroImageBody &&
          Array.isArray(article.heroImageBody) &&
          article.heroImageBody.length > 0 && (
            <Hero heroImageBody={article.heroImageBody} article={article}>
              {BLOG_TYPES.includes(article?.subtypeValue) && (
                <div
                  className={classNames(styles.HeroImageBorderBlog, {
                    [styles.Purple]:
                      article?.subtypeValue === ARTICLE_TYPE_BLOG_B,
                    [styles.Transparent]: [
                      ARTICLE_TYPE_BLOG_C,
                      ARTICLE_TYPE_BLOG_D,
                      ARTICLE_TYPE_BLOG_E,
                      ARTICLE_TYPE_BLOG_F,
                      ARTICLE_TYPE_BLOG_G,
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
                      ARTICLE_TYPE_BLOG_GENERIC,
                    ].includes(article?.subtypeValue),
                  })}
                >
                  {
                    /* do not show author avatar on video heros */
                    article.heroImageBody?.[0] &&
                      article.heroImageBody?.[0]?.__typename !==
                        VIDEO_PARAGRAPH &&
                      article.authors?.edges?.[0]?.node?.image?.image?.file
                        ?.relativeOriginPath && (
                        <div
                          className={classNames(styles.AuthorAvatar, {
                            [styles.Purple]:
                              article?.subtypeValue === ARTICLE_TYPE_BLOG_B,
                          })}
                        >
                          <Picture
                            style_320={STYLE_TEASER_1_1}
                            relativeOrigin={
                              article.authors.edges[0].node.image.image.file
                                .relativeOriginPath
                            }
                            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                            focalPointX={
                              article.authors.edges[0].node.image.image.file
                                .focalPointX
                            }
                            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                            focalPointY={
                              article.authors.edges[0].node.image.image.file
                                .focalPointY
                            }
                            alt={
                              article.authors.edges[0].node.image.title || ''
                            }
                          />
                        </div>
                      )
                  }
                </div>
              )}
            </Hero>
          )}

        {/* article lead */}
        <div
          className={classNames(sections.Section, {
            [grid.HiddenSmUp]: hasVideoLoop,
          })}
        >
          <div className={grid.Container}>
            <div className={grid.Row}>
              {article.keywords &&
                article?.subtypeValue !== ARTICLE_TYPE_HEADLESS &&
                article?.subtypeValue !== ARTICLE_TYPE_BLOG_A &&
                article?.subtypeValue !== ARTICLE_TYPE_BLOG_B &&
                article?.subtypeValue !== ARTICLE_TYPE_BLOG_C &&
                article?.subtypeValue !== ARTICLE_TYPE_BLOG_D && (
                  <KeywordDisruptor keywords={article.keywords} />
                )}
              <ArticleLead
                article={article}
                articleColStyle={articleColStyle}
                component={article?.subtypeValue || ''}
                language={language}
              />
            </div>
          </div>
        </div>

        <div className={styles.UtilityBarWrapper}>
          <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
            {/* @ts-ignore TODO: TS7031 ->  Binding element 'isOverlayVisible' implicitly has an 'any' type. */}
            {/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */}
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <UtilityOverlay
                overlayTitle={
                  language === DEFAULT_LANGUAGE
                    ? UTILITY_BAR_SHARE_LABEL
                    : UTILITY_BAR_SHARE_LABEL_FR
                }
                isOverlayVisible={isOverlayVisible}
                toggleOverlayVisible={toggleOverlayVisible}
                enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
              />
            )}
          </UtilityBar>
        </div>

        {hasBorderSeparator(article) && (
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={grid.ColXs24}>
                <div className={styles.BorderSeparator} />
              </div>
            </div>
          </div>
        )}

        {hasDivider(article) && (
          <div className={sections.Section}>
            <div className={grid.Container}>
              <div className={grid.Row}>
                <div className={articleColStyle}>
                  <div className={styles.DividerLargeMarginBottom} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={TRACKING_CLASS_ARTICLE_BODY}>
        <Paragraphs
          pageBody={article.body}
          colStyle={getArticleColStyleByType(article)}
          origin={article?.subtypeValue || ''}
          showCap
        />
      </div>

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={articleColStyle}>
              {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[] & [{ node */}
              <AuthorsTeaser authors={article.authors?.edges || []} />
            </div>
          </div>
        </div>
      </div>

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={articleColStyle}>
              <div className={styles.Divider} />
            </div>
          </div>
        </div>
      </div>
      <div className={sections.Section}>
        <div className={grid.Container}>
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {keywords?.edges?.length > 0 && (
            <ArticleKeywords
              keywords={keywords}
              colStyle={getArticleColStyleByType(article)}
            />
          )}
        </div>
      </div>

      <div
        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
        ref={bottomRecosRef}
        className={classNames(
          TRACKING_CLASS_ARTICLE_RECOMMENDATIONS,
          sections.Section,
        )}
      >
        <div className={grid.Container}>
          <Recommendations
            items={recos}
            teaserLayout={TEASER_LAYOUT_ML}
            title={
              <FormattedMessage
                id="app.article.relatedStories"
                description="Heading above related stories teasers"
                defaultMessage="Related Stories"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps: Object = {
  setHeaderData,
  resetHeaderData,
};

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

const ArticleWrapper = compose<any, any>(
  withHeaderProps,
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ArticlePropsInner): ArticleType =>
      mapProps.article || null,
    getFallbackTitle: (mapProps: ArticlePropsInner) =>
      (!!mapProps && getFallbackTitle(mapProps.article)) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    hasBreadcrumbs: () => false,
  }),
)(ArticleDetail);

export default ArticleWrapper;
