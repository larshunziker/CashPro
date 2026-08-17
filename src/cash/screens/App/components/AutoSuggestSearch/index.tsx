import React, {
  ReactElement,
  RefObject,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { getSearchResults } from './helpers';
import AutoSuggestSearchForm from './components/AutoSuggestSearchForm';
import AutoSuggestSearchResults from './components/AutoSuggestSearchResults';
import { NON_SIX_MARKETS } from '../../constants';
import { SEARCH_RESULT_CONFIG } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_AUTO_SUGGEST_SEARCH_ENTITIES } from './queries';
import resultStyles from './components/AutoSuggestSearchResults/styles.legacy.css';
import styles from './styles.legacy.css';
import { AutoSuggestSearchProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  resultStyles.Wrapper,
  resultStyles.ItemName,
  resultStyles.ItemAttributes,
  resultStyles.ResultTitle,
  resultStyles.Link,
  resultStyles.LinkColor,
  resultStyles.IsActive,
];

function useRefCallback(): [React.LegacyRef<HTMLDivElement>, number] {
  // used for smooth transitions after having found search results
  const [refValue, setRefValue] = useState(0);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
  const setRef = useCallback((node) => {
    setRefValue(node?.clientHeight || 0);
  }, []);

  return [setRef, refValue];
}

const QUERY_LIMIT = 5;

type AutoSuggestSearchQueryComponentProps = {
  textSearch: SearchResults;
};

