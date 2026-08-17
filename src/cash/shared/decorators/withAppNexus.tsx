import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withAppNexusFactory'. '/Users/bhs/code/work/ra */
import withAppNexusFactory from '../../../shared/decorators/withAppNexusFactory';
import {
  mapPathSegmentFullPath,
  mapPathSegmentToVertical,
} from '../reducers/route';
import { DEFAULT, HOME, VERTICAL_TITLES } from '../actions/route';

const mapVerticalToAdCategory = () => ({
  ...VERTICAL_TITLES,
  [DEFAULT]: 'ROS',
  [HOME]: 'Home',
});

export default withAppNexusFactory({
  locationStateSelector,
  windowStateSelector,
  mapPathSegmentToVertical,
  mapPathSegmentToOnmeda: mapPathSegmentFullPath,
  mapVerticalToAdCategory,
  defaultVertical: DEFAULT,
});
