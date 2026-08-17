import React, { useState } from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import Icon from '../Icon';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SelectFieldProps } from './typings';

export const HIDE_PLACEHOLDER_FROM_OPTIONS_ALL =
  'hide-placeholder-from-options/all';
export const HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY =
  'hide-placeholder-from-options/desktop-only';
export const HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY =
  'hide-placeholder-from-options/mobile-only';

const SelectField = ({
  id,
  name,
  hasError,
  placeholder,
  values,
  setValues,
  options,
  hidePlaceholderFromOptions = HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY,
  addIconClass = '',
}: SelectFieldProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'content' implicitly has an 'any' type. */
  const renderOptionsMobile = ({ value, content }) => {
    return (
      <option
        className={grid.HiddenSmUp}
        key={`select-field-option-${id}-${value}-mobile`}
        value={value}
      >
        {content}
      </option>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'opt' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const renderOptionsDesktop = (opt, index) => {
    return (
      <a
        href="#selectOption"
        key={`select-field-option-${id}-${opt.value}-desktop`}
        className={classNames(styles.OptionItem, grid.HiddenSmDown)}
        tabIndex={index}
        onClick={setValue}
        data-option={JSON.stringify(opt)}
      >
        {opt.content}
      </a>
    );
  };

  const setValue = (event: React.MouseEvent | React.ChangeEvent) => {
    setIsSelectOpen(false);

    const { target } = event;
    if (target instanceof HTMLSelectElement) {
      const selectedIndex = target.selectedIndex;
      const option = options ? options[selectedIndex - 1] : null;

      setValues({ ...values, [id]: option });
    } else if (target instanceof window.HTMLElement) {
      event.preventDefault();
      const dataOptionString = target.getAttribute('data-option');
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
      const option = JSON.parse(dataOptionString);

      setValues({ ...values, [id]: option });
    }
  };

  const doToggleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelectOpen(!isSelectOpen);
  };

  if (!options || options.length === 0) {
    return null;
  }

  const optionsMobileJsx = options.map(renderOptionsMobile);
  const optionsDesktopJsx = options.map(renderOptionsDesktop);

  const isHiddenSmUp =
    hidePlaceholderFromOptions === HIDE_PLACEHOLDER_FROM_OPTIONS_ALL ||
    hidePlaceholderFromOptions === HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY;

  const isHiddenSmDown =
    hidePlaceholderFromOptions === HIDE_PLACEHOLDER_FROM_OPTIONS_ALL ||
    hidePlaceholderFromOptions === HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY;

  if (placeholder && hidePlaceholderFromOptions) {
    optionsMobileJsx.unshift(
      <option
        className={classNames({
          [grid.HiddenSmUp]: isHiddenSmUp,
          [grid.HiddenSmDown]: isHiddenSmDown,
        })}
        key={placeholder}
        disabled
        value=""
      >
        {placeholder}
      </option>,
    );
    optionsDesktopJsx.unshift(
      <option
        className={classNames({
          [grid.HiddenSmUp]: isHiddenSmUp,
          [grid.HiddenSmDown]: isHiddenSmDown,
        })}
        key={placeholder}
        disabled
        value=""
      >
        {placeholder}
      </option>,
    );
  }

  /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
  /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
  const currentValue = values[id] ? values[id].value : null;
  /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
  /* @ts-ignore TODO: TS7015 ->  Element implicitly has an 'any' type because index expression is not of type 'number'. */
  const currentContent = values[id] ? values[id].content : null;

  return (
    <>
      <div className={classNames('select-field-mobile', grid.HiddenSmUp)}>
        <select
          id={id}
          name={name || id}
          onChange={setValue}
          onBlur={setValue}
          value={
            placeholder && (currentValue === 0 || currentValue)
              ? currentValue
              : ''
          }
          className={classNames(styles.SelectField, {
            [styles.HasError]: hasError,
          })}
        >
          {optionsMobileJsx}
        </select>
        <Icon
          type="IconChevronDown"
          addClass={classNames({
            [styles.MobileIcon]: !addIconClass,
            [styles.SelectFieldIcon]: !addIconClass,
            [addIconClass]: !!addIconClass,
          })}
        />
      </div>
      <div className={classNames('select-field-desktop', grid.HiddenSmDown)}>
        <input type="hidden" name={name || id} defaultValue={currentValue} />

        <a
          href="#toggleSelectField"
          className={classNames(styles.SelectField, {
            [styles.HasError]: hasError,
          })}
          onClick={doToggleOpen}
          tabIndex={0}
          id={id}
        >
          {currentContent || placeholder}
          <Icon
            type={isSelectOpen ? 'IconChevronUp' : 'IconChevronDown'}
            addClass={styles.SelectFieldIcon}
          />
        </a>
        {isSelectOpen && (
          <div className={styles.OptionItemsWrapper}>{optionsDesktopJsx}</div>
        )}
      </div>
    </>
  );
};

const updatePolicy = shouldUpdate<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  (props, nextProps) =>
    props.values !== nextProps.values || props.hasError !== nextProps.hasError,
);

export default compose<any, any>(updatePolicy)(SelectField);
