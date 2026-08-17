/* istanbul ignore file */

import elementListFactory from '../../../../../../../common/components/TermsOverview/components/ElementList/factory';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

const ElementList = elementListFactory({
  Link,
  styles: {
    ListItem: styles.ListItem,
    Wrapper: styles.Wrapper,
    Link: styles.Link,
  },
});

export default ElementList;
