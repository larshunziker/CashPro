import React, { memo, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

export const HIDE_PLACEHOLDER_FROM_OPTIONS_ALL =
  'hide-placeholder-from-options/all';
export const HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY =
  'hide-placeholder-from-options/desktop-only';
export const HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY =
  'hide-placeholder-from-options/mobile-only';

const SelectField = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
  id,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'name' implicitly has an 'any' type. */
  name,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasError' implicitly has an 'any' type. */
  hasError,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'placeholder' implicitly has an 'any' type. */
  placeholder,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'values' implicitly has an 'any' type. */
  values,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'options' implicitly has an 'any' type. */
  options,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setValues' implicitly has an 'any' type. */
  setValues,
  hidePlaceholderFromOptions = HIDE_PLACEHOLDER_FROM_OPTIONS_ALL,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  if (!options || options.length === 0) {
    return null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'opt' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const optionsJsx = options.map((opt, index) => (
    <>
      <option
        className={grid.HiddenSmUp}
        key={`selectfield-option-${index}`}
        value={opt.value}
      >
        {opt.content || opt.value}
      </option>
      <button
        key={`selectfield-button-${index}`}
        className={classNames(styles.OptionItem, grid.HiddenSmDown)}
        tabIndex={index}
        onClick={(event) => setValue(event)}
        data-option={JSON.stringify(opt)}
      >
        {opt.label || opt.content}
      </button>
    </>
  ));

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const setValue = (event) => {
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

  if (placeholder) {
    optionsJsx.unshift(
      <option
        key={`selectfield-option-disabled-${placeholder}`}
        disabled
        value=""
        className={classNames({
          [grid.HiddenSmUp]: [
            HIDE_PLACEHOLDER_FROM_OPTIONS_ALL,
            HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY,
          ].includes(hidePlaceholderFromOptions),
          [grid.HiddenSmDown]:
            hidePlaceholderFromOptions ===
            HIDE_PLACEHOLDER_FROM_OPTIONS_MOBILE_ONLY,
        })}
      >
        {placeholder}
      </option>,
    );
  }

  const currentValue = values[id] ? values[id].value : null;
  const currentContent = values[id]
    ? values[id].label || values[id].content
    : null;

  const mobileJsx = (
    <div className="select-field-mobile">
      <select
        id={id}
        name={name || id}
        onChange={setValue}
        onBlur={setValue}
        value={
          placeholder && (currentValue === 0 || currentValue)
            ? currentValue
            : ''
        } // default option
        className={classNames(styles.SelectField, {
          [styles.HasError]: hasError,
        })}
      >
        {optionsJsx}
      </select>
      <Icon
        type="IconChevronDown"
        addClass={classNames(styles.SelectFieldIcon, styles.MobileIcon)}
      />
    </div>
  );

  const desktopJsx = (
    <div className="select-field-desktop">
      <input type="hidden" name={name || id} defaultValue={currentValue} />

      <button
        className={classNames(styles.SelectField, {
          [styles.HasError]: hasError,
        })}
        onClick={(event) => {
          event.preventDefault();
          setIsSelectOpen(!isSelectOpen);
        }}
        tabIndex={0}
        id={id}
      >
        {currentContent || placeholder}
        <Icon
          type={isSelectOpen ? 'IconChevronUp' : 'IconChevronDown'}
          addClass={styles.SelectFieldIcon}
        />
      </button>
      {isSelectOpen && (
        <div className={styles.OptionItemsWrapper}>{optionsJsx}</div>
      )}
    </div>
  );

  return (
    <div>
      <div className={grid.HiddenSmUp}>{mobileJsx}</div>
      <div className={grid.HiddenSmDown}>{desktopJsx}</div>
      {hasError && (
        <span className={styles.ErrorMessage}>Bitte eine Option wählen</span>
      )}
    </div>
  );
};

export default memo(SelectField);
