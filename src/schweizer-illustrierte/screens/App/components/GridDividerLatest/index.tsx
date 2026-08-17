import React, { FC } from 'react';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_UP_TO_YEARS,
  getFormattedElapsedDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { GridDividerListProps } from './typings';

const GridDividerLatest: FC<GridDividerListProps> = ({
  data: { publicationDate, channel },
}) => (
  <div className={styles.Wrapper} data-testid="grid-divider-latest-container">
    <div className={classNames(styles.Flag, styles.ContentBlue)}>
      {getFormattedElapsedDate({
        createDate: publicationDate,
        format: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
      })}
    </div>
    {channel?.title && channel?.preferredUri && (
      <div
        className={styles.ChannelWrapper}
        data-testid="grid-divider-latest-channel"
      >
        <Link
          className={styles.Link}
          path={channel.preferredUri}
          label={channel.title}
        />
      </div>
    )}
  </div>
);

export default GridDividerLatest;
