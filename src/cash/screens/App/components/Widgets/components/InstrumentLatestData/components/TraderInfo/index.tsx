import React, { memo } from 'react';
import classnames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import Tooltip from '../../../../../Tooltip';
import DataField from './components/DataField';
import { useSSRContext } from '../../../../../../../../../common/components/SSRContext';
import { tradeableMarketAlternative } from './constants';
import styles from './styles.legacy.css';
import { TraderInfoProps } from './typings';

const TraderInfo = ({
  fields,
  instrument,
  loading,
  error,
  barPercentages,
  tradeType,
  hrefBuy,
}: TraderInfoProps) => {
  const { isSSR } = useSSRContext();
  const isLoading = loading || !!error;

  const bankingUrlBuy = hrefBuy;
  const bankingUrlSell = bankingUrlBuy?.replace(
    'brokerageBuy',
    'brokerageSell',
  );

  const hrefParams = hrefBuy
    ? Object.fromEntries(hrefBuy?.split('&')?.map((p) => p.split('=')))
    : null;
  const curr = hrefParams?.curr;
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ 4 */
  const marketAlternative = tradeableMarketAlternative[hrefParams?.tpl];

  // this is a legal requirement to remove Buy/Sell buttons for Schroder funds (RDP-4503)
  const isSchroderFund = (): boolean => {
    /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
    return (
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      ['FON', 'ETF', 'TFO'].includes(instrument?.scGrouped) &&
      instrument?.mName?.startsWith('Schroder')
    );
  };

  return (
    <>
      <div className={styles.Divider} />
      <div className={styles.Wrapper}>
        <div className={styles.InnerWrapper}>
          <div className={styles.LeftWrapper}>
            <div className={styles.Label}>
              <DataField
                isLoading={isLoading}
                fields={[fields.bidDatetime]}
                onlyOne
              />
              <span>Geld</span>
              <Tooltip content="Der Preis, zu dem ein Käufer bereit ist, ein bestimmtes Wertpapier oder Finanzprodukt zu kaufen." />
            </div>
            <DataField
              isLoading={isLoading}
              fields={[
                fields.bid,
                <span key={fields.bidVolume} className={styles.ValueAdditional}>
                  {fields.bidVolume}
                </span>,
              ]}
            />
          </div>

          <div className={styles.RightWrapper}>
            <div className={styles.Label}>
              <span>Brief</span>
              <Tooltip content="Der Preis, zu dem ein Verkäufer bereit ist, ein bestimmtes Wertpapier oder Finanzprodukt zu verkaufen." />
              <DataField
                isLoading={isLoading}
                fields={[fields.askDatetime]}
                onlyOne
              />
            </div>
            <DataField
              isLoading={isLoading}
              fields={[
                fields.ask,
                <span key={fields.askVolume} className={styles.ValueAdditional}>
                  {fields.askVolume}
                </span>,
              ]}
            />
          </div>
        </div>

        {instrument?.bidVolume && instrument?.askVolume && (
          <div className={styles.InnerWrapper}>
            <div className={styles.BuySellBar}>
              {!isLoading && (
                <>
                  <div
                    style={{ width: `${barPercentages.bid || '0'}%` }}
                    className={classnames(styles.SellBar, {
                      [styles.AllCornersRounded]: barPercentages.bid === 100,
                    })}
                  >
                    {barPercentages.bid >= 15 ? `${barPercentages.bid}%` : ''}
                  </div>
                  <div
                    style={{ width: `${barPercentages.ask || '0'}%` }}
                    className={classnames(styles.BuyBar, {
                      [styles.AllCornersRounded]: barPercentages.ask === 100,
                    })}
                  >
                    {barPercentages.ask >= 15 ? `${barPercentages.ask}%` : ''}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className={styles.Divider} />

        {!isLoading && (!instrument?.vol || !instrument?.tur) ? (
          <></>
        ) : (
          <>
            <div className={styles.InnerWrapper}>
              <span className={styles.Text}>
                <div>Tagesvolumen Börse</div>
                <Tooltip content="Die Gesamtanzahl der gehandelten Wertpapiere innerhalb eines einzigen Handelstages. Das Tagesvolumen ist ein wichtiger Indikator für die Aktivität und Liquidität eines bestimmten Wertpapiers oder eines gesamten Marktes." />
              </span>
              <div className={styles.Text}>
                <DataField
                  isLoading={isLoading}
                  fields={[fields.vol]}
                  onlyOne
                />
              </div>
            </div>

            <div className={styles.InnerWrapper}>
              <span className={styles.Text}>
                Umsatz {instrument?.mCur}
                <Tooltip content="Tagesvolumen multipliziert mit dem Preis." />
              </span>

              <span className={styles.Text}>
                <DataField
                  isLoading={isLoading}
                  fields={[fields.tur]}
                  onlyOne
                />
              </span>
            </div>
          </>
        )}
        {!isSSR && ['VAL', 'VAL_CURR', 'BC_ONLY'].includes(tradeType) && (
          <div className={styles.InnerWrapper}>
            {tradeType === 'VAL' && (
              <div className={styles.InfoText}>
                Dieser Titel ist nur an einem anderen Börsenplatz (
                <span className={styles.Highlighted}>{marketAlternative}</span>)
                und in einer anderen Währung (
                <span className={styles.Highlighted}>{curr}</span>) handelbar.
              </div>
            )}
            {tradeType === 'VAL_CURR' && (
              <div className={styles.InfoText}>
                Der gewählte Börsenplatz steht im E-Banking nicht zur Verfügung.
                Wir empfehlen stattdessen den Handel an der Börse{' '}
                <span className={styles.Highlighted}>{marketAlternative}</span>.
              </div>
            )}
            {tradeType === 'BC_ONLY' && (
              <div className={styles.InfoText}>
                Dieser Titel ist nicht zum Handel im E-Banking freigeschaltet.
                Für telefonischen Handel oder Auskunft wählen Sie bitte{' '}
                <span className={styles.Highlighted}>00800 0800 55 55</span>.
              </div>
            )}
          </div>
        )}

        {!isSSR &&
          !['NO_TRADING', 'BC_ONLY'].includes(tradeType) &&
          !isSchroderFund() && (
            <div className={styles.ButtonsWrapper}>
              <Link
                className={styles.SellButton}
                target="_blank"
                aria-label="Verkaufen"
                path={bankingUrlSell}
              >
                <>Verkaufen</>
              </Link>
              <Link
                className={styles.BuyButton}
                target="_blank"
                aria-label="Kaufen"
                path={bankingUrlBuy}
              >
                <>Kaufen</>
              </Link>
            </div>
          )}
      </div>
    </>
  );
};

export default memo<TraderInfoProps>(TraderInfo);
