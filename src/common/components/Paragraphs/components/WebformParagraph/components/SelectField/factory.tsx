import React, { Component, ReactElement, createRef } from 'react';
import classNames from 'classnames';
import {
  HIDE_PLACEHOLDER_FROM_OPTIONS_ALL,
  HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY,
  HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY,
} from '../../../../../../../shared/constants/selectField';
import grid from '../../../../../../assets/styles/grid.legacy.css';
import { SelectFieldFactoryOptions, SelectFieldProps } from './typings';

type SelectFieldState = {
  value: string;
  isDirty: boolean;
  isValid: boolean;
  isOpen: boolean;
  searchTerm: string;
};

const SelectFieldFactory = ({
  Icon,
  IconTypes,
  styles,
  commonStyles,
  appErrorMessage = 'Bitte ausfüllen oder korrigieren',
  optionNotFoundMessage = 'Keinen Eintrag gefunden',
}: SelectFieldFactoryOptions) => {
  class SelectField extends Component<SelectFieldProps, SelectFieldState> {
    selectWrapperRef: RefObject;

    constructor(props: SelectFieldProps) {
      super(props);

      this.selectWrapperRef = createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);

      // define state
      this.state = {
        searchTerm: '',
        value: props.initialValue || '',
        isDirty: false,
        isValid: true,
        isOpen: false,
      };

      // register field functions on form
      if (typeof props.register === 'function') {
        props.register({
          validate: this.validate.bind(this),
          getValue: this.getValue.bind(this),
          getId: this.getId.bind(this),
          setValue: this.setValue.bind(this),
        });
      }
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    shouldComponentUpdate(
      nextProps: SelectFieldProps,
      nextState: SelectFieldState,
    ) {
      if (!!this.props.handleChange && this.props.value !== nextProps.value) {
        this.setState(
          {
            value: nextProps.value,
            isDirty:
              this.props.initialValue !== nextProps.value &&
              !this.state.isDirty,
          },
          () => this.validate(),
        );
        this.props.handleChange(nextProps.value);
      }
      if (this.props.isOpen !== nextProps.isOpen) {
        /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
        this.setState({ isOpen: nextProps.isOpen });
      }
      return (
        this.state.value !== nextState.value ||
        this.state.isValid !== nextState.isValid ||
        this.state.isOpen !== nextState.isOpen ||
        this.state.searchTerm !== nextState.searchTerm ||
        this.props.disabled !== nextProps.disabled
      );
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

    // return field ID
    getId() {
      return this.props.id;
    }

    // run validation
    validate() {
      let isValid = !!this.state.value || !this.state.isDirty;

      if (this.props.required && this.state.value.length === 0) {
        isValid = false;
      }

      // update isValid state
      this.setState({ isValid });

      // return boolean so the parent form is aware of the state of this field
      // and can block submit requests
      return isValid;
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    handleClickOutside(event) {
      if (
        this.state.isOpen &&
        this.selectWrapperRef &&
        !this.selectWrapperRef.current.contains(event.target)
      ) {
        this.setState({ isOpen: !this.state.isOpen });
      }
    }

    // update state and runs validation
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    handleUpdate(event) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'WebformFieldOption'. */
      let option: WebformFieldOption = null;

      const { target } = event;
      if (target instanceof HTMLSelectElement) {
        const selectedIndex = target.selectedIndex;
        /* @ts-ignore TODO: TS2322 ->  Type 'WebformFieldOption | null' is not assignable to type 'WebformFieldOption'. */
        option =
          (this.props.options &&
            Array.isArray(this.props.options) &&
            this.props.options[selectedIndex - 1]) ||
          null;
      } else if (target instanceof window.HTMLElement) {
        event.preventDefault();
        const dataOptionString = target.getAttribute('data-option');
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
        option = JSON.parse(dataOptionString);
      }

      const newValue = (option && (option?.label || option.value)) || '';

      this.props?.handleChange?.(newValue);

      // update state and call validation
      this.setState(
        {
          value: newValue,
          isDirty: this.props.initialValue !== newValue && !this.state.isDirty,
          isOpen: false,
        },
        () => this.validate(),
      );
    }

    renderOptionsMobile(opt: WebformFieldOption) {
      return (
        <option
          key={`select-option-${opt.label}`}
          value={opt.value}
          className={grid.HiddenSmUp}
        >
          {opt.label}
        </option>
      );
    }

    renderOptionsDesktop(opt: WebformFieldOption, index: number) {
      return (
        <button
          key={`webform-select-option-${index}`}
          className={classNames(styles.OptionItem, grid.HiddenSmDown)}
          tabIndex={0}
          onClick={this.handleUpdate.bind(this)}
          data-option={JSON.stringify(opt)}
          role="option"
          aria-selected="false"
        >
          {opt.label}
        </button>
      );
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    setIsOpen(event) {
      event.preventDefault();
      if (this.props.disabled) return;
      this.setState({ isOpen: !this.state.isOpen });
    }

    render(): ReactElement {
      const {
        options,
        label,
        hidePlaceholderFromOptions,
        id,
        errorMessage,
        required,
        withErrorIcon = false,
        helperText,
        disabled,
        innerRef,
        canFilter,
        autocomplete,
      } = this.props;

      if ((!options || options.length === 0) && !canFilter) {
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
        return null;
      }

      // make errors visible
      const hasError = !this.state.isValid;
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      const filteredOptions = options.filter((option) =>
        String(option.value)
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()),
      );

      const optionsMobileJsx: Array<ReactElement> = filteredOptions.map(
        this.renderOptionsMobile.bind(this),
      );

      const optionsDesktopJsx: Array<ReactElement> = filteredOptions.map(
        this.renderOptionsDesktop.bind(this),
      );

      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      if (label && options.length > 0) {
        optionsMobileJsx.unshift(
          <option
            className={classNames({
              [grid.HiddenSmUp]: [
                HIDE_PLACEHOLDER_FROM_OPTIONS_ALL,
                HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY,
                /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              ].includes(hidePlaceholderFromOptions),
              [grid.HiddenSmDown]:
                hidePlaceholderFromOptions ===
                HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY,
            })}
            key={`select-field-${this.props.placeholder}`}
            disabled
            value=""
          >
            {this.props.placeholder}
          </option>,
        );
      }

      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      if (canFilter && options.length > 0) {
        optionsDesktopJsx.unshift(
          <div
            key="select-field-filter"
            className={classNames(styles.OptionItem, grid.HiddenSmDown)}
          >
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              className={styles.OptionsFilter}
              value={this.state.searchTerm}
              onChange={(e) => {
                this.setState({ searchTerm: e.target.value });
              }}
              autoComplete={autocomplete}
            />
            {IconTypes?.magnifyingGlassIcon && (
              <Icon
                type={IconTypes.magnifyingGlassIcon}
                addClass={classNames(
                  styles.SelectFieldIcon,
                  styles.OptionsFilterIcon,
                )}
              />
            )}
          </div>,
        );
        filteredOptions.length <= 0 &&
          this.state.searchTerm.length > 0 &&
          optionsDesktopJsx.push(
            <div
              key="select-field-filter-no-results"
              className={classNames(styles.OptionItem, grid.HiddenSmDown)}
            >
              <div className={styles.OptionsEmpty}>
                <span>
                  {optionNotFoundMessage} {`"${this.state.searchTerm}"`}
                </span>
              </div>
            </div>,
          );
      }

      const mobileJsx = (
        <div className="select-field-mobile">
          {
            <label
              className={classNames(styles.MobileLabel, {
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.MobileLabelAbove]:
                  !!this.state.value || !!this.props.placeholder,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [commonStyles.Disabled]: disabled,
              })}
              htmlFor={id}
            >
              {required ? <>{label}*</> : label}
            </label>
          }
          <select
            id={id}
            name={id}
            onChange={this.handleUpdate.bind(this)} // real-time validation
            onBlur={this.handleUpdate.bind(this)}
            value={this.state.value}
            disabled={disabled}
            className={classNames(
              styles.SelectField,
              styles.SelectFieldMobile,
              {
                [commonStyles.HasError]: hasError,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [commonStyles.Disabled]: disabled,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.HasError]: hasError,
              },
            )}
            ref={innerRef}
          >
            {optionsMobileJsx}
          </select>
          {IconTypes && (
            <Icon
              type={IconTypes.arrowDownIconType}
              addClass={classNames(styles.SelectFieldIcon, styles.MobileIcon)}
            />
          )}
          {hasError && withErrorIcon && Icon && IconTypes?.errorIconType && (
            <Icon
              type={IconTypes.errorIconType}
              addClass={classNames(styles.ErrorIcon, styles.ErrorIconMobile)}
            />
          )}
        </div>
      );

      const desktopJsx = (
        <div
          ref={this.selectWrapperRef}
          className={classNames(
            'select-field-desktop',
            styles.SelectFieldDesktopWrapper,
          )}
        >
          <input type="hidden" name={id} defaultValue={this.state.value} />
          <a
            href="#toggleSelectField"
            className={classNames(styles.SelectField, {
              [commonStyles.HasError]: hasError,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.HasError]: hasError,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [commonStyles.Disabled]: disabled,
            })}
            onClick={this.setIsOpen.bind(this)}
            tabIndex={0}
            id={id}
            ref={innerRef}
          >
            {
              <>
                <span
                  className={classNames(styles.Label, {
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles.LabelAbove]:
                      !!this.state.value || !!this.props.placeholder,
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [commonStyles.Disabled]: disabled,
                  })}
                >
                  {required ? <>{label}*</> : label}
                </span>
                {(!!this.state.value || !!this.props.placeholder) && (
                  <span className={styles.SelectedValue}>
                    {this.state.value || this.props.placeholder}
                  </span>
                )}
              </>
            }
            {IconTypes && (
              <Icon
                type={
                  this.state.isOpen
                    ? IconTypes.arrowUpIconType
                    : IconTypes.arrowDownIconType
                }
                addClass={styles.SelectFieldIcon}
              />
            )}
            {hasError && withErrorIcon && Icon && IconTypes?.errorIconType && (
              <Icon
                type={IconTypes.errorIconType}
                addClass={styles.ErrorIcon}
              />
            )}
          </a>
          {this.state.isOpen && (
            <div className={styles.OptionItemsWrapper}>{optionsDesktopJsx}</div>
          )}
        </div>
      );
      return (
        <div
          className={classNames(commonStyles.Wrapper, {
            [commonStyles.FieldWithHelperTextWrapper]: hasError || helperText,
          })}
        >
          <div className={grid.HiddenSmUp}>{mobileJsx}</div>
          <div className={grid.HiddenSmDown}>{desktopJsx}</div>
          {(hasError && (
            <span className={commonStyles.ErrorMessage}>
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

  return SelectField;
};

export default SelectFieldFactory;
