import React from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import lodashSlice from 'lodash/slice';
import { enrichArticleBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { isNativeAdvertising as isNativeAdvertisingFunction } from '../../../../../../../shared/helpers/sharePanel';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import { enrichBody } from '../../../FullquotePage/helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import useImpressionTracking from '../../../../../../../shared/hooks/useImpressionTracking';
import InView from '../../../../../../../common/components/InView';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import AppNexus from '../../../../components/AppNexus';
import Comments from '../../../../components/Comments';
import EditButtons from '../../../../components/EditButtons';
import GooglePreferredSource from '../../../../components/GooglePreferredSource';
import Paragraphs from '../../../../components/Paragraphs';
import UtilityHeaderBar from '../../../../components/UtilityBar/components/UtilityHeaderBar';
import ArticleAlerts from '../../../Article/components/ArticleAlerts';
import ArticleHeader from '../../../Article/components/ArticleHeader';
import AuthorsTeaser from '../AuthorsTeaser';
import ArticlePageAside from './../../components/ArticlePageAside';
import ArticleRecommendations from './../../components/ArticleRecommendations';
import { ArticlePropsInner } from '../..';
import { getIsSocialBarVisible } from '../../../../components/Header/components/HeaderInner/helper';
import { TOP_AD_1 } from '../../../../../../../shared/constants/adZone';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_STATUS_HIDDEN,
} from '../../../../../../../shared/constants/comments';
import {
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../../../../../shared/constants/content';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../../../../../shared/constants/piano';
import { TRACKING_CLASS_ARTICLE_BODY } from '../../../../../../../shared/constants/tracking';
import {
  AD_PLACEMENT_SLOTS_ARTICLE,
  ARTICLE_CHARACTER_COUNTS,
} from '../../../../components/AppNexus/constants';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import { PARAGRAPHS_FOR_FREE } from '../../../Article/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const enrichWidgets = (body: any, article: Article | NativeAdvertising) => {
  if (!body) {
    return body;
  }

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const firstValor = article?.valors?.edges[0]?.node || null;
  if (
    firstValor &&
    firstValor.valorName &&
    firstValor.valorStockExchange?.label &&
    firstValor.valorCurrency?.label
  ) {
    return enrichBody({
      body: body,
      data: {
        listingId: `${firstValor.valorNumber}-${firstValor.valorStockExchange.originalId}-${firstValor.valorCurrency.originalId}`,
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        valorName: firstValor.fullquoteUrl?.split('/')[1],
        market: firstValor.valorStockExchange.label,
        currency: firstValor.valorCurrency.label,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | number | undefined'. */
        mMarketId: firstValor.valorStockExchange.originalId,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | number | undefined'. */
        mCurrencyId: firstValor.valorCurrency.originalId,
      },
    });
  }
  return body;
};

