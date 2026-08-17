import React from 'react';
import styles from './styles.legacy.css';
import logo from '../../assets/graphics/cash-logo-red.svg';
import { LogoProps } from './typings';

const Logo = ({ width }: LogoProps) => {
  return (
    <div className={styles.LogoWrapper}>
      <img
        className={styles.Logo}
        src={logo}
        alt="cash"
        style={{ maxWidth: width ? width : '' }}
      />
    </div>
  );
};

export default Logo;
