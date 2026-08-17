import React from 'react';
import classNames from 'classnames';
import { formatDate } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { formatPrice } from '../../../Highcharts/helpers';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.TableWrapper,
  styles.TableHeader,
  styles.CryptoTableHeader,
  styles.TableBody,
  styles.TableRowItemNewEmission,
  styles.CTAWrapper,
  styles.NewEmissionTableHeader,
  styles.WikifolioTableHeader,
];

export const getTableHeaderByType = (
  type: QuotesUnion['type'],
  hasDropdownIntegration: boolean,
  market: QuotesUnion['market'],
) => {
  const isCryptoCurrency = type === 'cryptoCurrency';
  const isDerivative = type === 'derivate';
  const isSwissDots = market === 'SwissDots';

  switch (type) {
    case 'wikifolio':
      return (
        //table header for wikifolio
        <>
          <div className={styles.TableHeaderItem}></div>
          <div className={styles.TableHeaderItem}>Währung</div>
          <div className={styles.TableHeaderItem}>Trader Name</div>
          <div className={styles.TableHeaderItem}>Isin</div>
        </>
      );
    case 'neuemissionen':
      return (
        <>
          <div className={styles.TableHeaderItem}>Emittent</div>
          <div className={styles.TableHeaderItem}>Symbol</div>
          <div className={styles.TableHeaderItem}>Frist</div>
          <div className={styles.TableHeaderItem}>Basiswerte</div>
          <div className={styles.TableHeaderItem}></div>
        </>
      );
    default:
      return (
        <>
          {isSwissDots && (
            <>
              <div className={styles.TableHeaderItem}></div>
              <div className={styles.TableHeaderItem}>Währung</div>
              <div className={styles.TableHeaderItem}>Börse</div>
              <div className={styles.TableHeaderItem}>Symbol</div>
              <div className={styles.TableHeaderItem}></div>
            </>
          )}
          {!isSwissDots && (
            <>
              <div className={styles.TableHeaderItem}></div>
              <div className={styles.TableHeaderItem}>Währung</div>
              <div className={styles.TableHeaderItem}>Börse</div>
              {!isCryptoCurrency && (
                <div className={styles.TableHeaderItem}>{`${
                  (isDerivative && `Symbol`) || `Valor`
                }`}</div>
              )}
              <div
                className={classNames(
                  styles.TableHeaderItem,
                  styles.RightAlignedItem,
                )}
              >
                Aktuell
              </div>
              <div className={styles.TableHeaderItem}>Datum</div>
              {hasDropdownIntegration && (
                <div className={styles.TableHeaderItem}></div>
              )}
            </>
          )}
        </>
      );
  }
};

