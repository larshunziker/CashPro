/**
 * @file   restaurant ranking
 * @author Thomas Rubattel <thomas.rubattel@ringieraxelspringer.ch>
 * @date   2017-03-06
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
import gaultMillauIcons from '../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { RestaurantRankingProps } from './typings';

export const RANKING_HAT_THRESHOLD_MIN = 12;
export const RANKING_HAT_THRESHOLD_MAX = 20;
export const ICON_TYPE_HAT_POINTS_PREFIX = 'IconPoints';
export const RESTAURANT_RANKING_ORIGIN_RESTAURANT =
  'restaurant-ranking/restaurant';

/* @ts-ignore TODO: TS7006 ->  Parameter 'ranking' implicitly has an 'any' type. */
export const isRankingInHat = (ranking) =>
  ranking !== null &&
  ranking >= RANKING_HAT_THRESHOLD_MIN &&
  ranking <= RANKING_HAT_THRESHOLD_MAX;

/* @ts-ignore TODO: TS7006 ->  Parameter 'ranking' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'isProvisional' implicitly has an 'any' type. */
export const getHatIconType = (ranking, isProvisional) =>
  `${ICON_TYPE_HAT_POINTS_PREFIX}${ranking}${
    (isProvisional && 'Bracket') || ''
  }`;

const RestaurantRanking = ({
  points,
  isProvisional,
  pointsChange,
  trendIsDisabled = false,
  addClass = '',
  addHatIconClass = '',
  origin = '',
}: RestaurantRankingProps) => {
  const isRankingInsideHat = isRankingInHat(points);
  const pointsChangeInt = pointsChange || 0;
  return (
    <div className={classNames(styles.Wrapper, { [addClass]: !!addClass })}>
      {
        /* ranking inside the hat */
        isRankingInsideHat && (
          <div>
            <div
              className={classNames({
                [styles.HatWrapper]:
                  origin === RESTAURANT_RANKING_ORIGIN_RESTAURANT,
                [styles.WithArrowUp]: !trendIsDisabled && pointsChangeInt > 0,
                [styles.WithArrowDown]: !trendIsDisabled && pointsChangeInt < 0,
              })}
            >
              <Icon
                type={getHatIconType(points, isProvisional)}
                addClass={classNames(styles.HatIcon, {
                  [addHatIconClass]: !!addHatIconClass,
                })}
                iconsOverride={gaultMillauIcons}
              />
            </div>
          </div>
        )
      }
      {
        /* ranking points but no hat */
        !isRankingInsideHat && points && (
          <div>
            <span className={styles.SimpleRankingPoints}>
              {`${points}/${RANKING_HAT_THRESHOLD_MAX}`}
            </span>
          </div>
        )
      }
      {
        /* no ranking points */
        !isRankingInsideHat && !points && (
          <div className={styles.NoRankingPoints}>
            <FormattedMessage
              id="restaurant.ranking.none"
              description="The default label for no grade"
              defaultMessage="o.N."
            />
          </div>
        )
      }
    </div>
  );
};

export default RestaurantRanking;
