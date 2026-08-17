/* istanbul ignore file */

import textParagraphTableFactory from '../../../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Table/factory';
import { getHeaderByProps, getStylesByProps } from '../../helpers';

const TextParagraphTable = textParagraphTableFactory({
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ origin, style, textParagraph } */
  header: getHeaderByProps,
});

export default TextParagraphTable;
