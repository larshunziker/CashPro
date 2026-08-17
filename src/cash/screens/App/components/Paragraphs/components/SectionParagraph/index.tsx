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
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../../../../beobachter/screens/App/screens/PageScreen/constants';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import { SectionParagraphProps } from './typings';

type SectionParagraphPropsInner = SectionParagraphProps & {
  viewportLabel?: string;
};

const SectionParagraph = ({
  sectionParagraph,
  origin,
  colStyle,
  viewportLabel,
}: SectionParagraphPropsInner): ReactElement | null => {
  if (!sectionParagraph) {
    return null;
  }
  const titleClass = classNames(styles.Title, {
    [styles.MarketingPage]:
      origin === `${SECTION_PARAGRAPH}_${PAGESCREEN_MARKETING_TYPE}`,
  });

  const isInsideLandingPage =
    origin?.includes(LANDING_PAGE_TYPE) ||
    origin?.includes(PAGE_SCREEN_MARKETING_TYPE);
  const scrollOffset = getScrollOffset(isInsideLandingPage, viewportLabel);
  const isMarketingPage = origin?.includes(PAGE_SCREEN_MARKETING_TYPE);

  const infoboardParagraphIndex = sectionParagraph?.body?.findIndex(
    (item: any) =>
      item?.__typename === 'TeaserStageParagraph' &&
      item?.termReference?.label === 'Infoboard',
  );

  const newSectionParagraph = {
    ...sectionParagraph,
    body: sectionParagraph?.body?.map((item: any, index: number) => {
      if (index === infoboardParagraphIndex) {
        return {
          ...item,
          termReference: {
            ...item.termReference,
            preferredUri: null,
          },
        };
      }
      return item;
    }),
  };

  return (
    <Fragment
      key={`section-paragraph-${
        sectionParagraph?.id || sectionParagraph?.title
      }`}
    >
      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */}
      <SmoothScroll offset={scrollOffset} anchorId={sectionParagraph?.title}>
        <section data-testid="explaining-article-section">
          {sectionParagraph?.title &&
            (sectionParagraph?.link?.path ? (
              <Link path={sectionParagraph.link.path} className={styles.Link}>
                <h3 className={titleClass}>
                  {sectionParagraph.title}
                  <Icon
                    addClass={styles.LinkIndicator}
                    type="IconChevronRight"
                  />
                </h3>
              </Link>
            ) : (
              <h3 className={titleClass}>{sectionParagraph.title}</h3>
            ))}
          <TestFragment data-testid="section-paragraph-section-body">
            <ParagraphsRenderer
              pageBody={newSectionParagraph?.body || newSectionParagraph}
              origin={origin}
              colStyle={colStyle}
              hasContainer={isMarketingPage}
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
