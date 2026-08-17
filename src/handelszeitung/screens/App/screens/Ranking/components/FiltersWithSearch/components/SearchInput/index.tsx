import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFilterParams } from '../../../../hooks/useFilterParams';
import Icon from '../../../../../../components/Icon';
import styles from './styles.legacy.css';
import { SearchInputProps } from './typings';

const SearchInput = ({ addClass = '' }: SearchInputProps) => {
  const [hasInputFocus, setHasInputFocus] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const { filterParams, updateFilter } = useFilterParams();

  useEffect(() => {
    if (inputRef?.current)
      if (filterParams.suche) {
        /* @ts-ignore TODO: TS2339 ->  Property 'value' does not exist on type 'never'. */
        inputRef.current.value = decodeURIComponent(filterParams.suche);
      } else {
        /* @ts-ignore TODO: TS2339 ->  Property 'value' does not exist on type 'never'. */
        inputRef.current.value = '';
      }
  }, [filterParams]);

  return (
    <div className={styles.InputWrapper}>
      <div
        className={classNames(styles.InputWithIconWrapper, {
          [styles.InputStylesInputFocused || '']:
            hasInputFocus || !!filterParams.suche,
        })}
      >
        <Icon
          type={'IconMagnifyingGlass'}
          addClass={classNames(styles.InputIcon, {
            [addClass]: !!addClass,
          })}
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          onClick={() => inputRef.current.focus()}
        />
        <input
          key={filterParams.suche}
          // eslint-disable-next-line
          autoFocus={hasInputFocus}
          name="ranking-search-input"
          type="search"
          aria-label="ranking-search-input"
          placeholder="Suche"
          className={classNames(styles.Input, {
            [styles.InputStylesInputFocused || '']:
              hasInputFocus || !!filterParams.suche,
          })}
          ref={inputRef}
          onChange={(e) => {
            if (debounceTimeoutRef?.current) {
              clearTimeout(debounceTimeoutRef.current);
            }
            if (e.target.value.length === 0) {
              updateFilter('suche', '');
              setHasInputFocus(true);
            } else {
              /* @ts-ignore TODO: TS2322 ->  Type 'Timeout' is not assignable to type 'null'. */
              debounceTimeoutRef.current = setTimeout(() => {
                updateFilter('suche', e.target.value);
              }, 500);
            }
          }}
          onFocus={() => setHasInputFocus(true)}
          onBlur={() => setHasInputFocus(false)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
