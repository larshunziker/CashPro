/* istanbul ignore file */

import userProfileFactory from '../../../../../common/screens/Account/components/UserProfile/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from '../../components/Helmet';
import LoadingSpinner from '../../components/LoadingSpinner';
import NavigationLoginMenu from '../../components/Navigation/components/NavigationLoginMenu';
import NavigationUserMenu from '../../components/Navigation/components/NavigationUserMenu';
import styles from './styles.legacy.css';

const UserProfile = userProfileFactory({
  Helmet,
  styles: {
    UserProfileWrapper: styles.UserProfileWrapper,
    Title: styles.Title,
    DeviceIdWrapper: styles.DeviceIdWrapper,
  },
  LoginForm: NavigationLoginMenu,
  LoadingSpinner,
  UserMenu: NavigationUserMenu,
  setLoading,
  setScreenReady,
  hasContainer: false,
});

export default withAppNexus({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  parseTrackingData: (props) =>
    parseTrackingData({
      ...props,
      articleType: 'LandingPage',
    }),
})(UserProfile);
