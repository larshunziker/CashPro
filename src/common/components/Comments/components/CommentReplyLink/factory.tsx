import React, { ReactElement } from 'react';
import classNames from 'classnames';
import grid from '../../../../assets/styles/grid.legacy.css';
import type {
  CommentReplyLinkFactoryOptions,
  CommentReplyLinkProps,
  CommentReplyLinkComponent,
} from './typings';

type CommentReplyLinkPropsInner = CommentReplyLinkProps;

const CommentReplyLinkFactory = ({
  Icon,
  styles,
}: CommentReplyLinkFactoryOptions): CommentReplyLinkComponent => {
  const CommentReplyLink = ({
    isFormVisible,
    name,
    onReplyButtonClick,
  }: CommentReplyLinkPropsInner): ReactElement => (
    <button
      className={classNames(styles.Reply, grid.HideForPrint)}
      onClick={onReplyButtonClick}
      data-testid="commentreplylink-wrapper"
    >
      <span>{name} antworten</span>
      <span className={styles.Icon}>
        <Icon
          type="IconChevronDown"
          addClass={
            isFormVisible ? styles.IconChevronUpActive : styles.IconChevronUp
          }
        />
      </span>
    </button>
  );
  return CommentReplyLink;
};

export default CommentReplyLinkFactory;
