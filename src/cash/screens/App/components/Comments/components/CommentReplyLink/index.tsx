/* istanbul ignore file */

import commentReplyLinkFactory from '../../../../../../../common/components/Comments/components/CommentReplyLink/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

export default commentReplyLinkFactory({
  Icon: Icon,
  styles: {
    Icon: styles.Icon,
    IconChevronUp: styles.IconChevronUp,
    IconChevronUpActive: styles.IconChevronUpActive,
    Reply: styles.Reply,
  },
});
