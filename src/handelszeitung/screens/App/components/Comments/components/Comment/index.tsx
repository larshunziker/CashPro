/* istanbul ignore file */

import commentFactory from '../../../../../../../common/components/Comments/components/Comment/factory';
import CommentBody from '../CommentBody';
import CommentReplies from '../CommentReplies';
import CommentReplyForm from '../CommentReplyForm';
import styles from './styles.legacy.css';

export default commentFactory({
  CommentBody,
  CommentReplies,
  CommentReplyForm,
  styles: {
    Comment: styles.Comment,
  },
});