export const getTableRowByType = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
  type,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  item,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  index,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'hasDropdownIntegration' implicitly has an 'any' type. */
  hasDropdownIntegration,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'toggleIntegration' implicitly has an 'any' type. */
  toggleIntegration,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'toggleIntegrationButtons' implicitly has an 'any' type. */
  toggleIntegrationButtons,
) => {
  const date = formatDate(parseInt(item.priceTimestamp) * 1000) || '';
  const isWikifolio = type === 'wikifolio';
  const text =
    (isWikifolio &&
      `in ${item.currency} von ${item.traderName} • ISIN ${item.isin}`) ||
    `${Number(item.price).toLocaleString('de-CH')} ${item.currency} • ${
      (item?.marketDescription &&
        `${item?.marketDescription} (${item.market})`) ||
      item.market
    } (${date}) ${
      (type === 'derivate' && `• Symbol ` + item.symbol) ||
      (item.valor && `• Valor ` + item.valor) ||
      ''
    }`;

  const swissDotsText = `${item.mName} • ${item.currency} • ${item.market} • ${item.symbol}`;
  const newEmissionText = `${item.title} • ${formatDate(
    parseInt(item?.subscriptionEndDate) * 1000,
  )} • ${item.mName}`;

  const isCryptoCurrency = type === 'cryptoCurrency';
  const isDerivate = type === 'derivate';
  const isSwissDots = item.market === 'SwissDots';

  switch (type) {
    case 'wikifolio':
      return (
        <div key={`table-row-${type}-${index}-${Math.random()}`}>
          <div
            className={classNames(
              styles.TableRow,
              styles.TableRowWikifolio,
              grid.HiddenSmDown,
            )}
            key={`${item.id}_${item.name}`}
          >
            <div className={classNames(styles.TableRowItem)}>
              <Link
                className={classNames(styles.Link)}
                path={item.fullquoteLink}
              >
                {item.shortDescription}
              </Link>
            </div>
            <div className={classNames(styles.TableRowItem)}>
              {item.currency}
            </div>
            <div className={classNames(styles.TableRowItem)}>
              {item.traderName}
            </div>
            <div className={classNames(styles.TableRowItem)}>{item.isin}</div>
          </div>
          <div className={classNames(styles.MobileWrapper, grid.HiddenSmUp)}>
            <Link className={styles.Link} path={item.fullquoteLink}>
              <span>{item.shortDescription}</span>
            </Link>
            <span>{text}</span>
            <div className={styles.WikifolioFlag}>Wikifolio</div>
          </div>
        </div>
      );

    case 'neuemissionen':
      return (
        <>
          <div
            className={classNames(
              styles.TableRow,
              styles.TableRowNewEmission,
              grid.HiddenSmDown,
            )}
            key={`${item.id}_${item.name}_${Math.random() * 1000}`}
          >
            <div className={styles.TableRowItem}>
              <Link className={styles.Link} path={item.fullquotePath}>
                {item.issuerShort}
              </Link>
            </div>
            <div className={styles.TableRowItem}>{item.title}</div>
            <div className={styles.TableRowItem}>
              {formatDate(parseInt(item?.subscriptionEndDate) * 1000)}
            </div>
            <div className={styles.TableRowItem}>{item.mName}</div>
            {item.termsheet ? (
              <div className={styles.TableRowItem}>
                <Link className={styles.TermSheetIcon} path={item.termsheet}>
                  <Icon type="IconPdf" />
                </Link>
              </div>
            ) : (
              // placeholder div to keep the table layout correctly
              <div className={styles.TableRowItem}>&nbsp;</div>
            )}
          </div>
          <div className={classNames(styles.MobileWrapper, grid.HiddenSmUp)}>
            <>
              <Link className={styles.Link} path={item.fullquotePath}>
                <span>{item.issuerShort}</span>
              </Link>
              <div className={styles.MobileInlineContent}>
                <span>{newEmissionText}</span>
                {item.termsheet && (
                  <Link className={styles.TermSheetIcon} path={item.termsheet}>
                    <Icon type="IconPdf" />
                  </Link>
                )}
              </div>
            </>
          </div>
        </>
      );

    default:
      return (
        <>
          <div
            className={classNames(styles.TableRow, grid.HiddenSmDown, {
              [styles.TableRowCryptoCurrency]: isCryptoCurrency,
            })}
            key={Math.random() * 1000}
          >
            <div className={styles.TableRowItem}>
              <Link className={styles.Link} path={item.link}>
                {item.mName}
              </Link>
            </div>
            <div className={styles.TableRowItem}>{item.currency}</div>
            <div className={styles.TableRowItem}>
              {(item?.marketDescription &&
                `${item.marketDescription} (${item.market})`) ||
                item?.market}
            </div>
            {!isCryptoCurrency && (
              <div className={styles.TableRowItem}>
                {(isDerivate && (item as Derivative).symbol) ||
                  (item as Equity).valor}
              </div>
            )}
            {!isSwissDots && (
              <>
                <div
                  className={classNames(
                    styles.RightAlignedItem,
                    styles.TableRowItem,
                  )}
                >
                  {formatPrice(item.price, item?.type)}
                </div>
                <div className={styles.TableRowItem}>
                  {formatDate(parseInt(item?.priceTimestamp) * 1000)}
                </div>
              </>
            )}
            {isSwissDots && (
              <div
                className={classNames(
                  styles.TableRowItem,
                  styles.SwissDotsItem,
                )}
              >
                {item.termsheet && (
                  <Link
                    className={classNames(styles.Link, styles.WithIcon)}
                    path={item.termsheet}
                  >
                    <Icon type="IconPdf" />
                  </Link>
                )}
              </div>
            )}
            {(hasDropdownIntegration && !isSwissDots && (
              <div
                className={styles.ToggleIcon}
                role="button"
                onClick={() => toggleIntegrationButtons(item.id)}
                onKeyDown={() => toggleIntegrationButtons(item.id)}
                tabIndex={0}
              >
                <Icon
                  type={
                    toggleIntegration[item.id]
                      ? 'IconChevronUp'
                      : 'IconChevronDown'
                  }
                />
              </div>
            )) ||
              null}
          </div>
          <div className={classNames(styles.MobileWrapper, grid.HiddenSmUp)}>
            <>
              <div className={styles.MobileInlineContent}>
                <Link className={styles.Link} path={item.link}>
                  <span className={styles.ItemName}>{item.mName}</span>
                </Link>
                {(hasDropdownIntegration && !isSwissDots && (
                  <div
                    className={styles.ToggleIcon}
                    role="button"
                    onClick={() => toggleIntegrationButtons(item.id)}
                    onKeyDown={() => toggleIntegrationButtons(item.id)}
                    tabIndex={0}
                  >
                    <Icon
                      type={
                        toggleIntegration[item.id]
                          ? 'IconChevronUp'
                          : 'IconChevronDown'
                      }
                    />
                  </div>
                )) ||
                  null}
              </div>
              {!isSwissDots && (
                <span className={styles.ItemAttributs}>{text}</span>
              )}
              {isSwissDots && (
                <div className={styles.SwissDotsItem}>
                  <span className={styles.ItemAttributs}>{swissDotsText}</span>
                  {item.termsheet && (
                    <Link className={styles.Link} path={item.termsheet}>
                      <Icon type="IconPdf" />
                    </Link>
                  )}
                </div>
              )}
            </>
          </div>
        </>
      );
  }
};
