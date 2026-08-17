import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ROUTE_LEGAL_ADVICE } from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.js'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/A */
import suggestionsQuery from './queries.js';
import styles from './styles.legacy.css';

type AutoSuggestionsProps = {
  searchQuery: string;
  setInputValue: (inputValue: string) => void;
  hideAutoComplete: () => void;
};

const AutoSuggestions = ({
  searchQuery,
  setInputValue,
  hideAutoComplete,
}: AutoSuggestionsProps) => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(suggestionsQuery, {
    variables: {
      SearchValue: searchQuery,
    },
  });

  const autoSuggestionsData = (!loading && data?.suggestionsResults) || [];

  const handleOutsideClick = useCallback(() => {
    hideAutoComplete();
  }, [hideAutoComplete]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  if (!autoSuggestionsData.length) {
    return null;
  }

  return (
    <ul className={styles.ListWrapper}>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'suggestion' implicitly has an 'any' type. */}
      {autoSuggestionsData.map((suggestion) => (
        <li key={suggestion.name} className={styles.ListItem}>
          <button
            className={styles.ListButton}
            onClick={() => {
              hideAutoComplete();
              setInputValue(suggestion.name);

              const kmu = new URLSearchParams(location.search).get('kmu');
              const encodedURI = encodeURIComponent(
                suggestion.name.toLowerCase(),
              );
              const newQueryParams = {
                q: encodedURI,
                ...(kmu && { kmu }),
              };

              const queryParams = new URLSearchParams(newQueryParams);

              const path = `/${ROUTE_LEGAL_ADVICE}`;

              navigate(path + `?${queryParams.toString()}` + '#0');
            }}
          >
            {suggestion.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AutoSuggestions;
