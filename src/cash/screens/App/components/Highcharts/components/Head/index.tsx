import React from 'react';
import classNames from 'classnames';
import {
  DATE_FORMAT_FULL_TIME,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { formatPrice } from '../../helpers';
import Icon from '../../../Icon';
import LinkButton from './components/LinkButton';
import styles from './styles.legacy.css';
import { HeadProps } from './typings';

const Head = ({
  lval,
  lvalDatetime,
  hrefBuy,
  hrefBuyMobile,
  hrefSell,
  hrefSellMobile,
  iNetVperprV,
  iNetVperprVPr,
  mCur,
  mSymb,
  mValor,
  title,
  tradeable,
  origin,
  fullquoteUrl,
}: HeadProps) => {
  const isCashOrigin = origin === 'cash';
  const isHzOrigin = origin === 'hz';
  const isBlickOrigin = origin === 'blick';
  const currentTimestamp = lvalDatetime
    ? new Date(lvalDatetime).getTime()
    : Date.now();
  const trendClass = (direction = false) => {
    if (parseFloat(iNetVperprV) > 0) {
      return direction ? classNames(styles.Green, styles.Up) : styles.Green;
    }
    if (parseFloat(iNetVperprV) < 0) {
      return direction ? classNames(styles.Red, styles.Down) : styles.Red;
    }
    return null;
  };

  const prefix = parseFloat(iNetVperprV) > 0 ? '+' : '';

  const setPlaceholder = (value: string): string => {
    return value ? value : '&zwnj;';
  };

  const roundToTwo = (input: string) => {
    const n = parseFloat(input);
    return isNaN(n) ? '0.00' : n.toFixed(2);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={classNames({ [styles.ContainerBlick]: isBlickOrigin })}>
        <div>
          <div
            className={classNames({
              [styles.Skeleton]: !title,
            })}
          ></div>
          <p className={styles.Title}>
            {setPlaceholder(title)}
            {/* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */}
            <Icon addClass={trendClass(true)} type={'IconArrowRight'} />
          </p>
          <p
            className={classNames(styles.Valor, {
              [styles.ValorBlick]: isBlickOrigin,
            })}
          >
            Valor: {setPlaceholder(mValor)} / Symbol: {setPlaceholder(mSymb)}
          </p>
        </div>
        <div>
          <div
            className={classNames(styles.Values, {
              [styles.BlickValues]: isBlickOrigin,
            })}
          >
            <div>
              <span className={styles.Value}>
                {setPlaceholder(formatPrice(lval))} {setPlaceholder(mCur)}
              </span>
              <span className={classNames(styles.Value, trendClass())}>
                {prefix}
                {setPlaceholder(roundToTwo(iNetVperprVPr))}%
              </span>
              <span className={classNames(styles.Value, trendClass())}>
                {prefix}
                {setPlaceholder(roundToTwo(iNetVperprV))}
              </span>
            </div>
            {(tradeable && isCashOrigin && (
              <div className={styles.Buttons}>
                <div className={styles.ButtonDesktop}>
                  <LinkButton
                    label="Verkaufen"
                    variant="primary"
                    size="small"
                    highAttention
                    url={hrefSell}
                    internal={isCashOrigin}
                  >
                    <span>Verkaufen</span>
                  </LinkButton>
                </div>
                <div
                  className={classNames(
                    styles.ButtonDesktop,
                    styles.ButtonPositive,
                  )}
                >
                  <LinkButton
                    label="Kaufen"
                    variant="primary"
                    size="small"
                    url={hrefBuy}
                    internal={isCashOrigin}
                  >
                    <span>Kaufen</span>
                  </LinkButton>
                </div>
                <div className={styles.ButtonMobile}>
                  <LinkButton
                    label="Verkaufen"
                    variant="primary"
                    size="small"
                    highAttention
                    url={hrefSellMobile}
                    internal={isCashOrigin}
                  >
                    <span>Verkaufen</span>
                  </LinkButton>
                </div>
                <div
                  className={classNames(
                    styles.ButtonMobile,
                    styles.ButtonPositive,
                  )}
                >
                  <LinkButton
                    label="Kaufen"
                    variant="primary"
                    size="small"
                    url={hrefBuyMobile}
                    internal={isCashOrigin}
                  >
                    <span>Kaufen</span>
                  </LinkButton>
                </div>
              </div>
            )) ||
              (!isBlickOrigin && (
                <div
                  className={classNames(styles.ButtonFallback, {
                    [styles.ExternalStyles]: isHzOrigin,
                    [styles.HzStyles]: isHzOrigin,
                  })}
                >
                  <a className={styles.Link} href={`/${fullquoteUrl}`}>
                    Weitere Kursinformationen anzeigen
                  </a>
                </div>
              ))}
          </div>
          <div
            className={classNames({ [styles.DateContainer]: isBlickOrigin })}
          >
            <p
              className={classNames(styles.Date, {
                [styles.DateBlick]: isBlickOrigin,
              })}
            >{`${formatDate(currentTimestamp)} - ${formatDate(
              currentTimestamp,
              DATE_FORMAT_FULL_TIME,
            )}`}</p>
            <p
              className={classNames(styles.Date, styles.Date, {
                [styles.DateBlick]: isBlickOrigin,
              })}
            >
              Sie erhalten verzögerte Kurse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
