import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import RestrictedContent from '../../../../components/RestrictedContent';
import { getIsReferrerWhitelisted } from '../../../ArticlePage';
import TableRowDetails from '../TableRowDetails';
import RankingIcon from '../RankingIcon';
import styles from './styles.legacy.css';
import { TableRowProps } from './typings';

const TableRow = ({
  rankingPosition,
  rankingValue,
  rankingIndustry,
  rankingState,
  rankingTrend,
  person,
  index,
  year,
}: TableRowProps) => {
  const [activeRowIds, setActiveRowIds] = useState([1]);
  const hasSubscriptions = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.hasSubscriptions || false,
  );
  const isAccessGranted = useSelector<ReduxState, boolean>(
    ({ piano }) => piano.isAccessGranted || false,
  );
  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );

  const shouldHideContent = !hasSubscriptions && !getIsReferrerWhitelisted();
  const isRestricted =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    shouldHideContent && !isCrawler && !isAccessGranted && rankingPosition > 3;
  const personId = person?.id || '';
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<number> | undefined' is not assignable to parameter of type 'number'. */
  const isRowOpen = activeRowIds.includes(rankingPosition);

  const toggleRow = useCallback(
    (id: string, rankingPosition: number) => {
      if (isRestricted) {
        const isProd = __DOT_ENV__ === 'master' || __DOT_ENV__ === 'production';
        const pianoConfig = {
          sandbox: {
            templateId: 'OTUWY6L1YOMP',
            offerId: 'OF932KV6QWEK',
            templateVariantId: '',
          },
          production: {
            templateId: 'OTQ3QWRSQ5SZ',
            offerId: 'OFS05TAVPF79',
            templateVariantId: 'OTV9U6C59KCS9',
          },
        };

        //@TODO: add correct Id's for production
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        if (global?.tp?.offer) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.tp.offer.show({
            templateId:
              pianoConfig[(isProd && 'production') || 'sandbox'].templateId,
            offerId: pianoConfig[(isProd && 'production') || 'sandbox'].offerId,
            templateVariantId:
              pianoConfig[(isProd && 'production') || 'sandbox']
                .templateVariantId,
            displayMode: 'modal',
            showCloseButton: true,
          });
        }
        return;
      }

      activeRowIds.includes(rankingPosition)
        ? setActiveRowIds(
            activeRowIds.filter((activeId) => activeId !== rankingPosition),
          )
        : setActiveRowIds([...activeRowIds, rankingPosition]);
    },
    [activeRowIds, isRestricted],
  );

  if (!person) return null;

  return (
    <>
      <tr
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<number> | undefined' is not assignable to parameter of type 'number'. */
        onKeyDown={() => toggleRow(personId, rankingPosition)}
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<number> | undefined' is not assignable to parameter of type 'number'. */
        onClick={() => toggleRow(personId, rankingPosition)}
        className={classNames(styles.CardWrapper, {
          [styles.IsOpen]: isRowOpen,
          [`restricted-section-${index}`]: index >= 3,
          [`section-${index}`]: index < 3,
        })}
        role="button"
        tabIndex={0}
      >
        <td className={classNames(styles.RankingPosition, styles.TableCell)}>
          {rankingPosition && (
            <span>
              {rankingPosition}
              {(rankingTrend === 'new' || rankingTrend === 'returnee') && (
                <RankingIcon rankingTrend={rankingTrend} />
              )}
            </span>
          )}
        </td>
        <RestrictedContent isActive={isRestricted} tag="">
          <td className={classNames(styles.RankingTitle, styles.TableCell)}>
            {person?.name || <>&ndash;</>}
          </td>
        </RestrictedContent>
        <td className={classNames(styles.AlignedLeft, styles.TableCell)}>
          <p className={styles.FieldHeader}>Vermögen</p>
          <span className={classNames(styles.FieldValue, styles.WealthWrapper)}>
            {rankingValue || <>&ndash;</>}

            {rankingTrend !== 'new' && rankingTrend !== 'returnee' && (
              <RankingIcon rankingTrend={rankingTrend} />
            )}
          </span>
        </td>
        <RestrictedContent isActive={isRestricted} tag="">
          <td className={classNames(styles.AlignedRight, styles.TableCell)}>
            <p className={styles.FieldHeader}>Branche</p>
            <span className={styles.FieldValue}>
              {rankingIndustry || <>&ndash;</>}
            </span>
          </td>
        </RestrictedContent>
        <td className={classNames(styles.HiddenSmDown, styles.TableCell)}>
          <p className={styles.FieldHeader}>Kanton</p>
          <span className={styles.FieldValue}>
            {rankingState || <>&ndash;</>}
          </span>
        </td>
        <td className={classNames(styles.ToggleIconWrapper, styles.TableCell)}>
          <Icon
            type="IconChevronDown"
            addClass={classNames(styles.ToggleIcon, {
              [styles.IsActive]: isRowOpen,
            })}
          />
        </td>
      </tr>
      {isRowOpen && <TableRowDetails year={year} data={person} />}
    </>
  );
};

export default TableRow;
