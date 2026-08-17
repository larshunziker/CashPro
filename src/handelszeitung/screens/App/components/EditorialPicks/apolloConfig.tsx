/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { EDITORIALS_PICKS_QUERY } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'contentTypes' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'publication' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'title' does not exist on type 'Record<string, string> | undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'additionalPublications' does not exist on type 'Record<string, string> | undefined'. */
    const { contentTypes, publication, title, additionalPublications } = params;
    return {
      query: EDITORIALS_PICKS_QUERY,
      variables: {
        contentTypes,
        publication,
        additionalPublications,
        title,
      },
      skip: !title,
    };
  },
};
