/* istanbul ignore file */

import sectionPagerFactory from '../../../../../../../common/components/Pager/components/SectionPager/factory';
import styles from './styles.legacy.css';

export default sectionPagerFactory({
  styles: {
    Wrapper: styles.Wrapper,
    WrapperRight: styles.WrapperRight,
    Title: styles.Title,
    ItemWrapper: styles.ItemWrapper,
    ItemWrapperIsActive: styles.ItemWrapperIsActive,
    Link: styles.Link,
    LinkIsActive: styles.LinkIsActive,
    ItemTitle: styles.ItemTitle,
    ItemText: styles.ItemText,
    ItemTitleIsActive: styles.ItemTitleIsActive,
    ItemTextIsActive: styles.ItemTextIsActive,
    SectionPagerItem: styles.SectionPagerItem,
  },
});
