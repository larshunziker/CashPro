import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setNavigationVisible } from '../../../../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../../../../../common/components/Link';
import Button from '../../../../../../../ButtonWithLoading';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const FallbackIntegration = ({ menu }: { menu: MenuTreeItem }) => {
  const dispatch = useDispatch();
  return (
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (menu?.subtree?.edges?.length < 4 && (
      <ul className={classNames(styles.BankTeaser, grid.ColMd6)}>
        <p>
          Eröffnen Sie jetzt in wenigen Minuten Ihr Depot bei cash - banking by
          bank zweiplus
        </p>
        <Link path="https://www.cash.ch/online-trading?promo_name=depot_button&promo_position=navigation_dropdown_desktop">
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'NavigationMenuType'. */
              dispatch(setNavigationVisible(null));
            }}
          >
            <span>Trading-Konto eröffnen</span>
          </Button>
        </Link>
      </ul>
    )) ||
    null
  );
};

export default FallbackIntegration;
