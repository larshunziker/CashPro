import React, { ComponentType, ReactElement, SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import { compose, shouldUpdate, withHandlers, withState } from 'recompose';
import classNames from 'classnames';
import { noop } from '../../../../../shared/helpers/utils';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import {
  COMMENTS_ANCHOR_ID,
  COMMENT_SIZE,
  TRACKING_COMMENT_TYPE,
} from '../../../../../shared/constants/comments';
import grid from '../../../../assets/styles/grid.legacy.css';
import type {
  CommentFormComponent,
  CommentFormFactoryOptions,
  CommentFormProps,
} from './typings';
type CommentFormPropsInner = CommentFormProps & {
  isSuccess: boolean;
  setSuccess: Function;
  isValidated: boolean;
  setValidated: Function;
  isPristine: boolean;
  setPristine: Function;
  values: {
    comment: string;
  };
  isError: boolean;
  setError: Function;
  setValues: Function;
  inputField: HTMLElement | null;
  setInputField: Function;
  setErrorMessage: Function;
  isLoading: boolean;
  setLoading: Function;
  validateField: Function;
  resetFormStates: (event: SyntheticEvent) => void;
  handleSubmit: (event: SyntheticEvent) => void;
  isAuthenticated: boolean;
  username: string;
  hasFullname: boolean;
};

const CommentFormFactory = ({
  CommentLoginForm,
  CommentSetUsernameForm,
  InputField,
  appSuccessMessage = 'Besten Dank für Ihren Kommentar. Wir werden ihn nach erfolgter Überprüfung freischalten.',
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '({ successMessage, } */
  appSuccessMessageBox: appSuccessMessageBox = noop,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '({ clickHandler, text, isLoading, } */
  Button: ButtonWithLoading = noop,
  styles,
  isFullnameRequired = false,
}: CommentFormFactoryOptions): CommentFormComponent => {
  const validateField =
    ({
      isError,
      values: { comment },
      setPristine,
      setValidated,
    }: CommentFormPropsInner) =>
    (): void => {
      const isValidComment = !!comment;
      setPristine(isValidComment);
      if (!isError) {
        setValidated(isValidComment);
      }
    };

  const extendWithHandlers = withHandlers({
    validateField,
    resetFormStates:
      ({ setSuccess, setValidated, setValues }: CommentFormPropsInner) =>
      (event: SyntheticEvent): void => {
        event.preventDefault();

        setValidated(true);
        setSuccess(false);
        setValues({ comment: '' });
      },
    handleSubmit:
      ({
        mutate,
        articleId: parentEntityId,
        commentId: parentCommentId = '',
        gcid,
        type = TRACKING_COMMENT_TYPE,
        setErrorMessage,
        setError,
        isPristine,
        setPristine,
        inputField,
        isValidated,
        setValidated,
        setSuccess,
        setLoading,
        values: { comment: body },
      }: CommentFormPropsInner) =>
      (event: SyntheticEvent): void => {
        event.preventDefault();
        setLoading(true);

        if (isValidated && isPristine) {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          mutate({
            variables: {
              body,
              parentEntityId,
              parentCommentId,
            },
          })
            .then((): void => {
              setSuccess(true);
              setPristine(true);
              setLoading(false);
            })
            .catch((error: Error): void => {
              setSuccess(false);
              setPristine(false);
              setLoading(false);

              // Validate textarea if error occurs
              setError(error);
              setErrorMessage(
                'Leider konnten wir Ihren Kommentar nicht speichern. Bitte versuchen Sie es erneut.',
              );
              setValidated(false);

              return;
            });

          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'comment_submit',
              event_category: 'comment',
              event_action: 'submit',
              event_label: gcid,
              comment_type: type,
            },
          });
        } else {
          setError(false);
          setSuccess(false);
          setPristine(false);
          setLoading(false);
          setErrorMessage('Erfassen Sie bitte einen Kommentar');

          // Focus back to the input field because of no valid value
          if (inputField) {
            inputField.focus();
          }
        }
      },
  });

  const updatePolicy: Function = shouldUpdate<any>(
    (props: CommentFormPropsInner, nextProps: CommentFormPropsInner): boolean =>
      props.isPristine !== nextProps.isPristine ||
      props.isValidated !== nextProps.isValidated ||
      props.isLoading !== nextProps.isLoading ||
      props.isSuccess !== nextProps.isSuccess ||
      props.isAuthenticated !== nextProps.isAuthenticated,
  );

  const withFormProps: Function = (Component: ComponentType<any>): Function =>
    compose<any, any>(
      withState<Record<string, any>, any, any, string>(
        'inputField',
        'setInputField',
        null,
      ),
      withState<Record<string, any>, any, string, string>(
        'errorMessage',
        'setErrorMessage',
        '',
      ),
      withState<Record<string, any>, boolean, string, string>(
        'isError',
        'setError',
        false,
      ),
      withState<Record<string, any>, Record<string, any>, string, string>(
        'values',
        'setValues',
        { comment: '' },
      ),
      withState<Record<string, any>, boolean, string, string>(
        'isSuccess',
        'setSuccess',
        false,
      ),
      withState<Record<string, any>, boolean, string, string>(
        'isPristine',
        'setPristine',
        true,
      ),
      withState<Record<string, any>, boolean, string, string>(
        'isValidated',
        'setValidated',
        false,
      ),
      withState<Record<string, any>, boolean, string, string>(
        'isLoading',
        'setLoading',
        false,
      ),
      extendWithHandlers,
      updatePolicy,
    )(Component);

  const CommentForm = ({
    buttonText = 'Kommentieren',
    errorMessage,
    resetFormStates,
    handleSubmit,
    isPristine,
    isValidated,
    isSuccess,
    loginMessage = 'Bitte melden Sie sich an, um zu diesem Artikel zu kommen­tieren.',
    placeholder = 'Schreiben Sie hier Ihren Kommentar ...',
    successMessage = appSuccessMessage,
    values,
    setValues,
    validateField,
    setInputField,
    isLoading,
    isAuthenticated,
    username,
    hasFullname,
  }: CommentFormPropsInner): ReactElement => {
    const button = (
      <ButtonWithLoading
        clickHandler={(isSuccess && resetFormStates) || handleSubmit}
        text={(isSuccess && 'Neuer Kommentar') || buttonText}
        isLoading={isLoading}
      />
    );

    const buttonJsx: ReactElement = button || (
      <button
        className={classNames(styles.Button, grid.HideForPrint)}
        onClick={(isSuccess && resetFormStates) || handleSubmit}
        role="link"
        disabled={isLoading}
      >
        {(isSuccess && 'Neuer Kommentar') || buttonText}
      </button>
    );

    const successBox = appSuccessMessageBox({
      successMessage: appSuccessMessage,
    });

    const successMessageJsx = successBox || (
      <p className={classNames(styles.SuccessMessage, grid.HideForPrint)}>
        {successMessage}
      </p>
    );

    return isAuthenticated ? (
      (!isFullnameRequired && username) ||
      (isFullnameRequired && hasFullname) ? (
        <TestFragment data-testid="commentform-comment-wrapper">
          <form noValidate action="">
            {isSuccess ? (
              <TestFragment data-testid="commentform-message-wrapper">
                {successMessageJsx}
                {buttonJsx}
              </TestFragment>
            ) : (
              <TestFragment data-testid="commentform-textarea-wrapper">
                <InputField
                  addFieldClass={styles.InputField}
                  addLabelClass={styles.Label}
                  addLabelAboveClass={styles.LabelAbove}
                  animated
                  errorMessage={errorMessage}
                  validate={validateField}
                  hasError={!(isValidated || isPristine)}
                  id="comment"
                  innerRef={setInputField}
                  placeholder={placeholder}
                  required
                  rows={COMMENT_SIZE}
                  type="textarea"
                  values={values}
                  setValues={setValues}
                />
                {buttonJsx}
              </TestFragment>
            )}
          </form>
        </TestFragment>
      ) : (
        <TestFragment data-testid="commentform-setusernameform-wrapper">
          <CommentSetUsernameForm />
        </TestFragment>
      )
    ) : (
      <TestFragment data-testid="commentform-loginform-wrapper">
        <CommentLoginForm
          message={loginMessage}
          anchorId={COMMENTS_ANCHOR_ID}
          isCommentForm={true}
        />
      </TestFragment>
    );
  };

  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
    username: authStateSelector(state).username,
    hasFullname:
      authStateSelector(state).givenName && authStateSelector(state).familyName,
  });

  return compose<any, any>(
    connect(mapStateToProps),
    withFormProps,
  )(CommentForm);
};

export default CommentFormFactory;
