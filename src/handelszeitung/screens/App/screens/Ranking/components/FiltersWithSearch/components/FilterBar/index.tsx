import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import FilterDropdown from '../FilterDropdown';
import { useFilterParams } from '../../../../hooks/useFilterParams';
import styles from './styles.legacy.css';
import { ActionButtonsProps } from '../../typings';

const FilterBar = ({ dropdownLists }: ActionButtonsProps) => {
  const { filterParams, updateFilter } = useFilterParams();
  const [isGenderFilterActive, setGenderFilterActive] = useState(false);
  const [isStatusFilterActive, setStatusFilterActive] = useState(false);

  useEffect(() => {
    setGenderFilterActive(filterParams?.filterByGender === 'frauen');
    setStatusFilterActive(filterParams?.filterByStatus === 'neu');
  }, [filterParams]);

  const toggleFilter = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
    (key, value) => {
      if (filterParams[key]) {
        updateFilter(key, '');
      } else {
        updateFilter(key, value);
      }
    },
    [filterParams, updateFilter],
  );

  const FilterButtonJSX = useCallback(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'filterKey' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'value' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setValue' implicitly has an 'any' type. */
    ({ label, isActive, filterKey, value, setValue }) => {
      const handleToggle = () => {
        setValue(!isActive);
        toggleFilter(filterKey, value);
      };

      return (
        <ButtonWithLoading
          ariaLabel={value}
          size="small"
          variant="secondary"
          addClass={classNames(styles.FilterButton, {
            [styles.IsActive]: isActive,
          })}
          onClick={handleToggle}
          mobileFullWidth
        >
          {label}
        </ButtonWithLoading>
      );
    },
    [toggleFilter],
  );

  return (
    <>
      <div className={styles.ButtonsWrapper}>
        <FilterButtonJSX
          label="Frauen"
          isActive={isGenderFilterActive}
          filterKey="filterByGender"
          value="frauen"
          setValue={setGenderFilterActive}
        />
        <FilterButtonJSX
          label="Neu"
          isActive={isStatusFilterActive}
          filterKey="filterByStatus"
          value="neu"
          setValue={setStatusFilterActive}
        />
      </div>
      <FilterDropdown
        allLabel="Alle Branchen"
        filterKey="filterByIndustry"
        items={dropdownLists.industryList}
      />
      <FilterDropdown
        allLabel="Alle Kantone"
        filterKey="filterByState"
        items={dropdownLists.stateList}
      />
    </>
  );
};

export default FilterBar;
