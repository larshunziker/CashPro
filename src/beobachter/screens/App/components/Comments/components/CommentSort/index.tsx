/* istanbul ignore file */

import commentSortFactory from '../../../../../../../common/components/Comments/components/CommentSort/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

export default commentSortFactory({
  Icon: Icon,
  styles: {
    Action: styles.Action,
    Icon: styles.Icon,
    Sort: styles.Sort,
    Text: styles.Text,
  },
});