const AutoSuggestSearch = forwardRef(
  (
    {
      isDisabled = false,
      showErrorMessage = false,
      placeholder = 'Suche',
      onClickResult,
      appInputAriaLabel,
      searchResultConfig = SEARCH_RESULT_CONFIG,
      resultWithBorder = true,
      placeholderStyle = '',
      errorMessage = '',
      searchResultHeight,
      isInsideDrawer = false,
      origin,
    }: AutoSuggestSearchProps,
    ref,
  ): ReactElement => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [hasInputFocus, setHasInputFocus] = useState(false);
    const autoSuggestSearchRef = useRef<HTMLDivElement>();
    const [setRef, SearchResultRefHeight] = useRefCallback();
    const inputRef: RefObject<HTMLInputElement> = createRef();
    const variables = {
      query: searchQuery,
      limit: QUERY_LIMIT,
    };
    const adjustHeightTransition =
      (showAutocomplete && SearchResultRefHeight) || 0;

    const { data: searchResultsData, loading } =
      useQuery<AutoSuggestSearchQueryComponentProps>(
        GET_AUTO_SUGGEST_SEARCH_ENTITIES,
        {
          variables,
          skip: !showAutocomplete,
        },
      );

    const isAlerts = origin === 'alerts';
    const { textSearch } = searchResultsData || {};
    const searchResults = getSearchResults(textSearch);
    const filteredSearchResults = searchResults
      .filter(
        ({ items, type }) =>
          items && items.length > 0 && searchResultConfig.includes(type),
      )
      .map(({ items, ...rest }) => ({
        ...rest,
        items:
          (isAlerts &&
            items.filter((item: any) => {
              const marketId =
                item?.marketId ||
                item?.instrumentKey?.split('-')?.[1] ||
                item?.listingId?.split('-')?.[1];
              return !NON_SIX_MARKETS.includes(marketId);
            })) ||
          items,
      }));

    const noSearchResults = filteredSearchResults.every(
      ({ items }) => !items || items.length === 0,
    );

    let focusIndex = -1;

    /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'shiftKey' implicitly has an 'any' type. */
    const handleKeyUp = ({ key, shiftKey }) => {
      const ref = autoSuggestSearchRef.current;
      const scrollContainer =
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        ref.closest('#scrollable-drawer-content') ||
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        ref.querySelector('.autosuggest-result-wrapper');
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      const results = ref.querySelectorAll('.' + resultStyles.ResultListItem);
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      const inputElement = ref.querySelector(
        '.autosuggest-input',
      ) as HTMLElement;

      const resultsArray = [...results] as HTMLElement[];
      const isUp = key === 'ArrowUp' || (shiftKey && key === 'Tab');
      const isDown = key === 'ArrowDown' || (!shiftKey && key === 'Tab');
      const maxIndex = results.length - 1;

      if (isUp) {
        focusIndex = focusIndex > -1 ? focusIndex - 1 : 0;

        if (focusIndex === -1) inputElement.focus();
      }

      if (isDown) {
        focusIndex = focusIndex < maxIndex ? focusIndex + 1 : maxIndex;
      }

      if (key === 'Enter') {
        const selectedResult = resultsArray[focusIndex]?.querySelector('a');
        selectedResult?.click();
      }

      resultsArray.forEach((el) => el.classList.remove(resultStyles.IsActive));
      resultsArray[focusIndex]?.classList.add(resultStyles.IsActive);

      if (scrollContainer) {
        scrollContainer.scrollTop =
          resultsArray[focusIndex - 1]?.offsetTop + 18;
      }
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const handleSubmit = (event) => {
      event.preventDefault();
    };

    const handleScroll = () => {
      if (hasInputFocus && showAutocomplete) {
        inputRef?.current?.blur();
      }
    };

    /* @ts-ignore TODO: TS7031 ->  Binding element 'target' implicitly has an 'any' type. */
    const handleUpdateQuery = ({ target }) => {
      setSearchQuery(target.value);
      if (target.value.length > 2) {
        setShowAutocomplete(true);
      } else if (target.value.length < 1) {
        setShowAutocomplete(false);
      } else {
        setShowAutocomplete(false);
      }
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const disableArrowKeysForInput = useCallback((event) => {
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }
    }, []);

    const handleOutsideClick = useCallback(() => {
      if (showAutocomplete && !isInsideDrawer) {
        setShowAutocomplete(false);
        setSearchQuery('');
      }

      if (isInsideDrawer && showAutocomplete && searchQuery.length < 3) {
        setShowAutocomplete(false);
      }
    }, [showAutocomplete, isInsideDrawer, searchQuery?.length]);

    useImperativeHandle(ref, () => ({
      closeSearchResult() {
        setShowAutocomplete(false);
      },
      clearInputfield() {
        setSearchQuery('');
      },
    }));

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', disableArrowKeysForInput);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', disableArrowKeysForInput);
      };
    }, [handleOutsideClick, disableArrowKeysForInput]);

    return (
      <div
        /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
        ref={autoSuggestSearchRef}
        onTouchMove={handleScroll}
        onKeyUp={handleKeyUp}
        role="presentation"
        className={classNames(styles.Wrapper, 'hide-on-print')}
      >
        <AutoSuggestSearchForm
          formSubmit={handleSubmit}
          handleUpdateQuery={handleUpdateQuery}
          searchQuery={searchQuery}
          showLoader={loading}
          placeholder={placeholder}
          isDisabled={isDisabled}
          appInputAriaLabel={appInputAriaLabel}
          showErrorMessage={showErrorMessage}
          addClass={placeholderStyle}
          errorMessage={errorMessage}
          hasInputFocus={hasInputFocus}
          setHasInputFocus={setHasInputFocus}
          inputRef={inputRef}
        />

        <div
          style={{
            maxHeight: searchResultHeight,
            /* @ts-ignore TODO: TS2322 ->  Type 'number | false' is not assignable to type 'Height<string | number> | undefined'. */
            height:
              !resultWithBorder && !noSearchResults && adjustHeightTransition,
          }}
          className={classNames('autosuggest-result-wrapper', {
            [styles.ResultWrapper]: resultWithBorder,
            [styles.ResultWrapperWithoutBorder]: !resultWithBorder,
            [styles.Border]:
              resultWithBorder &&
              showAutocomplete &&
              searchResultHeight &&
              !loading,
          })}
        >
          {showAutocomplete && !loading && searchResultsData?.textSearch && (
            <>
              {noSearchResults ? (
                <div className={styles.Error}>
                  Die Suche ergab keine Treffer
                </div>
              ) : (
                <div
                  ref={setRef}
                  className={classNames({
                    [styles.HasSearchResults]: !resultWithBorder,
                  })}
                >
                  {filteredSearchResults.map(({ title, items }) => (
                    <AutoSuggestSearchResults
                      key={title}
                      title={title}
                      items={items}
                      handleSearchResults={onClickResult}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

export default AutoSuggestSearch;
