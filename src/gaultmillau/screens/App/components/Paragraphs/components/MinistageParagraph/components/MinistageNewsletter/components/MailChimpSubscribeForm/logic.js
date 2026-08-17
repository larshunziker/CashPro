/**
 * @file    mail chimp subscribe form
 * @author  Roman Zanettin
 * @date    2016-10-17
 *
 */

// TODO: remove istanbul ignore when logic and render files are moved to index file
// as we no longer do components like this
/* istanbul ignore file */

import withState from 'recompose/withState';
import isEmail from 'validator/lib/isEmail';

// ---------------------------------------------------------------------------------- //
// LOGIC
// ---------------------------------------------------------------------------------- //

/**
 * validate
 *
 * @desc perform form validation
 */
export const validate = (props, event) => {
  const isValid = isEmail(props.email);

  if (!isValid) {
    event.preventDefault();
    props.emailInputRef.focus();
  }

  props.setValidity(isValid);
  props.setSubmitted(isValid);
};

/**
 * do set email
 *
 * @desc  sets new value to local store and updates validation state if previous validation state was 'invalid'
 */
export const doUpdateEmail = (props, event) => {
  // if previous validation failed and current value is valid, update validity status immediatly
  if (!props.isValid && isEmail(event.target.value)) {
    props.setValidity(true);
  }

  props.setEmail(event.target.value);
};

// ---------------------------------------------------------------------------------- //
// HOCS
// ---------------------------------------------------------------------------------- //

export const withEmailState = withState('email', 'setEmail', '');

export const withIsValidState = withState('isValid', 'setValidity', true);

export const withIsSubmittedlState = withState(
  'isSubmitted',
  'setSubmitted',
  false,
);

export const withEmailInputRefState = withState(
  'emailInputRef',
  'setEmailInputRef',
  null,
);
