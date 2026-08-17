import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useStableNavigate } from '../hooks/useStableNavigateContext';

export type WithNavigateProps = {
  navigate: NavigateFunction;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
const withNavigate = (WrappedComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const WithNavigateHoC = (props) => {
    const navigate = useStableNavigate();
    return <WrappedComponent {...props} navigate={navigate}></WrappedComponent>;
  };

  return WithNavigateHoC;
};

export default withNavigate;
