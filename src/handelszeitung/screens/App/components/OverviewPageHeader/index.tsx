/* istanbul ignore file */

/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import Bilanz from './components/Bilanz';
import Default from './components/Default';
import {
  OVERVIEW_PAGE_HEADER_BILANZ,
  OVERVIEW_PAGE_HEADER_DEFAULT,
} from './constants';

const OverviewPageHeaderLayouts = {
  [OVERVIEW_PAGE_HEADER_BILANZ]: Bilanz,
  [OVERVIEW_PAGE_HEADER_DEFAULT]: Default,
};

export default createComponentSwitch(OverviewPageHeaderLayouts);
