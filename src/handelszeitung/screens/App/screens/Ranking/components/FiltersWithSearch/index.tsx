import React, { useState } from 'react';
import classNames from 'classnames';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Icon from '../../../../components/Icon';
import SortingDropdown from './components/SortingDropdown';
import FilterBar from './components/FilterBar';
import SearchInput from './components/SearchInput';
import { useFilterParams } from '../../hooks/useFilterParams';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActionButtonsProps } from './typings';

const FiltersWithSearch = ({ dropdownLists }: ActionButtonsProps) => {
  const { filterParams, resetFilters } = useFilterParams();
  const [areOptionsVisible, setOptionsVisible] = useState(false);
  const areFiltersActive = Object.keys(filterParams).length > 0;

  return (
    <div className={classNames(styles.ButtonWrapper, 'hide-on-print')}>
      {/* tablet/desktop */}
      <div
        className={classNames(grid.HiddenSmDown, styles.FilterButtonWrapper)}
      >
        <FilterBar dropdownLists={dropdownLists} />
        <SearchInput />
        {areFiltersActive && (
          <ButtonWithLoading
            ariaLabel="resetFilter"
            size="small"
            variant="tertiary"
            onClick={resetFilters}
            addClass={styles.ResetButton}
          >
            Zurücksetzen
          </ButtonWithLoading>
        )}
      </div>
      {/* mobile */}
      <div className={grid.HiddenSmUp}>
        <SearchInput />
        {areFiltersActive && (
          <ButtonWithLoading
            ariaLabel="resetFilter"
            size="small"
            variant="tertiary"
            onClick={resetFilters}
            addClass={styles.ResetButton}
          >
            Zurücksetzen
          </ButtonWithLoading>
        )}
        <ButtonWithLoading
          ariaLabel="resetFilter"
          size="small"
          variant="primary"
          addClass={classNames({ [styles.Hidden]: areOptionsVisible })}
          iconTypeLeft="IconSliders"
          onClick={() => setOptionsVisible(!areOptionsVisible)}
          mobileFullWidth
        >
          Filtern & Sortieren
        </ButtonWithLoading>
        <div className={classNames({ [styles.Hidden]: !areOptionsVisible })}>
          <div>
            <div className={styles.OptionsHeader}>
              <span
                className={styles.HeaderTitle}
              >{`Filtern & Sortieren`}</span>
              <span
                className={styles.OptionCloseIcon}
                tabIndex={0}
                role="button"
                aria-label="Close"
                onClick={() => setOptionsVisible(false)}
                onKeyUp={() => () => setOptionsVisible(false)}
              >
                <Icon type="IconXMark" />
              </span>
            </div>
            <div>
              <div className={styles.ActionDescription}>Sortieren nach</div>
              <SortingDropdown />
            </div>
            <div className={styles.ActionDescription}>Filtern nach</div>
            <div className={styles.FilterButtonWrapper}>
              <FilterBar dropdownLists={dropdownLists} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersWithSearch;
