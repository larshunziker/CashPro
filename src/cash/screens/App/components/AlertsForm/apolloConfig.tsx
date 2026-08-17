import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { getFullquotePath } from '../../../../shared/helpers/fullquote';
import { FULLQUOTE_SEMI_STATIC_PREFIX } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../screens/App/screens/FullquotePage/queries'. '/Users/bhs/code/ */
import { GET_FULLQUOTE_SERVICE_PAGE } from '../../../../screens/App/screens/FullquotePage/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_FULLQUOTE_ALERTS_PAGE } from './queries';

export const alertsFormApolloConfig: RaschApolloConfig = {
  options: ({ params }) => {
    const pathname = params?.fullquoteUri || '';

    const pathArray = pathname.replace(/^\/+/, '').split('/');
    const pagetype = pathArray[0];
    const valorName = pathArray[1];
    const market = pathArray[2];
    const currency = pathArray[3];
    const subtype = `${FULLQUOTE_SEMI_STATIC_PREFIX}${pagetype}`;
    const subPage = `${FULLQUOTE_SEMI_STATIC_PREFIX}${pagetype}/${valorName}`;
    const finalPathname = getFullquotePath({
      pageType: pagetype,
      valorName,
      market,
      currency,
    });

    return {
      query: GET_FULLQUOTE_SERVICE_PAGE,
      additionalQuery: GET_FULLQUOTE_ALERTS_PAGE,
      additionalVariables: {
        fullquoteSubtype: subtype || '',
        fullquoteSubPage: subPage || '',
      },
      variables: {
        path: finalPathname || '',
      },
      fetchPolicy: 'network-only',
      skip: !finalPathname,
    };
  },
};
