import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */
const Calculator = ({ toggleOverlayVisible }) => {
  return (
    <div className={styles.Grid0}>
      <div className={styles.Item0}>
        <p className={styles.Title}>Unsere Rechner</p>
        <p className={styles.Lead}>Was möchten Sie berechnen?</p>
      </div>
      <div className={styles.Item1}>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>Wohnrechner</p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Tragbarkeit nach Objektwert"
              path="/rechner/wohnrechner-tragbarkeit-nach-objektwert"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Tragbarkeit nach Einkommen"
              path="/rechner/wohnrechner-tragbarkeit-nach-einkommen"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Miete oder Kauf?"
              path="/rechner/wohnrechner-miete-kauf"
            />
          </p>
        </div>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>Währungsrechner</p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Währungen umrechnen"
              path="/waehrungsrechner"
            />
          </p>
        </div>
      </div>
      <div className={styles.Item2}>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>Steuerrechner</p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Einkommen und Vermögen"
              path="/rechner/steuerrechner-einkommen-vermoegen"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Kapitalauszahlung"
              path="/rechner/steuerrechner-kapitalauszahlung"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Säule 3a-Sparen"
              path="/rechner/steuerrechner-saeule3a"
            />
          </p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Wohnortwechsel"
              path="/rechner/steuerrechner-einkommen-vermoegen"
            />
          </p>
        </div>
        <div className={styles.Item}>
          <p className={styles.Subtitle}>Übersicht alle Rechner</p>
          <p>
            <Link
              onClick={() => toggleOverlayVisible(false)}
              className={styles.Link}
              label="Alle acht Rechner auf einen Blick"
              path="/rechner"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
