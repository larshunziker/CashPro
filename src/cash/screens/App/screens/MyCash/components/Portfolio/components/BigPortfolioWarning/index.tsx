import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { BigPortfolioProps } from './typings';

export const MAX_INSTRUMENT_PER_PORTFOLIO = 250;

const BigPortfolioWarning = ({ instrumentCount }: BigPortfolioProps) => (
  <div className={styles.Wrapper}>
    <div className={styles.Title}>Grosses Portfolio </div>
    <div className={styles.Text}>
      {`Ihr Portfolio umfasst aktuell ${instrumentCount} Instrumente. Viele Instrumente mit vielen Transaktionen können zu langen Ladezeiten führen und als Folge davon nicht dargestellt werden. Melden Sie sich beim Kundensupport
              (`}
      <Link
        className={styles.Link}
        label="office@cash.ch"
        path="mailto:office@cash.ch"
      />
      {`), falls Sie dieses Verhalten feststellen.`}
    </div>
  </div>
);

export default BigPortfolioWarning;
