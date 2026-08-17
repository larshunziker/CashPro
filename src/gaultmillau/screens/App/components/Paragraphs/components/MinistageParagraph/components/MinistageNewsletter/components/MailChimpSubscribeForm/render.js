/**
 * @file    mail chimp subscribe form
 * @author  Roman Zanettin
 * @author  Thomas Rubattel
 * @date    2017-03-17
 *
 */

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import InputField from 'InputField';
import SelectField from 'SelectField';
import { styles } from 'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MailChimpSubscribeForm';

const msgs = defineMessages({
  labelSubmission: {
    id: 'ministage.newsletter.submission.label',
    description: 'The default label for newsletter submission',
    defaultMessage: 'Abonnieren',
  },
  inputInstructionsEmail: {
    id: 'ministage.newsletter.input.instructionsemail',
    description: 'The default text for input email instructions',
    defaultMessage: 'Bitte geben Sie ihre E-Mail Adresse an.',
  },
  inputInstructionsFirstname: {
    id: 'ministage.newsletter.input.instructionsfirstname',
    description: 'The default text for input firstname instructions',
    defaultMessage: 'Vorname',
  },
  inputInstructionsLastname: {
    id: 'ministage.newsletter.input.instructionslastname',
    description: 'The default text for input lastname instructions',
    defaultMessage: 'Nachname',
  },
  inputInstructionsSalutation: {
    id: 'ministage.newsletter.input.instructionssalutation',
    description: 'The default text for input salutation instructions',
    defaultMessage: 'Anrede',
  },
  submissionFeedback: {
    id: 'ministage.newsletter.submission.feedback',
    description: 'The default text for feedback after submission',
    defaultMessage:
      'Vielen Dank! Um Ihre Newsletteranmeldung abzuschliessen, klicken Sie bitte auf den Bestätigungs-Link, welchen wir Ihnen per E-Mail gesendet haben.', // eslint-disable-line
  },
  errorFeedback: {
    id: 'ministage.newsletter.submission.errorFeedback',
    description: 'The error text for feedback after submission',
    defaultMessage: 'Unbekannter Fehler aufgetreten!',
  },
  salutationMale: {
    id: 'ministage.newsletter.salutationmale',
    description: 'The default text for male salutation',
    defaultMessage: 'Geniesser',
  },
  salutationFemale: {
    id: 'ministage.newsletter.salutationfemale',
    description: 'The default text for female salutation',
    defaultMessage: 'Geniesserin',
  },
});

const splitFeedbackMessage = (i18nFeedback) => {
  const feedbackMessages = i18nFeedback.split(' ');
  const middle = parseInt(feedbackMessages.length / 2, 10);
  return [
    feedbackMessages.slice(0, middle).join(' '),
    feedbackMessages.slice(middle).join(' '),
  ];
};

// ---------------------------------------------------------------------------------- //
// RENDER
// ---------------------------------------------------------------------------------- //

const MailChimpSubscribeForm = ({
  isSubmitted,
  isValid,
  doSubmit,
  doValidate,
  storeEmailInputRef,
  storeSalutationInputRef,
  storeFirstNameInputRef,
  storeLastNameInputRef,
  intl,
  errors,
  values,
  setValues,
}) => {
  const feedbackMessages = splitFeedbackMessage(
    intl.formatMessage(msgs.submissionFeedback),
  );
  const selectOptions = [
    {
      content: intl.formatMessage(msgs.salutationMale),
      value: 'Man',
    },
    {
      content: intl.formatMessage(msgs.salutationFemale),
      value: 'Woman',
    },
  ];

  return (
    <form
      method="post"
      rel="noopener noreferrer"
      target="_blank"
      onSubmit={doSubmit}
      noValidate
      className={styles.Form}
      data-testid="mailchimp-subscribe-form-form"
    >
      {!isSubmitted && isValid ? (
        <div
          className={styles.InputWrapper}
          data-testid="mailchimp-subscribe-form-input-wrapper"
        >
          <InputField
            id="email"
            placeholder={intl.formatMessage(msgs.inputInstructionsEmail)}
            required
            animated
            validate={doValidate}
            values={values}
            defaultValue={values.email}
            setValues={setValues}
            hasError={errors.email}
            errorMessage=""
            addClass={styles.Input}
            type="email"
            innerRef={storeEmailInputRef}
          />
          <div className={styles.InputWrapperLined}>
            <div className={styles.SelectFieldWrapper}>
              <SelectField
                id="salutation"
                options={selectOptions}
                values={values}
                hasError={errors.salutation}
                setValues={setValues}
                placeholder={intl.formatMessage(
                  msgs.inputInstructionsSalutation,
                )}
                innerRef={storeSalutationInputRef}
                addIconClass={styles.SelectIcon}
              />
            </div>
            <InputField
              id="firstName"
              placeholder={intl.formatMessage(msgs.inputInstructionsFirstname)}
              required
              animated
              validate={doValidate}
              values={values}
              defaultValue={values.firstName}
              setValues={setValues}
              hasError={errors.firstName}
              errorMessage={''}
              addClass={classNames(styles.Input, styles.InputWithSpaceAround)}
              type="text"
              innerRef={storeFirstNameInputRef}
            />
            <InputField
              id="lastName"
              placeholder={intl.formatMessage(msgs.inputInstructionsLastname)}
              required
              animated
              validate={doValidate}
              values={values}
              defaultValue={values.lastName}
              setValues={setValues}
              hasError={errors.lastName}
              errorMessage=""
              addClass={styles.Input}
              type="text"
              innerRef={storeLastNameInputRef}
            />
          </div>
        </div>
      ) : (
        isValid && (
          <>
            <div
              className={styles.SuccessMessage}
              data-testid="mailchimp-subscribe-form-success-wrapper"
            >
              <span>{feedbackMessages[0]}</span>
              <span>
                &nbsp;
                {feedbackMessages[1]}
              </span>
            </div>
            <input type="hidden" name="EMAIL" value={values.email} />
          </>
        )
      )}

      {/* ROBOT DETECTION OF MAIL CHIMP  */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input
          type="text"
          name="b_473f4e993658c5bc9c5199135_1d31f5f40a"
          tabIndex="-1"
          value="ministage"
          readOnly
        />
      </div>
      {(errors.email ||
        errors.salutation ||
        errors.firstName ||
        errors.lastName ||
        (!isSubmitted && isValid)) && (
        <div className={styles.ButtonWrapper}>
          <button
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            data-testid="mailchimp-subscribe-form-button-wrapper"
            className={classNames(styles.ActionLink, {
              [styles.Gray]:
                !values.email ||
                !values.salutation ||
                !values.firstName ||
                !values.lastName ||
                errors.email === true,
            })}
          >
            {intl.formatMessage(msgs.labelSubmission)}
          </button>
        </div>
      )}
      {!isValid && !isSubmitted && (
        <div className={styles.ErrorMessage}>
          <span>{intl.formatMessage(msgs.errorFeedback)}</span>
        </div>
      )}
    </form>
  );
};

const updatePolicy = shouldUpdate(
  (props, nextProps) => nextProps.values.email !== '',
);

export default compose(injectIntl, updatePolicy)(MailChimpSubscribeForm);
