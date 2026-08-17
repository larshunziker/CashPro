/**
 * Error component
 *
 * @file    Renders an error beautifuly to the DOM
 * @author  Remo Vetere (remo.vetere@ringieraxelspringer.ch)
 * @date    2016-06-11
 * @flow
 */
import React from 'react';
import styles from './styles.legacy.css';
import { ErrorProps } from './typings';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const Error = ({ msg }: ErrorProps) => (
  <div className={styles.Wrapper}>
    <span role="img" aria-label="Warning">
      ❗
    </span>
    {msg}
  </div>
);

export default Error;
