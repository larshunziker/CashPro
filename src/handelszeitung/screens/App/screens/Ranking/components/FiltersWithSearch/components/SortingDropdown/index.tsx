import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Dropdown from '../../../../../../components/Dropdown';
import DropdownItem from '../../../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../../../components/Icon';
import { useFilterParams } from '../../../../hooks/useFilterParams';
import styles from './styles.legacy.css';

const sortingItems = [
  { label: 'Rang aufsteigend', key: 'rang', direction: 'asc' },
  { label: 'Rang absteigend', key: 'rang', direction: 'desc' },
  { label: 'Name A-Z', key: 'name', direction: 'asc' },
  { label: 'Name Z-A', key: 'name', direction: 'desc' },
  { label: 'Vermögen absteigend', key: 'vermögen', direction: 'desc' },
  { label: 'Vermögen aufsteigend', key: 'vermögen', direction: 'asc' },
  { label: 'Branche A-Z', key: 'branche', direction: 'asc' },
  { label: 'Branche Z-A', key: 'branche', direction: 'desc' },
  { label: 'Kanton A-Z', key: 'kanton', direction: 'asc' },
  { label: 'Kanton Z-A', key: 'kanton', direction: 'desc' },
];

/* @ts-ignore TODO: TS7006 ->  Parameter 'filterParams' implicitly has an 'any' type. */
const getIdx = (filterParams) => {
  if (!filterParams.sortBy) return 0;

  const sortBy = filterParams.sortBy;
  const direction = filterParams.direction || 'asc';

  return sortingItems.findIndex(
    (item) => item.key === sortBy && item.direction === direction,
  );
};

const SortingDropdown = () => {
  const { filterParams, updateFilter } = useFilterParams();
  const idx = getIdx(filterParams);
  const [activeIdx, setActiveIdx] = useState(idx);
  const activeLabel = sortingItems[activeIdx].label;

  const handleSelect = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'itemId' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'handleOptionClick' implicitly has an 'any' type. */
    (itemId, handleOptionClick) => {
      const { key, direction } = sortingItems[itemId];

      setActiveIdx(itemId);
      handleOptionClick(itemId);
      updateFilter('sortBy', key, direction);
    },
    [setActiveIdx, updateFilter],
  );

  useEffect(() => {
    if (idx !== activeIdx) {
      setActiveIdx(idx);
    }
  }, [idx, activeIdx]);

  return (
    <Dropdown
      key={`mobile-sorting-dropdown${filterParams.sortBy ? '-active' : ''}`}
      align="left"
      iconTypeLeft="IconTableVertical"
      iconTypeRight="IconChevronDown"
      iconTypeRightActive="IconChevronUp"
      variant="secondary"
      label={activeLabel || 'Sortieren'}
      loading={false}
      mobileFullWidth
    >
      {sortingItems.map(({ label }, index) => (
        <DropdownItem
          key={`sorting-dropdown-item-${index}`}
          label={label}
          initActive={activeIdx === index}
        >
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
          {({ handleOptionClick, itemId }) => (
            <div
              key={`sorting-dropdown-option-${itemId}`}
              className={classNames(styles.DropdownViewLink, {
                [styles.Active]: activeIdx === index,
              })}
              role="link"
              tabIndex={0}
              onClick={() => handleSelect(itemId, handleOptionClick)}
              onKeyDown={() => handleSelect(itemId, handleOptionClick)}
            >
              {label}
              {activeIdx === index ? (
                <Icon type="IconCheck" addClass={styles.CheckmarkIcon} />
              ) : null}
            </div>
          )}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default SortingDropdown;
