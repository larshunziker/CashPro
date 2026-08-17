import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { MenuItemProps } from './typings';

type MenuItemPropsInner = MenuItemProps;

const MenuItem = ({
  name = '',
  link,
  iconType = '',
  trackingClass = '',
  onClick = noop,
}: MenuItemPropsInner): ReactElement => (
  <Link
    className={classNames(trackingClass, styles.Title)}
    onClick={onClick}
    path={link}
  >
    <>
      {iconType && <Icon type={iconType} addClass={styles.Icon} />}
      <span className={styles.Name}>{name}</span>
    </>
  </Link>
);

export default MenuItem;
