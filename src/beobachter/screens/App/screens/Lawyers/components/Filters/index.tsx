import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
import FilterAreaExpansionPanel from '../FilterAreaExpansionPanel';
import FilterExpansionPanel from '../FilterExpansionPanel';
import {
  additionalQualifications,
  cantoneList,
  languageList,
  salutationList,
} from './filtersList';
import styles from './styles.legacy.css';
import { ColumnNames } from '../types';

type Filter = {
  id: string;
  value: string | string[];
};

interface FiltersProps {
  columnFilters: Filter[];
  onColumnFilterChange: any;
  areasOfActivity: Record<string, { areas: string[]; isOpen?: boolean }>;
}

const Filters = ({
  columnFilters,
  onColumnFilterChange,
  areasOfActivity,
}: FiltersProps) => {
  const filterCount = columnFilters.reduce(
    (acc, filter) => acc + filter.value.length,
    0,
  );

  const toggleArrayFilter = (
    id: string,
    value: string,
    singleValueOnly: boolean = false,
  ) => {
    const filterIndex = columnFilters.findIndex((filter) => filter.id === id);

    if (filterIndex === -1) {
      onColumnFilterChange((prevState: any) => [
        ...prevState,
        { id, value: [value] },
      ]);
      return;
    }

    const currentFilter = columnFilters[filterIndex];

    if (!Array.isArray(currentFilter.value)) {
      return;
    }

    if (currentFilter.value.includes(value)) {
      let arrCopy = [...columnFilters];

      arrCopy[filterIndex].value = currentFilter.value.filter(
        (currentValue) => currentValue !== value,
      );
      arrCopy = arrCopy.filter((arr) => arr.value.length !== 0);

      onColumnFilterChange(arrCopy);
      return;
    }

    const arrCopy = [...columnFilters];
    if (singleValueOnly) {
      arrCopy[filterIndex].value = [value];
    } else {
      arrCopy[filterIndex].value = [...arrCopy[filterIndex].value, value];
    }

    onColumnFilterChange(arrCopy);
  };

  const title = filterCount ? (
    <>
      {`${filterCount} Filter`}
      <button
        className={styles.ClearButton}
        onClick={() => onColumnFilterChange([])}
        aria-label="Filter löschen"
      >
        <Icon type="IconXMark" />
      </button>
    </>
  ) : (
    'Filter'
  );

  return (
    <div className={styles.Filters}>
      <FilterExpansionPanel title={title} toggleOnChildrenClick={false}>
        <FilterAreaExpansionPanel
          title="Ansprache"
          isOpen={true}
          toggleOnChildrenClick={false}
        >
          <div className={styles.FiltersList}>
            {salutationList.map((salutation) => {
              const isActive = columnFilters.find((columnFilter) =>
                columnFilter.value.includes(salutation),
              );
              return (
                <button
                  key={salutation}
                  onClick={() =>
                    toggleArrayFilter(ColumnNames.salutation, salutation, true)
                  }
                  className={classNames(styles.FilterButton, {
                    [styles.Active]: isActive,
                  })}
                  aria-pressed={isActive ? 'true' : 'false'}
                  aria-label={`Filtern nach Ansprache: ${salutation}`}
                >
                  <span>{salutation}</span>
                </button>
              );
            })}
          </div>
        </FilterAreaExpansionPanel>
        <div className={styles.FiltersWrapper}>
          <div className={styles.CustomFilters}>
            <FilterAreaExpansionPanel
              title="Kantone"
              isOpen={true}
              toggleOnChildrenClick={false}
            >
              <div className={styles.FiltersList}>
                {cantoneList.map((cantone) => {
                  const isActive = columnFilters.find((columnFilter) =>
                    columnFilter.value.includes(cantone),
                  );
                  return (
                    <button
                      key={cantone}
                      onClick={() =>
                        toggleArrayFilter(ColumnNames.cantons, cantone)
                      }
                      className={classNames(styles.FilterButton, {
                        [styles.Active]: isActive,
                      })}
                      aria-pressed={isActive ? 'true' : 'false'}
                      aria-label={`Filtern nach Kantone: ${cantone}`}
                    >
                      <span>{cantone}</span>
                    </button>
                  );
                })}
              </div>
            </FilterAreaExpansionPanel>
          </div>

          <div className={styles.CustomFilters}>
            <FilterAreaExpansionPanel
              title="Sprachen"
              isOpen={true}
              toggleOnChildrenClick={false}
            >
              <div className={styles.FiltersList}>
                {languageList.map((language) => {
                  const isActive = columnFilters.find((columnFilter) =>
                    columnFilter.value.includes(language),
                  );
                  return (
                    <button
                      key={language}
                      onClick={() =>
                        toggleArrayFilter(ColumnNames.languages, language)
                      }
                      className={classNames(styles.FilterButton, {
                        [styles.Active]: isActive,
                      })}
                      aria-pressed={isActive ? 'true' : 'false'}
                      aria-label={`Filtern nach Sprachen: ${language}`}
                    >
                      <span>{language}</span>
                    </button>
                  );
                })}
              </div>
            </FilterAreaExpansionPanel>
          </div>

          <div className={styles.CustomFilters}>
            <FilterAreaExpansionPanel
              title="Zusatzqualifikationen"
              isOpen={true}
              toggleOnChildrenClick={false}
            >
              <div className={styles.FiltersList}>
                {additionalQualifications.map((qualification) => {
                  const isActive = columnFilters.find((columnFilter) =>
                    columnFilter.value.includes(qualification),
                  );
                  return (
                    <button
                      key={qualification}
                      onClick={() =>
                        toggleArrayFilter(
                          ColumnNames.additionalQualifications,
                          qualification,
                        )
                      }
                      className={classNames(styles.FilterButton, {
                        [styles.Active]: isActive,
                      })}
                      aria-pressed={isActive ? 'true' : 'false'}
                      aria-label={`Filtern nach Zusatzqualifikationen: ${qualification}`}
                    >
                      <span>{qualification}</span>
                    </button>
                  );
                })}
              </div>
            </FilterAreaExpansionPanel>
          </div>
        </div>
        <div className={styles.CustomFilters}>
          <h2 className={styles.FilterTitle}>Tätigkeitsbereiche</h2>

          {Object.keys(areasOfActivity).map((name) => {
            const areas = areasOfActivity[name].areas.sort();
            const isOpen = areasOfActivity[name].isOpen;
            return (
              <FilterAreaExpansionPanel
                title={name}
                key={name}
                isOpen={isOpen}
                toggleOnChildrenClick={false}
              >
                <div key={name} className={styles.FiltersList}>
                  {areas.map((areaOfActivity) => {
                    const isActive = columnFilters.find((columnFilter) =>
                      columnFilter.value.includes(areaOfActivity),
                    );
                    return (
                      <button
                        key={areaOfActivity}
                        onClick={() =>
                          toggleArrayFilter(
                            ColumnNames.areasOfActivity,
                            areaOfActivity,
                          )
                        }
                        className={classNames(styles.FilterButton, {
                          [styles.Active]: isActive,
                        })}
                        aria-pressed={isActive ? 'true' : 'false'}
                        aria-label={`Filtern nach Tätigkeitsbereiche: ${areaOfActivity}`}
                      >
                        <span>{areaOfActivity}</span>
                      </button>
                    );
                  })}
                </div>
              </FilterAreaExpansionPanel>
            );
          })}
        </div>
      </FilterExpansionPanel>
    </div>
  );
};

export default Filters;
