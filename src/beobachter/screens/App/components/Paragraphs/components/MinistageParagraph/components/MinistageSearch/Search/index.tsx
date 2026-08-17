import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../../../../../../Icon';
import styles from './styles.legacy.css';
const MIN_QUERY_LENGTH = 2;

const Search = ({
  buttonText = 'Suche',
  placeholder = 'Beobachter durchsuchen',
}: {
  buttonText?: string;
  placeholder?: string;
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef(null);

  const isSearchQuery = searchQuery !== null && searchQuery !== '';

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const resetSearchQueryHandler = () => {
    setSearchQuery('');
    /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
    inputRef.current && inputRef.current.focus();
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const submitHandler = (event) => {
    event.preventDefault();

    if (searchQuery && searchQuery.length >= MIN_QUERY_LENGTH) {
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
      className={classNames('search-form', styles.Wrapper)}
      onSubmit={(event) => submitHandler(event)}
    >
      <div className={styles.InputWrapper}>
        <input
          id="query"
          className={styles.Input}
          placeholder={placeholder}
          type="search"
          value={searchQuery}
          onChange={searchChangeHandler}
          ref={inputRef}
          aria-label="Suchbegriff"
          name="search"
        />
        {isSearchQuery && (
          <div
            className={styles.IconClear}
            onClick={resetSearchQueryHandler}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                resetSearchQueryHandler();
              }
            }}
            tabIndex={0}
            aria-label="Suchfeld zurücksetzen"
            role="button"
          >
            <Icon type="IconXMark" />
          </div>
        )}
        <button className={styles.SearchButton}>
          <Icon type="IconMagnifyingGlass" />
          <span className={styles.SearchButtonText}>{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

export default Search;
