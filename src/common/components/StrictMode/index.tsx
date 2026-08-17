/* istanbul ignore file */

import React, { Fragment, ReactElement } from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const StrictMode = ({ children }): ReactElement => {
  if (__USE_STRICT_MODE__) {
    return <React.StrictMode>{children}</React.StrictMode>;
  }

  return children;
};

export default (__USE_STRICT_MODE__ && StrictMode) || Fragment;
