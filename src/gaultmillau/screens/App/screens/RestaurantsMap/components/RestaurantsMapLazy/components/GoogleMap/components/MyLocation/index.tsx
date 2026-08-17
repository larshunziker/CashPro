import React from 'react';
import Icon from '../../../../../../../../components/Icon';
import gaultMillauIcons from '../../../../../../../../assets/styles/gaultMillau.legacy.css';
// eslint-disable-next-line
import markerStyles from '../Marker/styles.legacy.css';
import styles from './styles.legacy.css';
import { MyLocationProps } from './typings';

const MyLocation = ({}: MyLocationProps) => (
  <span className={markerStyles.Wrapper}>
    <Icon
      addClass={styles.MyLocation}
      iconsOverride={gaultMillauIcons}
      type="IconLocator"
    />
  </span>
);

export default MyLocation;
