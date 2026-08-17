import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { MultiFieldOptions, MultiFieldProps, MultiFieldState } from './typings';

const uniqueArray = (arrArg: Array<string>) =>
  arrArg.filter(
    (elem: string, pos: number, arr: Array<string>): boolean =>
      arr.indexOf(elem) === pos,
  );

const reduceArray = (arr: Array<string>, value: string) =>
  arr.filter((elem: string): boolean => elem !== value);

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const MultiFieldFactory = ({
  styles,
  commonStyles,
  appErrorMesssage = `Bitte treffen Sie eine Auswahl.`,
  Icon,
  IconTypes,
}: MultiFieldOptions) => {
  class MultiField extends Component<MultiFieldProps, MultiFieldState> {
    constructor(props: MultiFieldProps) {
      super(props);

      /* @ts-ignore TODO: TS7034 ->  Variable 'initialCheckedValues' implicitly has type 'any[]' in some locations where its type cannot be determined. */
      const initialCheckedValues = [];

      props.options?.forEach((option) => {
        if (option.initiallyChecked) {
          initialCheckedValues.push(option.value);
        }
      });

      // define state
      this.state = {
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialCheckedValues' implicitly has an 'any[]' type. */
        value: initialCheckedValues, // needs to be array to save all checkbox options separately
        isDirty: false,
        isValid: true,
      };

      // register field functions on form
      if (typeof props.register === 'function') {
        props.register({
          validate: this.validate.bind(this),
          getValue: this.getValue.bind(this),
          getId: this.getId.bind(this),
          setIsValid: this.setIsValid.bind(this),
        });
      }
    }

    // return field value
    getValue(): string | Array<string> {
      return this.props.type === 'checkboxes'
        ? this.state.value
        : this.state.value[0];
    }

    // return field ID
    getId(): string {
      return this.props.id;
    }

    // set new fieldValue
    setIsValid(isValid: boolean) {
      this.setState({
        ...this.state,
        isValid: isValid,
      });
    }

    // run validation
    validate(): boolean {
      let isValid: boolean = !!this.state.value || !this.state.isDirty;

      if (this.props.required && this.state.value.length === 0) {
        isValid = false;
      }

      this.setState({ isValid });

      // return boolean so the parent form is aware of the state of this field
      // and can block submit requests
      return isValid;
    }

    // update state and run validation
    handleUpdate(event: any): void {
      // checkboxes use arrays, radio-buttons need strings :-|
      let newValue: Array<string> = [event.target.value];

      if (this.props.type === 'checkboxes') {
        if (event.target.checked) {
          // add value to array (unique)
          newValue = uniqueArray(this.state.value.concat([event.target.value]));
        } else {
          // remove value from array
          newValue = reduceArray(this.state.value, event.target.value);
        }
      }

      // update state and call validation
      this.setState(
        {
          value: newValue,
          isDirty: this.props.initialValue !== newValue && !this.state.isDirty,
        },
        () => this.validate(),
      );
    }

    renderOption(option: WebformFieldOption, index: number) {
      return (
        <div
          key={`webform-multi-option-${this.props.id}-${index}`}
          className={classNames(styles.Row, styles.OptionWrapper)}
        >
          <div
            className={classNames(styles.OptionsColumns, commonStyles.Option)}
          >
            <input
              className={classNames({
                [commonStyles.HasError]: !this.state.isValid,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [commonStyles.Disabled]: this.props.disabled || option.disabled,
              })}
              disabled={this.props.disabled || option.disabled}
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              checked={this.state.value.includes(option.value)}
              id={`${this.props.id}_${option.value || ''}`}
              name={
                this.props.type === 'checkboxes'
                  ? `${this.props.id}[${option.value || ''}]`
                  : this.props.id
              }
              onChange={this.handleUpdate.bind(this)} // real-time validation
              type={this.props.type === 'checkboxes' ? 'checkbox' : 'radio'}
              value={option.value}
            />
            <span />
            {this.props.type === 'checkboxes' &&
              Icon &&
              IconTypes?.checkmarkIconType && (
                <Icon
                  addClass={styles.CheckmarkIcon}
                  type={IconTypes.checkmarkIconType}
                />
              )}
          </div>
          <label
            htmlFor={`${this.props.id}_${option.value || ''}`}
            className={classNames(styles.LabelsColumns, commonStyles.Labels, {
              [commonStyles.HasError]: !this.state.isValid,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [commonStyles.Disabled]: this.props.disabled || option.disabled,
            })}
          >
            {option.label && (
              <div
                className={classNames({
                  [commonStyles.Required]:
                    this.props.type === 'checkbox' && this.props.required,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]:
                    this.props.disabled || option.disabled,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.ActiveCheckbox]: this.state.value.includes(
                    option.label,
                  ),
                })}
                dangerouslySetInnerHTML={{ __html: option.label }}
              />
            )}
            {option.description && (
              <div
                className={classNames(
                  styles.Description,
                  commonStyles.HelperText,
                  {
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [commonStyles.Disabled]:
                      this.props.disabled || option.disabled,
                  },
                )}
              >
                {option.description}
              </div>
            )}
          </label>
        </div>
      );
    }

    render(): ReactElement | null {
      const {
        label,
        required,
        options,
        errorMessage,
        withErrorIcon = false,
        helperText,
        displayOptionsInline,
      } = this.props;

      return (
        <div className={styles.Wrapper}>
          {label && (
            <div>
              <div
                className={classNames(styles.Description, styles.Label, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.Required]: !!required,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.HasError]: !this.state.isValid,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]: this.props.disabled,
                })}
                dangerouslySetInnerHTML={{
                  __html: label,
                }}
              />
              {!this.state.isValid &&
                withErrorIcon &&
                Icon &&
                IconTypes?.errorIconType && (
                  <Icon
                    type={IconTypes.errorIconType}
                    addClass={styles.ErrorIcon}
                  />
                )}
            </div>
          )}
          <div
            className={classNames({
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [commonStyles.DisplayOptionsInline]: displayOptionsInline,
            })}
          >
            {options &&
              Array.isArray(options) &&
              options.map(this.renderOption.bind(this))}

            {(!this.state.isValid && (
              <span className={commonStyles.ErrorMessage}>
                {errorMessage || appErrorMesssage}
              </span>
            )) ||
              (helperText && (
                <span
                  className={classNames(commonStyles.HelperText, {
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [commonStyles.Disabled]: this.props.disabled,
                  })}
                  dangerouslySetInnerHTML={{ __html: helperText }}
                />
              ))}
          </div>
        </div>
      );
    }
  }

  return MultiField;
};

export default MultiFieldFactory;
