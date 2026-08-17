import React, { useState } from 'react';
import classNames from 'classnames';
import { getTableHeaderByType, getTableRowByType } from './helpers';
import Link from '../../../../../../../common/components/Link';
import IntegrationButtonsWrapper from '../IntegrationButtonsWrapper';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TableProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.TableHeaderItem,
  styles.TableRow,
  styles.TableRowItem,
  styles.TableRowItemNewEmission,
  styles.Link,
  styles.TermSheetIcon,
  styles.RightAlignedItem,
  styles.MobileWrapper,
  styles.WikifolioFlag,
  styles.ToggleIcon,
  styles.MobileInlineContent,
  styles.TableRowNewEmission,
  styles.TableRowWikifolio,
  styles.TableRowCryptoCurrency,
  styles.ItemName,
  styles.ItemAttributs,
];

export type ExtendedItem = QuotesUnion &
  WikiFolio &
  NewEmission & { id: string };

const Table = ({
  items,
  ctaText,
  ctaLink,
  category,
  type,
  maxItems = 5,
  hasDropdownIntegration = false,
  ctaLinkStyles,
  count,
}: TableProps) => {
  const [toggleIntegration, setToggleIntegration] = useState({});

  const isCryptoCurrency = type === 'cryptoCurrency';
  const isWikifolio = type === 'wikifolio';
  const isNewEmission = type === 'neuemissionen';
  const itemsCopy = JSON.parse(JSON.stringify(items));
  if (!itemsCopy || !Array.isArray(itemsCopy) || !itemsCopy.length) {
    return null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
  const toggleIntegrationButtons = (id) => {
    setToggleIntegration({
      ...toggleIntegration,
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      [id]: !toggleIntegration[id],
    });
  };

  return (
    <div className={styles.TableWrapper}>
      <div
        className={classNames(styles.TableHeader, grid.HiddenSmDown, {
          [styles.CryptoTableHeader]: isCryptoCurrency,
          [styles.WikifolioTableHeader]: isWikifolio,
          [styles.NewEmissionTableHeader]: isNewEmission,
        })}
      >
        {getTableHeaderByType(
          type || '',
          hasDropdownIntegration,
          'market' in items?.[0] ? items?.[0].market : '',
        )}
      </div>
      <div className={styles.TableBody}>
        {(itemsCopy as any).map((item: ExtendedItem, index: number) => {
          if (category === 'alle' && index >= maxItems) {
            return null;
          }

          //enrich item with an id to store it in the state for the toggle functionality
          item.id = `${item.link}_${index}`;

          {
            return (
              <div key={`table-row-${type}-${index}`}>
                {getTableRowByType(
                  type,
                  item,
                  index,
                  hasDropdownIntegration,
                  toggleIntegration,
                  toggleIntegrationButtons,
                )}
                {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */}
                {hasDropdownIntegration && toggleIntegration[item.id] && (
                  <div>
                    {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */}
                    <IntegrationButtonsWrapper fullquote={item} type={type} />
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
      {category === 'alle' && count > maxItems && (
        <div className={styles.CTAWrapper}>
          <Link className={ctaLinkStyles} path={ctaLink}>
            {ctaText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Table;
