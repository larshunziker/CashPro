import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { formatDate } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import {
  formatPercentage,
  formatPrice,
} from '../../../../../Highcharts/helpers';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import Chart from '../Chart';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import styles from './styles.legacy.css';
import { CardProps } from './typings';

const Card = ({ data, cardsPerViewport, origin }: CardProps) => {
  const [showInfoText, setShowInfoText] = useState(false);
  const isMobile = global.innerWidth < 760;
  const { exdt, tradeableData, paydt, grossdividend, logo, years, quote } =
    data;

  const yearsArray = years?.map((value) => `${value.year}`) || [];
  const paidPrice = years?.map((value) => Number(value.grossDividend)) || [];
  const chartsData = { yearsArray, paidPrice };

  const calculateRendite = (grossDividendSum: number, lval: string) => {
    const customRendite = (grossDividendSum / Number(lval)) * 100;
    return <span>{formatPercentage(customRendite, '')}%</span>;
  };

  useEffect(() => {
    if (!showInfoText) {
      return;
    }
    const handleOutsideClick = () => {
      setShowInfoText(false);
    };
    const timeoutId = global.setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
    return () => {
      global.clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showInfoText]);

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.IsOneItem]: cardsPerViewport === 1,
      })}
    >
      <div className={styles.CardHeader}>
        <Link
          target="_blank"
          aria-label={`Link zur ${quote?.mName} Fullquote Seite`}
          className={classNames(styles.LinkWrapper, styles.Link)}
          path={`${quote?.fullquoteUri}`}
          onClick={() => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'open fullquote',
                element_position: `${origin}`,
                quoteLink: quote?.fullquoteUri,
              },
            });
          }}
        >
          {logo && (
            <img
              className={styles.BrandImg}
              onError={({ currentTarget }) => {
                currentTarget.style.display = 'none';
                currentTarget.onerror = null; // prevents looping
                // in case if we wanna use a fallback image ⬇
                // currentTarget.src =
                //   'https://mayvers.com.au/wp-content/uploads/2017/09/test-image.jpg';
              }}
              alt="brand"
              src={`${logo}`}
            />
          )}
          <div className={styles.QuoteTitle}>{quote?.mName}</div>
        </Link>
      </div>
      <div>
        Ex-Tag: <span className={styles.ExDate}>{formatDate(exdt)}</span>
      </div>
      <div className={styles.InfoTable}>
        <table>
          <tbody>
            <tr>
              <th className={styles.Left}>Zahltag</th>
              <th className={styles.Center}>Dividende</th>
              <th className={styles.Right}>
                <div className={styles.RenditeWrapper}>
                  <p>Rendite</p>
                  {!quote?.yldeq && (
                    <span className={styles.Icon}>
                      <Icon
                        type={
                          (!showInfoText && 'IconCircleInfo') || 'IconXMark'
                        }
                        addClass={styles.Icon}
                        onClick={() => setShowInfoText(!showInfoText)}
                      />
                      {showInfoText && (
                        <span className={styles.InfoTextWrapper}>
                          Dieser Wert wurde von cash.ch auf Basis der aktuellen
                          Bewertung hochgerechnet.
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </th>
            </tr>
            <tr>
              <td className={styles.Left}>{formatDate(paydt)}</td>
              <td className={styles.Center}>
                {`${quote?.mCur} ${formatPrice(grossdividend)}`}
              </td>
              <td className={styles.Right}>
                {(quote?.yldeq && `${formatPercentage(quote?.yldeq, '')}%`) ||
                  (grossdividend &&
                    quote?.lval &&
                    calculateRendite(
                      chartsData.paidPrice[chartsData.paidPrice.length - 1],
                      quote?.lval,
                    )) ||
                  null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.ChartTitle}>Dividendenauszahlungen</div>
      <div className={styles.ChartLegend}>
        <span>
          <Icon type="IconArrowUp"></Icon> {quote?.mCur}
        </span>
        <span>
          <Icon type="IconArrowRight"></Icon> Jahre
        </span>
      </div>
      <div className={styles.ChartWrapper}>
        {Array.isArray(years) && years?.length > 0 && (
          <Chart data={chartsData} currency={quote?.mCur || ''} />
        )}
      </div>
      <div className={styles.ButtonsWrapper}>
        <Link
          className={styles.SellButton}
          target="_blank"
          aria-label="Verkaufen"
          path={`${
            (isMobile && tradeableData?.listing?.links?.hrefMobileSell) ||
            tradeableData?.listing?.links?.hrefSell
          }`}
          onClick={() => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'sell_stock',
                element_position: `${origin}`,
                quoueIsin: quote?.isin,
                quoueName: quote?.mName,
                quoueListingKey: quote?.instrumentKey,
              },
            });
          }}
        >
          <>Verkaufen</>
        </Link>
        <Link
          className={styles.BuyButton}
          target="_blank"
          aria-label="Kaufen"
          path={`${
            (isMobile && tradeableData?.listing?.links?.hrefMobileBuy) ||
            tradeableData?.listing?.links?.hrefBuy
          }`}
          onClick={() => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'buy_stock',
                element_position: `${origin}`,
                quoueIsin: quote?.isin,
                quoueName: quote?.mName,
                quoueListingKey: quote?.instrumentKey,
              },
            });
          }}
        >
          <>Kaufen</>
        </Link>
      </div>
    </div>
  );
};

export default memo(Card);
