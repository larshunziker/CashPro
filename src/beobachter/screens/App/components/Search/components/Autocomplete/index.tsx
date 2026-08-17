import React from 'react';
import compose from 'recompose/compose';
import { useQuery } from '@apollo/client';
import { doHandleSearchSuggestionsClickTracking } from '../../../../../../../shared/helpers/tracking';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withDebouncedProps'. '/Users/bhs/c */
import withDebouncedProps from '../../../../../../../shared/decorators/withDebouncedProps';
import Link from '../../../../../../../common/components/LinkLegacy';
import Icon from '../../../Icon';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_FILTER_EXPLAINING_ARTICLE,
  GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
} from '../../../../../../../shared/constants/globalSearch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import query from './queries';
import { AutocompleteProps } from './typings';

type AutocompletePropsInner = AutocompleteProps & {
  renderLinks: () => void;
  reset: () => void;
  data: ApolloData & {
    globalSearch: SearchableUnionGraphList;
  };
  pageSize?: number;
};

const ITEMS_COUNT = 5;

const Autocomplete = ({
  addClass,
  queryString,
  updateQueryString,
  minQueryLength,
  pageSize = ITEMS_COUNT,
}: AutocompletePropsInner) => {
  const { data } = useQuery(query, {
    skip: !queryString || queryString.length < minQueryLength,
    variables: {
      char: queryString && `${queryString}*`,
      contentTypes: [
        GLOBAL_SEARCH_FILTER_ARTICLE,
        GLOBAL_SEARCH_FILTER_NATIVE_ADVERTISING,
        GLOBAL_SEARCH_FILTER_EXPLAINING_ARTICLE,
      ],
      pageSize,
    },
  });
  const reset = () => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    doHandleSearchSuggestionsClickTracking(queryString);
    updateQueryString('');
  };

  return (
    queryString?.length &&
    data?.globalSearch?.edges?.length && (
      <ul className={`autocomplete ${addClass}`}>
        {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
        {data.globalSearch.edges.map((item, index) => {
          if (
            !item ||
            !item.node ||
            !item.node.preferredUri ||
            !item.node.title
          ) {
            return null;
          }

          return (
            <li key={`autocomplete-list-item-${index}`}>
              <Link link={{ path: item.node.preferredUri }} onClick={reset}>
                {item.node.title}
                <Icon type="IconArrowRight" />
              </Link>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default compose<any, any>(withDebouncedProps())(Autocomplete);