const ArticlePageDefault = ({
  article,
  locationPathname,
  screenReady,
  hasSubscriptions,
  isCrawler,
  viewportLabel,
  isInView = true,
}: ArticlePropsInner) => {
  const { gcid, keywords } = article;

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const isNativeAdvertising: boolean = isNativeAdvertisingFunction(article);

  const scrollOffset = getScrollOffset(false, viewportLabel);

  useImpressionTracking({
    trackingDetailImpression: article?.trackingDetailImpression,
    pathname: locationPathname,
    screenReady,
    isNativeAdvertising,
  });

  const getIsReferrerWhitelisted = () => {
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
  const isRestrictedArticle = [
    RESTRICTION_STATUS_PAID,
    RESTRICTION_STATUS_REGISTERED,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  ].includes(article?.restrictionStatus);
  const shouldHideContent =
    !hasSubscriptions && !getIsReferrerWhitelisted() && isRestrictedArticle;

  let body =
    (shouldHideContent &&
      !isCrawler &&
      lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE)) ||
    article.body;

  body = enrichWidgets(body, article);

  const enrichedArticleBody =
    isNativeAdvertising || !isInView
      ? body
      : enrichArticleBodyWithADs({
          pageBody: body,
          /* @ts-ignore TODO: TS2322 ->  Type '{ mobile */
          adPlacementSlots: AD_PLACEMENT_SLOTS_ARTICLE,
          characterCount: ARTICLE_CHARACTER_COUNTS,
        });

  const lastDate =
    article.publicationDate && article.publicationDate > article.changeDate
      ? article.publicationDate
      : article.changeDate;
  const isSocialBarVisible = getIsSocialBarVisible(
    article.__typename as string,
  );

  const configIsVisible = {
    rootMargin: `${60 - 12 * 2 - 1}px 0px 0px 0px`,
  };
  const configIsCollapsed = {
    rootMargin: `-${60 - 12 + 2}px 0px 0px 0px`,
  };

  return (
    <>
      <InView
        isInitialInView
        config={configIsVisible && configIsCollapsed}
        isObserveDelayed
      >
        {({ isInView }) => {
          return (
            !isHybridApp && (
              <UtilityHeaderBar
                isScrolledToCollapse={!isInView}
                articleData={article as ArticleData}
                isSocialBarVisible={isSocialBarVisible}
                enabledUtilities={UTILITYBAR_CONFIG}
                enabledOverlayUtilities={UTILITYBAR_OVERLAY_CONFIG}
                showTitle={true}
              />
            )
          );
        }}
      </InView>
      <div className={styles.PageWrapper}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <EditButtons
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              editContentUri={article.editContentUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              editRelationUri={article.editRelationUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              cloneContentUri={article.cloneContentUri}
            />
          </div>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColMd15,
              grid.ColXl16,
              styles.Print,
            )}
          >
            <div className={classNames('article-detail', styles.Wrapper)}>
              <div className={styles.ArticleInner}>
                <ArticleHeader article={article} isInView={isInView} />

                {!(article?.channel?.suppressAds || isNativeAdvertising) && (
                  <div
                    className={classNames(
                      styles.MMR1Wrapper,
                      'ad-wrapper ad-wrapper-mobile header-apn-zone',
                    )}
                  >
                    <AppNexus
                      slot={(isInView && TOP_AD_1) || 'MMR1Placeholder'}
                      deviceType="mobile"
                    />
                  </div>
                )}

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
                    pageBody={enrichedArticleBody}
                    colStyle={classNames(grid.ColXs24)}
                    origin={article?.subtypeValue || article.__typename}
                    activeChannel={article?.channel?.title || ''}
                    paragraphsForFree={
                      (shouldHideContent && PARAGRAPHS_FOR_FREE) || null
                    }
                    isAdSuppressed={
                      article?.channel?.suppressAds || isNativeAdvertising
                    }
                    hasContainer={false}
                  />

                  {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */}
                  <AuthorsTeaser authors={article.authors?.edges || []} />

                  {article.issue?.nid &&
                    (!shouldHideContent ||
                      (isCrawler && shouldHideContent)) && (
                      <div
                        className={`${
                          (isRestrictedArticle && 'restricted-') || ''
                        }article-magazin-issue`}
                      >
                        {/* <MagazineIssueSection issueId={article.issue.nid} /> */}
                      </div>
                    )}
                  {shouldHideContent && !isCrawler && (
                    <div
                      className={classNames(styles.Paywall, {
                        [styles.HiddenPaywall]: !shouldHideContent,
                      })}
                    >
                      <div className={grid.Container}>
                        <div className={grid.Row}>
                          <div className={grid.ColXl17}>
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
                  <GooglePreferredSource />
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
                        )}
                      >
                        <ArticleAlerts items={article.topics.edges} />
                      </div>
                    )}

                  <SmoothScroll
                    anchorId={(isInView && COMMENTS_ANCHOR_ID) || ''}
                    offset={scrollOffset}
                  />
                  {!isNativeAdvertising &&
                    (!shouldHideContent || (isCrawler && shouldHideContent)) &&
                    article.commentStatus &&
                    article.commentStatus !== COMMENT_STATUS_HIDDEN && (
                      <div
                        className={`${
                          (isRestrictedArticle && 'restricted-') || ''
                        }article-comments`}
                      >
                        <Comments
                          articleId={article.id || ''}
                          gcid={gcid || ''}
                          commentStatus={article.commentStatus || ''}
                          isInView={isInView}
                          lastDate={lastDate}
                        />
                      </div>
                    )}

                  <ArticleRecommendations
                    gcid={gcid}
                    keywords={keywords}
                    isNativeAdvertising={isNativeAdvertising}
                  />
                </div>
              </div>
            </div>
          </div>
          <ArticlePageAside article={article} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  locationPathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  screenReady: locationStateSelector(state).screenReady,
  hasSubscriptions:
    authStateSelector(state).hasSubscriptions ||
    pianoStateSelector(state).isAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default compose<any, any>(connect(mapStateToProps))(ArticlePageDefault);
