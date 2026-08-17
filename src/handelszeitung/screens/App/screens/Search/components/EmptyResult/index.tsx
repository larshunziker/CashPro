import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { SET_STATUS_CODE } from '../../../../../../../shared/actions/ssr';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const EmptyResult = () => {
  const dispatch = useDispatch();
  if (__SERVER__) {
    dispatch({
      type: SET_STATUS_CODE,
      payload: {
        statusCode: 404,
        redirectUri: '',
      },
    });
  }

  return (
    <div className={classNames(styles.EmptyResultWrapper, grid.Container)}>
      <h2 className={styles.EmptyResultTitle}>
        Leider wurden keine mit Ihrer Suchanfrage übereinstimmenden Dokumente
        gefunden.
      </h2>
      <span className={styles.EmptyResultSubtitle}>Für die nächste Suche:</span>
      <ul className={styles.EmptyResultTips}>
        <li className={styles.EmptyResultTip}>
          Achten Sie darauf, dass alle Wörter richtig geschrieben sind.
        </li>
        <li className={styles.EmptyResultTip}>
          Probieren Sie es mit anderen Suchbegriffen.
        </li>
        <li className={styles.EmptyResultTip}>
          Probieren Sie es mit allgemeineren Suchbegriffen.
        </li>
      </ul>
    </div>
  );
};

export default EmptyResult;
