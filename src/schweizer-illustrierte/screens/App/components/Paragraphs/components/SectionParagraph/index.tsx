import React, { Fragment, ReactElement } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Link from '../../../../../../../common/components/Link';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import ParagraphsRenderer from '../ParagraphsRenderer';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import { SectionParagraphProps } from './typings';

const SectionParagraph = ({
  paragraph,
  activeChannelTitle,
  origin,
  colStyle,
}: SectionParagraphProps): ReactElement | null => {
  const viewportLabel = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state).viewport.label,
  );

  if (!paragraph) {
    return null;
  }

  const isInsideLandingPage =
    origin === `SECTION_PARAGRAPH_${PAGE_SCREEN_MARKETING_TYPE}`;

  const scrollOffset = getScrollOffset(isInsideLandingPage, viewportLabel);

  const titleClass = classNames(styles.Title, {
    [styles.MarketingPage]: isInsideLandingPage,
  });

  return (
    <Fragment key={`section-paragraph-${paragraph?.id || paragraph?.title}`}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
      <SmoothScroll offset={scrollOffset} anchorId={paragraph?.title}>
        <section
          data-testid="explaining-article-section"
          className={styles.Wrapper}
        >
          {paragraph?.title && (
            <div data-testid="explaining-article-section-title-wrapper">
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
          )}
          <TestFragment data-testid="explaining-article-section-body">
            <ParagraphsRenderer
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

export default SectionParagraph;
