import React from 'react';
import {
  useBNPDerivative,
  useBNPDerivativeFullquote,
} from '../../../../../../shared/hooks/useBNPDerivative';
import Skeleton from '../../../Skeleton';
import AutoUpdateField from '../../../../screens/MyCash/components/AutoUpdateField';
import { formatPriceWithCache } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import Link from '../../../../../../../common/components/Link';

import CopyToClipboard from '../FullquoteHeader/components/CopyToClipboard';
import { formatPercentage, formatPrice } from '../../../Highcharts/helpers';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import styles from './styles.legacy.css';
import { FullquoteHeaderBNPProps } from './typings';

const FullQuoteHeaderBNP = ({
  widgetParagraph,
  origin,
}: FullquoteHeaderBNPProps) => {
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const listingKey = url?.searchParams?.get('listingKey')?.trim();
  const mIsin = url?.searchParams?.get('mIsin');
  const mName = url?.searchParams?.get('mName');

  const { data: fullquoteData } = useBNPDerivativeFullquote(widgetParagraph);
  const { data: derivateData } = useBNPDerivative(
    fullquoteData?.getFullquotePage?.mIsin || undefined,
  );

  if (!derivateData || !derivateData?.integration?.bnp?.derivate?.bid) {
    return <Skeleton show={true} addClass={styles.Skeleton} />;
  }

  const derivative = derivateData.integration.bnp.derivate;

  return (
    <>
      <div className={styles.Wrapper}>
        <div className={styles.TitleWrapper}>
          <h1 className={styles.Title}>
            {fullquoteData?.getFullquotePage.title}
          </h1>
          {fullquoteData?.getFullquotePage.subtitle && (
            <p className={styles.Subtitle}>
              {fullquoteData?.getFullquotePage.subtitle}
            </p>
          )}
        </div>

        <div className={styles.ButtonWrapper}>
          <div className={styles.ButtonsWrapper}>
            <Link
              className={styles.Button}
              target="_blank"
              aria-label="Handeln"
              path={`https://www.bnpparibasmarkets.ch/produkte/${fullquoteData?.getFullquotePage.mIsin}/?utm_campaign=Jahreskooperationen_AON&utm_source=cash.ch&utm_medium=SwissDOTS&utm_content=Trading-Button&utm_source_plattform=Direct&utm_term=Produktintegration`}
              onClick={() => {
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'trade_button',
                    element: 'widget',
                    element_action: `${
                      fullquoteData?.getFullquotePage.mIsin || mIsin
                    }`,
                    element_position: `${origin}`,
                    quoueIsin: `${
                      fullquoteData?.getFullquotePage.mIsin || mIsin
                    }`,
                    quoueName: `${
                      fullquoteData?.getFullquotePage.mName || mName
                    }`,
                    quoueListingKey:
                      fullquoteData?.getFullquotePage.mValor &&
                      fullquoteData?.getFullquotePage?.currencyTradingbasedShort
                        ? `${fullquoteData?.getFullquotePage.mValor}-92001-${fullquoteData?.getFullquotePage?.currencyTradingbasedShort}`
                        : listingKey,
                  },
                });
              }}
            >
              <>Handeln</>
            </Link>
          </div>
        </div>

        <div className={styles.PriceWrapper}>
          <p className={styles.Price}>
            <span className={styles.DataLabel}>
              Geld{' '}
              <span className={styles.DataLabelBold}>
                {fullquoteData?.getFullquotePage?.currencyTradingbasedShort}
              </span>
            </span>
            <AutoUpdateField
              value={derivative.bid || ''}
              formatFn={(value) => formatPrice(value, 'UserInput')}
            />
            <span className={styles.DataLabelDark}>
              <AutoUpdateField
                value={derivative.bidQuantity || ''}
                formatFn={formatPriceWithCache}
              />{' '}
              Stk.
            </span>
          </p>
          <p className={styles.Price}>
            <span className={styles.DataLabel}>
              Brief{' '}
              <span className={styles.DataLabelBold}>
                {fullquoteData?.getFullquotePage?.currencyTradingbasedShort}
              </span>
            </span>
            <AutoUpdateField
              value={derivative.ask || ''}
              formatFn={(value) => formatPrice(value, 'UserInput')}
            />
            <span className={styles.DataLabelDark}>
              <AutoUpdateField
                value={derivative.askQuantity || ''}
                formatFn={formatPriceWithCache}
              />{' '}
              Stk.
            </span>
          </p>
        </div>
      </div>

      <div className={styles.DataBoxWrapper}>
        <div className={styles.DataBox}>
          <span className={styles.DataLabel}>% Tag</span>
          <p className={styles.DeltaPercentage}>
            <AutoUpdateField
              value={derivative.dailyPerformancePercentage || ''}
              formatFn={(value) => `${formatPercentage(value)}%`}
              useTrendClass={true}
            />
          </p>
        </div>
        <div className={styles.DataBox}>
          <span className={styles.DataLabel}>
            {fullquoteData?.getFullquotePage?.class2Strike1Alias}
          </span>
          <p className={styles.PriceSmall}>
            <AutoUpdateField
              value={
                fullquoteData?.getFullquotePage?.componentStrike_1Price || ''
              }
              formatFn={(value) => formatPrice(value, 'lval')}
            />
          </p>
          <span className={styles.DataLabelDark}>
            {fullquoteData?.getFullquotePage?.class2Strike2Alias}{' '}
            <AutoUpdateField
              value={
                fullquoteData?.getFullquotePage.componentStrike_2Price || ''
              }
              formatFn={(value) => formatPrice(value, 'lval')}
            />
          </span>
        </div>
        <div className={styles.DataBox}>
          <span className={styles.DataLabel}>
            Basiswert{' '}
            <span className={styles.DataLabelBold}>
              {
                fullquoteData?.getFullquotePage
                  ?.componentInitialFixingCurrencyShort
              }
            </span>
          </span>
          <p className={styles.PriceSmall}>
            <AutoUpdateField
              value={derivative.reference || ''}
              formatFn={(value) => formatPrice(value, 'UserInput')}
            />
          </p>
        </div>
        {derivative.currentLeverage !== 0 && (
          <div className={styles.DataBox}>
            <span className={styles.DataLabel}>Hebel</span>
            <p className={styles.PriceSmall}>
              <AutoUpdateField
                value={derivative.currentLeverage || ''}
                formatFn={formatPriceWithCache}
              />
            </p>
          </div>
        )}
        <div className={styles.DataBox}>
          <span className={styles.DataLabel}>Bezugsverhältnis</span>
          <p className={styles.PriceSmall}>
            {fullquoteData?.getFullquotePage.ratio}
          </p>
        </div>
      </div>

      <div className={styles.InfoWrapper}>
        <p className={styles.Info}>
          Valor{' '}
          <CopyToClipboard
            value={`${fullquoteData?.getFullquotePage.mValor}`}
          />
        </p>
        <p className={styles.Info}>
          ISIN{' '}
          <CopyToClipboard value={`${fullquoteData?.getFullquotePage.mIsin}`} />
        </p>
        <p className={styles.Info}>Markt von 08:00 bis 22:00 Uhr geöffnet</p>
      </div>
    </>
  );
};

export default FullQuoteHeaderBNP;
