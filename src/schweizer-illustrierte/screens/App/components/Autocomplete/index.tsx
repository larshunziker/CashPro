/* istanbul ignore file */

import React from 'react';
import compose from 'recompose/compose';
import { QueryHookOptions, useQuery } from '@apollo/client';
import autocompleteFactory from './../../../../../common/components/SearchForm/components/Autocomplete/factory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../../../../../shared/decorators/withDebouncedProps'. '/Users/bhs/code/ */
import withDebouncedProps from './../../../../../shared/decorators/withDebouncedProps';
import Icon from './../Icon';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_FILTER_IMAGE_GALLERY,
  GLOBAL_SEARCH_FILTER_KEYWORD_SETTINGS,
  GLOBAL_SEARCH_FILTER_LANDING_PAGE,
  GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
  GLOBAL_SEARCH_FILTER_VIDEO,
} from './../../../../../shared/constants/globalSearch';
import { DEFAULT_PUBLICATION } from './../../constants';
import { ITEMS_COUNT } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_AUTOCOMPLETE } from './queries';
import styles from './styles.legacy.css';

const AutocompleteComponent = autocompleteFactory({
  Icon,
  IconTypes: {
    CamIcon: 'IconFotoMarker',
    VideoIcon: 'IconCamera',
  },
  styles: {
    Wrapper: styles.Wrapper,
    Link: styles.Link,
    LinkWrapper: styles.LinkWrapper,
    IconStyle: styles.IconStyle,
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Autocomplete = (props) => {
  const queryString =
    typeof props.queryString !== 'undefined' ? props.queryString : '';

  const apolloConfig: QueryHookOptions = {
    skip: !queryString || queryString.length < props.minQueryLength,
    variables: {
      publication: DEFAULT_PUBLICATION,
      char: queryString && `${queryString}*`,
      pageSize: ITEMS_COUNT,
      contentTypes: [
        GLOBAL_SEARCH_FILTER_ARTICLE,
        GLOBAL_SEARCH_FILTER_IMAGE_GALLERY,
        GLOBAL_SEARCH_FILTER_LANDING_PAGE,
        GLOBAL_SEARCH_FILTER_KEYWORD_SETTINGS,
        GLOBAL_SEARCH_FILTER_VIDEO,
        GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
      ],
    },
  };

  const { data } = useQuery(GET_AUTOCOMPLETE, apolloConfig);

  return <AutocompleteComponent {...props} data={data} />;
};

export default compose<any, any>(withDebouncedProps())(Autocomplete);
