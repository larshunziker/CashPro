import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import raf from 'raf';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Helmet from './../../components/Helmet';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'statusCode' implicitly has an 'any' type. */
const StatusPage = ({ statusCode }) => {
  const dispatch = useDispatch();
  const { isSSR } = useSSRContext();

  if (isSSR) {
    dispatch(setStatusCode(statusCode));
  }

  useEffect(() => {
    raf(() => {
      dispatch(setLoading(false));
      dispatch(
        setScreenReady(true, {
          pathname: location.pathname,
          ...getTealiumData({
            object: {
              preferredUri: location.pathname,
              __typename: 'ErrorPage',
            },
          }),
        }),
      );
    });
  }, [dispatch]);

  return (
    <div className={`page-not-found ${styles.Wrapper}`}>
      <Helmet title="System Error" />
      <div className={sections.Container}>
        <h1 className={styles.Title}>{statusCode}</h1>
        <h3 className={styles.MainTitle}>
          <FormattedMessage
            id="app.statusPage.title500"
            description="The title of the 500 statusPage page"
            defaultMessage="System nicht erreichbar"
          />
        </h3>
        <p className={styles.Msg}>
          <FormattedMessage
            id="app.statusPage.description500"
            description="The description of the 500 statusPage page"
            defaultMessage="Leider sind unsere Systeme zur Zeit nicht erreichbar. Bitte versuchen Sie es später noch einmal."
          />
        </p>
      </div>
    </div>
  );
};

export default StatusPage;
