import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { CardProps } from './typings';

const Card = ({ title, urlLabel, url, addClass = '', children }: CardProps) => (
  <Link path={url}>
    <div
      className={classNames({
        [styles.Wrapper]: !addClass,
        [addClass]: !!addClass,
      })}
    >
      <div className={styles.Content}>
        <h3 className={styles.Title}>{title}</h3>
        {children}
      </div>
      <span className={styles.Link}>{urlLabel}</span>
    </div>
  </Link>
);

export default Card;
