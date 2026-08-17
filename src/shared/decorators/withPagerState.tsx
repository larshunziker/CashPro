import React from 'react';

/* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
const withPagerState = (WrappedComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const WithPagerStateHoC = (props) => {
    const [page, setPage] = React.useState(1);
    return <WrappedComponent {...props} page={page} setPage={setPage} />;
  };
  return WithPagerStateHoC;
};

export default withPagerState;
