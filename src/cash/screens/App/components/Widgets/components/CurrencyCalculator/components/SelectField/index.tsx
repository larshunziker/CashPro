import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../../../../../Icon';
import Img from '../../../../../Img';
import SelectDropdown from '../SelectDropdown';
import styles from './styles.legacy.css';
import { SelectFieldProps, SelectOption } from './typings';

const SelectField = ({
  id,
  name,
  label,
  hasError,
  initialSelect,
  register,
  onChange,
  disabledOption,
  options,
}: SelectFieldProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(initialSelect);
  const selectWrapperRef = useRef(null);

  useEffect(() => {
    if (typeof register === 'function') {
      register({
        getId: () => id,
        getValue: () => currentSelect || initialSelect,
        setValue: (option: SelectOption) => setCurrentSelect(option),
      });
    }
  }, [register, id, currentSelect, initialSelect]);

  useEffect(() => {
    if (!isSelectOpen) {
      return;
    }
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const handleClickOutside = (event) => {
      /* @ts-ignore TODO: TS2339 ->  Property 'contains' does not exist on type 'never'. */
      if (!selectWrapperRef?.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSelectOpen]);

  if (!options || options.length === 0 || !initialSelect) {
    return null;
  }

  return (
    <div ref={selectWrapperRef}>
      <div className={styles.SelectFieldWrapper}>
        <span className={styles.Label}>{label}</span>
        <input
          type="hidden"
          name={name || id}
          defaultValue={currentSelect?.value}
        />

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
          <span className={styles.SelectedValue}>
            <Img
              url={currentSelect?.flag.url || initialSelect?.flag?.url}
              addClass={
                currentSelect?.flag.styles || initialSelect?.flag.styles
              }
            />
            {currentSelect?.value || initialSelect?.value}
          </span>
          <Icon
            type={isSelectOpen ? 'IconChevronUp' : 'IconChevronDown'}
            addClass={styles.SelectFieldIcon}
          />
        </button>
        {isSelectOpen && (
          <div id="selectWrapper" className={styles.OptionItemsWrapper}>
            <SelectDropdown
              options={options}
              setCurrentSelect={setCurrentSelect}
              setIsSelectOpen={setIsSelectOpen}
              onChange={onChange}
              disabledOption={disabledOption}
            />
          </div>
        )}
      </div>
      {hasError && (
        <span className={styles.ErrorMessage}>Bitte eine Option wählen</span>
      )}
    </div>
  );
};

export default memo(SelectField);
