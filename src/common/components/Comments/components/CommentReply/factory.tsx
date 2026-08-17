import React, { ReactElement } from 'react';
import type {
  CommentReplyFactoryOptions,
  CommentReplyComponent,
} from './typings';
import type { CommentProps } from '../Comment/typings';

type CommentReplyPropsInner = CommentProps;

const CommentReplyFactory = ({
  CommentBody,
  styles,
}: CommentReplyFactoryOptions): CommentReplyComponent => {
  const CommentReply = ({
    name,
    createDate,
    body,
  }: CommentReplyPropsInner): ReactElement => (
    <div className={styles.Reply} data-testid="commentreply-wrapper">
      <div className={styles.Inner}>
        <CommentBody name={name} createDate={createDate} body={body} />
      </div>
    </div>
  );
  return CommentReply;
};

export default CommentReplyFactory;
