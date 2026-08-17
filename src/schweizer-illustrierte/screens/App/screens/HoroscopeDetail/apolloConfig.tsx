/* istanbul ignore file */

import { getZodiacSign } from '../../../../shared/helpers/zodiacSigns';
import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { DEFAULT_PUBLICATION } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_DAILY_HOROSCOPE, GET_YEARLY_HOROSCOPE } from './queries';

export const apolloConfigDailyHoroscope: RaschApolloConfig = {
  options: ({ location, params }) => {
    const pathname = location?.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const zodiacSlug = params.zodiacSlug;

    return {
      query: GET_DAILY_HOROSCOPE,
      variables: {
        id: getZodiacSign(zodiacSlug)?.id || 0,
        publication: DEFAULT_PUBLICATION,
        path: pathname,
        entityQueueLimit: -1,
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};

export const apolloConfigYearlyHoroscope: RaschApolloConfig = {
  options: ({ location, params }) => {
    const pathname = location?.pathname.substr(1);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const zodiacSlug = params.zodiacSlug;

    return {
      query: GET_YEARLY_HOROSCOPE,
      variables: {
        id: getZodiacSign(zodiacSlug)?.id || 0,
        publication: DEFAULT_PUBLICATION,
        path: pathname,
        entityQueueLimit: -1,
      },
      context: {
        raschApolloService: true,
      },
    };
  },
};
