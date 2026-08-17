import React, { useCallback } from 'react';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../../../shared/helpers/tealium';
import Link from '../../../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { MenuItemProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ThemeDark];

const MenuItem = ({
  link,
  closeNavigation,
  categoryIndex,
  subcategoryIndex,
  theme,
  isNavHeader = false,
  addClass = '',
}: MenuItemProps) => {
  const trackLinkItemClick = (event: KeyboardEvent) => {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'menu_click',
        menu_item: link?.label,
        menu_item_position: `menu-link-${String(categoryIndex)}-${String(
          subcategoryIndex,
        )}`,
      },
    });
    closeNavigation(event);
  };

  return (
    <div
      className={classNames(styles.LinkWrapper, {
        [styles.NavHeaderLinkWrapper]: isNavHeader,
        [addClass]: !!addClass,
      })}
    >
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={link?.path}
        /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
        className={classNames(styles.NavLink, styles[theme], {
          [styles.NavHeaderLink]: isNavHeader,
          [styles.MagazinTitle]: link?.label === 'Magazin',
          [styles.BeratungTitle]:
            link?.label === 'Beratung' || link?.label === 'Rechtsberatung',
          [styles.CommunityTitle]: link?.label === 'Community',
        })}
        onClick={useCallback(trackLinkItemClick, [
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          link.label,
          categoryIndex,
          subcategoryIndex,
          closeNavigation,
        ])}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        label={link?.label}
      />
    </div>
  );
};

export default MenuItem;
