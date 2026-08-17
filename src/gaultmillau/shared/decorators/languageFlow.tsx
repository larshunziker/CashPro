/* istanbul ignore file */

import settingsStateSelector from '../selectors/settingsStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { HOME, HOME_FR } from '../actions/route';
import { DEFAULT_LANGUAGE } from '../../screens/App/components/Navigation/components/LanguageSwitch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/languageFlowFactory'. '/Users/bhs/code/work/ra */
import languageFlowFactory from '../../../shared/decorators/languageFlowFactory';

export default languageFlowFactory({
  routes: {
    home: HOME,
    homeFr: HOME_FR,
  },
  defaultLanguage: DEFAULT_LANGUAGE,
  settingsStateSelector,
  locationStateSelector,
});
