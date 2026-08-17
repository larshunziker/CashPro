import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { compose, withHandlers } from 'recompose';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import update from 'immutability-helper';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/decorators/withKeyBindings'. '/Users/bh */
import withKeyBindings from '../../../../../../../../../shared/decorators/withKeyBindings';
import withNavigate from '../../../../../../../../../shared/decorators/withNavigate';
import { searchToggle as searchToggleAction } from '../../../../../../../../../shared/actions/search';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import SearchIcon from '../../../../components/SearchIcon/index';
import {
  AUTOCOMPLETE_ITEMS,
  MIN_QUERY_LENGTH,
  withAutocompleteSelectedIndex,
  withAutocompleteVisibleState,
  withDebouncedSearchQueryState,
  withExtendedHandlers,
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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.js'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/ */
import { GET_RESTAURANT_AUTOCOMPLETE_RESULTS } from './queries.js';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import gaultMillau from '../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from '../../shared/styles.legacy.css';
import { SearchFormProps } from '../../shared/typings';

const msgs = defineMessages({
  aroundMeLabel: {
    id: 'app.searchForm.restaurants.aroundMeButton',
    description: 'Label of around me button on search form',
    defaultMessage: 'In meiner Nähe',
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
export const doRenderAutocompleteItems = (props, item, index) => {
  if (item.__typename === 'FacetedSearchEdge') {
    if (!item || !item.node || !item.node.name || !item.node.count) {
      return null;
    }

    return (
      <li key={index} data-testid="restaurant-search-form-autocomplete-city">
        <Link
          path={
            (props.language === 'fr' ? '/fr/map/' : '/map/') + item.node.name
          }
          onClick={props.onBeforeNavigate}
          className={classNames(styles.AutocompleteItem, {
            [styles.AutocompleteItemActive]:
              props.autocompleteSelectedIndex === index,
          })}
        >
          <Icon
            type="IconLocator"
            iconsOverride={gaultMillau}
            addClass={styles.Location}
          />
          <span>
            {`Restaurants ${props.language === 'fr' ? 'à' : 'in'} ${
              item.node.name
            } (${item.node.count})`}
          </span>
        </Link>
      </li>
    );
  }

  if (item.__typename === 'OrganizationEdge') {
    if (
      !item ||
      !item.node ||
      !item.node.preferredUri ||
      !item.node.phone ||
      !item.node.city ||
      !item.node.title
    ) {
      return null;
    }

    return (
      <li
        key={index}
        data-testid="restaurant-search-form-autocomplete-organization"
      >
        <Link
          path={item.node.preferredUri}
          onClick={props.onBeforeNavigate}
          className={classNames(styles.AutocompleteItem, {
            [styles.AutocompleteItemActive]:
              props.autocompleteSelectedIndex === index,
          })}
        >
          {item.node.title}
          {item.node.organizationData &&
            item.node.organizationData.secondaryName &&
            `, ${item.node.organizationData.secondaryName} `}
        </Link>
      </li>
    );
  }

  return null;
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
  const restaurantsSearch = data?.environment?.restaurantsSearch;
  const citySearch = data?.environment?.citySearch;

  return (
    <form
      data-testid="restaurant-search-form-wrapper"
      autoComplete="off"
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
              data-testid="restaurant-search-form-input-field"
              className={styles.SearchInput}
              placeholder={placeholder}
              type="text"
              value={searchQuery !== null ? searchQuery : initialQuery}
              onChange={updateSearchQuery}
              onKeyDown={onKeyDownHandler}
              ref={(focusOnMount && searchInputRef) || null}
              aria-label="Restaurants durchsuchen"
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
              citySearch &&
              citySearch.edges &&
              restaurantsSearch &&
              restaurantsSearch.edges &&
              (citySearch.edges.length > 0 ||
                restaurantsSearch.edges.length > 0) && (
                <div className={styles.AutocompleteWrapper}>
                  <ul
                    className={classNames('autocomplete', styles.Autocomplete)}
                  >
                    {update(citySearch.edges, {
                      $push: restaurantsSearch.edges,
                    }).map(renderAutocompleteItems)}
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

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const doSubmit = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  event,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'searchQuery' implicitly has an 'any' type. */
  searchQuery,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'setIsAutocompleteVisible' implicitly has an 'any' type. */
  setIsAutocompleteVisible,
  onSubmitRoute = URL_DE_SEARCH,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'searchToggle' implicitly has an 'any' type. */
  searchToggle,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'navigate' implicitly has an 'any' type. */
  navigate,
) => {
  if (event) {
    event.preventDefault();
  }

  searchToggle(false);

  if (searchQuery && searchQuery.length >= MIN_QUERY_LENGTH) {
    // close autocomplete box
    setIsAutocompleteVisible(false);

    // navigate to search page
    setTimeout(() => {
      // wait 1 tick, so the system has time to react to the "searchToggle(false)" before we change to next page
      const encodedQuery = encodeURIComponent(searchQuery.toLowerCase());
      navigate(`${onSubmitRoute}/${encodedQuery}`);
    }, 0);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getAutocompleteItemsCount = (props) => {
  const itemsCount =
    (props.data &&
      props.data.restaurantsSearch &&
      props.data.restaurantsSearch.edges &&
      props.data.citySearch &&
      props.data.citySearch.edges &&
      props.data.citySearch.edges.length +
        props.data.restaurantsSearch.edges.length) ||
    0;
  return itemsCount;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const decreaseAutocompleteSelectedIndex = (props) => {
  const index = props.autocompleteSelectedIndex;
  const itemsCount = getAutocompleteItemsCount(props);
  if (index > -1) {
    props.setAutocompleteSelectedIndex(index - 1);
  } else {
    props.setAutocompleteSelectedIndex(itemsCount - 1);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const increaseAutocompleteSelectedIndex = (props) => {
  const index = props.autocompleteSelectedIndex;
  const itemsCount = getAutocompleteItemsCount(props);
  if (index + 1 < itemsCount) {
    props.setAutocompleteSelectedIndex(index + 1);
  } else {
    props.setAutocompleteSelectedIndex(-1);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const navigateToSelectedItem = (props) => {
  const index = props.autocompleteSelectedIndex;
  let uri = null;
  if (
    props.data &&
    props.data.citySearch &&
    props.data.citySearch.edges &&
    props.data.restaurantsSearch &&
    props.data.restaurantsSearch.edges
  ) {
    const autocompleteArray = update(props.data.citySearch.edges, {
      $push: props.data.restaurantsSearch.edges,
    });
    if (
      autocompleteArray[index] &&
      autocompleteArray[index].__typename &&
      autocompleteArray[index].node
    ) {
      if (
        autocompleteArray[index].__typename === 'FacetedSearchEdge' &&
        autocompleteArray[index].node.name
      ) {
        uri = '/map/' + autocompleteArray[index].node.name;
      }
      if (autocompleteArray[index].__typename === 'OrganizationEdge') {
        uri = autocompleteArray[index].node.preferredUri || null;
      }
    }
  }

  // nothing selected or invalid data received => submit the form
  if (!uri) {
    doSubmit(
      null,
      props.searchQuery,
      props.setIsAutocompleteVisible,
      props.onSubmitRoute,
      props.searchToggle,
      props.navigate,
    );
    return;
  }

  props.onBeforeNavigate();
  props.navigate(uri);
};

export const keyBindingConfig = {
  keyMap: {
    arrowDown: {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      action: (props) => increaseAutocompleteSelectedIndex(props),
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      test: (props) => props.isAutocompleteVisible,
    },
    arrowUp: {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      action: (props) => decreaseAutocompleteSelectedIndex(props),
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      test: (props) => props.isAutocompleteVisible,
    },
    enter: {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      action: (props) => navigateToSelectedItem(props),
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      test: (props) => props.isAutocompleteVisible,
    },
    escape: {
      /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
      action: (props) => {
        props.setAutocompleteSelectedIndex(-1);
        props.setIsAutocompleteVisible(false);
        props.searchToggle(false);
      },
    },
  },
};

export const withExtendedSubmitHandler = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  handleSubmit: (props: any) => (event) =>
    doSubmit(
      event,
      props.searchQuery,
      props.setIsAutocompleteVisible,
      props.onSubmitRoute,
      props.searchToggle,
      props.navigate,
    ),
});

const withAutocompleteItemsRenderer = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  renderAutocompleteItems: (props) => (item, index) =>
    doRenderAutocompleteItems(props, item, index),
});

const mapDispatchToProps = {
  searchToggle: searchToggleAction,
};

const withExtendHideSearch = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  hideSearch: (props: any) => () => {
    props.searchToggle(false);
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const SearchForm = (props) => {
  const debouncedSearchQuery = props.debouncedSearchQuery || '';

  const { data } = useQuery(GET_RESTAURANT_AUTOCOMPLETE_RESULTS, {
    skip:
      !debouncedSearchQuery || debouncedSearchQuery.length < MIN_QUERY_LENGTH,
    variables: {
      query: debouncedSearchQuery && `${debouncedSearchQuery}*`,
      pageSize: AUTOCOMPLETE_ITEMS,
      publication:
        props.language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
      language: props.language || '',
    },
  });

  return <SearchFormComponent {...props} data={data} />;
};

export default compose<any, any>(
  withNavigate,
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
