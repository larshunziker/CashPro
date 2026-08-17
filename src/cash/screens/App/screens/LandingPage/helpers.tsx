import { INFO_BOX_STYLE_WARNING } from '../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { INFOBOX_PARAGRAPH } from '../../../../../shared/constants/paragraphs';

export const isWarning = (pageBody: any): boolean => {
  if (
    pageBody &&
    pageBody[0].__typename === INFOBOX_PARAGRAPH &&
    pageBody[0].infoBox.style === INFO_BOX_STYLE_WARNING
  ) {
    return true;
  }
  return false;
};
