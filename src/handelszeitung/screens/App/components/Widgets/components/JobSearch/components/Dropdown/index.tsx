import React from 'react';
import styles from './styles.legacy.css';
import { DropdownProps } from './typings';

const Dropdown = ({ value, onClick }: DropdownProps) => {
  return (
    <button className={styles.Field} onClick={onClick}>
      {value}
    </button>
  );
};

export default Dropdown;
