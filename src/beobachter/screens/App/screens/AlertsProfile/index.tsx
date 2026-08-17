import compose from 'recompose/compose';
import classNames from 'classnames';
import alertsProfileFactory from '../../../../../common/screens/Account/components/AlertsProfile/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import AlertList from '../../components/AlertList';
import Helmet from '../../components/Helmet';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoginForm from './components/LoginForm';
import NoItems from './components/NoItems';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import withHelmet from '../../../../shared/decorators/withHelmet';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const AlertsProfile = alertsProfileFactory({
  setLoading,
  setScreenReady,
  Helmet,
  styles: {
    AlertsProfileWrapper: classNames(
      styles.AlertsProfileWrapper,
      'AlertProfileWrapper',
    ),
    AlertListWrapper: grid.Container,
    LoginWrapper: styles.LoginWrapper,
    Title: styles.Title,
    Description: styles.Description,
    ItemsWrapper: grid.ColSm24,
  },
  grid,
  LoginForm,
  NoItems,
  LoadingSpinner,
  AlertList,
});

export default compose<any, any>(
  withHelmet({}),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
      }),
  }),
)(AlertsProfile);
