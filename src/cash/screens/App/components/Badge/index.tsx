import React from 'react';
import styles from './styles.legacy.css';

const Badge = ({ text = '' }) => {
  return <div className={styles.Badge}>{text}</div>;
};

export default Badge;
