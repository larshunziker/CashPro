import React, { ComponentType } from 'react';
import classNames from 'classnames';
import lodashSlice from 'lodash/slice';
import { useSelector } from 'react-redux';
import { enrichArticleBodyWithADs } from '../../../shared/helpers/ads';
import { isNativeAdvertising as isNativeAdvertisingFunction } from '../../../shared/helpers/sharePanel';
import TestFragment from '../../../shared/tests/components/TestFragment';
import SmoothScroll from '../../components/SmoothScroll';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';
import { MMR_1 } from '../../../shared/constants/adZone';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_STATUS_HIDDEN,
} from '../../../shared/constants/comments';
import {
  ARTICLE_TYPE_LONG_READ,
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../shared/constants/content';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../shared/constants/piano';
import { RECOMMENDATION_TYPE } from '../../../shared/constants/recommendations';
import {
  TRACKING_CLASS_ARTICLE_BODY,
  TRACKING_CLASS_ARTICLE_HEADER,
} from '../../../shared/constants/tracking';
import { FULL_PAGE_LAYOUT_TYPE } from '../PageTemplate/constants';
import grid from '../../assets/styles/grid.legacy.css';
import { LongFormFactoryOptions, LongFormProps } from './typings';

export type LongFormFactoryPropsInner = LongFormProps;

const LongFormFactory = ({
  ProgressBar,
  EditButtons,
  LongFormHero,
  Paragraphs,
  paragraphsForFree,
  AppNexus,
  AuthorBox,
  ArticleAlerts,
  ArticleRecommendations,
  Recommendations,
  Comments,
  PianoRestrictedDrawer,
  publication,
  styles,
  Helmet,
  getHelmetMetaLink,
  articleColStyles,
  getScrollOffset,
}: LongFormFactoryOptions) => {
  const LongFormPage: ComponentType<LongFormProps> = ({
    article,
    page,
    location,
    hasSubscriptions,
    isCrawler,
    viewportLabel,
    noHeader,
  }: LongFormProps) => {
    const bodyId = `article-body-${article.nid}`;

    const isNativeAdvertising: boolean = isNativeAdvertisingFunction(article);

    const isPaywallDrawerVisible = useSelector(
      (state: Record<string, any>) =>
        pianoStateSelector(state).isPaywallDrawerVisible,
    );

    const isRestrictedArticle = [
      RESTRICTION_STATUS_PAID,
      RESTRICTION_STATUS_REGISTERED,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ].includes(article?.restrictionStatus);

    const shouldHideContent = !hasSubscriptions && isRestrictedArticle;

    const body =
      (shouldHideContent &&
        !isCrawler &&
        lodashSlice(article.body, 0, paragraphsForFree)) ||
      article.body;

    const enrichedArticleBody = isNativeAdvertising
      ? body
      : enrichArticleBodyWithADs({ pageBody: body });

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    const scrollOffset = getScrollOffset(false, viewportLabel, noHeader);

    const shouldShowComments =
      !isNativeAdvertising &&
      (!shouldHideContent || (isCrawler && shouldHideContent)) &&
      article?.commentStatus &&
      article.commentStatus !== COMMENT_STATUS_HIDDEN;

    const shouldShowAlerts =
      article?.keywords?.edges &&
      Array.isArray(article?.keywords?.edges) &&
      article.keywords.edges.length > 0 &&
      (!shouldHideContent || (isCrawler && shouldHideContent));

    const authorsWithProfilePage = (article.authors?.edges || []).filter(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      (author) => author.node?.hasProfilePage && author.node?.preferredUri,
    );

    const lastDate =
      article.publicationDate && article.publicationDate > article.changeDate
        ? article.publicationDate
        : article.changeDate;

    return (
      <div
        className={`long-form-detail-${article.__typename} ${styles.Wrapper}`}
        data-testid="longform-wrapper"
        id={bodyId}
      >
        {/* @ts-ignore TODO: TS2604 ->  JSX element type 'ProgressBar' does not have any construct or call signatures. */}
        <ProgressBar trackingElementId={bodyId} />

        {EditButtons && (
          <EditButtons
            editContentUri={article.editContentUri}
            editRelationUri={article.editRelationUri}
            cloneContentUri={article.cloneContentUri}
          />
        )}

        <Helmet
          link={
            getHelmetMetaLink &&
            getHelmetMetaLink(
              location,
              enrichedArticleBody?.length,
              page,
              article?.ampUrl,
            )
          }
        />

        {!article?.channel?.suppressAds && !isNativeAdvertising && (
          <div className="ad-wrapper ad-wrapper-top">
            <AppNexus slot={MMR_1} deviceType="mobile" />
          </div>
        )}

        <div
          className={classNames(
            TRACKING_CLASS_ARTICLE_HEADER,
            styles.ArticleHeader,
          )}
        >
          {/*// TODO: Fix this after knowledge if we should replace LongRead with LongForm*/}
          <LongFormHero article={article} origin={ARTICLE_TYPE_LONG_READ} />
        </div>
        {shouldHideContent && !isCrawler && isPaywallDrawerVisible && (
          <PianoRestrictedDrawer />
        )}
        <div className={TRACKING_CLASS_ARTICLE_BODY}>
          <TestFragment data-testid="longformpage-paragraphs">
            <Paragraphs
              pageBody={enrichedArticleBody}
              contentGcid={(!isNativeAdvertising && article.gcid) || null}
              articleKeywords={article.keywords}
              // TODO: Fix this after knowledge if we should replace LongRead with LongForm
              origin={ARTICLE_TYPE_LONG_READ}
              // origin={ARTICLE_TYPE_LONG_FORM}
              paragraphsForFree={
                (shouldHideContent && paragraphsForFree) || null
              }
              isAdSuppressed={
                article?.channel?.suppressAds || isNativeAdvertising
              }
            />
          </TestFragment>

          {shouldHideContent && !isCrawler && (
            <div className={classNames(styles.Paywall)}>
              <div className={grid.Container}>
                <div className={grid.Row}>
                  <div className={classNames(grid.ColXl22, grid.ColOffsetXl1)}>
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

        <div className={styles.Container}>
          <div className={styles.Row}>
            <div className={styles.LowerSection}>
              {authorsWithProfilePage.length > 0 && (
                <div className={styles.AuthorBoxContainer}>
                  {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */}
                  {authorsWithProfilePage.map(({ node: author }) => (
                    <div className={styles.AuthorBoxWrapper} key={author.id}>
                      <AuthorBox author={author} />
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.Recommendations}>
                <Recommendations
                  title="Partnerinhalte"
                  contentGcid={article?.gcid || null}
                  articleKeywords={article.keywords}
                  publication={publication}
                  articleColStyle={articleColStyles}
                  origin={ARTICLE_TYPE_LONG_READ}
                  ignoreTeaserImpressions
                  type={RECOMMENDATION_TYPE.NATONLY}
                  isInRightColumn={false}
                />
              </div>
            </div>
          </div>
        </div>

        <SmoothScroll anchorId={COMMENTS_ANCHOR_ID} offset={scrollOffset} />

        {(shouldShowComments || shouldShowAlerts) && (
          <div className={styles.Container}>
            <div className={styles.Row}>
              {shouldShowComments && (
                <div
                  className={classNames(
                    `${
                      (isRestrictedArticle && 'restricted-') || ''
                    }article-comments`,
                    styles.CommentsWrapper,
                  )}
                >
                  <Comments
                    articleId={article.id || ''}
                    gcid={article?.gcid || ''}
                    commentStatus={article.commentStatus || ''}
                    lastDate={lastDate}
                  />
                </div>
              )}

              {shouldShowAlerts && (
                <div
                  className={classNames(
                    `${
                      (isRestrictedArticle && 'restricted-') || ''
                    }article-alerts`,
                    styles.AlertsWrapper,
                  )}
                  data-testid="article-alerts-wrapper"
                >
                  <ArticleAlerts
                    key={`article-alerts-${article.id}`}
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    items={article.keywords.edges}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {article.canonicalUri && (
          <div className={styles.ArticleRecommendations}>
            <ArticleRecommendations
              article={article}
              pageLayoutType={FULL_PAGE_LAYOUT_TYPE}
            />
          </div>
        )}
      </div>
    );
  };

  return LongFormPage;
};

export default LongFormFactory;
