/* istanbul ignore file */

import React from 'react';

import { compose } from 'recompose';
import alertUnsubscribeFactory from '../../../../../common/screens/AlertsUnsubscribe/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Link from '../../../../../common/components/Link';
import Img from '../../components/Img';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoginForm from '../AlertsProfile/components/LoginForm';
import styles from './styles.legacy.css';
import CheckmarkSVG from '../../assets/graphics/checkmark.svg';

const AlertsUnsubscribe = alertUnsubscribeFactory({
  styles: {
    AlertsUnsubscribeWrapper: styles.AlertsUnsubscribeWrapper,
    Icon: styles.Icon,
    Text: styles.Text,
    Wrapper: '',
    LoginWrapper: styles.LoginWrapper,
  },
  LoadingSpinner,
  LoginForm,
  checkmarkIcon: <Img url={CheckmarkSVG} addClass={styles.Img} />,
  button: (
    <Link path="/">
      <button className={styles.Button}>Zurück zur Startseite</button>
    </Link>
  ),
  setLoading,
  setScreenReady,
});

export default compose<any, any>(
  withParams,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
      }),
  }),
)(AlertsUnsubscribe);
