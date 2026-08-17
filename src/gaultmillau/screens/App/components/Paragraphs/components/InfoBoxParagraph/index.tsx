import React from 'react';
import classNames from 'classnames';
import CollapsableInfoBox from './components/CollapsableInfoBox';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { InfoBoxParagraphProps } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';

export {
  INFO_BOX_STYLE_DEFAULT,
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_STYLE_GUIDER_PEARLS,
  INFO_BOX_STYLE_GUIDER_NOTES,
  INFO_BOX_STYLE_LEFT_LINE_BOX,
  INFO_BOX_TYPE,
} from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';

const InfoBoxParagraphComponent = (props: InfoBoxParagraphProps) => {
  const { infoBoxParagraph } = props;

  if (
    !infoBoxParagraph.infoBox ||
    !infoBoxParagraph.infoBox.body ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    return null;
  }

  return (
    <CollapsableInfoBox
      {...props}
      articleColStyle={classNames(
        grid.ColXs22,
        grid.ColSm18,
        grid.ColXl12,
        grid.ColOffset1,
        grid.ColOffsetSm3,
        grid.ColOffsetXl6,
      )}
    />
  );
};

export default InfoBoxParagraphComponent;
