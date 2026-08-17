import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../../../../../components/Icon';
import MarkerOverlay from '../MarkerOverlay';
import gaultMillauIcons from '../../../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { MarkerProps } from './typings';

const Marker = ({ overlayData, isActive, toggleActive }: MarkerProps) => (
  <span className={classNames(styles.Wrapper, { [styles.OnFront]: isActive })}>
    <button className={styles.Marker} onClick={toggleActive}>
      <Icon
        addClass={classNames(styles.MarkerIcon, { [styles.Active]: isActive })}
        iconsOverride={gaultMillauIcons}
        type="IconLocator"
      />
    </button>

    {isActive && <MarkerOverlay toggleActive={toggleActive} {...overlayData} />}
  </span>
);

export default Marker;
