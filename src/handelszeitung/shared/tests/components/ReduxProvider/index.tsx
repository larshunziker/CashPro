/* istanbul ignore file */

import { initialStates } from '../../../reducers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/tests/components/ReduxProviderFactory'. '/Users/bhs */
import ReduxProviderFactory from '../../../../../shared/tests/components/ReduxProviderFactory';
import { configureStore } from '../../../configureStore';

export default ReduxProviderFactory(configureStore, initialStates);
