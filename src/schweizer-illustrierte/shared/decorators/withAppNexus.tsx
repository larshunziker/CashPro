/* istanbul ignore file */

import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withAppNexusFactory'. '/Users/bhs/code/work/ra */
import withAppNexusFactory from '../../../shared/decorators/withAppNexusFactory';
import { mapViewportToAdViewport } from '../../screens/App/components/AppNexus';
import locationStateSelector from '../selectors/locationStateSelector';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_DEFAULT,
  MAIN_CHANNEL_FAMILY,
  MAIN_CHANNEL_HOME,
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../screens/App/constants';

const URL_SEGMENT_TO_VERTICAL_MAP = {
  'body-health': MAIN_CHANNEL_BODY_HEALTH,
  family: MAIN_CHANNEL_FAMILY,
  people: MAIN_CHANNEL_PEOPLE,
  style: MAIN_CHANNEL_STYLE,
  entertainment: MAIN_CHANNEL_DEFAULT,
};

const mapPathSegmentToVertical = (pathSegment: string): string => {
  // create map url segment : constant
  const map = URL_SEGMENT_TO_VERTICAL_MAP;
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 'body-health' */
  return map[pathSegment] || 'ROS';
};

const mapVerticalToAdCategory = () => ({
  [MAIN_CHANNEL_BODY_HEALTH]: 'BodyHealth',
  [MAIN_CHANNEL_DEFAULT]: 'ROS',
  [MAIN_CHANNEL_FAMILY]: 'Family',
  [MAIN_CHANNEL_HOME]: 'Home',
  [MAIN_CHANNEL_PEOPLE]: 'People',
  [MAIN_CHANNEL_STYLE]: 'Style',
});

export default withAppNexusFactory({
  mapViewportToAdViewport,
  locationStateSelector,
  windowStateSelector,
  mapPathSegmentToVertical,
  mapVerticalToAdCategory,
  defaultVertical: 'ROS',
});
