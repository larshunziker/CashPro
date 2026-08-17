import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import collapsableBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/factory';
import { mergeClasses } from '../../../../../../../../../shared/helpers/mergeClasses';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Icon from '../../../../../Icon';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../../../../../common/screens/PageTemplate/constants';
import { LANDING_PAGE_TYPE } from '../../../../../../screens/LandingPage/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { CollapsableBoxFactoryOptionsStyles } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/typings';
import { InfoBoxParagraphProps } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';

type InfoBoxParagraphPropsInner = InfoBoxParagraphProps & {
  routeVertical: string;
};

const getAppParagraphsRenderer = ({
  infoBoxParagraph,
  isSplittedPageLayout,
}: InfoBoxParagraphProps) => {
  if (!infoBoxParagraph?.infoBox?.body) {
    return null;
  }

  return (
    <ParagraphsRenderer
      pageBody={infoBoxParagraph.infoBox.body}
      hasContainer={false}
      addSectionClass={styles.SectionMargin}
      origin={INFO_BOX_TYPE}
      pageLayoutType={
        (isSplittedPageLayout && RIGHT_COLUMN_PAGE_LAYOUT_TYPE) ||
        FULL_PAGE_LAYOUT_TYPE
      }
    />
  );
};

const getStylesByProps = ({
  isSplittedPageLayout,
  origin,
}: InfoBoxParagraphPropsInner): CollapsableBoxFactoryOptionsStyles => {
  const isInLandingPage = origin === LANDING_PAGE_TYPE;
  return {
    Wrapper: classNames({
      [grid.Container]: !isSplittedPageLayout,
    }),
    InnerWrapper: classNames(
      { [grid.Row]: !isSplittedPageLayout },
      styles.InnerWrapper,
    ),
    Container: styles.Container,
    Title: styles.Title,
    Content: styles.Content,
    ToggleWrapper: styles.ToggleWrapper,
    ColStyle: classNames({
      [mergeClasses([
        grid.ColOffsetXl2,
        grid.ColOffsetXs1,
        grid.ColXl20,
        grid.ColXs22,
      ])]: isSplittedPageLayout,
      [mergeClasses([grid.ColOffsetXs1, grid.ColXs22])]: isInLandingPage,
    }),
  };
};

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(
  collapsableBoxParagraphFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph, isSplittedPageLayout, } */
    paragraphsRenderer: getAppParagraphsRenderer,
    Icon,
    IconTypes: {
      arrowUpIconType: 'IconChevronUp',
      arrowDownIconType: 'IconChevronDown',
    },
    styles: getStylesByProps,
  }),
);
