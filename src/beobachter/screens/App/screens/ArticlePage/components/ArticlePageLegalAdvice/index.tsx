import React from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import lodashSlice from 'lodash/slice';
import { enrichArticleBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import {
  extractParents,
  mapBreadcrumbsData,
} from '../../../../../../shared/helpers/customBreadcrumbs';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withScrollDownToAnchor'. '/Users/b */
import withScrollDownToAnchor from '../../../../../../../shared/decorators/withScrollDownToAnchor';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../../components/AppNexus';
import ArticleAttachment from '../../../../components/ArticleAttachment';
import EditButtons from '../../../../components/EditButtons';
import LegalAdviceSearch from '../../../../components/LegalAdviceSearch';
import Paragraphs from '../../../../components/Paragraphs';
import PianoRestrictedDrawer from '../../../../components/PianoRestrictedDrawer';
import ProgressBar from '../../../../components/ProgressBar';
import Tools from '../../../../components/Tools';
import ArticleHead from '../../../Article/components/ArticleHead';
import ArticleRecommendations from '../../../Article/components/ArticleRecommendations';
import RelatedBook from './components/RelatedBook';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { stripHtml } from './stripHtml';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import {
  MHPA_2,
  MMR_1,
  WIDEBOARD_2,
} from '../../../../../../../shared/constants/adZone';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../../../../../shared/constants/piano';
import {
  TRACKING_CLASS_ARTICLE_BODY,
  TRACKING_CLASS_ARTICLE_HEADER,
} from '../../../../../../../shared/constants/tracking';
import {
  ROUTE_LEGAL_ADVICE,
  ROUTE_LEGAL_ADVICE_PARENT,
} from '../../../../constants';
import { PARAGRAPHS_FOR_FREE_LEGAL_ADVICE } from '../../../Article/constants';
import { RESTRICTION_STATUS_REGISTERED } from '../../../../../../../shared/constants/content.tsx';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticlePageLegalAdviceProps } from './typings';

