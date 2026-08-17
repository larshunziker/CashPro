/* istanbul ignore file */

import alertsProfileFactory from '../../../../../common/screens/Account/components/AlertsProfile/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import AlertList from '../../components/AlertList/themes/AlertLisProfilepage';
import Helmet from '../../components/Helmet';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoginForm from './components/LoginForm';
import NoItems from './components/NoItems';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const AlertsProfile = alertsProfileFactory({
  styles: {
    AlertsProfileWrapper: styles.AlertsProfileWrapper,
    LoginWrapper: styles.LoginWrapper,
    Title: styles.Title,
    Description: styles.Description,
    ItemsWrapper: grid.ColSm18,
  },
  descriptionText:
    'Folge deinen Lieblingsthemen. Wir halten dich per E-Mail auf dem Laufenden, sobald ein neuer Artikel zu deinem Thema erscheint.',
  loginText: 'Bitte melde dich an, um deine E-Mail Alerts zu verwalten.',
  Helmet,
  grid,
  LoginForm,
  NoItems,
  LoadingSpinner,
  AlertList,
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
})(AlertsProfile);
