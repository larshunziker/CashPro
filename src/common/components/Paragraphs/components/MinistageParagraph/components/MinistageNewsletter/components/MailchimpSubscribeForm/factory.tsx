import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'validator/lib/isEmail'. '/Users/bhs/code/work/rasch-stack/node_modules/va */
import isEmail from 'validator/lib/isEmail';
import { useMutation } from '@apollo/client';
import {
  MailchimpSubscribeFormComponent,
  MailchimpSubscribeFormFactoryOptions,
  MailchimpSubscribeFormFactoryOptionsStyles,
  MailchimpSubscribeFormMessages,
  MailchimpSubscribeFormProps,
} from './typings';

const defaultMessages: MailchimpSubscribeFormMessages = {
  labelSubmission: 'Anmelden',
  inputInstruction: 'Ihre E-Mail-Adresse',
  successSubmission:
    'Vielen Dank! Um Ihre Newsletteranmeldung abzuschliessen, klicken Sie bitte auf den Bestätigungs-Link, welchen wir Ihnen per E-Mail gesendet haben.', // eslint-disable-line
  errorValidation: 'Bitte geben Sie eine gültige E-Mailadresse ein',
};

const defaultStyles: MailchimpSubscribeFormFactoryOptionsStyles = {
  Form: '',
  Row: '',
  InputWrapper: '',
  EmailWrapper: '',
  SuccessWrapper: '',
  SuccessTick: '',
  SuccessSubmission: '',
  ButtonWrapper: '',
  Button: '',
  ButtonActivated: '',
  ButtonDeactivated: '',
};

const MailchimpSubscribeFormFactory = ({
  InputField,
  Button,
  messages,
  mutationQuery,
  styles: appStyles,
}: MailchimpSubscribeFormFactoryOptions): MailchimpSubscribeFormComponent => {
  const MailchimpSubscribeForm = (
    props: MailchimpSubscribeFormProps,
  ): ReactElement => {
    const { ministageNewsletter } = props;
    const [values, setValues] = useState({ email: '' });
    const [isValid, setIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const inputRef = useRef(null);
    const [mutate] = useMutation(mutationQuery);

    const submitHandler = (event: SyntheticEvent) => {
      event.preventDefault();
      if (isValid) {
        mutate({
          variables: {
            action: 'addToList',
            email: values.email,
            listId: ministageNewsletter.mailchimpList || '',
            groupId: ministageNewsletter.mailchimpInterest || '',
            mailchimpAccountId: ministageNewsletter.mailchimpAccountId || '',
          },
        })
          .then((response) => {
            if (response.data.mailchimpListRequest) {
              setIsSubmitted(true);
            } else {
              setIsValid(false);
            }
            return;
          })
          .catch(() => {
            setIsSubmitted(false);
            return;
          });
      }
    };

    useEffect(() => {
      if (values?.email) {
        setIsValid(isEmail(values.email));
      }
    }, [values]);

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <form
        action=""
        method="post"
        // @ts-ignore
        rel="noopener noreferrer"
        target="_blank"
        onSubmit={submitHandler}
        noValidate
        className={styles.Form}
        data-testid="mailchimp-subscribe-form-form"
      >
        <div className={styles.Row}>
          {!isSubmitted ? (
            <div
              className={styles.InputWrapper}
              data-testid="mailchimp-subscribe-form-input-wrapper"
            >
              <InputField
                id="email"
                placeholder={
                  messages?.inputInstruction ||
                  defaultMessages?.inputInstruction
                }
                required
                validate={() => setIsValid(isEmail(values?.email || ''))}
                values={values.email}
                defaultValue={values.email}
                setValues={setValues}
                hasError={!isValid}
                errorMessage={
                  messages?.errorValidation || defaultMessages?.errorValidation
                }
                addClass={styles.EmailWrapper}
                type="email"
                innerRef={inputRef}
              />
            </div>
          ) : (
            <div
              className={styles.SuccessWrapper}
              data-testid="mailchimp-subscribe-form-success-wrapper"
            >
              <div className={styles.SuccessTick} />
              <div className={styles.SuccessSubmission}>
                {messages?.successSubmission ||
                  defaultMessages?.successSubmission}
              </div>
              <input type="hidden" name="EMAIL" value={values.email} />
            </div>
          )}
          {/* ROBOT DETECTION OF MAIL CHIMP  */}
          <div
            style={{ position: 'absolute', left: '-5000px' }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_473f4e993658c5bc9c5199135_1d31f5f40a"
              tabIndex={-1}
            />
          </div>
          {!isSubmitted && (
            <div
              className={styles.ButtonWrapper}
              data-testid="mailchimp-subscribe-form-button-wrapper"
            >
              {(Button && (
                <Button
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  mobileFullWidth
                  className={styles.Button}
                >
                  {messages?.labelSubmission ||
                    defaultMessages?.labelSubmission}
                </Button>
              )) || (
                <button
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={classNames(styles.Button, {
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles.ButtonDeactivated]: !values.email,
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles.ButtonActivated]: values.email,
                  })}
                >
                  {messages?.labelSubmission ||
                    defaultMessages?.labelSubmission}
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    );
  };
  return MailchimpSubscribeForm;
};

export default MailchimpSubscribeFormFactory;
