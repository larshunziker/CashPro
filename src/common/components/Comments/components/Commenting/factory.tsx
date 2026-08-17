import React, { ReactElement, SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import { compose, withHandlers, withState } from 'recompose';
import classNames from 'classnames';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import { Auth0 } from '../../../Auth0Provider';
import grid from '../../../../assets/styles/grid.legacy.css';
import type {
  CommentingComponent,
  CommentingFactoryOptions,
  CommentingFactoryOptionsStyles,
  CommentingProps,
} from './typings';

type CommentingPropsInner = CommentingProps & {
  isCommentingVisible: boolean;
  setCommentingVisible: (isCommentingVisible: boolean) => void;
  toggleCommentingVisibility: (event: SyntheticEvent<any>) => void;
  isAuthenticated: boolean;
};

const CommentingFactory = ({
  styles: appStyles,
  CommentForm,
  Icon,
  commentTitle = 'Ihr Kommentar',
  commentFormLabel = 'Schreiben Sie hier Ihren Kommentar ...',
  loginMessage = 'Bitte melden Sie sich an, um zu diesem Artikel zu kommen­tieren.',
}: CommentingFactoryOptions): CommentingComponent => {
  const Commenting = (props: CommentingPropsInner): ReactElement => {
    const {
      articleId,
      gcid,
      isCommentingVisible,
      toggleCommentingVisibility,
      commentsData,
      isAuthenticated,
    }: CommentingPropsInner = props;
    const defaultStyles: CommentingFactoryOptionsStyles = {
      Icon: '',
      IconChevronUpActive: '',
      Logout: '',
      Status: '',
      StatusWrapper: '',
      Title: '',
      Wrapper: '',
    };
    const getStyles = (): CommentingFactoryOptionsStyles => {
      const styles: CommentingFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };
    const styles: CommentingFactoryOptionsStyles = getStyles();

    return (
      <div
        className={classNames(styles.Wrapper, grid.HideForPrint)}
        data-testid="commenting-wrapper"
      >
        <button className={styles.Title} onClick={toggleCommentingVisibility}>
          <span>{commentTitle}</span>
          <Icon
            type="IconChevronDown"
            addClass={classNames(styles.Icon, {
              [styles.IconChevronUpActive]: isCommentingVisible,
            })}
          />
        </button>
        <div className={styles.StatusWrapper}>
          {isAuthenticated && (
            <div
              className={styles.Status}
              data-testid="commenting-logoutbutton-wrapper"
            >
              <button className={styles.Logout} onClick={Auth0.logout}>
                Abmelden
              </button>
            </div>
          )}
          <CommentForm
            articleId={articleId}
            gcid={gcid}
            commentsData={commentsData}
            loginMessage={loginMessage}
            placeholder={commentFormLabel}
          />
        </div>
      </div>
    );
  };

  const extendWithHandlers = withHandlers({
    toggleCommentingVisibility:
      ({ isCommentingVisible, setCommentingVisible }: CommentingPropsInner) =>
      (event: SyntheticEvent<any>): void => {
        event.preventDefault();
        setCommentingVisible(!isCommentingVisible);
      },
  });

  const mapStateToProps = (state: Record<string, any>): Record<string, any> => {
    const { isAuthenticated, username } = authStateSelector(state);
    return {
      isAuthenticated,
      username,
    };
  };

  return compose<any, any>(
    connect(mapStateToProps),
    withState<Record<string, any>, boolean, string, string>(
      'isCommentingVisible',
      'setCommentingVisible',
      true,
    ),
    extendWithHandlers,
  )(Commenting);
};

export default CommentingFactory;
