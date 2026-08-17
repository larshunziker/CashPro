import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import collapsableBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/factory';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Icon from '../../../../../Icon';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
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
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

const getStylesByProps = ({
  origin,
}: InfoBoxParagraphPropsInner): CollapsableBoxFactoryOptionsStyles => {
  const isInLandingPage = origin === LANDING_PAGE_TYPE;
  const isInInfobox = origin === INFO_BOX_TYPE;

  return {
    Wrapper: classNames(
      TRACKING_CLASS_PARAGRAPH,
      TRACKING_CLASS_INFO_BOX_PARAGRAPH,
      {
        [grid.Container]: isInLandingPage,
      },
    ),
    InnerWrapper: classNames(grid.Row, styles.InnerWrapper),
    Container: styles.Container,
    Title: styles.Title,
    Content: styles.Content,
    ToggleWrapper: styles.ToggleWrapper,
    ColStyle: classNames({
      [classNames(grid.ColOffset1, grid.Col22)]: isInLandingPage,
      [grid.Col24]: isInInfobox,
    }),
  };
};

export default connect(mapStateToProps)(
  collapsableBoxParagraphFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph, } */
    paragraphsRenderer: getAppParagraphsRenderer,
    Icon,
    IconTypes: {
      arrowUpIconType: 'IconCollapse',
      arrowDownIconType: 'IconExpand',
    },
    styles: getStylesByProps,
  }),
);
