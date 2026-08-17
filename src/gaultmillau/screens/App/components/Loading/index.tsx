import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import selectLocationState from '../../../../../shared/selectors/locationStateSelector';
import styles from './styles.legacy.css';
import type { LoadingBarProps } from './typings';

type LoadingBarPropsInner = LoadingBarProps & {
  routeScreenReady: boolean;
};

const Loading = (props: LoadingBarPropsInner) =>
  !props.routeScreenReady ? <LoadingBar /> : null;

export const LoadingBar = (): ReactElement => (
  <div className={styles.LoadingIndicator}>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
  </div>
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routeScreenReady: selectLocationState(state).screenReady,
});

// connect to store
const withStoreConnection = connect(mapStateToProps);

export default pure<LoadingBarProps>(
  compose<any, any>(withStoreConnection)(Loading),
);
