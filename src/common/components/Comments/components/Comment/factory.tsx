import React, { ReactElement } from 'react';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { COMMENT_STATUS_CLOSED } from '../../../../../shared/constants/comments';
import type {
  CommentFactoryOptions,
  CommentProps,
  CommentComponent,
} from './typings';

type CommentPropsInner = CommentProps;

const CommentFactory = ({
  styles,
  CommentBody,
  CommentReplies,
  CommentReplyForm,
}: CommentFactoryOptions): CommentComponent => {
  const Comment = ({
    id,
    articleId = '',
    gcid = '',
    name,
    createDate,
    body,
    commentReplies,
    commentStatus,
    commentsData,
  }: CommentPropsInner): ReactElement => (
    <div className={styles.Comment} data-testid="comment-wrapper">
      <CommentBody name={name} createDate={createDate} body={body} />
      {commentReplies?.edges &&
        Array.isArray(commentReplies?.edges) &&
        (commentReplies?.edges?.length || 0) > 0 && (
          <TestFragment data-testid="comment-commentreplies-wrapper">
            <CommentReplies commentReplies={commentReplies?.edges} />
          </TestFragment>
        )}
      {commentStatus !== COMMENT_STATUS_CLOSED && (
        <TestFragment data-testid="comment-commentreplyform-wrapper">
          <CommentReplyForm
            articleId={articleId}
            gcid={gcid}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            commentId={id}
            name={name}
            commentsData={commentsData}
          />
        </TestFragment>
      )}
    </div>
  );
  return Comment;
};

export default CommentFactory;
