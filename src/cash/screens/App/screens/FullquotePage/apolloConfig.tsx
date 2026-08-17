/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { getFullquotePath } from '../../../../shared/helpers/fullquote';
import { FULLQUOTE_SEMI_STATIC_PREFIX } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../FullquotePage/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/scr */
import { GET_FULLQUOTE_SERVICE_PAGE } from '../FullquotePage/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_FULLQUOTE_PAGE } from './queries';
import { FullquotePageProps } from './typings';

export const fullquotePageApolloConfig: RaschApolloConfig<FullquotePageProps> =
  {
    options: ({ location, params, props }) => {
      const pathname = location?.pathname || '';
      /* @ts-ignore TODO: TS2339 ->  Property 'valorName' does not exist on type 'Record<string, string> | undefined'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'market' does not exist on type 'Record<string, string> | undefined'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'currency' does not exist on type 'Record<string, string> | undefined'. */
      const { valorName, market, currency } = params;
      /* @ts-ignore TODO: TS2339 ->  Property 'isHybridApp' does not exist on type 'FullquotePageProps | undefined'. */
      const { isHybridApp } = props;
      const pagetype = pathname.replace(/^\/+/, '').split('/')[0];
      let subtype = `${FULLQUOTE_SEMI_STATIC_PREFIX}${pagetype}`;
      let subPage = `${FULLQUOTE_SEMI_STATIC_PREFIX}${pagetype}/${valorName}`;
      const finalPathname = getFullquotePath({
        pageType: pagetype,
        valorName,
        market,
        currency,
      }).replace(/^\/+/, '');

      if (isHybridApp) {
        // concatinate hybrid prefix to subtype and subPage such as hybrid-fullquote-aktien FULLQUOTE_HYBRID_SEMI_STATIC_PREFIX
        subtype = `hybrid-${subtype}`;
        subPage = `hybrid-${subPage}`;
      }
      return {
        query: GET_FULLQUOTE_SERVICE_PAGE,
        additionalQuery: GET_FULLQUOTE_PAGE,
        additionalVariables: {
          fullquoteSubtype: subtype || '',
          fullquoteSubPage: subPage || '',
        },
        variables: {
          path: finalPathname || '',
        },
      };
    },
  };
