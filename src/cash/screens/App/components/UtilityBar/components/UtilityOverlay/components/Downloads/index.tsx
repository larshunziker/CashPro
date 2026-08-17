import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */
const Downloads = ({ toggleOverlayVisible }) => {
  return (
    <>
      <p className={styles.Title}>Downloads</p>

      <Link
        className={classNames(styles.Link, styles.LinkPDF)}
        label="Unternehmensbroschüre (DE)"
        path="https://www.cash.ch/sites/default/files/media/document/cash-Image-Broschuere_10.2022_DE.pdf"
      />

      <Link
        className={classNames(styles.Link, styles.LinkPDF)}
        label="Preise und Tarife - Domizil Schweiz"
        path="https://www.cash.ch/sites/default/files/media/document/2209_p_cash_10002_Preise_Tarife_CH_de_SEC.pdf"
      />

      <Link
        className={classNames(styles.Link, styles.LinkPDF)}
        label="Multimanager-Strategien (Factsheet)"
        path="https://www.cash.ch/sites/default/files/media/document/2109_p_cash_10036_mm_factsheet_de_sec.pdf"
      />

      <Link
        className={classNames(styles.Link, styles.LinkPDF)}
        label="Multi Stocks Strategies (Factsheet)"
        path="https://www.cash.ch/sites/default/files/documents/banking/2204_p_cash_10039_mss-infoflyer_de.pdf"
      />

      <Link
        onClick={() => toggleOverlayVisible(false)}
        className={classNames(styles.Link, styles.LinkDownload)}
        label="Weitere Downloads"
        path="/anlegen/services/downloads"
      />
    </>
  );
};

export default Downloads;
