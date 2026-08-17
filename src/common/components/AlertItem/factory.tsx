/**
 * @file   AlertItem factory
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-10-17 14:48:14
 */

import React from 'react';
import Link from '../Link';
import Picture from '../Picture';
import {
  AlertItemComponent,
  AlertItemFactoryOptionStyles,
  AlertItemFactoryOptions,
  AlertItemProps,
} from './typings';

const defaultStyles: AlertItemFactoryOptionStyles = {
  AlertItemWrapper: '',
  Text: '',
  ChildWrapper: '',
};

const AlertItemFactory = ({
  styles: appStyles,
}: AlertItemFactoryOptions): AlertItemComponent => {
  const AlertItem: AlertItemComponent = (props) => {
    const {
      children,
      label,
      url,
      relativeOriginPath,
      focalPointX,
      focalPointY,
      imageStyles,
    }: AlertItemProps = props;
    if (!label) {
      return null;
    }

    const getStyles = (): AlertItemFactoryOptionStyles => {
      const styles: AlertItemFactoryOptionStyles =
        (typeof appStyles === 'function' && (appStyles as any)(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };
    const styles: AlertItemFactoryOptionStyles = getStyles();

    return (
      <>
        {(relativeOriginPath && (
          <div className={styles.AlertItemImageWrapper}>
            <Picture
              relativeOrigin={relativeOriginPath}
              focalPointX={focalPointX}
              focalPointY={focalPointY}
              alt={label}
              className={styles.AlertItemImage}
              {...imageStyles}
            />
          </div>
        )) ||
          null}
        <div className={styles.AlertItemWrapper}>
          <div className={styles.Text} title={label}>
            <Link path={url} label={url ? `#${label}` : label} />
          </div>
          <div className={styles.ChildWrapper}>{children}</div>
        </div>
      </>
    );
  };

  return AlertItem;
};

export default AlertItemFactory;
