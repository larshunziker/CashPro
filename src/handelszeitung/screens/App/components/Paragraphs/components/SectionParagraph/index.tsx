import React, { Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import Link from '../../../../../../../common/components/Link';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import ParagraphsRenderer from '../ParagraphsRenderer';
import {
  ARTICLE_TYPE_NEWS,
  ARTICLE_TYPE_TICKER,
} from '../../../../../../../shared/constants/content';
import { LISTICLE_ITEM_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  PAGESCREEN_DEFAULT_TYPE,
  PAGESCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SectionParagraphProps } from './typings';

type SectionParagraphPropsInner = SectionParagraphProps & {
  viewportLabel?: string;
};

const SectionParagraph = ({
  paragraph,
  activeChannelTitle,
  origin,
  colStyle,
  viewportLabel,
  isSplittedPageLayout,
}: SectionParagraphPropsInner): ReactElement | null => {
  if (!paragraph) {
    return null;
  }

  const titleClass = classNames(styles.Title, {
    [styles.MarketingPage]:
      origin === `SECTION_PARAGRAPH_${PAGESCREEN_MARKETING_TYPE}`,
    [styles.BeforeListicle]:
      // @ts-ignore
      paragraph.body[0]?.__typename === LISTICLE_ITEM_PARAGRAPH,
  });

  const isInArticle =
    origin === `SECTION_PARAGRAPH_${ARTICLE_TYPE_NEWS}` ||
    origin === `SECTION_PARAGRAPH_${PAGESCREEN_DEFAULT_TYPE}` ||
    origin === `SECTION_PARAGRAPH_${ARTICLE_TYPE_TICKER}`;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const scrollOffset = getScrollOffset(viewportLabel);

  return (
    <Fragment key={`section-paragraph-${paragraph?.id || paragraph?.title}`}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
      <SmoothScroll anchorId={paragraph?.title} offset={scrollOffset}>
        <section data-testid="explaining-article-section">
          {paragraph?.title && (
            <div data-testid="explaining-article-section-title-wrapper">
              <div className={grid.Row}>
                <div className={colStyle}>
                  {(paragraph?.link?.path && (
                    <Link path={paragraph.link.path} className={styles.Link}>
                      <h3
                        className={titleClass}
                        data-testid="explaining-article-section-title"
                      >
                        {paragraph.title}
                        <Icon
                          addClass={styles.LinkIndicator}
                          type="IconChevronRight"
                        />
                      </h3>
                    </Link>
                  )) || (
                    <h3
                      className={titleClass}
                      data-testid="explaining-article-section-title"
                    >
                      {paragraph.title}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          )}
          <TestFragment data-testid="explaining-article-section-body">
            <ParagraphsRenderer
              hasContainer={isInArticle && !isSplittedPageLayout}
              showCap={false}
              pageBody={paragraph?.body || paragraph}
              origin={origin}
              activeChannel={activeChannelTitle || ''}
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
});

export default connect(mapStateToProps)(SectionParagraph);
