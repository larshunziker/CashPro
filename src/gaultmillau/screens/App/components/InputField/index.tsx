import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { FormFieldProps } from './typings';

type FormFieldPropsInner = FormFieldProps & {
  hasFocus: boolean;
  setHasFocus: (hasFocus: boolean) => void;
};
const TEXTAREA_DEFAULT_HEIGHT = 30;

const InputField = ({
  id,
  name,
  placeholder,
  addClass,
  addFieldClass,
  addLabelClass,
  addLabelAboveClass,
  setInputValue,
  required,
  type,
  hasFocus,
  setFocus,
  doValidate,
  animated,
  hasError,
  errorMessage,
  maxlength,
  rows = 1,
  innerRef,
}: FormFieldProps) => (
  <div className={classNames(styles.Wrapper, addClass)}>
    {animated && (
      <label
        className={classNames(
          styles.Label,
          {
            [styles.LabelAbove]: hasFocus || hasError,
            [addLabelAboveClass || '']:
              addLabelAboveClass && (hasFocus || hasError),
            [styles.TextareaLabel]: type === 'textarea',
            [styles.LabelVisible]: hasError && !hasFocus,
          },
          addLabelClass,
          {
            [styles.HasError]: hasError,
          },
        )}
        htmlFor={id}
        data-testid="input-field-animated-label"
      >
        {placeholder}
      </label>
    )}
    {type === 'textarea' && (
      <textarea
        id={id}
        name={name || id}
        ref={innerRef}
        className={classNames(styles.Textarea, addFieldClass, {
          [styles.HasError]: hasError,
        })}
        onBlur={doValidate}
        onChange={setInputValue}
        onFocus={setFocus}
        placeholder={!animated ? placeholder : ''}
        required={required || false}
        style={{ minHeight: TEXTAREA_DEFAULT_HEIGHT * rows }}
      />
    )}
    {type === 'checkbox' && (
      <input
        id={id}
        name={name || id}
        ref={innerRef}
        className={classNames(styles.ContactInput, addFieldClass, {
          [styles.HasError]: hasError,
        })}
        type={type || 'checkbox'}
        onChange={setInputValue}
        onFocus={setFocus}
        required={required || false}
      />
    )}
    {type !== 'textarea' && type !== 'checkbox' && (
      <input
        id={id}
        name={name || id}
        ref={innerRef}
        className={classNames(styles.ContactInput, addFieldClass, {
          [styles.HasError]: hasError,
        })}
        type={type || 'text'}
        placeholder={!animated ? placeholder : ''}
        onChange={setInputValue}
        onBlur={doValidate}
        onFocus={setFocus}
        required={required || false}
        maxLength={maxlength || 255}
      />
    )}
    {hasError && (
      <span
        className={styles.ErrorMessage}
        data-testid="input-field-error-message"
      >
        {errorMessage || placeholder}
      </span>
    )}
  </div>
);

const extendProps = withHandlers({
  setInputValue:
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */


      (props: any) =>
      /* @ts-ignore TODO: TS7031 ->  Binding element 'target' implicitly has an 'any' type. */
      ({ target }) => {
        if (target.type === 'textarea') {
          // Reset the height first, then set the height from recalculated scrollHeight directly
          // by reassigning the style.height. This way we don't need to re-render the whole component
          // twice (pattern stolen from react-toolbox!)
          target.style.height = 'auto'; // eslint-disable-line no-param-reassign
          target.style.height = `${target.scrollHeight}px`; // eslint-disable-line no-param-reassign
        }
        if (target.type === 'checkbox') {
          props.setValues({
            ...props.values,
            [props.id]: target.checked ? 'checked' : null,
          });
        } else {
          props.setValues({ ...props.values, [props.id]: target.value });
        }
      },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  doValidate: (props: FormFieldPropsInner) => (event) => {
    props.validate(event.target);
    props.setHasFocus(event.target.value !== '');
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  setFocus: (props) => () => props.setHasFocus(true),
});

export default compose<any, any>(
  withState('hasFocus', 'setHasFocus', false),
  extendProps,
)(InputField);
