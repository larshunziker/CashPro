import React, { FormEvent, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import AutoSuggestions from './components/AutoSuggestions';
import { ROUTE_LEGAL_ADVICE } from '../../constants';
import styles from './styles.legacy.css';

const SEARCH_ID = 'LegalAdviceSearchInput';

type LegalAdviceSearchProps = {
  label?: string;
  defaultValue?: string;
  addClass?: string;
  placeholder?: string;
  hasSuggestions?: boolean;
  preserveScrollProgress?: boolean;
  isLabelHidden?: boolean;
  buttonText?: string;
};

const LegalAdviceSearch = ({
  label = 'Rechtsratgeber durchsuchen',
  defaultValue = '',
  addClass = '',
  placeholder = 'Ihre Suchanfrage',
  hasSuggestions = true,
  preserveScrollProgress = false,
  isLabelHidden = false,
  buttonText = 'Suche',
}: LegalAdviceSearchProps) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(
    decodeURIComponent(defaultValue),
  );
  const [hasInputFocus, setHasInputFocus] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const kmu = new URLSearchParams(location.search).get('kmu');
  /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
  const focusInput = () => inputRef.current?.focus();
  const handleClearInput = () => {
    setInputValue('');
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const encodedURI = encodeURIComponent(inputValue.toLowerCase());
    const newQueryParams = {
      ...(encodedURI && { q: encodedURI }),
      ...(kmu && { kmu }),
    };

    const queryParams = new URLSearchParams(newQueryParams).toString();

    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    navigate({
      pathname: `/${ROUTE_LEGAL_ADVICE}`,
      search: queryParams,
      hash: preserveScrollProgress && '#0',
    });
  };

  return (
    <form
      className={classNames(styles.Wrapper, { [addClass]: !!addClass })}
      onSubmit={handleSearch}
    >
      {!isLabelHidden && (
        <label className={styles.Label} htmlFor={SEARCH_ID}>
          {label}
        </label>
      )}

      {/* eslint-disable-next-line*/}
      <div
        className={classNames(styles.InputWrapper, {
          [styles.InputFocused]: hasInputFocus,
        })}
        onClick={focusInput}
      >
        <input
          ref={inputRef}
          name="q"
          id={SEARCH_ID}
          type="search"
          aria-label={label}
          placeholder={placeholder}
          className={styles.Input}
          value={inputValue}
          onChange={(event) => {
            const { value: inputValue } = event.target;
            setInputValue(inputValue);

            if (inputValue.length > 2) {
              setShowAutoComplete(true);
            } else {
              setShowAutoComplete(false);
            }
          }}
          onFocus={() => setHasInputFocus(true)}
          onBlur={() => setHasInputFocus(false)}
        />

        {inputValue && (
          <div
            data-testid="rechtsratgeber-search-reset-button"
            onClick={handleClearInput}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleClearInput();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Rechtsratgeber suche zurücksetzen"
            className={styles.IconClear}
          >
            <Icon type="IconXMark" />
          </div>
        )}

        <button className={styles.SearchButton}>
          <Icon type="IconMagnifyingGlass" />
          <span className={styles.SearchButtonText}>{buttonText}</span>
        </button>
      </div>

      {hasSuggestions && showAutoComplete && (
        <AutoSuggestions
          searchQuery={inputValue}
          setInputValue={setInputValue}
          hideAutoComplete={() => setShowAutoComplete(false)}
        />
      )}
    </form>
  );
};

export default LegalAdviceSearch;
