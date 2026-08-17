import React, { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'validator/lib/isEmail'. '/Users/bhs/code/work/rasch-stack/node_modules/va */
import isEmail from 'validator/lib/isEmail';
import ButtonWithLoading from '../../../../../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import type {
  MailChimpSubscribeFormComponent,
  MailChimpSubscribeFormProps,
} from './typings';

type MailChimpSubscribeFormPropsInner = MailChimpSubscribeFormProps;

const submitAction = 'addToList';

const MailChimpSubscribeForm: MailChimpSubscribeFormComponent = ({
  ministageNewsletter,
  mutate,
}: MailChimpSubscribeFormPropsInner): ReactElement => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null);

  const emailChangeHandler = (event: Record<string, any>) => {
    // if previous validation failed and current value is valid, update validity status immediatly
    if (!isValid && isEmail(event.target.value)) {
      setIsValid(true);
    }

    setEmail(event.target.value);
  };

  const validateInputOnBlur = () => setIsValid(isEmail(email));

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const submitHandler = (event) => {
    event.preventDefault();
    /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
    inputRef.current?.focus?.();

    const isValid = isEmail(email);

    if (!isValid) {
      setIsSubmitted(false);
    } else {
      /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
      inputRef.current?.focus?.();

      mutate({
        variables: {
          action: submitAction,
          email: email,
          groupId: ministageNewsletter.mailchimpInterest || '',
          listId: ministageNewsletter.mailchimpList || '',
          mailchimpAccountId: ministageNewsletter.mailchimpAccountId || '',
        },
      })
        .then((response: Record<string, any>) => {
          if (
            response &&
            response.data &&
            !!response.data.mailchimpListRequest
          ) {
            setIsSubmitted(true);
          } else {
            setIsSubmitted(false);
          }
        })
        .catch(() => {
          setIsSubmitted(false);
        });
    }
    setIsValid(isValid);
  };

  let buttonText = 'Jetzt Newsletter abonnieren';
  if (isValid && isSubmitted) {
    buttonText = 'Newsletter abonniert';
  }
  if (!isValid && !email) {
    buttonText = 'Bitte Eingabe überprüfen';
  }
  if (!isValid) {
    buttonText = 'Adresse nicht korrekt';
  }

  let errorMessge = '';
  if (!isValid && !email) {
    errorMessge = 'Bitte geben Sie eine E-Mail Adresse an';
  }
  if (!isValid) {
    errorMessge = 'Bitte überprüfen Sie Ihre Eingabe';
  }

  return (
    <form
      action=""
      method="post"
      target="_blank"
      onSubmit={submitHandler}
      noValidate
      className={styles.Form}
    >
      {!isSubmitted ? (
        <div>
          <input
            className={classNames(styles.Input, {
              [styles.InputError]: !isValid,
            })}
            type="email"
            name="EMAIL"
            value={email}
            placeholder="Email-Adresse"
            ref={inputRef}
            onChange={(event) => emailChangeHandler(event)}
            onBlur={validateInputOnBlur}
            aria-label="E-Mail"
          />
          <span
            className={classNames(styles.ErrorMessage, {
              [styles.ShowErrorMessage]: !isValid,
            })}
          >
            {errorMessge}
          </span>
        </div>
      ) : (
        <span className={styles.SuccessMessage}>
          Vielen Dank! Um Ihre Newsletteranmeldung abzuschliessen,&nbsp; klicken
          Sie bitte auf den Bestätigungs-Link, welchen wir Ihnen per E-Mail
          gesendet haben.
        </span>
      )}

      {/* ROBOT DETECTION OF MAIL CHIMP  */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input
          type="text"
          name="b_473f4e993658c5bc9c5199135_1d31f5f40a"
          tabIndex={-1}
        />
      </div>

      <div className={styles.ButtonWrapper}>
        <ButtonWithLoading
          type="submit"
          addClass={classNames(
            styles.Button,
            { [styles.ShakeButton]: !isValid },
            { [styles.ButtonGreen]: isSubmitted },
          )}
          highAttention={!isValid}
        >
          <span className={styles.ButtonLabel}>{buttonText}</span>
        </ButtonWithLoading>
      </div>
    </form>
  );
};

export default MailChimpSubscribeForm;
