import React from 'react';
import styles from './styles.legacy.css';
import { ClusterProps } from './typings';

const Cluster = ({ children }: ClusterProps) => (
  <span className={styles.Wrapper}>
    <button className={styles.Cluster}>{children}</button>
  </span>
);

export default Cluster;
