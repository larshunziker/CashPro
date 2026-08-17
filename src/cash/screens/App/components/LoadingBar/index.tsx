import React, { ReactElement, memo } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import styles from './styles.legacy.css';

const LoadingBar = (): ReactElement => {
  const isRefetchingData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isRefetchingData,
  );
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );
  /* @ts-ignore TODO: TS2322 ->  Type 'false | Element | undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  return (
    (!screenReady || isRefetchingData) && (
      <div className={styles.LoadingIndicator}>
        <div className={styles.LoadingIndicatorItem}>
          <div className={styles.LoadingBar} />
        </div>
        <div className={styles.LoadingIndicatorItem}>
          <div className={styles.LoadingBar} />
        </div>
      </div>
    )
  );
};

export default memo(LoadingBar);
