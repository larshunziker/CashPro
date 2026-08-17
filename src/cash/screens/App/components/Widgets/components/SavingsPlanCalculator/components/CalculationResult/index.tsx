import React from 'react';
import classNames from 'classnames';
import { formatPrice } from '../../../../../Highcharts/helpers';
import { format } from '../../helpers';
import Link from '../../../../../../../../../common/components/Link';
import InfoBox from '../InfoBox';
import styles from './styles.legacy.css';
import { CalculationResultProps, GroupRowProps } from './typings';

const CalculationResult = (props: CalculationResultProps) => {
  const { chartData, mappedFormFields } = props;

  return (
    <>
      <InfoBox title="Beschreibung Grafik">
        <p className={styles.ChartExplanation}>
          Das Balkendiagramm zeigt den Gesamtbetrag und die Gesamteinzahlung
          (einmalige Einzahlung und regelmässige Einzahlungen) über die
          Anlagedauer hinweg in jährlicher Aufschlüsselung. Ausserdem wird
          dargestellt, wie viel Ertrag Sie voraussichtlich im Vergleich zu einem
          Sparkonto erzielen könnten, wenn der jährliche Ertrag der Anlage so
          bleibt wie bisher.
        </p>
      </InfoBox>

      <div className={styles.Wrapper}>
        <div className={styles.InnerWrapper}>
          <div className={styles.ResultBreakdown}>
            <div className={styles.Group}>
              <GroupRow
                title="Ergebnis"
                circleColor="none"
                value="in CHF"
                isTitle={true}
              />

              <GroupRow
                title="Gesamteinzahlungen"
                circleColor="blue"
                value={chartData.investments}
              />
            </div>

            <div className={styles.Group}>
              <GroupRow
                title="Rendite Sparkonto"
                circleColor="grey"
                value={chartData.returnsSavingsAccount}
              />

              <GroupRow
                title="Gesamtbetrag Sparkonto"
                circleColor="none"
                value={chartData.returnsSavingsAccount + chartData.investments}
              />
            </div>

            <div className={styles.Group}>
              <GroupRow
                title="Rendite Sparplan"
                circleColor="red"
                value={chartData.returnsProduct}
              />

              <GroupRow
                title="Gesamtbetrag Sparplan"
                circleColor="none"
                value={chartData.returnsProduct + chartData.investments}
                highlighted={true}
              />
            </div>
          </div>

          <div>
            <p className={styles.ResultExplanation}>
              Der Wert Ihres Sparkontos nach{' '}
              {format(mappedFormFields.investmentPeriod, 0)} Jahren beträgt mit
              einer Durchschnittsverzinsung von{' '}
              {format(mappedFormFields.savingsAccountReturn, 1)}% CHF{' '}
              {format(chartData.returnsSavingsAccount + chartData.investments)}.
            </p>
            <p className={styles.ResultExplanation}>
              Im selben Zeitraum beträgt der Wert Ihrer Anlage mit einer
              Durchschnittsverzinsung von{' '}
              {format(mappedFormFields.productReturn, 1)}%{' '}
              <span className={styles.Highlighted}>
                CHF {format(chartData.returnsProduct + chartData.investments)}
              </span>
              .
            </p>
            <Link
              target="_blank"
              aria-label="Jetzt Anlagesparplan eröffnen"
              className={classNames(styles.Button)}
              path="https://kontoeroeffnung.cash.ch"
            >
              <>Jetzt Anlagesparplan eröffnen</>
            </Link>
            <Link
              target="_blank"
              aria-label="Produktinfos"
              className={styles.ButtonInfos}
              path="https://www.cash.ch/anlegen/bankangebote/fondssparplan"
            >
              <>Infos zum Fonds- / ETF-Sparplan</>
            </Link>
            <Link
              target="_blank"
              aria-label="Produktinfos"
              className={styles.ButtonInfos}
              path="https://www.cash.ch/anlegen/bankangebote/anlagesparplan-goldbarren-1-unze"
            >
              <>Infos zum Goldsparplan</>
            </Link>
          </div>
        </div>

        <div className={styles.Disclaimer}>
          <p>
            Die vergangene Wertentwicklung ist kein Indikator und keine Garantie
            für die zukünftige Wertentwicklung einer Anlage und sollte nicht der
            einzige entscheidende Faktor bei der Auswahl eines Produkts oder
            einer Anlagestrategie sein. Der Wert von Anlagen kann Schwankungen
            unterworfen sein, sodass Anleger:innen unter Umständen nicht den
            gesamten investierten Betrag zurückerhalten. Diese Darstellung
            stellt keine Anlageberatung dar, da die individuellen finanziellen
            Verhältnisse und die Vermögenssituation des jeweiligen Nutzers bei
            der Berechnung nicht berücksichtigt werden. Alle Daten ohne Gewähr.
          </p>
          <p>© 2024 cash - bank zweiplus</p>
        </div>
      </div>
    </>
  );
};

const GroupRow = (props: GroupRowProps) => {
  const {
    title,
    circleColor,
    value,
    isTitle = false,
    highlighted = false,
  } = props;

  const circleStyles = {
    red: styles.Red,
    grey: styles.Grey,
    blue: styles.Blue,
    none: '',
  };
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ red */
  const currrentStyle = circleStyles[circleColor];

  return (
    <div className={styles.GroupRow}>
      <div>
        {!isTitle && ( // hide circle for title
          <span className={classNames(styles.Circle, currrentStyle)} />
        )}
        <p
          className={classNames({
            [styles.Title]: isTitle,
            [styles.Highlighted]: highlighted,
          })}
        >
          {title}
        </p>
      </div>
      <span
        className={classNames({
          [styles.Highlighted]: highlighted,
        })}
      >
        {typeof value === 'string' ? value : formatPrice(value)}
      </span>
    </div>
  );
};

export default CalculationResult;
