import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import {
  EBANKING_LOGIN_LINK,
  SUBSCRIPTION_TYPE_BANKING,
} from '../../../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const BankingButton = () => {
  const isAuthenticated = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.isAuthenticated,
  );
  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );

  return (
    <>
      {(isAuthenticated &&
        subscriptions &&
        subscriptions.indexOf(SUBSCRIPTION_TYPE_BANKING) > -1 && (
          <Link
            target="_blank"
            aria-label="E-Banking Login"
            className={classNames(styles.DepotButton)}
            path={EBANKING_LOGIN_LINK}
          >
            <>
              E-Banking <span className={grid.HiddenSmDown}>Login</span>
            </>
          </Link>
        )) || (
        <Link
          target="_blank"
          aria-label="Depot eröffnen"
          className={classNames(styles.DepotButton)}
          path="https://www.cash.ch/online-trading?top=1"
        >
          <>
            Depot <span className={grid.HiddenSmDown}>eröffnen</span>
          </>
        </Link>
      )}
    </>
  );
};

export default BankingButton;
