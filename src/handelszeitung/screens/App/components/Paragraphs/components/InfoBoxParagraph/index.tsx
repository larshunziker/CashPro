import React from 'react';
import classNames from 'classnames';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import CollapsableInfoBox from './components/CollapsableBox';
import LeftLineBox from './components/LeftLineBox';
import { INFO_BOX_STYLE_LEFT_LINE_BOX } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

const InfoBoxParagraph = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'infoBoxParagraph' implicitly has an 'any' type. */
  infoBoxParagraph,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'articleColStyle' implicitly has an 'any' type. */
  articleColStyle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isSplittedPageLayout' implicitly has an 'any' type. */
  isSplittedPageLayout,
}) => {
  if (
    !infoBoxParagraph.infoBox ||
    !infoBoxParagraph.infoBox.body ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    return null;
  }

  switch (infoBoxParagraph.infoBox.style) {
    case INFO_BOX_STYLE_LEFT_LINE_BOX:
      return (
        <LeftLineBox
          infoBoxParagraph={infoBoxParagraph}
          articleColStyle={
            articleColStyle ||
            classNames(
              grid.ColSm22,
              grid.ColMd17,
              grid.ColXl14,
              grid.ColOffsetSm1,
              grid.ColOffsetMd1,
              grid.ColOffsetXl5,
            )
          }
        />
      );
    default:
      return (
        <CollapsableInfoBox
          infoBoxParagraph={infoBoxParagraph}
          origin={origin}
          isSplittedPageLayout={isSplittedPageLayout}
          articleColStyle={classNames(grid.ColOffsetXs1, grid.ColXs22, {
            [mergeClasses([grid.ColMd16, grid.ColXl15])]: !isSplittedPageLayout,
          })}
        />
      );
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const InfoBoxParagraphWrapper = (props) => (
  <div
    className={classNames(
      TRACKING_CLASS_PARAGRAPH,
      TRACKING_CLASS_INFO_BOX_PARAGRAPH,
    )}
  >
    <InfoBoxParagraph {...props} />
  </div>
);

export default InfoBoxParagraphWrapper;
