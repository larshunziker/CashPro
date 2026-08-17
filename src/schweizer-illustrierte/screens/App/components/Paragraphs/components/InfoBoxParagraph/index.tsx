import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import CollapsableBox from './components/CollapsableBox';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { InfoBoxParagraphProps } from './typings';

export type InfoBoxParagraphPropsInner = InfoBoxParagraphProps;

const InfoBoxParagraph = ({
  infoBoxParagraph,
  origin,
}: InfoBoxParagraphPropsInner): ReactElement => {
  if (
    !infoBoxParagraph ||
    !infoBoxParagraph.infoBox ||
    !infoBoxParagraph.infoBox.body ||
    !Array.isArray(infoBoxParagraph.infoBox.body) ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <TestFragment data-testid="infobox-container">
      <CollapsableBox
        infoBoxParagraph={infoBoxParagraph}
        origin={origin}
        articleColStyle={classNames(grid.ColXs22, grid.ColOffsetXs1)}
      />
    </TestFragment>
  );
};

const InfoBoxParagraphWrapper = (
  props: InfoBoxParagraphPropsInner,
): ReactElement => <InfoBoxParagraph {...props} />;

export default InfoBoxParagraphWrapper;
