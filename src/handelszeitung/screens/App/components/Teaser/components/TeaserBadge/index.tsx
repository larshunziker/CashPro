/* istanbul ignore file */

import badgeFactory from '../../../../../../../common/components/Badge/factory';
import styles from './styles.legacy.css';

const TeaserBadge = badgeFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Content: styles.Content,
  },
});

export default TeaserBadge;
