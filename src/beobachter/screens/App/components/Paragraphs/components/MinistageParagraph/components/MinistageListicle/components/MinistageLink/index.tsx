import React from 'react';
import Link from '../../../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { MinistageLinkProps } from './typings';

const MinistageLink = ({ item, index }: MinistageLinkProps) => (
  <div className={styles.LinkWrapper} key={index}>
    {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
    <Link className={styles.Link} {...item.node}>
      <span className={styles.Rank}>{index + 1}</span>
      <span className={styles.Text}>
        {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
        <span className={styles.TextInner}>{item.node.label}</span>
      </span>
    </Link>
  </div>
);

export default MinistageLink;
