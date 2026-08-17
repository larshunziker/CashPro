import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { compose, withHandlers } from 'recompose';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/decorators/withKeyBindings'. '/Users/bh */
import withKeyBindings from '../../../../../../../../../shared/decorators/withKeyBindings';
import { searchToggle as searchToggleAction } from '../../../../../../../../../shared/actions/search';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import SearchIcon from '../../../../components/SearchIcon/index';
import {
  AUTOCOMPLETE_ITEMS,
  MIN_QUERY_LENGTH,
  keyBindingConfig,
  withAutocompleteSelectedIndex,
  withAutocompleteVisibleState,
  withDebouncedSearchQueryState,
  withExtendedHandlers,
  withExtendedSubmitHandler,
  withInitialQueryValidState,
  withInputReferenceState,
  withSearchQueryState,
  withStoreConnection,
  withUpdatePolicy,
} from '../../shared/logic';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_SEARCH,
} from '../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_AUTOCOMPLETE_RESULTS } from './queries';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import gaultMillau from '../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from '../../shared/styles.legacy.css';
import { SearchFormProps } from '../../shared/typings';

type SearchFormPropsInner = SearchFormProps & {
  language: string;
  debouncedSearchQuery: string;
};

const msgs = defineMessages({
  aroundMeLabel: {
    id: 'app.searchForm.aroundMeButton',
    description: 'Label of around me button on search form',
    defaultMessage: 'In meiner Nähe',
  },
});

/* @ts-ignore TODO: TS7031 ->  Binding element 'item' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
export const AutocompleteItems = ({ props = {}, item, index }) => {
  if (!item || !item.node || !item.node.preferredUri || !item.node.title) {
    return null;
  }

  return (
    <li key={item.node.id} data-testid="default-search-form-autocomplete-item">
      <Link
        path={item.node.preferredUri}
        // @ts-ignore
        onClick={props?.onBeforeNavigate}
        className={classNames(styles.AutocompleteItem, {
          [styles.AutocompleteItemActive]:
            // @ts-ignore
            props?.autocompleteSelectedIndex === index,
        })}
      >
        {item.node.title}
        {item.node.organizationData &&
          item.node.organizationData.secondaryName &&
          `, ${item.node.organizationData.secondaryName} `}
      </Link>
    </li>
  );
};

const SearchFormComponent = ({
  addClass = '',
  data,
  focusOnMount = true,
  handleSubmit,
  initialQuery = '',
  isInitialQueryValid,
  placeholder,
  searchInputRef,
  searchQuery,
  resetSearchQuery,
  updateSearchQuery,
  isAutocompleteVisible,
  onKeyDownHandler,
  renderAutocompleteItems,
  disableGrid = false,
  intl,
  hideSearch,
  onSubmitRoute = URL_DE_SEARCH,
}: SearchFormProps) => {
  const globalSearch = data?.globalSearch;

  return (
    <form
      autoComplete="off"
      data-testid="default-search-form-wrapper"
      className={classNames('search-form', styles.SearchForm, {
        [addClass]: !!addClass,
      })}
      onSubmit={handleSubmit}
      action={onSubmitRoute}
    >
      <div
        className={classNames({ [styles.SearchInputWrapper]: !disableGrid })}
      >
        <div
          className={classNames({
            [styles.SearchInputWrapperRow]: !disableGrid,
          })}
        >
          <div
            className={classNames(styles.SearchInputCol, {
              [grid.ColXs24]: !disableGrid,
            })}
          >
            <input
              id="query"
              className={styles.SearchInput}
              placeholder={placeholder}
              type="text"
              data-testid="default-search-form-input-field"
              value={searchQuery !== null ? searchQuery : initialQuery}
              onChange={updateSearchQuery}
              onKeyDown={onKeyDownHandler}
              ref={(focusOnMount && searchInputRef) || null}
              aria-label="Auf Gault&Millau suchen"
              name="search"
            />

            {(searchQuery !== null && searchQuery !== '') ||
            (isInitialQueryValid && initialQuery) ? (
              <button
                type="button"
                className={styles.ResetIcon}
                onClick={resetSearchQuery}
                aria-label="Suche zurücksetzen"
              >
                <Icon type="IconCross" iconsOverride={gaultMillau} />
              </button>
            ) : (
              <SearchIcon className={styles.Glass} />
            )}

            {(isAutocompleteVisible &&
              globalSearch &&
              globalSearch.edges &&
              globalSearch.edges.length > 0 && (
                <div className={styles.AutocompleteWrapper}>
                  <ul
                    className={classNames('autocomplete', styles.Autocomplete)}
                  >
                    {globalSearch.edges.map(renderAutocompleteItems)}
                  </ul>
                </div>
              )) ||
              null}

            <Link
              onClick={hideSearch}
              className={styles.SearchAroundMe}
              path="/map/?aroundme=true"
              label={intl.formatMessage(msgs.aroundMeLabel)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  searchToggle: searchToggleAction,
};

const withExtendHideSearch = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  hideSearch: (props: any) => () => {
    props.searchToggle(false);
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const withAutocompleteItemsRenderer = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  renderAutocompleteItems: (props: any) => (item, index) => (
    <AutocompleteItems props={props} item={item} index={index} />
  ),
});

const SearchForm = (props: SearchFormPropsInner) => {
  const debouncedSearchQuery = props.debouncedSearchQuery || '';

  const { data } = useQuery(GET_AUTOCOMPLETE_RESULTS, {
    skip:
      !debouncedSearchQuery || debouncedSearchQuery.length < MIN_QUERY_LENGTH,
    variables: {
      char: debouncedSearchQuery && `${debouncedSearchQuery}*`,
      pageSize: AUTOCOMPLETE_ITEMS,
      language: props.language || '',
      publication:
        props.language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
    },
  });

  return <SearchFormComponent {...props} data={data} />;
};

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withInitialQueryValidState,
  withSearchQueryState,
  withDebouncedSearchQueryState,
  withAutocompleteVisibleState,
  withInputReferenceState,
  withExtendedSubmitHandler,
  withExtendedHandlers,
  withAutocompleteSelectedIndex,
  withAutocompleteItemsRenderer,
  withStoreConnection,
  withKeyBindings(keyBindingConfig),
  withExtendHideSearch,
  withUpdatePolicy,
)(SearchForm);