export const getFallbackTitle = () => 'Artikel';

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
export const legalAdviceBreadcrumbsData = (data) => {
  const legalAdviceArticle = data?.environment?.routeByPath.object;
  const legalAdviceChannel =
    legalAdviceArticle?.channels?.[0] || legalAdviceArticle?.channel || null;

  if (legalAdviceChannel) {
    data.breadcrumbsData = {
      activeMenuTrail: {
        edges: [
          mapBreadcrumbsData({
            title: 'Beratung',
            preferredUri: `/${ROUTE_LEGAL_ADVICE_PARENT}`,
            id: '0',
          }),
          mapBreadcrumbsData({
            title: 'Rechtsratgeber',
            preferredUri: `/${ROUTE_LEGAL_ADVICE}`,
            id: '1',
          }),
          // extractParents is reversed because configuration starts from article node,
          // not from the beginning of the route
          ...extractParents({
            channel: legalAdviceChannel,
            key: 'parent',
            prefixUrl: ROUTE_LEGAL_ADVICE,
          }).reverse(),
          mapBreadcrumbsData(legalAdviceChannel, ROUTE_LEGAL_ADVICE),
        ],
      },
      title: legalAdviceArticle?.title || '',
    };
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'article' implicitly has an 'any' type. */
function getAttachmentSource(article) {
  const attachment = article.attachment;
  const registeredAccess =
    article.restrictionStatus === RESTRICTION_STATUS_REGISTERED;
  const registeredFragment = registeredAccess
    ? '&restrictionStatus=registered'
    : '';
  if (attachment) {
    return (
      `${getServiceUrl(__ATTACHMENTS_ENDPOINT__)}/get?path=${article.nid}/` +
      encodeURIComponent(attachment.systemFilename) +
      '&filename=' +
      encodeURIComponent(attachment.filename) +
      registeredFragment
    );
  }
  return null;
}

const ArticlePageLegalAdvice = ({
  article,
  shouldHideContent,
  isCrawler,
  pageLayoutType,
}: ArticlePageLegalAdviceProps) => {
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );
  const isArticleHidden = shouldHideContent && !isCrawler;

  const isPaywallDrawerVisible = useSelector(
    (state: Record<string, any>) =>
      pianoStateSelector(state).isPaywallDrawerVisible,
  );
  interface ArticleBodyElement {
    text?: string;
  }
  const body: ArticleBodyElement[] = ((isArticleHidden &&
    lodashSlice(article.body, 0, PARAGRAPHS_FOR_FREE_LEGAL_ADVICE)) ||
    article.body) as ArticleBodyElement[];

  if (
    body &&
    body[0]?.text &&
    article.lead &&
    stripHtml(body[0].text).localeCompare(article.lead) === 0
  ) {
    body.shift();
  }
  const enrichedArticleBody = isArticleHidden
    ? body
    : enrichArticleBodyWithADs({ pageBody: body });

  const origin = article.subtypeValue;
  const bodyId = `article-body-${article.nid}`;
  const attachment = article.attachment
    ? {
        ...article.attachment,
        source: getAttachmentSource(article),
      }
    : null;

  const getRelatedBook = () => {
    if (article?.relatedBook) {
      return article.relatedBook;
    }

    const relatedBooksInChannels =
      article?.channels?.filter((channel) => !!channel?.relatedBook) || [];

    if (
      relatedBooksInChannels.length &&
      relatedBooksInChannels?.[0]?.relatedBook
    ) {
      return relatedBooksInChannels[0].relatedBook;
    }

    return article.channel?.relatedBook;
  };

  const relatedBook = getRelatedBook();

  return (
    <>
      <div
        className={classNames(
          'article-detail',
          'article-detail-legal-advice',
          styles.Wrapper,
        )}
        data-testid="articlepage-wrapper"
        id={bodyId}
      >
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
        {!article?.channel?.suppressAds && (
          <div className={'ad-wrapper ad-wrapper-top'}>
            <AppNexus slot={MMR_1} deviceType="mobile" />
          </div>
        )}
        {shouldHideContent && !isCrawler && isPaywallDrawerVisible && (
          <PianoRestrictedDrawer />
        )}
        <div
          className={classNames(
            TRACKING_CLASS_ARTICLE_HEADER,
            styles.ArticleHeader,
          )}
        >
          <div className={classNames(styles.HiddenForDesktop)}>
            <LegalAdviceSearch preserveScrollProgress={true} />
          </div>

          <ArticleHead
            article={article}
            articleColStyle={grid.ColSm24}
            component={article.subtypeValue}
            withComments={false}
            pageLayoutType={pageLayoutType}
          />
        </div>

        <div
          className={classNames(
            TRACKING_CLASS_ARTICLE_BODY,
            styles.BodyWrapper,
          )}
        >
          <TestFragment data-testid="articlepage-paragraphs">
            <Paragraphs
              pageBody={enrichedArticleBody}
              /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
              contentGcid={article.gcid || null}
              articleKeywords={article.keywords}
              colStyle={grid.ColSm24}
              /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
              origin={origin}
              paragraphsForFree={
                (shouldHideContent && PARAGRAPHS_FOR_FREE_LEGAL_ADVICE) || null
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              isAdSuppressed={article?.channel?.suppressAds}
              pageLayoutType={pageLayoutType}
              addClass={classNames({
                [styles.HiddenContent]: shouldHideContent,
              })}
            />
          </TestFragment>

          {isArticleHidden && (
            <>
              <div
                className={classNames(styles.Paywall, {
                  [styles.HiddenPaywall]: !shouldHideContent,
                })}
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
              <div className={classNames('ad-wrapper', `ad-wrapper-mobile`)}>
                <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
              </div>
              <div
                className={classNames('ad-wrapper', `ad-wrapper-tabletDesktop`)}
              >
                <AppNexus
                  slot={WIDEBOARD_2}
                  isMultiPlacement
                  deviceType="tabletDesktop"
                />
              </div>
            </>
          )}

          {!isArticleHidden && (
            <>
              {attachment && (
                <ArticleAttachment
                  attachmentBoxTitle={'Anhang'}
                  /* @ts-ignore TODO: TS2322 ->  Type '{ source */
                  attachment={attachment}
                />
              )}

              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
              {article.recommendations?.count > 0 && (
                /* @ts-ignore TODO: TS2786 ->  'Tools' cannot be used as a JSX component. */
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<RelatedContentUnionConnection> | undefined' is not assignable to type '(RelatedContentUnionConnection & { n */
                <Tools data={article.recommendations} />
              )}

              {relatedBook && (
                <div className={styles.BookTeaserWrapper}>
                  <RelatedBook bookTeaser={relatedBook} hasNext={false} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {article.canonicalUri && (
        <ArticleRecommendations
          article={article}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          pageLayoutType={pageLayoutType}
        />
      )}
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
)(ArticlePageLegalAdvice);
