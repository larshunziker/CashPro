import React from 'react';
import styles from './styles.legacy.css';
import { ErrorProps } from './typings';

const Error = ({ msg }: ErrorProps) => (
  <div className={styles.Wrapper}>
    <span role="img" aria-label="Warning">
      ❗
    </span>
    {msg}
  </div>
);

export default Error;
