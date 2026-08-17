import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import { handleDeleteAlert } from '../Alerts/helpers';
import {
  deleteCashItem,
  deleteInstrumentInPortfolio,
  handleDeleteTransaction,
} from '../Portfolio/helpers';
import { deleteInstrumentInWatchlist } from '../Watchlist/helpers';
import { removeItemsFromList } from '../../../../../../shared/actions/listIds';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import ButtonWithLoadingSale from '../../../../components/ButtonWithLoadingSale';
import AddToPortfolioButton from '../../../../components/SearchResults/components/IntegrationButtonsWrapper/components/AddToPortfolioButton';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { alertsFormOverlay } from '../../../../components/AlertsForm';
import { editOtherAssetInstrument } from '../../../../components/PortfolioManagementForm/components/EditOtherAssetForm';
import { portfolioTrade } from '../../../../components/PortfolioTradeForm';
import { displayInfoToast } from '../../../../components/Toast';
import { editCashItem } from '../CashItems/components/EditCashItem';
import { selectWatchlistAndAddInstrument } from '../Watchlist/components/AddInstrumentToWatchlist';
import modal from '../../../../components/Modal';
import { CHART_COMPARISION_HASH } from '../../../../../../shared/constants/chartOverlay';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Alerts/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/Ap */
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
} from '../../../../components/Toast/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../CashItems/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { NON_SIX_MARKETS } from '../../../../constants';
/* @ts-ignore */
import { DELETE_ALERTS } from '../Alerts/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../CashItems/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { DELETE_CASH_ITEM } from '../CashItems/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Portfolio/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { DELETE_INSTRUMENT } from '../Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../PortfolioInstrument/queries'. '/Users/bhs/code/work/rasch-stack/src/ca */
import { DELETE_TRANSACTION } from '../PortfolioInstrument/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Watchlist/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens */
import { DELETE_INSTRUMENT_IN_WATCHLIST } from '../Watchlist/queries';
import styles from './styles.legacy.css';

