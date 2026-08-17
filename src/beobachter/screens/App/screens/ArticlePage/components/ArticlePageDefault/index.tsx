import React from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import lodashSlice from 'lodash/slice';
import { enrichArticleBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import { isNativeAdvertising as isNativeAdvertisingFunction } from '../../../../../../../shared/helpers/sharePanel';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import { replaceEmbedWithPianoPlaceholder } from '../../../../../../shared/helpers/replaceEmbedWithPianoPlaceholder';
import { getStyleByType } from '../../../../components/Teaser/shared/helpers';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withScrollDownToAnchor'. '/Users/b */
import withScrollDownToAnchor from '../../../../../../../shared/decorators/withScrollDownToAnchor';
import { SOS_BEOBACHTER } from '../../../../../../shared/actions/route';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../../components/AppNexus';
import Comments from '../../../../components/Comments';
import EditButtons from '../../../../components/EditButtons';
import GooglePreferredSource from '../../../../components/GooglePreferredSource';
import Paragraphs from '../../../../components/Paragraphs';
import PianoRestrictedDrawer from '../../../../components/PianoRestrictedDrawer';
import ProgressBar from '../../../../components/ProgressBar';
import ArticleAlerts from '../../../Article/components/ArticleAlerts';
import ArticleHead from '../../../Article/components/ArticleHead';
import ArticleRecommendations from '../../../Article/components/ArticleRecommendations';
import AuthorBox from '../AuthorBox';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import { MHPA_2, MMR_1 } from '../../../../../../../shared/constants/adZone';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_STATUS_HIDDEN,
} from '../../../../../../../shared/constants/comments';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ARTICLE_TYPE_RATGEBER,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../../../../../shared/constants/piano';
import { PUBLICATION_BEOBACHTER } from '../../../../../../../shared/constants/publications';
import {
  TRACKING_CLASS_ARTICLE_BODY,
  TRACKING_CLASS_ARTICLE_HEADER,
} from '../../../../../../../shared/constants/tracking';
import { PARAGRAPHS_FOR_FREE } from '../../../Article/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticlePageDefaultProps } from './typings';

