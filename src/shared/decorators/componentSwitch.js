/**
 * component switch decorator
 *
 *
 */

/**
 * @TODO
 *
 * 1. Use __DEVELOPMENT__ switch and dynamic require for log() (or make log() a
 *    globally available function in development).
 *
 *    if (__DEVELOPMENT__) {
 *      global.log = (message) => ...
 *    }
 */

import React from 'react';
import { log } from 'helpers/utils';

const createComponentSwitch =
  (Component, type = 'component') =>
  (props) => {
    if (typeof props[type] !== 'undefined' && props[type] in Component) {
      return React.createElement(Component[props[type]], props);
    }

    // ❗❗ Following console use is ok as we should never reach this code.. ❗❗
    log(
      'component-Switch',
      'component not defined - return null!\n' + JSON.stringify(props, null, 2),
      'red',
    );
    return null;
  };

export default createComponentSwitch;
