import { connect } from 'react-redux';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import debounce from 'lodash.debounce';
import { doHandleSearchSuggestionsClickTracking } from '../../../../../../../../shared/helpers/tracking';
import { searchToggle as searchToggleAction } from '../../../../../../../../shared/actions/search';
import { URL_DE_SEARCH } from '../../../../../constants';

export const MIN_QUERY_LENGTH = 3;
export const AUTOCOMPLETE_ITEMS = 5;

const AUTOCOMPLETE_DEBOUNCE_TIME = 300;

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
      props.data.globalSearch &&
      props.data.globalSearch.edges &&
      props.data.globalSearch.edges.length) ||
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
  const uri =
    (props.data &&
      props.data.globalSearch &&
      props.data.globalSearch.edges &&
      Array.isArray(props.data.globalSearch.edges) &&
      props.data.globalSearch.edges[props.autocompleteSelectedIndex] &&
      props.data.globalSearch.edges[props.autocompleteSelectedIndex].node &&
      props.data.globalSearch.edges[props.autocompleteSelectedIndex].node
        .preferredUri) ||
    null;

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

// ---------------------------------------------------------------------------------- //
// LOGIC
// ---------------------------------------------------------------------------------- //

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

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
export const withUpdatePolicy = shouldUpdate((props: any, nextProps) => {
  // set the search query value to the initial query value if it not set yet and different
  if (
    props.initialQuery &&
    nextProps.searchQuery === null &&
    props.initialQuery !== nextProps.searchQuery
  ) {
    nextProps.setSearchQuery(nextProps.initialQuery);
  }

  // set the search query value to the initial query value if it has changed
  if (
    props.initialQuery &&
    nextProps.initialQuery &&
    props.initialQuery !== nextProps.initialQuery
  ) {
    nextProps.setSearchQuery(nextProps.initialQuery);
  }

  // reset autocomplete selected index on query changes
  if (props.searchQuery !== nextProps.searchQuery) {
    nextProps.setAutocompleteSelectedIndex(-1);
  }

  return true;
});

const debounceSearchQuery = debounce((props, value) => {
  props.setDebouncedSearchQuery(value);
}, AUTOCOMPLETE_DEBOUNCE_TIME);

export const withExtendedHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'el' implicitly has an 'any' type. */
  searchInputRef: (props: any) => (el) => {
    if (el) el.focus();
    if (el && !props.inputReference) props.setInputReference(el);
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  updateSearchQuery: (props) => (event) => {
    props.setSearchQuery(event.target.value);
    props.setIsAutocompleteVisible(event.target.value.length > 0);
    debounceSearchQuery(props, event.target.value);
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  resetSearchQuery: (props) => () => {
    props.setSearchQuery('');
    props.setIsInitialQueryValid(false);
    props.setIsAutocompleteVisible(false);
    props.inputReference.focus();
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  onBeforeNavigate: (props) => () => {
    doHandleSearchSuggestionsClickTracking(props.searchQuery);
    props.setSearchQuery('');
    props.setIsAutocompleteVisible(false);
    props.hideSearch();
    props.inputReference.focus();
  },
});

export const mapDispatchToProps = {
  searchToggle: searchToggleAction,
};

export const withStoreConnection = connect(undefined, mapDispatchToProps);

export const withAutocompleteSelectedIndex = withState(
  'autocompleteSelectedIndex',
  'setAutocompleteSelectedIndex',
  -1,
);

export const withInitialQueryValidState = withState(
  'isInitialQueryValid',
  'setIsInitialQueryValid',
  true,
);

export const withSearchQueryState = withState(
  'searchQuery',
  'setSearchQuery',
  null,
);

export const withAutocompleteVisibleState = withState(
  'isAutocompleteVisible',
  'setIsAutocompleteVisible',
  false,
);

export const withInputReferenceState = withState(
  'inputReference',
  'setInputReference',
  null,
);

export const withDebouncedSearchQueryState = withState(
  'debouncedSearchQuery',
  'setDebouncedSearchQuery',
  '',
);
