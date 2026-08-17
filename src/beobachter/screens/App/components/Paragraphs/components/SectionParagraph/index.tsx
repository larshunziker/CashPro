import React, { Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import Link from '../../../../../../../common/components/Link';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import { isInsideColumn } from '../../../../../../shared/helpers/isInsideColumn';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import ParagraphsRenderer from '../ParagraphsRenderer';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LONG_READ,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../screens/PageScreen/constants';
import { EXTENDED_EXPLAINING_ARTICLE_TITLES } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SectionParagraphProps } from './typings';

type SectionParagraphPropsInner = SectionParagraphProps & {
  viewportLabel?: string;
  noHeader?: boolean;
};

const getParagraphTitle = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
  origin,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'paragraphTitle' implicitly has an 'any' type. */
  paragraphTitle,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'articleTitle' implicitly has an 'any' type. */
  articleTitle,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'hasExtendedTitles' implicitly has an 'any' type. */
  hasExtendedTitles,
) => {
  if (
    origin === `${SECTION_PARAGRAPH}_${EXPLAINING_ARTICLE_CONTENT_TYPE}` &&
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ Definition */
    EXTENDED_EXPLAINING_ARTICLE_TITLES[paragraphTitle] &&
    hasExtendedTitles
  ) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ Definition */
    return `${EXTENDED_EXPLAINING_ARTICLE_TITLES[paragraphTitle]}${articleTitle}`;
  }
  return paragraphTitle;
};

const SectionParagraph = ({
  paragraph,
  index,
  origin,
  colStyle,
  articleTitle,
  hasExtendedTitles,
  viewportLabel,
  noHeader,
}: SectionParagraphPropsInner): ReactElement | null => {
  if (
    !paragraph ||
    !paragraph.body ||
    !Array.isArray(paragraph.body) ||
    (Array.isArray(paragraph.body) && paragraph.body.length === 0)
  ) {
    return null;
  }

  const isInsideLandingPage =
    origin.includes(LANDING_PAGE_TYPE) ||
    origin.includes(PAGE_SCREEN_MARKETING_TYPE);
  const scrollOffset = getScrollOffset(
    isInsideLandingPage,
    viewportLabel,
    noHeader,
  );

  const isInColumn = isInsideColumn(origin);

  const isLongRead =
    origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_LONG_READ}`;
  const isGuideArticle =
    origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_GUIDE}`;
  const isExplainingArticle =
    origin === `${SECTION_PARAGRAPH}_${EXPLAINING_ARTICLE_CONTENT_TYPE}`;
  const isMarketingPage =
    origin === `${SECTION_PARAGRAPH}_${PAGE_SCREEN_MARKETING_TYPE}`;

  const wrapperClass = classNames(styles.Wrapper, {
    [styles.MarketingPage]: isMarketingPage,
    [classNames(
      grid.ColOffsetSm2,
      grid.ColSm20,
      grid.ColOffsetMd4,
      grid.ColMd16,
    )]: isLongRead,
  });

  const titleClass = classNames(styles.Title, {
    [styles.MarketingPage]:
      origin === `${SECTION_PARAGRAPH}_${PAGE_SCREEN_MARKETING_TYPE}`,
  });

  const title = isGuideArticle ? (
    <h2 className={styles.GuideSectionTitle}>
      {paragraph.title}
      {(paragraph.link?.path && (
        <Icon addClass={styles.LinkIndicator} type="IconChevronRight" />
      )) ||
        null}
    </h2>
  ) : (
    <h3 className={titleClass} data-testid="onmeda-article-section-title">
      {getParagraphTitle(
        origin,
        paragraph.title,
        articleTitle,
        hasExtendedTitles,
      )}
      {(paragraph.link?.path && (
        <Icon addClass={styles.LinkIndicator} type="IconChevronRight" />
      )) ||
        null}
    </h3>
  );

  return (
    <Fragment
      key={`section-paragraph-${paragraph?.id || paragraph?.title || index}`}
    >
      <SmoothScroll
        offset={scrollOffset}
        /* @ts-ignore TODO: TS2322 ->  Type 'false | Maybe<string> | undefined' is not assignable to type 'string'. */
        anchorId={!isInColumn && paragraph.title}
      >
        <section data-testid="onmeda-article-section" className={wrapperClass}>
          {paragraph.title && (
            <div
              className={classNames({
                [grid.Container]: isExplainingArticle || isMarketingPage,
                [grid.ContainerInner]: isInColumn || isLongRead,
              })}
              data-testid="onmeda-article-section-title-wrapper"
            >
              {(paragraph?.link?.path && (
                <Link path={paragraph.link.path} className={styles.Link}>
                  {title}
                </Link>
              )) ||
                title}
            </div>
          )}
          <TestFragment data-testid="onmeda-article-section-body">
            <ParagraphsRenderer
              hasContainer={isExplainingArticle || isMarketingPage}
              pageBody={paragraph.body}
              origin={origin}
              colStyle={colStyle}
            />
          </TestFragment>
        </section>
      </SmoothScroll>
    </Fragment>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  noHeader: headerStateSelector(state).noHeader,
});

export default connect(mapStateToProps)(SectionParagraph);
