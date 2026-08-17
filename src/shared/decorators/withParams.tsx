import React from 'react';
import { useParams } from 'react-router-dom';

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const withParams = (Component) => (props) => {
  const params = useParams();
  return <Component {...props} {...params} />;
};

export default withParams;
