import React, { ReactElement, SyntheticEvent } from 'react';

import { compose, withHandlers, withState } from 'recompose';
import classNames from 'classnames';
import { TRACKING_ANSWER_TYPE } from '../../../../../shared/constants/comments';
import grid from '../../../../assets/styles/grid.legacy.css';
import type {
  CommentReplyFormComponent,
  CommentReplyFormFactoryOptions,
  CommentReplyFormFactoryOptionsStyles,
  CommentReplyFormProps,
} from './typings';

type CommentReplyFormPropsInner = CommentReplyFormProps & {
  isFormVisible: boolean;
  setFormVisibility: (isFormVisible: boolean) => void;
  toggleFormVisibility: (event: SyntheticEvent) => void;
};

const CommentReplyFormFactory = ({
  CommentForm,
  CommentReplyLink,
  styles: appStyles,
  placeholder = 'Antworten Sie auf den Kommentar von %s',
  loginMessage = 'Bitte melden Sie sich an, um auf diesen Kommentar zu antworten.',
}: CommentReplyFormFactoryOptions): CommentReplyFormComponent => {
  const CommentReplyForm = (
    props: CommentReplyFormPropsInner,
  ): ReactElement => {
    const {
      articleId,
      gcid,
      commentId,
      isFormVisible,
      name,
      toggleFormVisibility,
      commentsData,
    }: CommentReplyFormPropsInner = props;

    const defaultStyles: CommentReplyFormFactoryOptionsStyles = {
      Form: '',
      FormWrapper: '',
    };

    const getStyles = (): CommentReplyFormFactoryOptionsStyles => {
      const styles: CommentReplyFormFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    const styles: CommentReplyFormFactoryOptionsStyles = getStyles();

    return (
      <div data-testid="commentreplyform-wrapper">
        <div data-testid="commentreplylink-wrapper">
          <CommentReplyLink
            name={name}
            onReplyButtonClick={toggleFormVisibility}
            isFormVisible={isFormVisible}
          />
        </div>
        <div
          data-testid="commentform-wrapper"
          className={classNames(styles.FormWrapper, grid.HideForPrint)}
        >
          <CommentForm
            articleId={articleId}
            gcid={gcid}
            type={TRACKING_ANSWER_TYPE}
            commentId={commentId}
            buttonText="Antworten"
            placeholder={placeholder.replace('%s', name)}
            loginMessage={loginMessage.replace('%s', name)}
            commentsData={commentsData}
          />
        </div>
      </div>
    );
  };

  const extendWithHandlers = withHandlers({
    toggleFormVisibility:
      ({ isFormVisible, setFormVisibility }: CommentReplyFormPropsInner) =>
      (event: Event): void => {
        event.preventDefault();
        setFormVisibility(!isFormVisible);
      },
  });

  return compose<any, any>(
    withState<Record<string, any>, boolean, string, string>(
      'isFormVisible',
      'setFormVisibility',
      false,
    ),
    extendWithHandlers,
  )(CommentReplyForm);
};

export default CommentReplyFormFactory;
