import React from 'react';
import classNames from 'classnames';
import CollapsableBox from './components/CollapsableBox';
import LeftLineBox from './components/LeftLineBox';
import WarningBoxParagraph from './components/WarningBox';
import {
  INFO_BOX_STYLE_LEFT_LINE_BOX,
  INFO_BOX_STYLE_WARNING,
} from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'infoBoxParagraph' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'articleColStyle' implicitly has an 'any' type. */
const InfoBoxParagraph = ({ infoBoxParagraph, articleColStyle, ...rest }) => {
  if (
    !infoBoxParagraph.infoBox ||
    !infoBoxParagraph.infoBox.body ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    return null;
  }

  switch (infoBoxParagraph.infoBox.style) {
    case INFO_BOX_STYLE_WARNING:
      return (
        <WarningBoxParagraph infoBoxParagraph={infoBoxParagraph} {...rest} />
      );
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
          {...rest}
        />
      );
    default:
      return (
        <CollapsableBox
          infoBoxParagraph={infoBoxParagraph}
          articleColStyle={classNames(grid.ColOffset1, grid.Col22)}
          {...rest}
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
