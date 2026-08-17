import React, { memo, useState } from 'react';
import classNames from 'classnames';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { FormFieldProps } from './typings';

type FormFieldPropsInner = FormFieldProps & {
  options?: Array<FieldOption>;
};

const TEXTAREA_DEFAULT_HEIGHT = 30;

const InputField = ({
  id,
  name,
  placeholder,
  addClass = '',
  addFieldClass = '',
  addLabelClass = '',
  addLabelAboveClass = '',
  required,
  type,
  animated,
  hasError,
  errorMessage,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'number'. */
  maxlength = null,
  rows = 1,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'RefObject'. */
  innerRef = null,
  disabled = false,
  defaultValue,
  multi = false,
  validate,
  setValues,
  values,
  hasPattern = false,
}: FormFieldPropsInner) => {
  const [hasFocus, setHasFocus] = useState(false);
  const labelAbove =
    hasFocus || hasError || typeof defaultValue !== 'undefined';
  const isCommentForm = id === 'comment';

  const doValidate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    validate(event.target);
    setHasFocus(event.target.value !== '');
  };

  const setInputValue = ({ target }: React.ChangeEvent<any>) => {
    if (target.type === 'textarea') {
      // Reset the height first, then set the height from recalculated scrollHeight directly
      // by reassigning the style.height. This way we don't need to re-render the whole component
      // twice (pattern stolen from react-toolbox!)
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
    if (target.type === 'checkbox') {
      if (multi) {
        setValues({
          ...values,
          [target.name]: target.checked ? target.value : null,
        });
      } else {
        setValues({
          ...values,
          [id]: target.checked ? 'checked' : null,
        });
      }
    } else if (target.type === 'radio') {
      setValues({
        ...values,
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        [name]: target.checked ? target.value : null,
      });
    } else {
      setValues({ ...values, [id]: target.value });
    }
  };

  return (
    <div
      className={classNames(
        styles.Wrapper,
        { [addClass]: !!addClass },
        { [styles.CommentWrapper]: isCommentForm },
      )}
    >
      {animated && (
        <label
          className={classNames(styles.Label, addLabelClass, {
            [styles.LabelAbove]: labelAbove,
            [addLabelAboveClass || '']:
              addLabelAboveClass && (hasFocus || hasError),
            [styles.LabelInside]: !labelAbove,
            [styles.HasError]: hasError,
            [styles.TextareaLabel]: type === 'textarea',
          })}
          htmlFor={id}
          data-testid="input-field-animated-label"
        >
          {placeholder}
          {required && '*'}
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
          onBlur={(event) => doValidate(event)}
          onChange={(event) => setInputValue(event)}
          onFocus={() => setHasFocus(true)}
          placeholder={!animated ? placeholder : ''}
          required={required || false}
          style={{ minHeight: TEXTAREA_DEFAULT_HEIGHT * rows }}
          maxLength={maxlength}
          disabled={disabled}
        >
          {defaultValue}
        </textarea>
      )}
      {(type === 'radio' || type === 'checkbox') && (
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs4, grid.ColSm2)}>
            <input
              id={id}
              name={name || id}
              ref={innerRef}
              className={classNames(addFieldClass, {
                [styles.ContactInput]: type === 'checkbox',
                [styles.HasError]: hasError,
              })}
              type={type}
              onChange={(event) => setInputValue(event)}
              onFocus={() => setHasFocus(true)}
              required={required || false}
            />
          </div>
          <div className={classNames(grid.ColXs20, grid.ColSm22)}>
            <label
              className={classNames({ [addLabelClass]: !!addLabelClass })}
              htmlFor={id}
            >
              {placeholder || ''}
            </label>
          </div>
        </div>
      )}

      {type === 'hidden' && (
        <input
          id={id}
          name={name || id}
          ref={innerRef}
          type={type}
          disabled={disabled}
          value={defaultValue}
        />
      )}
      {type !== 'textarea' &&
        type !== 'hidden' &&
        type !== 'checkbox' &&
        type !== 'checkboxes' &&
        type !== 'radios' &&
        type !== 'radio' && (
          <input
            id={id}
            name={name || id}
            ref={innerRef}
            className={classNames(styles.ContactInput, addFieldClass, {
              [styles.HasError]: hasError,
            })}
            type={(type === 'textfield' && 'text') || type || 'text'}
            placeholder={!animated ? placeholder : ''}
            onChange={(event) => setInputValue(event)}
            onBlur={(event) => doValidate(event)}
            onFocus={() => setHasFocus(true)}
            required={required || false}
            maxLength={maxlength || 255}
            disabled={disabled}
            value={defaultValue || ''}
            pattern={(hasPattern || '').toString()}
          />
        )}
      {hasError && (
        <span
          className={classNames(styles.ErrorMessage, {
            [styles.CommentError]: isCommentForm,
          })}
          data-testid="input-field-error-message"
        >
          {errorMessage || placeholder}
        </span>
      )}
    </div>
  );
};

export default memo<FormFieldPropsInner>(InputField);
