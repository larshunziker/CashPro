import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { RestaurantsPagerProps } from './typings';

const RestaurantsPager = ({
  hasNextPage,
  hasPreviousPage,
  page,
  setPage,
}: RestaurantsPagerProps) =>
  (hasPreviousPage || hasNextPage) && (
    <div className={styles.Pager}>
      <button
        className={classNames(styles.Button, {
          [styles.Active]: hasPreviousPage,
        })}
        onClick={() => (hasPreviousPage ? setPage(page - 1) : undefined)}
      >
        <FormattedMessage
          id="app.map.pager.back"
          description="Pager back text"
          defaultMessage="Zurück"
        />
      </button>
      <span className={styles.Divider} />
      <button
        className={classNames(styles.Button, { [styles.Active]: hasNextPage })}
        onClick={() => (hasNextPage ? setPage(page + 1) : undefined)}
      >
        <FormattedMessage
          id="app.map.pager.next"
          description="Pager next text"
          defaultMessage="Weiter"
        />
      </button>
    </div>
  );

export default RestaurantsPager;
