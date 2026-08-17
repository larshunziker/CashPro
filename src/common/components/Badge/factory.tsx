import React from 'react';
import {
  BadgeFactoryOptions,
  BadgeFactoryOptionsStyles,
  BadgeProps,
} from './typings';

type BadgePropsInner = BadgeProps;

const defaultStyles: BadgeFactoryOptionsStyles = {
  Wrapper: '',
  Content: '',
};

const badgeFactory = ({ styles: appStyles }: BadgeFactoryOptions<any>) => {
  const Badge = (props: BadgePropsInner) => {
    if (!props.label && !props.children) return null;

    const styles: any =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div data-testid="badge-factory-wrapper" className={styles.Wrapper}>
        <div className={styles.Content}>
          {props.children && <span>{props.children}</span>}
          {props.label && <span>{props.label}</span>}
        </div>
      </div>
    );
  };

  return Badge;
};

export default badgeFactory;
