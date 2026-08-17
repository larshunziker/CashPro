import React, { ReactElement, SyntheticEvent } from 'react';

import { compose, withHandlers, withState } from 'recompose';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/helpers/ensureCommentsInterface'. '/Users/bhs/code/ */
import ensureCommentsInterface from '../../../../../shared/helpers/ensureCommentsInterface';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import type { CommentProps } from '../../../Comments/components/Comment/typings';
import type {
  CommentRepliesComponent,
  CommentRepliesFactoryOptions,
  CommentRepliesFactoryOptionsStyles,
  CommentRepliesProps,
} from './typings';

type CommentRepliesPropsInner = CommentRepliesProps & {
  areRepliesVisible: boolean;
  setRepliesVisible: (areRepliesVisible: boolean) => void;
  toggleRepliesVisibility: (event: SyntheticEvent) => void;
};

const CommentRepliesFactory = ({
  styles: appStyles,
  Icon,
  CommentReply,
}: CommentRepliesFactoryOptions): CommentRepliesComponent => {
  const CommentReplies = (
    props: CommentRepliesPropsInner,
  ): ReactElement | null => {
    const {
      commentReplies,
      areRepliesVisible,
      toggleRepliesVisibility,
    }: CommentRepliesPropsInner = props;
    const defaultStyles: CommentRepliesFactoryOptionsStyles = {
      Icon: '',
      RepliesWrapper: '',
      Toggle: '',
      ToggleLink: '',
      Wrapper: '',
    };
    const getStyles = (): CommentRepliesFactoryOptionsStyles => {
      const styles: CommentRepliesFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };
    const styles: CommentRepliesFactoryOptionsStyles = getStyles();

    if (!commentReplies || commentReplies.length === 0) {
      return null;
    }

    return (
      <div className={styles.Wrapper} data-testid="commentreplies-wrapper">
        <div className={styles.Toggle}>
          <button
            className={styles.ToggleLink}
            onClick={toggleRepliesVisibility}
          >
            <span data-testid="commentreplies-button-text-wrapper">
              {`Antwort${commentReplies.length === 1 ? '' : 'en'}`}
              {areRepliesVisible ? ' ausblenden' : ' einblenden'}
            </span>
            <Icon
              type={areRepliesVisible ? 'IconChevronUp' : 'IconChevronDown'}
              addClass={styles.Icon}
            />
          </button>
        </div>
        <div
          className={styles.RepliesWrapper}
          data-testid="commentreplies-replies-wrapper"
        >
          {ensureCommentsInterface(commentReplies).map(
            ({ id, name, createDate, body }: CommentProps): ReactElement => (
              <TestFragment
                key={`comment-reply-testfragment-${id}`}
                data-testid="commentreplies-commentreply-wrapper"
              >
                <CommentReply
                  key={`comment-reply-${id}`}
                  name={name}
                  createDate={createDate}
                  body={body}
                />
              </TestFragment>
            ),
          )}
        </div>
      </div>
    );
  };

  const extendWithHandlers = withHandlers({
    toggleRepliesVisibility:
      ({ areRepliesVisible, setRepliesVisible }: CommentRepliesPropsInner) =>
      (event: SyntheticEvent): void => {
        event.preventDefault();
        setRepliesVisible(!areRepliesVisible);
      },
  });

  return compose<any, any>(
    withState<Record<string, any>, boolean, string, string>(
      'areRepliesVisible',
      'setRepliesVisible',
      true,
    ),
    extendWithHandlers,
  )(CommentReplies);
};

export default CommentRepliesFactory;
