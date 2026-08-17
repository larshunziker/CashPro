import React, { useCallback, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import firstParagraphs from '../../../../../../../shared/helpers/firstParagraphs';
import getHeadingsFromParagraphs from '../../../../../../../shared/helpers/getHeadingsFromParagraphs';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import withScrollOnLoad from '../../../../../../../shared/decorators/withScrollOnLoad';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import PianoRestrictedDrawer from '../../../../components/PianoRestrictedDrawer';
import ProgressBar from '../../../../components/ProgressBar';
import ScrollToTop from '../../../../components/ScrollToTop';
import ArticleHeadGuide from '../../../Article/components/ArticleHead/components/ArticleHeadGuide';
import TableOfContents from '../TableOfContents';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { ANCHOR_TAG_SCROLL_TO_TOP } from '../../../../../../../common/components/SmoothScroll/constants';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  PIANO_CONTAINER_INLINED,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../../../../../shared/constants/piano';
import { PARAGRAPHS_FOR_FREE } from '../../../Article/constants';
import { MOBILE_ARTICLE_SCROLL_OFFSET } from '../TableOfContents/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
// eslint-disable-next-line
import styles from './styles.legacy.css';
import { ArticlePageProps } from '../../typings';

type ArticlePagePropsInner = Pick<ArticlePageProps, 'article'> & {
  shouldHideContent: boolean;
  isCrawler: boolean;
  isAccessGranted: boolean;
  viewportLabel?: string;
  noHeader?: boolean;
};

export const einleitungHeading = {
  anchorLink: ANCHOR_TAG_SCROLL_TO_TOP,
  text: 'Einleitung',
};

const ArticlePageGuide = ({
  article,
  shouldHideContent,
  isCrawler,
  viewportLabel,
  noHeader,
}: ArticlePagePropsInner) => {
  const getHeadings = useCallback(getHeadingsFromParagraphs, []);

  const isPaywallDrawerVisible = useSelector(
    (state: Record<string, any>) =>
      pianoStateSelector(state).isPaywallDrawerVisible,
  );

  const navigationHeadings = useMemo(() => {
    return [einleitungHeading, ...getHeadings(article.body)];
  }, [article, getHeadings]);

  if (!article || Object.keys(article).length === 0) {
    return null;
  }

  const isFirstSectionParagraph =
    // @ts-ignore
    article?.body?.[0]?.__typename === SECTION_PARAGRAPH;
  const paragraphsForFree =
    (isFirstSectionParagraph && PARAGRAPHS_FOR_FREE + 1) || PARAGRAPHS_FOR_FREE;

  const body =
    (shouldHideContent &&
      !isCrawler &&
      firstParagraphs(PARAGRAPHS_FOR_FREE, article.body)) ||
    article.body;

  const scrollOffset = getScrollOffset(false, viewportLabel, noHeader);

  const bodyId = `article-body-${article.nid}`;

  return (
    <div
      className="article-guide-detail"
      data-testid="articlepage-guide-wrapper"
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
      />
      <SmoothScroll offset={scrollOffset} anchorId={ANCHOR_TAG_SCROLL_TO_TOP} />
      {shouldHideContent && !isCrawler && isPaywallDrawerVisible && (
        <PianoRestrictedDrawer />
      )}
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColMd7,
              grid.ColXl6,
              grid.HiddenMdDown,
              grid.HideForPrint,
            )}
          >
            <TestFragment data-testid="table-of-contents-wrapper">
              <TableOfContents
                headings={navigationHeadings}
                shouldHideContent={shouldHideContent}
              />
            </TestFragment>
          </div>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColMd17,
              grid.ColXl16,
              grid.ColOffsetXl2,
            )}
          >
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColSm20,
                  grid.ColOffsetSm2,
                  grid.ColOffsetMd0,
                  grid.ColMd24,
                  grid.ColXl21,
                )}
              >
                <ArticleHeadGuide article={article} />
              </div>
              <div
                className={classNames(
                  grid.ColXs24,
                  styles.HiddenMdUp,
                  grid.HideForPrint,
                )}
              >
                <TestFragment data-testid="table-of-contents-wrapper">
                  <TableOfContents
                    shouldObserve={false}
                    headings={navigationHeadings}
                    shouldHideContent={shouldHideContent}
                    customScrollOffset={MOBILE_ARTICLE_SCROLL_OFFSET}
                  />
                </TestFragment>
              </div>
            </div>

            {(Array.isArray(body) && body.length > 0 && (
              <TestFragment data-testid="articlepage-paragraphs">
                <div className={grid.Row}>
                  <div className={classNames(grid.ColXs24)}>
                    <Paragraphs
                      colStyle={classNames(
                        grid.ColXs24,
                        grid.ColSm20,
                        grid.ColOffsetSm2,
                        grid.ColOffsetMd0,
                        grid.ColMd24,
                        grid.ColXl21,
                      )}
                      pageBody={body}
                      contentGcid={article.gcid}
                      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                      origin={article.subtypeValue}
                      paragraphsForFree={
                        (shouldHideContent && paragraphsForFree) || null
                      }
                      isAdSuppressed
                    />

                    {shouldHideContent && !isCrawler && (
                      <div
                        className={classNames(
                          styles.Paywall,
                          'paywall-wrapper-with-print-info',
                          {
                            [styles.HiddenPaywall]: !shouldHideContent,
                            [styles.IsSectionParagraph]:
                              isFirstSectionParagraph,
                          },
                        )}
                      >
                        <div className={grid.Row}>
                          <div className={grid.Col24}>
                            <div className={PIANO_PLACEHOLDER_INLINED}>
                              <SmoothScroll
                                offset={scrollOffset}
                                anchorId={PIANO_CONTAINER_INLINED}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TestFragment>
            )) ||
              null}
          </div>
        </div>
        <ScrollToTop pixelsScrolledToFadeInComponent={300} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  noHeader: headerStateSelector(state).noHeader,
});

export default compose<any, any>(
  connect(mapStateToProps),
  withScrollOnLoad({ offset: 120 }),
)(ArticlePageGuide);
