import React from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import Link from '../../../../../../../../../common/components/LinkLegacy';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { MenuItemProps } from './typings';

const MenuItem = ({
  name = '',
  link,
  iconType,
  trackingClass = '',
  onClick = noop,
}: MenuItemProps) => (
  <Link
    className={classNames(trackingClass, styles.Title)}
    onClick={onClick}
    link={{ path: link }}
  >
    <>
      <Icon type={iconType} addClass={styles.Icon} />
      {name}
    </>
  </Link>
);

export default MenuItem;
