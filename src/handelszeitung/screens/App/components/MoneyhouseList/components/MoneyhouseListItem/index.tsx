import React from 'react';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_SHORT,
  getFormattedElapsedDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../common/components/Link';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MoneyhouseListItemProps } from './typings';

const MoneyhouseListItem = ({ node }: MoneyhouseListItemProps) => (
  <>
    <div
      className={classNames(styles.BodyTitle, styles.Body, grid.ColSm12)}
      data-testid="moneyhouse-list-wrapper"
    >
      <Link
        className={styles.BodyTitleLink}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={node?.organization?.preferredUri}
        label={node?.organization?.title || ''}
      />
    </div>
    <div className={classNames(styles.Body, grid.ColSm8, styles.Position)}>
      {node?.position || ''}
    </div>
    <div
      className={classNames(styles.Body, grid.ColSm4, styles.Date)}
      data-testid="moneyhouse-list-item-date-wrapper"
    >
      {node?.validFrom && (
        <>
          {!node?.validTo && (
            <span className={styles.ValidFromLabel}>seit </span>
          )}
          {getFormattedElapsedDate({
            createDate: new Date(node?.validFrom || 0),
            format: TIME_ELAPSED_FORMAT_SHORT,
          })}
        </>
      )}

      {node?.validTo && (
        <>
          {' '}
          {getFormattedElapsedDate({
            createDate: new Date(node?.validTo || 0),
            format: TIME_ELAPSED_FORMAT_SHORT,
          })}
        </>
      )}
    </div>
  </>
);

export default MoneyhouseListItem;
