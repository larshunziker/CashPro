/* istanbul ignore file */

import accountFactory from './../../../../../common/screens/Account/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from './../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from './../../components/Helmet';
import styles from './styles.legacy.css';

const Account = accountFactory({
  Helmet,
  styles: {
    AccountPanel: styles.AccountPanel,
    AccountWrapper: styles.AccountWrapper,
    Background: styles.Background,
    Title: styles.Title,
    Wrapper: styles.Wrapper,
  },
  title: 'Meine Käufe',
  setLoading,
  setScreenReady,
});

export default withAppNexus({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  parseTrackingData: (props) =>
    parseTrackingData({
      ...props,
      articleType: 'LandingPage',
    }),
})(Account);
