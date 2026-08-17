/* istanbul ignore file */
import linkBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/LinkBoxParagraph/factory';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

export default linkBoxParagraphFactory({
  styles: {
    Title: styles.Title,
    GroupWrapper: styles.GroupTitle,
    Link: styles.Link,
  },
  Link,
});
