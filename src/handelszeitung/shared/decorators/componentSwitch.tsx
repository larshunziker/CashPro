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
import { log } from '../../../shared/helpers/utils';

const createComponentSwitch =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Components' implicitly has an 'any' type. */


    (Components, type = 'component', fallback = null) =>
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    (props) => {
      if (typeof props[type] !== 'undefined' && props[type] in Components) {
        return React.createElement(Components[props[type]], props);
      }

      if (fallback) {
        return React.createElement(fallback, props);
      }

      // ❗❗ Following console use is ok as we should never reach this code.. ❗❗
      log('component-switch', 'component not defined - return null!', 'red');
      return null;
    };

export default createComponentSwitch;
