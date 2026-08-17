/**
 * @file    mail chimp subscribe form
 * @author  Roman Zanettin
 * @date    2016-10-17
 *
 */

// TODO: remove istanbul ignore when logic and render files are moved to index file
// as we no longer do components like this
/* istanbul ignore file */

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import isEmail from 'validator/lib/isEmail';
import MailChimpSubscribeForm from './render';
import {
  doUpdateEmail,
  withEmailInputRefState,
  withEmailState,
  withIsSubmittedlState,
  withIsValidState,
} from './logic';

export { default as styles } from './styles.legacy.css';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

/**
 * validate
 *
 * @desc perform field validation
 */
const doValidate = (element, errors, setErrors) => {
  let validationPassed = true;

  if (element.required) {
    if (
      element.value === '' ||
      (element.type === 'select-one' && element.value === '0')
    ) {
      setErrors({ ...errors, [element.id]: true });
      validationPassed = false;
    } else {
      setErrors({ ...errors, [element.id]: false });
    }
  }

  if (element.type === 'number') {
    const zipCodeTester = /^[1-9][0-9]{3}$/;
    if (!zipCodeTester.test(element.value)) {
      setErrors({ ...errors, [element.id]: true });
      validationPassed = false;
    } else {
      setErrors({ ...errors, [element.id]: false });
    }
  }

  if (element.type === 'email') {
    if (!isEmail(element.value)) {
      setErrors({ ...errors, [element.id]: true });
      validationPassed = false;
    } else {
      setErrors({ ...errors, [element.id]: false });
    }
  }

  if (element.type === 'text' || element.type === 'select') {
    if (element.value === '') {
      setErrors({ ...errors, [element.id]: true });
      validationPassed = false;
    } else {
      setErrors({ ...errors, [element.id]: false });
    }
  }

  return validationPassed;
};

const withExtendedHandlers = withHandlers({
  storeEmailInputRef: (props) => (element) => props.setEmailInputRef(element),
  storeSalutationInputRef: (props) => (element) =>
    props.setSalutationInputRef(element),
  storeFirstNameInputRef: (props) => (element) =>
    props.setFirstNameInputRef(element),
  storeLastNameInputRef: (props) => (element) =>
    props.setLastNameInputRef(element),
  updateEmail: (props) => (event) => doUpdateEmail(props, event),
  doSubmit:
    ({
      mutate,
      setValidity,
      setSubmitted,
      errors,
      values,
      ministageNewsletter,
    }) =>
    (event) => {
      event.preventDefault();

      if (
        !errors.email &&
        !errors.salutation &&
        !errors.firstName &&
        !errors.lastName
      ) {
        mutate({
          variables: {
            action: 'addToList',
            email: values.email,
            salutation: values.salutation.value,
            firstName: values.firstName,
            lastName: values.lastName,
            listId: ministageNewsletter?.mailchimpList || '',
            groupId: ministageNewsletter?.mailchimpInterest || '',
            mailchimpAccountId: ministageNewsletter?.mailchimpAccountId || '',
            source: 'GM Ministage Plus',
          },
        })
          .then((response) => {
            if (response.data.mailchimpListRequest) {
              setSubmitted(true);
            } else {
              setValidity(false);
            }
            return;
          })
          .catch(() => {
            setSubmitted(false);
            return;
          });
      }
    },
  doValidate: (props) => (elementValue) =>
    doValidate(elementValue, props.errors, props.setErrors),
});

export default compose(
  withState('errors', 'setErrors', {}),
  withState('values', 'setValues', {}),
  withState('salutationInputRef', 'setSalutationInputRef', null),
  withState('firstNameInputRef', 'setFirstNameInputRef', null),
  withState('lastNameInputRef', 'setLastNameInputRef', null),
  withEmailState,
  withIsValidState,
  withIsSubmittedlState,
  withEmailInputRefState,
  withExtendedHandlers,
)(MailChimpSubscribeForm);
