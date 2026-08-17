import React from 'react';
import SVGIcon from '../../../../../SVGIcon';
import { SVG_ICONS_TYPE_ARROW_UP_AND_DOWN } from '../../../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';

type SwitchIconProps = {
  clickHandler: () => void;
};

const SwitchIcon = ({ clickHandler }: SwitchIconProps) => {
  return (
    <div
      onClick={clickHandler}
      onKeyDown={clickHandler}
      role="button"
      tabIndex={0}
    >
      <SVGIcon
        className={styles.Icon}
        type={SVG_ICONS_TYPE_ARROW_UP_AND_DOWN}
      />
    </div>
  );
};

export default SwitchIcon;
