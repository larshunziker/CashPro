import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import { URL_BEOBACHTER_SHOP } from '../../../../../../constants';
import styles from './styles.legacy.css';
import { MenuListHeaderProps, menuListHeaderType } from './typings';

const USER_MENU_LABEL = 'Persönliche Beratung';

const MenuListHeader = ({ label, type }: MenuListHeaderProps) => (
  <div
    className={classNames(styles.MenuListHeader, {
      [styles.Secondary]: type === menuListHeaderType.secondary,
    })}
  >
    <Link
      path={URL_BEOBACHTER_SHOP}
      className={styles.Action}
      aria-label={label || USER_MENU_LABEL}
    >
      <span className={styles.ActionText}>{label || USER_MENU_LABEL}</span>
    </Link>
  </div>
);

export default MenuListHeader;
