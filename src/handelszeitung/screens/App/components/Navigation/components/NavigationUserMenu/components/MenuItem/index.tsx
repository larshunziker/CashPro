/**
 * @file   Menu Item for UserNavigation
 */

import React, { ReactElement, memo } from 'react';
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
      {name}
    </>
  </Link>
);

export default memo<MenuItemPropsInner>(MenuItem);
