/* istanbul ignore file */

import commentReplyFactory from '../../../../../../../common/components/Comments/components/CommentReply/factory';
import CommentBody from '../../../Comments/components/CommentBody';
import styles from './styles.legacy.css';

export default commentReplyFactory({
  CommentBody,
  styles: {
    Inner: styles.Inner,
    Reply: styles.Reply,
  },
});
