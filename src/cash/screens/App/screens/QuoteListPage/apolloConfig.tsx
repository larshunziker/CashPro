import { isListingKeyList } from '../MyCash/components/Portfolio/helpers';
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import {
  DROPDOWN_CURRENCIES,
  DROPDOWN_QUOTES,
  DROPDOWN_RAW_MATERIAL,
} from '../../components/Widgets/components/QuoteList/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../components/Widgets/components/QuoteList/queries'. '/Users/bhs/code/ */
import { GET_QUOTES_TABLE_DATA } from '../../components/Widgets/components/QuoteList/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_QUOTELIST_PAGE } from './queries';

export const quoteListPageApolloConfig: RaschApolloConfig = {
  options: ({ location, params }) => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const page = (location.query?.page || 1) * 1;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const sortBy = location.query?.sortBy || null;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const direction = location.query?.direction || null;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const quoteList = `quotelist-kurse?cache-buster=${location.pathname}`;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const quoteListSubpage = `quotelist-kurse/${params['*']}`;

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const splitParams = params['*'].split('/');
    const quoteType = splitParams[splitParams.length - 1];
    let currentItem = null;

    Object.entries({
      ...DROPDOWN_QUOTES,
      ...DROPDOWN_CURRENCIES,
      ...DROPDOWN_RAW_MATERIAL,
    }).forEach(([key, value]) => {
      if (!key) {
        return;
      }
      value.forEach((item) => {
        if (item.key === quoteType) {
          currentItem = item;
        }
      });
    });
    /* @ts-ignore TODO: TS2339 ->  Property 'itemsPerPage' does not exist on type 'never'. */
    const itemsPerPage = currentItem?.itemsPerPage || 0;
    const offset =
      /* @ts-ignore TODO: TS2339 ->  Property 'itemsPerPage' does not exist on type 'never'. */
      currentItem?.itemsPerPage > 0 ? (page - 1) * itemsPerPage : 0;
    /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'never'. */
    const isCustomListingKey = currentItem?.listingKeys?.startsWith('custom-');

    // Skip additional query for invalid quote types, but NOT the main query
    // This ensures SSR runs and can return proper 404 for non-existent pages
    const shouldSkipAdditionalQuery =
      /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'never'. */
      !currentItem?.listingKeys ||
      /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'never'. */
      (!isCustomListingKey && !isListingKeyList(currentItem?.listingKeys));

    return {
      query: GET_QUOTELIST_PAGE,
      additionalQuery: shouldSkipAdditionalQuery
        ? undefined
        : GET_QUOTES_TABLE_DATA,
      additionalVariables: shouldSkipAdditionalQuery
        ? undefined
        : {
            /* @ts-ignore TODO: TS2339 ->  Property 'listingKeys' does not exist on type 'never'. */
            listingKeys: currentItem?.listingKeys || '',
            /* @ts-ignore TODO: TS2339 ->  Property 'constituents' does not exist on type 'never'. */
            constituents: currentItem?.constituents,
            limit: itemsPerPage,
            offset: offset,
            sortBy,
            direction,
          },
      variables: {
        quoteListSubtype: quoteList,
        quoteListSubPage: quoteListSubpage,
        publication: 'CASH',
      },
      fetchPolicy: 'cache-first', // to ensure client uses cache when available instead of re-fetching
    };
  },
};
