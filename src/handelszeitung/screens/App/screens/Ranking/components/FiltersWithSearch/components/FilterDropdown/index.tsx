import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { truncateByChars } from '../../../../../../../../../shared/helpers/utils';
import Dropdown from '../../../../../../components/Dropdown';
import DropdownItem from '../../../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../../../components/Icon';
import { useFilterParams } from '../../../../hooks/useFilterParams';
import styles from './styles.legacy.css';
import { FilterDropdownProps } from './typings';

const FilterDropdown = ({
  allLabel,
  filterKey,
  items,
}: FilterDropdownProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { filterParams, updateFilter } = useFilterParams();

  const idx = filterParams[filterKey];
  const [activeIdx, setActiveIdx] = useState(
    items.findIndex((item) => item === idx),
  );

  const handleSelect = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'itemKey' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'itemId' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'handleOptionClick' implicitly has an 'any' type. */
    (itemKey, itemId, handleOptionClick) => {
      if (itemKey === null) {
        updateFilter(filterKey, '');
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'SetStateAction<number>'. */
        setActiveIdx(null);
      } else {
        updateFilter(filterKey, itemKey);
        setActiveIdx(items.findIndex((item) => item === idx));
      }
      handleOptionClick(itemId);
    },
    [updateFilter, filterKey, idx, items],
  );

  useEffect(() => {
    if (idx !== activeIdx) {
      setActiveIdx(idx);
    }
  }, [idx, activeIdx]);

  if (!items) {
    return null;
  }

  return (
    <Dropdown
      key={`${filterKey}-filter-dropdown${!idx ? '-active' : ''}`}
      align="left"
      iconTypeLeft="IconTableVertical"
      iconTypeRight="IconChevronDown"
      iconTypeRightActive="IconChevronUp"
      variant="secondary"
      label={idx || allLabel}
      loading={false}
      mobileFullWidth
    >
      <DropdownItem label={allLabel} initActive={!idx}>
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
        {({ handleOptionClick, itemId, isActive, label }) => (
          <div
            key={`dropdown-option-${itemId}`}
            className={classNames(styles.DropdownViewLink, {
              [styles.Active]: isActive,
            })}
            role="link"
            tabIndex={0}
            onClick={() => handleSelect(null, itemId, handleOptionClick)}
            onKeyDown={() => handleSelect(null, itemId, handleOptionClick)}
          >
            {label}
            {isActive ? (
              <Icon type="IconCheck" addClass={styles.CheckmarkIcon} />
            ) : null}
          </div>
        )}
      </DropdownItem>
      {items?.map((item: string, index) => (
        <DropdownItem
          key={`industry-dropdown-item-${item}-${index}`}
          label={truncateByChars(item, 20, '...')}
          initActive={activeIdx === index}
        >
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
          {({ handleOptionClick, itemId, isActive }) => (
            <div
              key={`dropdown-option-${itemId}`}
              className={classNames(styles.DropdownViewLink, {
                [styles.Active]: isActive,
              })}
              role="link"
              tabIndex={0}
              onClick={() => handleSelect(item, itemId, handleOptionClick)}
              onKeyDown={() => handleSelect(item, itemId, handleOptionClick)}
            >
              {item}
              {isActive ? (
                <Icon type="IconCheck" addClass={styles.CheckmarkIcon} />
              ) : null}
            </div>
          )}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default FilterDropdown;
