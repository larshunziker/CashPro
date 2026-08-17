/* istanbul ignore file */

import React from 'react';
import compose from 'recompose/compose';
import { QueryHookOptions, useQuery } from '@apollo/client';
import classNames from 'classnames';
import autocompleteFactory from './../../../../../../../common/components/SearchForm/components/Autocomplete/factory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../../../../../../../shared/decorators/withDebouncedProps'. '/Users/bhs */
import withDebouncedProps from './../../../../../../../shared/decorators/withDebouncedProps';
import Icon from './../../../Icon';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_FILTER_LANDING_PAGE,
  GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
} from './../../../../../../../shared/constants/globalSearch';
import {
  SEARCH_FORM_THEME_MENU,
  SEARCH_FORM_THEME_WHITE,
} from './../../constants';
import { ITEMS_COUNT } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_SEARCHFORM_AUTOCOMPLETE } from './queries';
import styles from './styles.legacy.css';
import {
  AutocompleteFactoryOptionsStyles,
  AutocompleteFactoryProps,
} from './../../../../../../../common/components/SearchForm/components/Autocomplete/typings';

const getStylesByProps = ({
  theme,
}: AutocompleteFactoryProps): AutocompleteFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.SearchOverlayBackground]: theme === SEARCH_FORM_THEME_WHITE,
    [styles.NavigationOverlayBackground]: theme === SEARCH_FORM_THEME_MENU,
  }),
  Link: styles.Link,
});

const AutocompleteComponent = autocompleteFactory({
  Icon,
  styles: getStylesByProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Autocomplete = (props) => {
  const queryString =
    typeof props.queryString !== 'undefined' ? props.queryString : '';

  const apolloConfig: QueryHookOptions = {
    skip: !queryString || queryString.length < props.minQueryLength,
    variables: {
      char: queryString && `${queryString}*`,
      contentTypes: [
        GLOBAL_SEARCH_FILTER_ARTICLE,
        GLOBAL_SEARCH_FILTER_LANDING_PAGE,
        GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
      ],
      pageSize: ITEMS_COUNT,
      publication: 'HZ',
      additionalPublications: ['BIL', 'SV', 'HZB'],
    },
  };

  const { data } = useQuery(GET_SEARCHFORM_AUTOCOMPLETE, apolloConfig);

  const globalSearch = data?.environment?.globalSearch;

  return <AutocompleteComponent {...props} data={{ globalSearch }} />;
};

export default compose<any, any>(withDebouncedProps())(Autocomplete);
