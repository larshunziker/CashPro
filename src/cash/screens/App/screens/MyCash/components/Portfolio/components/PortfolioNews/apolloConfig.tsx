import { RaschApolloConfig } from '../../../../../../../../../shared/decorators/withRaschRouterFactory';
import { ARTICLE_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../../../../../shared/constants/globalSearch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_LATEST_PORTFOLIONEWS_BY_VALORNUMBER } from './queries';

export const ITEMS_PER_PAGE = 10;

export const portfolioNewsApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const valors = params?.valors || [];
    const page = Number(params?.page) || 1;

    return {
      query: GET_LATEST_PORTFOLIONEWS_BY_VALORNUMBER,
      variables: {
        query: '*',
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE,
        contentTypes: [ARTICLE_CONTENT_TYPE],
        sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
        valors: valors,
      },
      fetchPolicy: 'network-only',
      skip: !valors.length,
    };
  },
};
