import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import ButtonWithLoading from '../../../ButtonWithLoading';
import AddToPortfolioButton from './components/AddToPortfolioButton';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { ExtendedItem } from '../Table';
import { selectWatchlistAndAddInstrument } from '../../../../screens/MyCash/components/Watchlist/components/AddInstrumentToWatchlist';
import { alertsFormOverlay } from '../../../AlertsForm';
import { displayInfoToast } from '../../../Toast';
import { NON_SIX_MARKETS } from '../../../../constants';
import { PORTFOLIO_TRADE_FORM_TYPE_BUY } from '../../../PortfolioTradeForm/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
} from '../../../Toast/constants';
import styles from './styles.legacy.css';

type IntegrationButtonsWrapperProps = {
  fullquote: ExtendedItem;
  type: string;
};

const IntegrationButtonsWrapper: ComponentType<
  IntegrationButtonsWrapperProps
> = ({ fullquote, type }) => {
  const navigate = useStableNavigate();
  const location = useRaschRouterLocation();
  const isCryptoCurrency = type === 'cryptoCurrency';
  /* @ts-ignore TODO: TS7006 ->  Parameter 'actionType' implicitly has an 'any' type. */
  const handleButtonClick = (actionType) => {
    if (actionType === 'alerts') {
      alertsFormOverlay({
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        fullquoteUri: fullquote?.link,
        navigate,
        location,
      });
    }
  };

  const isAuthenticated = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.isAuthenticated || false,
  );

  const mId = fullquote?.marketId || fullquote?.listingId?.split('-')?.[1];
  const disableAlertButton = NON_SIX_MARKETS.includes(`${mId}`);

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.IsCryptoCurrency]: isCryptoCurrency,
      })}
    >
      <AddToPortfolioButton
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        listingId={fullquote?.listingId}
        instrumentType={fullquote?.type}
        type={PORTFOLIO_TRADE_FORM_TYPE_BUY}
        origin="search"
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
              instrumentKey: fullquote?.listingId,
              instrumentName: fullquote?.mName,
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
          aria-label="upload"
          variant="secondary"
          iconTypeLeft="IconBell"
          onClick={() => handleButtonClick('alerts')}
        >
          Alert
        </ButtonWithLoading>
      )}
    </div>
  );
};

export default IntegrationButtonsWrapper;
