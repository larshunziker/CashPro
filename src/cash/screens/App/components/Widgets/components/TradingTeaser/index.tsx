import React, { memo } from 'react';
import { useSubscriptions } from '../../../../../../shared/hooks/useSubscriptions';
import { getTeaserTextByDepotPrice } from './helpers';
import styles from './styles.legacy.css';
import cashBankingLogo from '../../../../../../screens/App/assets/graphics/logo-cash-banking.svg';
import { TradingTeaserProps } from './typings';

const TradingTeaser = ({ depotPrice }: TradingTeaserProps) => {
  const subscriptions = useSubscriptions();
  const showTeaser = subscriptions.isBanking === false;

  return (
    showTeaser && (
      <div className={styles.WidgetWrapper}>
        <div className={styles.Title}>Ihr günstiges Depot wartet auf Sie!</div>
        <ul>
          <li>{getTeaserTextByDepotPrice(depotPrice)}</li>
          <li>Jeder Online-Trade nur CHF 29.</li>
        </ul>
        <div className={styles.Row}>
          <a
            className={styles.LinkButton}
            href="https://www.cash.ch/online-trading?promo_name=cta_button&promo_position=portfolio"
          >
            Konditionen
          </a>
          <img src={cashBankingLogo} alt="" />
        </div>
      </div>
    )
  );
};

/* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
export default memo(TradingTeaser);
