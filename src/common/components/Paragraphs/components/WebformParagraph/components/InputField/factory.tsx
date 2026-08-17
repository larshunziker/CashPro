import React, { Component, ReactElement } from 'react';
import Textarea from 'react-textarea-autosize';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'validator/lib/isEmail'. '/Users/bhs/code/work/rasch-stack/node_modules/va */
import isEmail from 'validator/lib/isEmail';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'validator/lib/isPostalCode'. '/Users/bhs/code/work/rasch-stack/node_modul */
import isPostalCode from 'validator/lib/isPostalCode';
import { safariVersion } from '../../../../../../../shared/helpers/deviceDetector';
import { InputFieldFactoryOptions, InputFieldProps } from './typings';

export type InputFieldState = {
  value: string;
  hasFocus: boolean;
  isDirty: boolean;
  isValid: boolean;
  customValidation: boolean;
  errorMessage?: ReactElement | string;
};

const InputFieldFactory = ({
  TextareaDefaultMinRows = 1,
  styles,
  commonStyles,
  locale = 'CH',
  appErrorMessage = 'Bitte ausfüllen oder korrigieren',
  minDateErrorMessage = 'Wählen Sie bitte ein späteres Datum',
  maxDateErrorMessage = 'Wählen Sie bitte ein früheres Datum',
  Icon,
  IconTypes,
}: InputFieldFactoryOptions) => {
  class InputField extends Component<InputFieldProps, InputFieldState> {
    constructor(props: InputFieldProps) {
      super(props);

      // define state
      this.state = {
        value: props.initialValue || '',
        hasFocus: false,
        isDirty: false,
        isValid: true,
        customValidation: false,
        errorMessage: props.errorMessage,
      };

      // register field functions on form
      if (typeof props.register === 'function') {
        props.register({
          validate: this.validate.bind(this),
          getValue: this.getValue.bind(this),
          setValue: this.setValue.bind(this),
          setIsValid: this.setIsValid.bind(this),
          getId: this.getId.bind(this),
        });
      }
    }

    // return field VALUE
    getValue() {
      return this.state.value;
    }

    // set new fieldValue
    /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
    setValue(value) {
      this.setState({ ...this.state, value: value, isDirty: true });
    }

    // set new fieldValue
    /* @ts-ignore TODO: TS7006 ->  Parameter 'isValid' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'errorMessage' implicitly has an 'any' type. */
    setIsValid(isValid, errorMessage) {
      this.setState({
        ...this.state,
        isValid: isValid,
        customValidation: true,
        errorMessage: errorMessage || this.state.errorMessage,
      });
    }

    // return field ID
    getId() {
      return this.props.id;
    }

    // run validation
    validate() {
      let isValid = !!this.state.value || !this.state.isDirty;

      if (this.props.type === 'email' && this.state.value) {
        isValid = isEmail(this.state.value);
      }

      if (
        (this.props.id.toLowerCase().includes('zipcode') ||
          this.props.id.toLowerCase().includes('plz')) &&
        !Boolean(this.props.skipValidation)
      ) {
        // `PostalCodeLocale` is not exported from @types/validator,
        // thus `locale` assertion to `any`
        isValid = isPostalCode(this.state.value, locale as any);
      }

      if (this.props.type === 'date') {
        const dateInputRegex = /\d{2,4}[.|-]\d{2}[.|-]\d{2,4}\b/;
        isValid =
          dateInputRegex.test(this.state.value) &&
          this.state.value.length === 10;

        if (this.props.dateMax && isValid) {
          const dateValue = new Date(this.state.value);
          dateValue.setHours(0, 0, 0, 0);
          const maxDateValue = getCalculatedDate(this.props.dateMax);
          maxDateValue.setHours(0, 0, 0, 0);

          isValid = dateValue <= maxDateValue;
          if (!isValid) {
            this.setState({ errorMessage: maxDateErrorMessage });
          }
        }
        if (this.props.dateMin && isValid) {
          const dateValue = new Date(this.state.value);
          dateValue.setHours(0, 0, 0, 0);
          const minDateValue = getCalculatedDate(this.props.dateMin);
          minDateValue.setHours(0, 0, 0, 0);

          isValid = dateValue >= minDateValue;
          if (!isValid) {
            this.setState({ errorMessage: minDateErrorMessage });
          }
        }
      }

      if (isValid && this.props.required && !this.state.value) {
        isValid = false;
      }

      if (
        this.props.pattern &&
        this.props.pattern !== 'false' &&
        this.state.value.length > 0
      ) {
        const patternTester = new RegExp(this.props.pattern, 'g');
        if (!patternTester.test(this.state.value)) {
          isValid = false;
        }
      }

      // update validation state
      if (this.state.isValid !== isValid) {
        this.setState({ isValid, customValidation: false });
      }
      // return boolean so the parent form is aware of the state of this field
      // and can block submit requests
      return isValid;
    }

    // set the hasFocus state so the label will be rendered above the field
    setFocus() {
      if (this.props.readonly) return;

      this.setState({
        hasFocus: true,
      });
    }

    // unset the hasFocus state so the label will be rendered above the field
    unsetFocus(event: React.FocusEvent<HTMLInputElement>) {
      this.setState(
        {
          hasFocus: false,
        },
        () => {
          this.validate();
          if (typeof this.props.handleBlur === 'function') {
            this.props.handleBlur(event.target.value);
          }
        },
      );
    }

    // update state and runs validation
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    handleUpdate(event) {
      const newValue: string =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value;

      // update state and call validation
      this.setState(
        {
          value: newValue,
          isDirty:
            (typeof this.props.initialValue !== 'undefined' &&
              this.props.initialValue !== newValue) ||
            !!this.state.isDirty,
        },
        () => {
          if (typeof this.props.handleChange === 'function') {
            this.props.handleChange(newValue);
          }
        },
      );
    }

    componentDidUpdate(prevProps: InputFieldProps, prevState: InputFieldState) {
      if (
        !this.state.customValidation &&
        prevState.errorMessage !== this.props.errorMessage
      ) {
        this.setState({ errorMessage: this.props.errorMessage });
      } else if (prevProps.required !== this.props.required) {
        this.validate();
      }
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
    blockScrollForInput = (e) => {
      e.target.blur();
      e.stopPropagation();

      setTimeout(() => {
        e.target.focus();
      }, 0);
    };

    render() {
      const { isValid, hasFocus, value } = this.state;
      const {
        addClass,
        animatedLabel,
        addLabelClass,
        id,
        label,
        required,
        disabled,
        type,
        maxlength,
        maxlengthMessage,
        readonly,
        rows,
        initialValue,
        description,
        dateMin,
        dateMax,
        hasError: appHasError = false,
        helperText,
        innerRef,
        inputmode,
        autocomplete,
      } = this.props;

      // no need to render hidden fields, they're handled on handleSubmit (webform component)
      if (type === 'hidden') {
        return null;
      }

      // make errors visible
      const hasError = appHasError || !isValid;

      const safariVersionData: Record<string, any> = safariVersion();
      // move the label above the input field in case of: field has focus, field has a value, initialValue is set
      const labelAbove =
        hasFocus || !!value || (type === 'date' && safariVersionData !== null);

      return (
        <div
          className={classNames(commonStyles.Wrapper, addClass, {
            [commonStyles.FieldWithHelperTextWrapper]: hasError || helperText,
            [styles.InputDateWrapper]: type === 'date',
            [styles.InputDateTransparentText]: !value && !labelAbove,
          })}
        >
          {type === 'textarea' && (
            <>
              <Textarea
                className={classNames(commonStyles.Textarea, {
                  [commonStyles.HasError]: hasError,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]: disabled || readonly,
                })}
                id={id}
                disabled={disabled}
                readOnly={readonly}
                maxLength={maxlength}
                name={id}
                onBlur={this.unsetFocus.bind(this)}
                onChange={this.handleUpdate.bind(this)} // real-time validation
                onFocus={this.setFocus.bind(this)}
                placeholder={!animatedLabel ? label : ''}
                minRows={rows || TextareaDefaultMinRows}
              >
                {initialValue}
              </Textarea>
              {animatedLabel && type === 'textarea' && (
                <label
                  className={classNames(styles.Label, addLabelClass, {
                    [styles.LabelAbove]: labelAbove,
                    [styles.LabelInside]: !labelAbove,
                    [commonStyles.HasError]: hasError,
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles.HasError]: hasError,
                    [styles.TextareaLabel]: type === 'textarea',
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [commonStyles.Disabled]: disabled || readonly,
                  })}
                  htmlFor={id}
                >
                  {label}
                  {required && '*'}
                </label>
              )}
              {!hasError && maxlengthMessage && (
                <span className={styles.TextareaMaxlengthMessage}>
                  {this.state.value.length || 0}/{maxlength} Zeichen
                  {this.state.value.length === maxlength &&
                    !!maxlengthMessage &&
                    ` – ${maxlengthMessage}`}
                </span>
              )}
            </>
          )}

          {(type === 'radio' || type === 'checkbox') && (
            <div
              key={`webform-option-${id}`}
              className={classNames(styles.Row, commonStyles.OptionWrapper)}
            >
              <div className={classNames(commonStyles.Option)}>
                <input
                  className={classNames(commonStyles.Input, {
                    [commonStyles.HasError]: hasError,
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [commonStyles.Disabled]: disabled || readonly,
                  })}
                  checked={!!value}
                  disabled={disabled}
                  readOnly={readonly}
                  id={id}
                  name={id}
                  onChange={this.handleUpdate.bind(this)} // real-time validation
                  type={type}
                  value={value}
                />
                <span />
                {this.props.type === 'checkbox' &&
                  Icon &&
                  IconTypes?.checkmarkIconType && (
                    <Icon
                      addClass={styles.CheckmarkIcon}
                      type={IconTypes.checkmarkIconType}
                    />
                  )}
              </div>
              <label
                htmlFor={id}
                className={classNames(
                  styles.LabelsColumns,
                  commonStyles.Labels,
                  {
                    [commonStyles.HasError]: hasError,
                  },
                )}
              >
                {label && (
                  <>
                    {typeof label === 'string' ? (
                      <div
                        className={classNames({
                          [commonStyles.Required]:
                            type === 'checkbox' && required,
                          [styles.ActiveCheckbox]: value,
                          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                          [commonStyles.Disabled]: disabled || readonly,
                        })}
                        dangerouslySetInnerHTML={{
                          __html: label,
                        }}
                      />
                    ) : (
                      <div
                        className={classNames({
                          [commonStyles.Required]:
                            type === 'checkbox' && required,
                          [styles.ActiveCheckbox]: value,
                          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                          [commonStyles.Disabled]: disabled || readonly,
                        })}
                      >
                        {label}
                      </div>
                    )}
                  </>
                )}
                {description && (
                  <div className={commonStyles.Description}>{description}</div>
                )}
              </label>
            </div>
          )}
          {type !== 'textarea' &&
            type !== 'checkbox' &&
            type !== 'checkboxes' &&
            type !== 'radios' &&
            type !== 'radio' && (
              <input
                className={classNames(commonStyles.Input, {
                  [commonStyles.HasError]: hasError,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]: disabled || readonly,
                })}
                disabled={disabled}
                readOnly={readonly}
                id={id}
                maxLength={maxlength || 255}
                name={id}
                onChange={this.handleUpdate.bind(this)} // real-time validation
                onBlur={this.unsetFocus.bind(this)}
                onFocus={this.setFocus.bind(this)}
                placeholder={
                  type === 'date' && safariVersionData
                    ? 'yyyy-mm-dd'
                    : !animatedLabel
                      ? label
                      : ''
                }
                type={(type === 'textfield' && 'text') || type || 'text'}
                value={value}
                min={dateMin && getDateString(dateMin)}
                max={dateMax && getDateString(dateMax)}
                ref={innerRef}
                inputMode={inputmode}
                autoComplete={autocomplete}
                /* @ts-ignore TODO: TS2322 ->  Type '((e */
                onWheel={type === 'number' ? this.blockScrollForInput : null}
              />
            )}
          {animatedLabel && type !== 'textarea' && (
            <label
              className={classNames(styles.Label, addLabelClass, {
                [styles.LabelAbove]: labelAbove,
                [styles.LabelInside]: !labelAbove,
                [commonStyles.HasError]: hasError,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.HasError]: hasError,
                [styles.TextareaLabel]: type === 'textarea',
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [commonStyles.Disabled]: disabled || readonly,
              })}
              htmlFor={id}
            >
              {label}
              {required && '*'}
            </label>
          )}
          {hasError &&
            type !== 'date' &&
            this.props.withErrorIcon &&
            Icon &&
            IconTypes?.errorIconType && (
              <Icon
                type={IconTypes.errorIconType}
                addClass={commonStyles.ErrorIcon}
              />
            )}
          {(hasError && (
            <span
              data-testid="inputfield-error-message"
              className={classNames(commonStyles.ErrorMessage, {
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [commonStyles.ReplacedHelperText]: helperText,
              })}
            >
              {this.state.errorMessage || appErrorMessage}
            </span>
          )) ||
            (helperText && (
              <span
                className={classNames(commonStyles.HelperText, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.HelperCheckboxText]:
                    this.props.type === 'checkbox',
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]: disabled || readonly,
                })}
                dangerouslySetInnerHTML={{ __html: helperText }}
              />
            ))}
        </div>
      );
    }
  }

  return InputField;
};

export default InputFieldFactory;

const getCalculatedDate = (days: string) => {
  const dateToday = new Date();

  if (days.endsWith('days')) {
    dateToday.setDate(dateToday.getDate() + parseInt(days, 10));
  }

  return dateToday;
};

const getDateString = (days: string) =>
  getCalculatedDate(days).toISOString().substring(0, 10);
