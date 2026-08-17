import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../../../common/components/Link';
import { ROUTE_PORTFOLIOS } from '../../../../constants';
import styles from './styles.legacy.css';
import { Categories } from '../../../../components/SearchCategoryFilter/typings';

export const CATEGORIES: Categories[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    link: `/portfolio`,
    slugName: 'portfolio',
    onClick: () => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'portfolio_open',
          event_category: 'portfolio',
          from: 'my-cash/category-buttons',
        },
      });
    },
  },
  {
    id: 'watchlist',
    name: 'Watchlist',
    link: `/watchlist`,
    slugName: 'watchlist',
    onClick: () => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'watchlist_open',
          event_category: 'watchlist',
          from: 'my-cash/category-buttons',
        },
      });
    },
  },
  {
    id: 'alerts',
    name: 'Alerts',
    link: `/alerts`,
    slugName: 'alerts',
    onClick: () => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'alert_open',
          event_category: 'alert',
          from: 'my-cash/category-buttons',
        },
      });
    },
  },
];

/* @ts-ignore TODO: TS7031 ->  Binding element 'pathname' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isHybridApp' implicitly has an 'any' type. */
const CategoryButtons = ({ pathname, isHybridApp }) => {
  if (!isHybridApp) {
    return (
      <div className={classNames(styles.CategoryWrapper, 'hide-on-print')}>
        {CATEGORIES.map((category) => (
          <Link
            key={`category-item-${category.id}`}
            path={category?.link}
            className={classNames(styles.Button, {
              [styles.IsActive]:
                pathname !== `/${ROUTE_PORTFOLIOS}` &&
                pathname.includes(`/${category.slugName}`),
            })}
            onClick={category?.onClick}
          >
            <>{category.name}</>
          </Link>
        ))}
      </div>
    );
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

/* @ts-ignore TODO: TS2345 ->  Argument of type '({ pathname, isHybridApp } */
export default connect(mapStateToProps)(CategoryButtons);
