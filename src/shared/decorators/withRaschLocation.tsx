import React from 'react';
import useRaschRouterLocation from '../hooks/useRaschRouterLocation';

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const withRaschLocation = (Component) => (props) => {
  const location = useRaschRouterLocation();
  return <Component {...props} location={location} />;
};

export default withRaschLocation;
