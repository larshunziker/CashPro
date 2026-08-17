import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { CROSSWORD } from '../../../../../../../../shared/actions/route';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import leftLineBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/LeftLineBox/factory';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { InfoBoxParagraphProps } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';
import { LeftLineBoxFactoryOptionsStyles } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/LeftLineBox/typings';

type InfoBoxParagraphPropsInner = InfoBoxParagraphProps & {
  routeVertical: string;
};

const getAppParagraphsRenderer = ({
  infoBoxParagraph,
  routeVertical,
}: InfoBoxParagraphPropsInner) => {
  if (!infoBoxParagraph?.infoBox?.body) {
    return null;
  }
  return (
    <ParagraphsRenderer
      pageBody={infoBoxParagraph.infoBox.body}
      hasContainer={false}
      addClass={styles.Typography}
      addSectionClass={styles.SectionMargin}
      origin={routeVertical === CROSSWORD ? CROSSWORD : INFO_BOX_TYPE}
    />
  );
};

const getStylesByProps = ({
  origin,
}: InfoBoxParagraphPropsInner): LeftLineBoxFactoryOptionsStyles => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInColumn = isInsideColumn(origin);

  return {
    Wrapper: classNames({
      [grid.Container]: !isInColumn,
      [grid.ContainerInner]: isInColumn,
    }),
    InnerWrapper: classNames(grid.Row, styles.InnerWrapper),
    Devider: styles.Devider,
    ParagraphWrapper: styles.ParagraphWrapper,
    Border: styles.Border,
  };
};

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(
  leftLineBoxParagraphFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph, routeVertical, } */
    paragraphsRenderer: getAppParagraphsRenderer,
    styles: getStylesByProps,
  }),
);
