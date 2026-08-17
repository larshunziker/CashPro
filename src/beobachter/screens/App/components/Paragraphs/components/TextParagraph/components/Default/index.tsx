import textParagraphDefaultFactory from '../../../../../../../../../common/components/Paragraphs/components/TextParagraph/components/Default/factory';
import { getHeaderByProps, getStylesByProps } from '../../helpers';

const TextParagraphDefault = textParagraphDefaultFactory({
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ origin, style, textParagraph } */
  header: getHeaderByProps,
});

export default TextParagraphDefault;