const ArticlePageDefault = ({
  article,
  isRestrictedArticle,
  shouldHideContent,
  vertical,
  isCrawler,
  viewportLabel,
  noHeader,
  pageLayoutType,
  hasSubscriptions,
}: ArticlePageDefaultProps) => {
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );

  const isPaywallDrawerVisible = useSelector(
    (state: Record<string, any>) =>
      pianoStateSelector(state).isPaywallDrawerVisible,
  );

  /* @ts-ignore TODO: TS2322 ->  Type '(Article | NativeAdvertising) & TeaserFactoryProps & { addClass? */
  const {
    gcid,
    subtypeValue = '',
  }: (Article | NativeAdvertising) & {
    subtypeValue?: string;
    trackingDetailImpression?: string;
  } = article;

  const isNativeAdvertising: boolean = isNativeAdvertisingFunction(article);
  const isAdvertorial: boolean = subtypeValue === ADVERTISING_TYPE_ADVERTORIAL;

  let body =
    (shouldHideContent &&
      !isCrawler &&
      lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE)) ||
    article.body;

  if (!hasSubscriptions && !shouldHideContent && body) {
    body = replaceEmbedWithPianoPlaceholder(body);
  }
  const enrichedArticleBody = isNativeAdvertising
    ? body
    : enrichArticleBodyWithADs({ pageBody: body });

  const scrollOffset = getScrollOffset(false, viewportLabel, noHeader);

  const authorsWithProfilePage = (article.authors?.edges || []).filter(
    (author) =>
      author?.node?.hasProfilePage &&
      author.node.preferredUri &&
      author.node.publications?.includes(PUBLICATION_BEOBACHTER),
  );

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

  const origin =
    (isNativeAdvertising && NATIVE_ADVERTISING_CONTENT_TYPE) || subtypeValue;

  const isArticleRatgeber = origin === ARTICLE_TYPE_RATGEBER;

  const bodyId = `article-body-${article.nid}`;

  const lastDate =
    article.publicationDate && article.publicationDate > article.changeDate
      ? article.publicationDate
      : article.changeDate;

  return (
    <>
      {shouldHideContent && !isCrawler && isPaywallDrawerVisible && (
        <PianoRestrictedDrawer />
      )}
      <div
        className={classNames(
          'article-detail',
          {
            sponsored: isAdvertorial,
            brandReport: isNativeAdvertising && !isAdvertorial,
          },
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"" | "IsSwissInsurance" | "IsSponsoredArticle" | "IsBr */
          styles[getStyleByType(article)],
        )}
        data-testid="articlepage-wrapper"
        id={bodyId}
      >
        <div>
          <ProgressBar trackingElementId={bodyId} />

          <EditButtons
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            editContentUri={article.editContentUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            editRelationUri={article.editRelationUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            cloneContentUri={article.cloneContentUri}
            origin={origin}
          />

          {!article?.channel?.suppressAds && !isNativeAdvertising && (
            <div
              className={classNames(
                'ad-wrapper ad-wrapper-top',
                styles.HiddenForDesktop,
              )}
            >
              <div className={classNames(grid.Container)}>
                <AppNexus slot={MMR_1} deviceType="mobile" />
              </div>
            </div>
          )}

          <div
            className={classNames(TRACKING_CLASS_ARTICLE_HEADER, {
              [styles.ArticleHeader]: !isAdvertorial && !isNativeAdvertising,
            })}
          >
            <ArticleHead
              article={article}
              articleColStyle={classNames({
                [mergeClasses([
                  grid.ColSm22,
                  grid.ColMd22,
                  grid.ColXl24,
                  grid.ColOffsetSm1,
                  grid.ColOffsetMd1,
                  grid.ColOffsetXl0,
                ])]: !isArticleRatgeber,
              })}
              component={subtypeValue}
              withComments={!isNativeAdvertising}
              pageLayoutType={pageLayoutType}
            />
          </div>
        </div>
        <div className={styles.Wrapper}>
          <div
            className={classNames(
              TRACKING_CLASS_ARTICLE_BODY,
              styles.BodyWrapper,
              {
                [styles.NativeBackground]:
                  isNativeAdvertising && !isAdvertorial,
                [styles.PublireportageBackground]: isAdvertorial,
              },
            )}
          >
            <TestFragment data-testid="articlepage-paragraphs">
              <Paragraphs
                pageBody={enrichedArticleBody}
                /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
                contentGcid={
                  (!isNativeAdvertising &&
                    vertical !== SOS_BEOBACHTER &&
                    article.gcid) ||
                  null
                }
                articleKeywords={article.keywords}
                colStyle={classNames(
                  !isArticleRatgeber &&
                    !isNativeAdvertising &&
                    classNames(
                      grid.ColSm22,
                      grid.ColMd17,
                      grid.ColXl14,
                      grid.ColOffsetSm1,
                      grid.ColOffsetMd1,
                      grid.ColOffsetXl5,
                    ),
                  isNativeAdvertising &&
                    classNames(grid.ColMd16, grid.ColOffsetMd4),
                )}
                origin={origin}
                paragraphsForFree={
                  (shouldHideContent && PARAGRAPHS_FOR_FREE) || null
                }
                isAdSuppressed={
                  article?.channel?.suppressAds || isNativeAdvertising
                }
                pageLayoutType={pageLayoutType}
              />
            </TestFragment>
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
                  <div className={grid.Row}>
                    <div className={grid.Col24}>
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
          {(!shouldHideContent || isCrawler) &&
            authorsWithProfilePage.length !== 0 && (
              <div
                className={classNames({
                  [grid.Container]: !isSplittedPageLayout,
                })}
                data-testid="articlepage-authors-teasers"
              >
                <div className={grid.Row}>
                  <div
                    className={classNames(
                      grid.ColSm24,
                      grid.ColMd24,
                      grid.ColXl18,
                      grid.ColOffsetXl3,
                    )}
                  >
                    <div
                      className={classNames(styles.AuthorsArticleBox, {
                        [styles.MarginTop]:
                          isNativeAdvertising || isAdvertorial,
                        [styles.MarginBottom]: shouldShowComments,
                      })}
                    >
                      {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */}
                      {authorsWithProfilePage.map(({ node: author }) => (
                        <div
                          key={author.id}
                          className={styles.TeaserAuthorWrapper}
                        >
                          <AuthorBox author={author} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      <div
        className={classNames({
          [grid.Container]: !isSplittedPageLayout,
        })}
      >
        <div className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              !isArticleRatgeber &&
                !isNativeAdvertising &&
                classNames(
                  grid.ColSm22,
                  grid.ColMd17,
                  grid.ColXl14,
                  grid.ColOffsetSm1,
                  grid.ColOffsetMd1,
                  grid.ColOffsetXl5,
                ),
              isNativeAdvertising &&
                classNames(grid.ColMd16, grid.ColOffsetMd4),
            )}
          >
            <GooglePreferredSource />
          </div>
        </div>
      </div>

      <SmoothScroll anchorId={COMMENTS_ANCHOR_ID} offset={scrollOffset} />
      <>
        {shouldShowComments && (
          <div
            className={classNames(
              `${(isRestrictedArticle && 'restricted-') || ''}article-comments`,
              {
                [grid.Container]: !isSplittedPageLayout,
              },
            )}
          >
            {/* @ts-ignore TODO: TS2322 ->  Type 'string | false' is not assignable to type 'string | undefined'. */}
            <div className={!isSplittedPageLayout && grid.Row}>
              <div
                /* @ts-ignore TODO: TS2322 ->  Type 'string | false' is not assignable to type 'string | undefined'. */
                className={
                  !isSplittedPageLayout &&
                  classNames(
                    grid.ColSm24,
                    grid.ColMd24,
                    grid.ColXl18,
                    grid.ColOffsetXl3,
                  )
                }
              >
                <Comments
                  articleId={article.id || ''}
                  gcid={gcid || ''}
                  commentStatus={article.commentStatus || ''}
                  lastDate={lastDate}
                />
              </div>
            </div>
          </div>
        )}
        {shouldShowAlerts && (
          <div
            className={classNames(
              `${(isRestrictedArticle && 'restricted-') || ''}article-alerts`,
              styles.ArticleAlertsWrapper,
              {
                [grid.Container]: !isSplittedPageLayout,
              },
            )}
            data-testid="article-alerts-wrapper"
          >
            <ArticleAlerts
              key={`article-alerts-${article.id}`}
              items={article.keywords.edges}
            />
          </div>
        )}
        {!isNativeAdvertising && !isAdvertorial && (
          <div className={classNames('ad-wrapper', `ad-wrapper-mobile`)}>
            <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
          </div>
        )}
        {article.canonicalUri && (
          <ArticleRecommendations
            article={article}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            pageLayoutType={pageLayoutType}
          />
        )}
      </>
    </>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  noHeader: headerStateSelector(state).noHeader,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withScrollDownToAnchor,
)(ArticlePageDefault);
