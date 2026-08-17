import React from 'react';
import classNames from 'classnames';
import { getFormattedElapsedDate } from '../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../common/components/Link';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'preferredUri' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'publicationDate' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const TeaserTimeline = ({ preferredUri, publicationDate, title }) => (
  <Link
    path={preferredUri}
    className={classNames('teaser-timeline', styles.WrapperTimeline)}
  >
    <div className={grid.Row}>
      <div
        className={classNames(
          styles.LeftCol,
          grid.ColXs5,
          grid.ColSm5,
          grid.ColXl4,
        )}
      >
        <div className={styles.Left}>
          <span className={styles.TimelineDateTimeline}>
            {getFormattedElapsedDate({
              changeDate: publicationDate,
              prefix: 'am',
            })}
          </span>
        </div>
      </div>
      <div className={classNames(grid.ColSm19, grid.ColXl20)}>
        <div className={styles.Right}>
          <div className={styles.Wrapper}>
            <span className={styles.TimelineDate}>
              {getFormattedElapsedDate({
                changeDate: publicationDate,
                prefix: 'am',
              })}
            </span>
            <div>
              <span className={styles.TeaserTitle}>{title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default TeaserTimeline;
