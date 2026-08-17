import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../../../common/components/Link';
import Icon from '../../../../../../../Icon';
import styles from './styles.legacy.css';
import { MinistageSocialMediaIconProps } from './typings';

const MinistageSocialMediaIcon = ({
  type,
  link,
}: MinistageSocialMediaIconProps) => {
  if (!type || !link) {
    return null;
  }

  return (
    <Link path={link} className={styles.Link} target="_blank">
      {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Link */}
      <div className={classNames(styles.Content, styles[type])}>
        <Icon
          type={type === 'Facebook' ? `Icon${type}F` : `Icon${type}`}
          addClass={styles.Icon}
        />
      </div>
    </Link>
  );
};

export default MinistageSocialMediaIcon;
