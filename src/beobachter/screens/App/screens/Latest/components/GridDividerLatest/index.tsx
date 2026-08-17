import React, { FC } from 'react';
import classNames from 'classnames';
import { formatDay } from '../../formatDay';
import styles from './styles.legacy.css';
import { GridDividerListProps } from './typings';

const GridDividerLatest: FC<GridDividerListProps> = ({
  data: { publicationDate },
}) => (
  <div className={styles.Wrapper} data-testid="grid-divider-latest-container">
    <div className={styles.Square} />
    {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
    <div className={classNames(styles.Date)}>{formatDay(publicationDate)}</div>
  </div>
);

export default GridDividerLatest;
