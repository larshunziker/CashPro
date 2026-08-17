import React, { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../../../Icon';
import Autocomplete from '../Autocomplete';
import styles from './styles.legacy.css';
import { SearchFormProps } from './typings';

type SearchFormPropsInner = SearchFormProps;

const MIN_QUERY_LENGTH = 2;

const SearchForm = ({
  addClass = '',
  focusOnMount = true,
  ignoreDefaultClass = false,
  initialQuery = '',
  placeholder = 'Suchbegriff eingeben',
  searchButtonClass = '',
  searchButtonText = '',
  shouldShowSearchIcon = true,
  searchInputClass = '',
  searchInputWrapperClass = '',
  resetButtonClass = '',
  resetButtonIconClass = '',
  autocompleteWrapperClass = '',
}: SearchFormPropsInner) => {
  const navigate = useNavigate();
  const [isInitialQueryValid, setIsInitialQueryValid] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);

  const inputRef = useRef(null);

  const isSearchQuery = searchQuery !== null && searchQuery !== '';
  const showAutocomplete = isAutocompleteVisible && isSearchQuery;

  useEffect(() => {
    if (focusOnMount) {
      /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
      inputRef.current && inputRef.current.focus();
    }
  }, [focusOnMount]);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);
    setIsAutocompleteVisible(true);
  };

  const resetSearchQueryHandler = () => {
    setSearchQuery('');
    setIsInitialQueryValid(false);
    /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
    inputRef.current && inputRef.current.focus();
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const submitHandler = (event) => {
    event.preventDefault();

    if (searchQuery && searchQuery.length >= MIN_QUERY_LENGTH) {
      // close autocomplete box
      setIsAutocompleteVisible(false);

      // navigate to search page
      const encodedQuery: string = encodeURIComponent(
        searchQuery.toLowerCase(),
      );
      navigate(`/suche/all/${encodedQuery}`);
    }
  };

  return (
    <form
      action="/suche/all"
      autoComplete="off"
      className={classNames('search-form', {
        [styles.SearchForm]: !ignoreDefaultClass,
        [addClass]: !!addClass,
      })}
      onSubmit={(event) => submitHandler(event)}
    >
      <div
        className={classNames(
          styles.SearchInputWrapper,
          searchInputWrapperClass,
        )}
      >
        {!shouldShowSearchIcon && (
          <Icon type="IconMagnifyingGlass" addClass={styles.SearchIcon} />
        )}
        <input
          id="query"
          className={classNames(styles.SearchInput, searchInputClass)}
          placeholder={placeholder}
          type="text"
          value={searchQuery}
          onChange={searchChangeHandler}
          ref={inputRef}
          aria-label="Suchbegriff"
          name="search"
        />
        {(isSearchQuery || (isInitialQueryValid && initialQuery)) && (
          <button
            type="button"
            className={classNames(styles.ResetButton, resetButtonClass)}
            onClick={resetSearchQueryHandler}
            aria-label="Suchfeld zurücksetzen"
          >
            <Icon
              type="IconXMark"
              addClass={classNames(styles.ActionIcon, resetButtonIconClass)}
            />
          </button>
        )}
      </div>

      <button
        type="submit"
        className={classNames(styles.SearchButton, searchButtonClass)}
        aria-label="suchen"
      >
        {shouldShowSearchIcon && (
          <Icon type="IconMagnifyingGlass" addClass={styles.ActionIcon} />
        )}
        {searchButtonText}
      </button>

      <div
        className={classNames(
          styles.AutocompleteWrapper,
          autocompleteWrapperClass,
        )}
      >
        {showAutocomplete && (
          <Autocomplete
            addClass={styles.Autocomplete}
            queryString={searchQuery}
            updateQueryString={setSearchQuery}
            minQueryLength={MIN_QUERY_LENGTH}
          />
        )}
      </div>
    </form>
  );
};

export default memo<SearchFormProps>(SearchForm);
