/* istanbul ignore file */

import blockquoteParagraphFactory from '../../../../../../../common/components/Paragraphs/components/BlockquoteParagraph/factory';
import styles from './styles.legacy.css';

const BlockquoteParagraph = blockquoteParagraphFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Quote: styles.Quote,
    QuoteAuthor: styles.QuoteAuthor,
  },
});

export default BlockquoteParagraph;
