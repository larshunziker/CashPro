/* istanbul ignore file */

import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withAppNexusFactory'. '/Users/bhs/code/work/ra */
import withAppNexusFactory from '../../../shared/decorators/withAppNexusFactory';
import { mapPathSegmentToVertical } from '../reducers/route';
import {
  CONSULTATION,
  CONSUMPTION,
  DEFAULT,
  DIGITAL,
  FAMILY,
  HABITATION,
  HEALTH,
  HEALTH_ONMEDA,
  HOME,
  MONEY,
  OTHER_TOPICS,
  WORK,
} from '../actions/route';

const mapVerticalToAdCategory = () => ({
  [WORK]: 'Arbeit',
  [CONSULTATION]: 'Beratung',
  [DEFAULT]: 'ROS',
  [FAMILY]: 'Familie',
  [MONEY]: 'Geld',
  [DIGITAL]: 'Digital',
  [HEALTH]: 'Gesundheit',
  [HEALTH_ONMEDA]: 'Gesundheit',
  [HOME]: 'Home',
  [CONSUMPTION]: 'Konsum',
  [OTHER_TOPICS]: 'WeitereThemen',
  [HABITATION]: 'Wohnen',
});

export default withAppNexusFactory({
  locationStateSelector,
  windowStateSelector,
  mapPathSegmentToVertical,
  mapVerticalToAdCategory,
  defaultVertical: DEFAULT,
});
