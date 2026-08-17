import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withAppNexusFactory'. '/Users/bhs/code/work/ra */
import withAppNexusFactory from '../../../shared/decorators/withAppNexusFactory';
import {
  mapPathSegmentFullPath,
  mapPathSegmentToVertical,
} from '../reducers/route';
import {
  BANKING,
  BILANZ,
  BUSINESS,
  DEFAULT,
  HOME,
  JOB,
  MONEY,
  PANORAMA,
  SWISS_INSURANCE,
  TECH,
} from '../actions/route';

export const mapVerticalToAdCategory = () => ({
  [BUSINESS]: 'Unternehmen',
  [DEFAULT]: 'ROS',
  [HOME]: 'Home',
  [JOB]: 'Management',
  [MONEY]: 'Invest',
  [SWISS_INSURANCE]: 'SchweizerVersicherung',
  [TECH]: 'DigitalSwitzerland',
  [BILANZ]: 'Bilanz',
  [PANORAMA]: 'Panorama',
  [BANKING]: 'Banking',
});

export default withAppNexusFactory({
  locationStateSelector,
  windowStateSelector,
  mapPathSegmentToVertical,
  mapPathSegmentToOnmeda: mapPathSegmentFullPath,
  mapVerticalToAdCategory,
  defaultVertical: DEFAULT,
});
