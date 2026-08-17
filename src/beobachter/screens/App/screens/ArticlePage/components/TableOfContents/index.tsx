/* istanbul ignore file */

import TableOfContentsFactory from '../../../../../../../common/components/TableOfContents/factory';
import { ARTICLE_SCROLL_OFFSET } from './constants';
import styles from './styles.legacy.css';

const intersectionObserverOptions = {
  rootMargin: '0px',
  threshold: [0.2, 0.8],
};

const TableOfContents = TableOfContentsFactory({
  intersectionObserverOptions,
  scrollOffset: ARTICLE_SCROLL_OFFSET,
  styles: {
    Wrapper: styles.Wrapper,
    InnerWrapper: styles.InnerWrapper,
    Header: styles.Header,
    Link: styles.Link,
    SecondLevelListEl: styles.SecondLevelListEl,
    FirstLevelLink: styles.FirstLevelLink,
    ActiveLink: styles.ActiveLink,
    Divider: styles.Divider,
    HiddenMdUp: styles.HiddenMdUp,
  },
});

export default TableOfContents;
