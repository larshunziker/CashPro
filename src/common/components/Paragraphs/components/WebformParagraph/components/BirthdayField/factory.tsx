import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { isLeapYear } from '../../../../../../../shared/helpers/utils';
import { BirthdayFieldFactoryOptions, BirthdayFieldProps } from './typings';

type BirthdayFieldState = {
  value: string;
  hasFocus: boolean;
  isDirty: boolean;
  isValid: boolean;
};

const DATE_FIELD_PLACEHOLDER = 'TT.MM.JJJJ';

const BirthdayFieldFactory = ({
  styles,
  commonStyles,
  appErrorMessage = 'Bitte Geburtstag eingeben oder korrigieren',
  Icon,
  IconTypes,
}: BirthdayFieldFactoryOptions) => {
  class BirthdayField extends Component<
    BirthdayFieldProps,
    BirthdayFieldState
  > {
    constructor(props: BirthdayFieldProps) {
      super(props);

      this.state = {
        value: '',
        hasFocus: false,
        isDirty: false,
        isValid: true,
      };

      // register field functions on form
      if (typeof props.register === 'function') {
        props.register({
          validate: this.validate.bind(this),
          getValue: this.getValue.bind(this),
          getId: this.getId.bind(this),
        });
      }
    }
    ref: any = React.createRef();
    currentYear = new Date().getFullYear();

    getValue() {
      return this.state.value;
    }

    getId() {
      return this.props.id;
    }

    validate() {
      let isValid: boolean = !!this.state.value || !this.state.isDirty;
      const isRequired = this.props.required;
      const isEmpty = this.state.value.length === 0;

      const dateInputRegex = /\d{2}[.]\d{2}[.]\d{4}\b/;
      const isValidDateFormat =
        dateInputRegex.test(this.state.value) && this.state.value.length === 10;

      if (isRequired && (isEmpty || !isValidDateFormat)) {
        isValid = false;
      }

      this.setState({ isValid });

      return isValid;
    }

    // set the hasFocus state so the label will be rendered above the field
    setFocus() {
      this.setState(
        {
          hasFocus: true,
          value:
            (this.ref.current.value !== DATE_FIELD_PLACEHOLDER &&
              this.ref.current.value) ||
            DATE_FIELD_PLACEHOLDER,
          isDirty: false,
        },
        () => {
          this.ref.current.selectionStart = 0;
          this.ref.current.selectionEnd = 1;
        },
      );
    }
    // check for max value and prefix with 0 if bigger
    checkValue(str: string, max: number) {
      if (str.charAt(0) !== '0' || str === '00') {
        let num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) {
          num = parseInt(str.substr(0, 2));
        }
        str =
          num > parseInt(max.toString().charAt(0)) &&
          num.toString().length === 1
            ? '0' + num
            : num.toString();
      }
      return str;
    }

    autoformatDate(dateString: string) {
      // detect format (US, GB, CH)
      const isUS = dateString.match(/^\d{4}\/|\-|\.\d{1,2}\/|\-|\.\d{1,2}$/);
      const isEuro = dateString.match(/^\d{1,2}\/|\-\d{1,2}\/|\-\d{4}$/);
      const maxMonth = 12;

      if (isEuro) {
        return dateString.replace(/\/|\-/g, '.');
      }

      if (isUS) {
        const value = dateString.replace(/\/|\-/g, '.').split('.');

        // this is clearly a YYYY/MM/DD format
        if (value[2].length === 2 && parseInt(value[2]) > maxMonth) {
          return [value[2], value[1], value[0]].join('.');
        }

        return [value[1], value[2], value[0]].join('.');
      }

      return dateString;
    }

    assembleDateString(dateString: string) {
      // This cleans up all parts to be DIGITS and reduces array to 3 parts
      const datePartsArray = dateString
        .split('.')
        .splice(0, 3)
        .map((datePart) => datePart.replace(/\D/g, ''));

      // Assert boundaries for...
      // DAY (max-value = 31)
      if (datePartsArray[0]) {
        datePartsArray[0] = this.checkValue(datePartsArray[0], 31);
      }
      // MONTH (max-value = 12)
      if (datePartsArray[1]) {
        datePartsArray[1] = this.checkValue(datePartsArray[1], 12);

        //after we know the month, the day also has to be re-validated to account for the different number of days per month
        const monthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const maxDay =
          monthLength[parseInt(datePartsArray[1].replace('0', '')) - 1];

        if (maxDay && maxDay < parseInt(datePartsArray[0])) {
          datePartsArray[0] = maxDay.toString();
        }
      }
      // YEAR (max-length = 4)
      if (datePartsArray[2]) {
        datePartsArray[2] =
          datePartsArray[2].length > 4
            ? datePartsArray[2].substr(0, 4)
            : datePartsArray[2];

        // the year cannot lie in the future
        if (
          datePartsArray[2].length === 4 &&
          parseInt(datePartsArray[2]) > this.currentYear
        ) {
          datePartsArray[2] = this.currentYear.toString();
        }

        //after we know the full year (and can detect whether it is a leap year) we can correct the last day of february.
        if (datePartsArray[2].length === 4 && datePartsArray[1] === '02') {
          if (
            !isLeapYear(parseInt(datePartsArray[2])) &&
            parseInt(datePartsArray[0]) > 28
          ) {
            // the max day in february in a non-leap year is set to 28.
            datePartsArray[0] = '28';
          }
        }
      }

      // Add postfix to unfinished date parts (21.12.19JJ)
      for (let datePart = 0; datePart < 3; datePart++) {
        datePartsArray[datePart] =
          (datePartsArray[datePart] || '') +
          DATE_FIELD_PLACEHOLDER.split('.')[datePart].substr(
            datePartsArray[datePart]?.length || 0,
          );
      }

      return datePartsArray.join('.');
    }

    inputHandler() {
      this.ref.current.value = this.assembleDateString(
        this.autoformatDate(this.ref.current.value),
      );

      this.setCaretPosition();
    }

    // Find the right spot for the caret position (cursor selection).
    // Iterate over date and set caret at the first occurence of T, M or J
    setCaretPosition(): void {
      for (
        let charPosition = 0;
        charPosition < this.ref.current.value.length;
        charPosition++
      ) {
        if (
          ['T', 'M', 'J'].indexOf(this.ref.current.value[charPosition]) !== -1
        ) {
          this.ref.current.setSelectionRange(charPosition, charPosition);
          break;
        }
      }
    }

    // Unset hasFocus state so the label will be rendered above the field
    unsetFocus(): void {
      if (this.state.value === DATE_FIELD_PLACEHOLDER) {
        this.setState({ hasFocus: false, value: '' });
      } else {
        this.setState(
          {
            hasFocus: false,
            value: this.ref.current.value,
          },
          () => this.validate(),
        );
      }
    }

    // Update state value and run validation
    handleUpdate(): void {
      this.setState({
        value: this.ref.current.value,
        isDirty: this.ref.current.value !== DATE_FIELD_PLACEHOLDER,
      });
    }

    render(): ReactElement | null {
      const { isValid, hasFocus, value }: BirthdayFieldState = this.state;
      const {
        addLabelClass,
        id,
        label,
        required,
        type,
        errorMessage,
        withErrorIcon = false,
        helperText,
        disabled,
      }: BirthdayFieldProps = this.props;

      // No need to render hidden fields, they're handled on handleSubmit (webform component)
      if (type === 'hidden') {
        return null;
      }

      const labelAbove = hasFocus || !!value;

      return (
        <div
          className={classNames(commonStyles.Wrapper, {
            [commonStyles.FieldWithHelperTextWrapper]: !isValid || helperText,
          })}
        >
          <input
            ref={this.ref}
            className={classNames(commonStyles.Input, {
              [commonStyles.HasError]: !isValid,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [commonStyles.Disabled]: disabled,
            })}
            id={id}
            name={id}
            onChange={this.handleUpdate.bind(this)} // real-time validation
            onBlur={this.unsetFocus.bind(this)}
            onFocus={this.setFocus.bind(this)}
            onInput={this.inputHandler.bind(this)}
            type={'text'}
            value={value}
            disabled={disabled}
          />
          <label
            className={classNames(styles.Label, addLabelClass, {
              [styles.LabelAbove]: labelAbove,
              [styles.LabelInside]: !labelAbove,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.HasError]: !isValid,
              [commonStyles.HasError]: !isValid,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [commonStyles.Disabled]: disabled,
            })}
            htmlFor={id}
          >
            {label}
            {required && '*'}
          </label>

          {!isValid && withErrorIcon && Icon && IconTypes?.errorIconType && (
            <Icon
              type={IconTypes.errorIconType}
              addClass={commonStyles.ErrorIcon}
            />
          )}

          {(!isValid && (
            <span
              data-testid="inputfield-error-message"
              className={commonStyles.ErrorMessage}
            >
              {errorMessage || appErrorMessage}
            </span>
          )) ||
            (helperText && (
              <span
                className={classNames(commonStyles.HelperText, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [commonStyles.Disabled]: disabled,
                })}
                dangerouslySetInnerHTML={{ __html: helperText }}
              />
            ))}
        </div>
      );
    }
  }

  return BirthdayField;
};

export default BirthdayFieldFactory;
