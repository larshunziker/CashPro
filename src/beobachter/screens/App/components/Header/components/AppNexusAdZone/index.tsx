import classNames from 'classnames';
import adZoneFactory from '../../../../../../../common/components/AdZone/factory';
import AppNexus from '../../../AppNexus';
import styles from './styles.legacy.css';

const AdZone = adZoneFactory({
  AppNexus,
  styles: {
    Wrapper: classNames(styles.Wrapper, 'header-apn-zone'),
    InnerWrapper: styles.InnerWrapper,
  },
});

export default AdZone;
