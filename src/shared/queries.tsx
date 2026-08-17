/**
 * @file   returns app based query map for frontend
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-16
 */

import {
  apiVersion as beoApiVersion,
  default as beoQueryMap,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../beobachter/shared/queries-frontend'. '/Users/bhs/code/work/rasch-stack */
} from '../beobachter/shared/queries-frontend';
import {
  apiVersion as cashApiVersion,
  default as cashQueryMap,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../cash/shared/queries-frontend'. '/Users/bhs/code/work/rasch-stack/src/c */
} from '../cash/shared/queries-frontend';
import {
  apiVersion as gmApiVersion,
  default as gmQueryMap,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../gaultmillau/shared/queries-frontend'. '/Users/bhs/code/work/rasch-stac */
} from '../gaultmillau/shared/queries-frontend';

const getQueryMapByAppName: Function = (): Object => {
  switch (__APP_NAME__) {
    case 'beobachter': {
      return { map: beoQueryMap, version: beoApiVersion };
    }
    case 'cash': {
      return { map: cashQueryMap, version: cashApiVersion };
    }
    case 'gaultmillau': {
      return { map: gmQueryMap, version: gmApiVersion };
    }
    default:
      return {};
  }
};
export default getQueryMapByAppName();
