/* istanbul ignore file */
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../FullqutePageBNP/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/scr */
import { GET_BNP_FULLQUOTE_PAGE } from '../FullqutePageBNP/queries';
import { RasRouterProps } from '../../components/Router/typings';

export const fullquoteBNPPageApolloConfig: RaschApolloConfig<RasRouterProps> = {
  options: () => {
    const subtype = 'fullquote-derivate-bnp';

    return {
      query: GET_BNP_FULLQUOTE_PAGE,
      variables: {
        path: subtype,
      },
    };
  },
};
