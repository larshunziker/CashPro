import React from 'react';
import classNames from 'classnames';
import modal from '../../../../../Modal';
import styles from './styles.legacy.css';
import { SelectOption } from '../SelectField/typings';

type SelectDropdownProps = {
  options: SelectOption[];
  setCurrentSelect: (option: SelectOption) => void;
  setIsSelectOpen: (boolan: boolean) => void;
  onChange: (option: SelectOption) => void;
  disabledOption: any;
};

const SelectDropdown = ({
  options,
  setCurrentSelect,
  setIsSelectOpen,
  onChange,
  disabledOption,
}: SelectDropdownProps) => {
  const isMobile = global.innerWidth < 760;

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const handleUpdate = (event, option: SelectOption) => {
    event.preventDefault();
    setCurrentSelect(option);
    setIsSelectOpen(false);
    onChange(option);
  };

  const renderOptions = (close = () => null) =>
    options.map((option: SelectOption, index) => {
      const isDisabled = option.value === disabledOption.value;
      return (
        <button
          key={`webform-select-option-${index}`}
          className={classNames(styles.OptionItem, {
            [styles.Disabled]: isDisabled,
          })}
          tabIndex={0}
          disabled={isDisabled}
          onClick={(event) => {
            handleUpdate(event, option);
            close();
          }}
          role="option"
          aria-selected="false"
        >
          <>
            <img
              src={option?.flag?.url}
              className={option?.flag?.styles}
              alt="flag"
            />
            {option?.value}
          </>
        </button>
      );
    });

  if (isMobile) {
    return (
      <>
        {modal({
          type: 'drawer',
          hasStickyHeader: true,
          title: 'Währungen',
          hasStickyFooter: false,
          hideDefaultButtons: true,
          closeOnClickOutside: false,
          closeOnLocationChange: true,
          /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
          customUi: ({ close }) => {
            return (
              <div className={styles.DrawerWrapper}>{renderOptions(close)}</div>
            );
          },
        })}
      </>
    );
  }

  return <>{renderOptions()}</>;
};

export default SelectDropdown;
