import React, { useCallback } from 'react';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../../../shared/helpers/tealium';
import Link from '../../../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { MenuItemProps } from './typings';

const NavigationItem = ({
  link,
  closeNavigation,
  itemIndex,
}: MenuItemProps) => {
  const trackLinkItemClick = useCallback(
    (event: KeyboardEvent) => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'menu_click',
          menu_item: link?.label,
          menu_item_position: `secondary-menu-link-${String(itemIndex)}}`,
        },
      });

      closeNavigation(event);
    },
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    [link.label, itemIndex, closeNavigation],
  );

  return (
    <li className={classNames(styles.LinkWrapper)}>
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={link?.path}
        className={classNames(styles.NavLink)}
        onClick={trackLinkItemClick}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        label={link?.label}
      />
    </li>
  );
};

export default NavigationItem;
