import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import collapsableBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/factory';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Icon from '../../../../../Icon';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
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
  const isInInfobox = origin === INFO_BOX_TYPE;

  return {
    Wrapper: '',
    InnerWrapper: classNames(grid.Row, styles.InnerWrapper),
    Container: styles.Container,
    Title: styles.Title,
    Content: styles.Content,
    ToggleWrapper: styles.ToggleWrapper,
    ColStyle: classNames({
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
      arrowUpIconType: 'IconChevronUp',
      arrowDownIconType: 'IconChevronDown',
    },
    styles: getStylesByProps,
  }),
);
