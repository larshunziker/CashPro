import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */
const Contakt = ({ toggleOverlayVisible }) => {
  return (
    <div className={styles.Grid0}>
      <div className={styles.Item0}>
        <p className={styles.Title}>Ihr Kontakt in die Bank</p>
        <p className={styles.Lead}>
          Wir beraten Sie gerne telefonisch oder im persönlichen Gespräch
        </p>
      </div>
      <div className={styles.Item1}>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>
            <Icon type="IconPhone" addClass={styles.Icon} />
            Banking & Trading
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="00800 0800 55 55"
              path="tel:00800 0800 55 55"
            />{' '}
            (gratis)
            <br />
            oder{' '}
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="+41 58 059 22 17"
              path="tel:+41 58 059 22 17"
            />
          </p>
        </div>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>
            <Icon type="IconEnvelope" addClass={styles.Icon} />
            Online-Kontakt
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="bankingline@bankzweiplus.ch"
              path="mailto:bankingline@bankzweiplus.ch"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Kontaktformular »"
              path="/anlegen/services/kontakt"
            />
          </p>
        </div>
      </div>
      <div className={styles.Item2}>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>
            <Icon type="IconHouse" addClass={styles.Icon} />
            Unsere Adresse
          </p>
          <p>bank zweiplus ag</p>
          <p>cash</p>
          <p>Buckhauserstrasse 22</p>
          <p>Postfach</p>
          <p>CH-8048 Zürich</p>
        </div>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>
            <Icon type="IconLocation" addClass={styles.Icon} />
            Unser Standort
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Auf der Karte anzeigen »"
              path="https://maps.app.goo.gl/o2rpoZTwHV867GRP9"
            />
          </p>
        </div>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>
            <Icon type="IconCircleInfo" addClass={styles.Icon} />
            Mehr über cash
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Unternehmen »"
              path="/ueberuns/unternehmen"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contakt;
