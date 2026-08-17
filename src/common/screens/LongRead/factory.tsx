import React, { Component, ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import { enrichArticleBodyWithADs } from '../../../shared/helpers/ads';
import TestFragment from '../../../shared/tests/components/TestFragment';
import { LONG_READ_ARTICLE_PAGE_TYPE } from '../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../shared/constants/paragraphs';
import grid from '../../assets/styles/grid.legacy.css';
import { LongReadFactoryOptions, LongReadProps } from './typings';

export type LongReadFactoryPropsInner = LongReadProps;

export const ANCHOR_SCROLL_ID = 'page';

const LongReadFactory = ({
  ArticleFooter,
  ProgressBar,
  gridLayout,
  getHelmetMetaLink,
  Helmet,
  EditButtons,
  LongReadHeader,
  StatusPage,
  Pager,
  topPagerType,
  bottomPagerType,
  Paragraphs,
  RelatedContent,
  styles,
  articleColStyle,
  pagerColStyle,
}: LongReadFactoryOptions): ComponentType<any> => {
  class LongRead extends Component<LongReadFactoryPropsInner> {
    constructor(props: LongReadFactoryPropsInner) {
      super(props);
    }

    render(): ReactElement {
      // minus one at the end for proper pagination (first page has no ?page=0, second page starts with ?page=2)
      const sectionIndex = this.props.page === 0 ? 0 : this.props.page - 1;

      const { node: longReadArticle } = this.props;

      // we only need the sectionParagraphs
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>[] | null' is not assignable to type 'SectionParagraph[] | null'. */
      const sectionParagraphsOnly: Array<SectionParagraph> | null =
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        (longReadArticle.body?.length > 0 &&
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          longReadArticle.body.filter(
            (
              item: any, // TODO: type correct with ParagraphInterface when it's typed
            ): boolean => item.__typename === SECTION_PARAGRAPH,
          )) ||
        null;

      const hasMoreThanOneSection: boolean =
        (sectionParagraphsOnly?.length || 0) > 1;

      if (
        sectionParagraphsOnly &&
        sectionParagraphsOnly.length > 0 &&
        !sectionParagraphsOnly[sectionIndex]
      ) {
        return (
          <TestFragment data-testid="longread-notfound-wrapper">
            <StatusPage />
          </TestFragment>
        );
      }

      // Like described in HZ-543 this is a temporary solution till we have the extended related content section
      const keywords = [
        ...(longReadArticle.keywords?.edges || []),
        ...(longReadArticle.relatedPersons?.edges, []),
        ...(longReadArticle.relatedOrganizations?.edges || []),
      ];

      // only show the article footer on the last page
      const isArticleFooterVisible: boolean =
        sectionParagraphsOnly?.length === this.props.page || false;

      const bodyId = `article-body-${longReadArticle.nid}`;

      return (
        <div
          className={`long-read-detail-${longReadArticle.__typename} ${styles.Wrapper}`}
          data-testid="longread-wrapper"
          id={bodyId}
        >
          {ProgressBar && <ProgressBar trackingElementId={bodyId} />}

          {EditButtons && (
            <EditButtons
              editContentUri={longReadArticle.editContentUri}
              editRelationUri={longReadArticle.editRelationUri}
            />
          )}

          <Helmet
            link={
              getHelmetMetaLink &&
              getHelmetMetaLink(
                this.props.location,
                sectionParagraphsOnly?.length,
                this.props.page,
                this.props?.node?.ampUrl,
              )
            }
          />
          <LongReadHeader node={longReadArticle} page={this.props.page} />
          {hasMoreThanOneSection && (
            <div
              className={classNames(
                grid.Container,
                styles.Wrapper,
                styles.FirstSectionPager,
              )}
              data-testid="longread-pager-wrapper"
            >
              <Pager
                component={topPagerType}
                sectionParagraphs={sectionParagraphsOnly}
                currentIndex={this.props.page}
                isRight
                anchorScrollId={ANCHOR_SCROLL_ID}
              />
            </div>
          )}
          {sectionParagraphsOnly &&
            sectionParagraphsOnly[sectionIndex] &&
            sectionParagraphsOnly[sectionIndex].body && (
              <div
                className={styles.ParagraphWrapper}
                data-testid="longread-paragraphs-wrapper"
              >
                <Paragraphs
                  pageBody={enrichArticleBodyWithADs({
                    pageBody: sectionParagraphsOnly[sectionIndex].body,
                  })}
                  colStyle={articleColStyle}
                  contentGcid={longReadArticle.gcid}
                  origin={LONG_READ_ARTICLE_PAGE_TYPE}
                  showCap
                  addClass={styles.TextParagraphHeader}
                />
              </div>
            )}
          {hasMoreThanOneSection && (
            <div
              className={classNames(styles.Section, styles.SectionGreyLongread)}
              data-testid="longread-pager-2-wrapper"
            >
              <div className={grid.Container}>
                <div className={grid.Row}>
                  <div className={pagerColStyle}>
                    <Pager
                      component={bottomPagerType}
                      sectionParagraphs={sectionParagraphsOnly}
                      currentIndex={this.props.page}
                      anchorScrollId={ANCHOR_SCROLL_ID}
                      itemsCount={sectionParagraphsOnly?.length || 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {ArticleFooter && keywords.length > 0 && (
            <div
              className={styles.Section}
              data-testid="longread-footer-wrapper"
            >
              <div className={grid.Container}>
                <ArticleFooter items={keywords} isLongRead />
              </div>
            </div>
          )}

          {isArticleFooterVisible &&
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            longReadArticle?.channel?.articles?.edges?.length > 0 &&
            RelatedContent && (
              <TestFragment data-testid="longread-channelarticles-wrapper">
                <RelatedContent
                  teaserGridLayout={gridLayout || null}
                  title={`Das Beste aus ${
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    longReadArticle.channel.title || 'dieser Kategorie'
                  }`}
                  gridOptionType="dotted"
                  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                  relatedContent={longReadArticle.channel.articles}
                  outerWrapperClass="widget-2"
                />
              </TestFragment>
            )}
        </div>
      );
    }
  }

  return LongRead;
};

export default LongReadFactory;