type InstrumentDropdownProps = {
  data: any;
  instrument: any;
  type: string;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
const InstrumentDropdown = ({
  data,
  instrument,
  type,
}: InstrumentDropdownProps) => {
  const isAuthenticated = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.isAuthenticated || false,
  );
  const navigate = useStableNavigate();
  const location = useRaschRouterLocation();
  const { portfolioKey = '' } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const [deleteTransactionMutation] = useMutation(DELETE_TRANSACTION);
  const [deleteAlertMutation] = useMutation(DELETE_ALERTS);

  const [deleteInstrumentsMutation] = useMutation(DELETE_INSTRUMENT);
  const [deleteCashItemMutation] = useMutation(DELETE_CASH_ITEM);
  const [deleteInstrumentInWatchlistMutation] = useMutation(
    DELETE_INSTRUMENT_IN_WATCHLIST,
  );
  const isPortfolio = type === 'portfolio';
  const isMusterPortfolio = type === 'muster-portfolio';
  const isAlertOverview = type === 'alert-overview';
  const isCashItems = type === 'cash-item-overview';
  const isQuoteList = type === 'quote-list';
  const isChartComparison = type === 'chart-comparison';
  const isTransactionsOverview = [
    'transactions-buy',
    'transactions-sell',
  ].includes(type);

  /* @ts-ignore TODO: TS7034 ->  Variable 'tradingLink' implicitly has type 'any' in some locations where its type cannot be determined. */
  let tradingLink = null;
  if (
    instrument?.mValor &&
    instrument?.mCur &&
    instrument?.isin &&
    instrument?.marketId
  ) {
    tradingLink = `https://ebanking.cash.ch/ebanking/ibf/link?valor:${instrument.mValor}&curr:${instrument.mCur}&tpl:${instrument.marketId}&lang:de&isin:${instrument.isin}`;
  }

  const portfolioInstrumentIndex =
    data?.calculatedFields?.instruments.findIndex(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'i' implicitly has an 'any' type. */
      (i) => i?.instrumentKey === instrument?.instrumentKey,
    );

  const allTransactionsByInstrumentKey =
    data?.calculatedFields?.instruments?.[portfolioInstrumentIndex]
      ?.transactions;

  const mid =
    instrument?.marketId || instrument?.instrumentKey?.split('-')?.[1];

  const disableAlertButton = NON_SIX_MARKETS.includes(mid);

  if (isMusterPortfolio) {
    return (
      <div className={styles.Wrapper}>
        {!instrument?.otherAsset && (
          <AddToPortfolioButton
            listingId={instrument?.instrumentKey}
            instrumentType={instrument?.type}
            iconName="IconPlus"
            origin="muster-portfolio"
          >
            Zu eigenem Portfolio hinzufügen
          </AddToPortfolioButton>
        )}
        {!instrument?.otherAsset && !disableAlertButton && (
          <ButtonWithLoading
            size="small"
            variant={'secondary'}
            iconTypeLeft="IconBell"
            onClick={() =>
              alertsFormOverlay({
                alertKey: '',
                fullquoteUri: instrument?.fullquoteUri,
                navigate,
                location,
              })
            }
          >
            Alert
          </ButtonWithLoading>
        )}
      </div>
    );
  }

  if (isAlertOverview) {
    return (
      <div className={styles.Wrapper}>
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPenToSquare"
          onClick={() =>
            alertsFormOverlay({
              alertKey: instrument?.id,
              fullquoteUri: instrument?.fullquoteUri,
              navigate,
              location,
            })
          }
        >
          Bearbeiten
        </ButtonWithLoading>
        {!disableAlertButton && (
          <>
            <ButtonWithLoading
              size="small"
              variant={'secondary'}
              iconTypeLeft="IconBell"
              onClick={() =>
                alertsFormOverlay({
                  fullquoteUri: instrument?.fullquoteUri,
                  navigate,
                  location,
                })
              }
            >
              weiteren Alert
            </ButtonWithLoading>
            <ButtonWithLoading
              size="small"
              variant={'secondary'}
              iconTypeLeft="IconTrash"
              loading={isDeleting}
              onClick={() => {
                modal({
                  title: 'Alert löschen',
                  hasStickyHeader: true,
                  hasStickyFooter: true,
                  closeOnClickOutside: false,
                  closeOnLocationChange: true,
                  content: `Sind Sie sicher, dass Sie diesen Alert zu "${instrument?.mName}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`,
                  buttons: [
                    {
                      children: 'Abbrechen',
                    },
                    {
                      variant: 'secondary',
                      children: 'Löschen',
                      iconTypeLeft: 'IconTrash',
                      onClick: () => {
                        if (!isDeleting) {
                          handleDeleteAlert({
                            alertKey: instrument?.id,
                            deleteAlertMutation,
                            startLoadingCallback: () => setIsDeleting(true),
                            stopLoadingCallback: () => {
                              setIsDeleting(true);
                              dispatch(
                                removeItemsFromList({
                                  items: [instrument?.id],
                                  listName: 'alerts',
                                }),
                              );
                            },
                          });
                        }
                      },
                    },
                  ],
                });
              }}
            >
              Löschen
            </ButtonWithLoading>
          </>
        )}
      </div>
    );
  }

  if (isTransactionsOverview) {
    return (
      <div className={styles.Wrapper}>
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPenToSquare"
          onClick={() =>
            portfolioTrade({
              portfolioKey: portfolioKey,
              instrumentKey: instrument?.instrumentKey,
              transactionKey: instrument.transactionKey,
              type: 'edit',
            })
          }
        >
          Bearbeiten
        </ButtonWithLoading>

        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPlus"
          onClick={() => {
            portfolioTrade({
              portfolioKey: portfolioKey,
              instrumentKey: instrument?.instrumentKey,
              type: 'buy',
              origin: 'portfolio-overview/add-instrument-button',
            });
          }}
        >
          Trade
        </ButtonWithLoading>

        {/* only show delete button, if there is more than 1 transactions */}
        {(allTransactionsByInstrumentKey?.length > 1 && (
          <ButtonWithLoading
            size="small"
            loading={isDeleting}
            variant={'secondary'}
            iconTypeLeft="IconTrash"
            onClick={() => {
              modal({
                title: `"${
                  instrument?.mName || instrument?.name || ''
                }" löschen`,
                hasStickyHeader: true,
                hasStickyFooter: true,
                closeOnClickOutside: false,
                closeOnLocationChange: true,
                content:
                  'Sind Sie sicher, dass Sie diese Transaktion löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
                buttons: [
                  {
                    children: 'Abbrechen',
                  },
                  {
                    variant: 'secondary',
                    children: 'Löschen',
                    iconTypeLeft: 'IconTrash',
                    onClick: () => {
                      handleDeleteTransaction({
                        portfolioKey: portfolioKey,
                        instrumentKey: instrument?.instrumentKey,
                        transactionKey: instrument.transactionKey,
                        isOtherAsset: instrument.otherAsset,
                        isDeletingTransaction: isDeleting,
                        setIsDeletingTransaction: setIsDeleting,
                        deleteTransactionMutation,
                      });
                    },
                  },
                ],
              });
            }}
          >
            Löschen
          </ButtonWithLoading>
        )) ||
          null}
      </div>
    );
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
  const deleteInstrument = (data, instrument) => {
    if (isPortfolio) {
      deleteInstrumentInPortfolio(
        data.portfolioKey,
        instrument?.instrumentKey,
        instrument?.mName || instrument?.name,
        deleteInstrumentsMutation,
        instrument?.otherAsset,
      );
    } else if (isCashItems) {
      deleteCashItem(
        data.portfolioKey,
        instrument.cashItemKey,
        deleteCashItemMutation,
      );
    } else {
      deleteInstrumentInWatchlist(
        data.watchlistKey,
        instrument?.instrumentKey,
        instrument?.mName || instrument?.name,
        deleteInstrumentInWatchlistMutation,
      );
    }
  };

  return (
    <div className={styles.Wrapper}>
      {isPortfolio && (
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconArrowsRotateCheck"
          onClick={() =>
            navigate(
              `/portfolio/${data.portfolioKey}/transaktionen/${
                instrument?.instrumentKey || ''
              }`,
            )
          }
        >
          Transaktionen
        </ButtonWithLoading>
      )}
      {isPortfolio && (
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPlus"
          onClick={() => {
            portfolioTrade({
              portfolioKey: data.portfolioKey,
              instrumentKey: instrument?.instrumentKey,
              type: 'buy',
              origin: 'portfolio-overview/add-instrument-button',
            });
          }}
        >
          Trade
        </ButtonWithLoading>
      )}
      {instrument?.otherAsset && isPortfolio && (
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPlus"
          onClick={() => {
            editOtherAssetInstrument({
              portfolioKey: data.portfolioKey,
              portfolioCurrency: data.currency,
              instrumentKey: instrument?.instrumentKey,
              navigate,
            });
          }}
        >
          Bearbeiten
        </ButtonWithLoading>
      )}
      {!instrument?.otherAsset &&
        !isCashItems &&
        !isQuoteList &&
        !isChartComparison &&
        !disableAlertButton && (
          <ButtonWithLoading
            size="small"
            variant={'secondary'}
            iconTypeLeft="IconBell"
            onClick={() =>
              alertsFormOverlay({
                alertKey: '',
                fullquoteUri: instrument?.fullquoteUri,
                navigate,
                location,
              })
            }
          >
            Alert
          </ButtonWithLoading>
        )}

      {isCashItems && (
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconPlus"
          onClick={() => {
            editCashItem({
              portfolioKey: data.portfolioKey,
              cashItemKey: instrument.cashItemKey,
            });
          }}
        >
          Bearbeiten
        </ButtonWithLoading>
      )}
      {!isQuoteList && !isChartComparison && (
        <ButtonWithLoading
          size="small"
          variant={'secondary'}
          iconTypeLeft="IconTrash"
          onClick={() => {
            let title = `"${
              instrument?.mName || instrument?.name || ''
            }" löschen`;

            let content = `Sind Sie sicher, dass Sie "${
              instrument?.mName || instrument?.name || ''
            }" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`;

            if (isCashItems) {
              let label = 'Einzahlung';
              if (instrument?.amount < 0) {
                label = 'Auszahlung';
              }
              title = `${label} löschen`;
              content = `Sind Sie sicher, dass Sie diese "${label}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`;
            }

            modal({
              title,
              content,
              hasStickyHeader: true,
              hasStickyFooter: true,
              closeOnClickOutside: false,
              closeOnLocationChange: true,
              buttons: [
                {
                  children: 'Abbrechen',
                },
                {
                  variant: 'secondary',
                  children: 'Löschen',
                  iconTypeLeft: 'IconTrash',
                  onClick: () => {
                    deleteInstrument(data, instrument);
                  },
                },
              ],
            });
          }}
        >
          Löschen
        </ButtonWithLoading>
      )}
      {isQuoteList && (
        <>
          <AddToPortfolioButton
            listingId={instrument?.instrumentKey}
            instrumentType={instrument?.scGrouped}
            iconName="IconPieChart"
            origin="quote-list"
          >
            Portfolio
          </AddToPortfolioButton>
          {(!isAuthenticated && (
            <ButtonWithLoading
              size="small"
              aria-label="Watchlist"
              variant="secondary"
              iconTypeLeft="IconEye"
              onClick={() => {
                displayInfoToast(
                  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
                  AUTHORIZATION_ERROR_ID,
                  {
                    text: 'Hier einloggen oder registrieren.',
                    onClick: () => Auth0.login(),
                  },
                );
              }}
            >
              Watchlist
            </ButtonWithLoading>
          )) || (
            <ButtonWithLoading
              size="small"
              variant={'secondary'}
              iconTypeLeft="IconEye"
              onClick={() =>
                selectWatchlistAndAddInstrument({
                  instrumentKey: instrument?.instrumentKey,
                  instrumentName: instrument?.mName,
                  origin: 'quote-list',
                })
              }
            >
              Watchlist
            </ButtonWithLoading>
          )}
          {!disableAlertButton && (
            <ButtonWithLoading
              size="small"
              variant={'secondary'}
              iconTypeLeft="IconBell"
              onClick={() =>
                alertsFormOverlay({
                  alertKey: '',
                  fullquoteUri: instrument?.fullquoteUri,
                  navigate,
                  location,
                })
              }
            >
              Alert
            </ButtonWithLoading>
          )}
          {instrument?.fullquoteUri &&
            (instrument?.scGrouped === 'DER' ||
              instrument?.scGrouped === 'EQU') && (
              <>
                <ButtonWithLoading
                  size="small"
                  aria-label="Calls"
                  variant="secondary"
                  iconTypeLeft="IconChartArrowUp"
                  onClick={() => {
                    navigate(`/${instrument?.fullquoteUri}#calls`);
                  }}
                >
                  Calls
                </ButtonWithLoading>
                <ButtonWithLoading
                  size="small"
                  aria-label="Puts"
                  variant="secondary"
                  iconTypeLeft="IconChartArrowDown"
                  onClick={() => {
                    navigate(`/${instrument?.fullquoteUri}#puts`);
                  }}
                >
                  Puts
                </ButtonWithLoading>
              </>
            )}
          {instrument?.scGrouped === 'EQU' && (
            <>
              <ButtonWithLoading
                size="small"
                aria-label="Verkaufen"
                variant="primary"
                highAttention
                onClick={() => {
                  /* @ts-ignore TODO: TS7005 ->  Variable 'tradingLink' implicitly has an 'any' type. */
                  window.open(`${tradingLink}&page=brokerageSell`, '_blank');
                }}
              >
                Verkaufen
              </ButtonWithLoading>
              <ButtonWithLoadingSale
                size="small"
                aria-label="Kaufen"
                highAttention
                variant="primary"
                onClick={() => {
                  /* @ts-ignore TODO: TS7005 ->  Variable 'tradingLink' implicitly has an 'any' type. */
                  window.open(`${tradingLink}&page=brokerageBuy`, '_blank');
                }}
              >
                Kaufen
              </ButtonWithLoadingSale>
            </>
          )}
        </>
      )}

      {isChartComparison && (
        <>
          <AddToPortfolioButton
            listingId={instrument?.instrumentKey}
            instrumentType={instrument?.scGrouped}
            iconName="IconPieChart"
            origin="chart-comparison"
          >
            Portfolio
          </AddToPortfolioButton>
          <ButtonWithLoading
            size="small"
            aria-label="Watchlist"
            variant="secondary"
            onClick={() => {
              const { instrumentKey, mName } = instrument;
              selectWatchlistAndAddInstrument({
                instrumentKey,
                instrumentName: mName,
                origin: 'chart-comparison',
              });
            }}
          >
            Watchlist
          </ButtonWithLoading>
          {!disableAlertButton && (
            <ButtonWithLoading
              size="small"
              variant="secondary"
              iconTypeLeft="IconBell"
              onClick={() =>
                alertsFormOverlay({
                  alertKey: '',
                  fullquoteUri: instrument?.fullquoteUri,
                  navigate,
                  location,
                })
              }
            >
              Alert
            </ButtonWithLoading>
          )}
          <ButtonWithLoading
            size="small"
            variant="secondary"
            highAttention
            onClick={() => {
              const {
                pathname,
                /* @ts-ignore TODO: TS2339 ->  Property 'comparisons' does not exist on type '{ [key */
                query: { comparisons },
              } = location;

              if (!comparisons) {
                return;
              }

              const listingIds = comparisons
                .split(',')
                /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
                .filter((id) => id !== instrument?.instrumentKey);

              const newComparisons =
                listingIds.length > 0
                  ? `?comparisons=${listingIds.join(',')}`
                  : '';

              navigate(`${pathname}${newComparisons}${CHART_COMPARISION_HASH}`);
            }}
          >
            Löschen
          </ButtonWithLoading>
        </>
      )}
    </div>
  );
};

export default InstrumentDropdown;
