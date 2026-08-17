import React from 'react';
import Button from '../../../../../ButtonWithLoading';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import { selectPortfolioAndTrade } from '../../../../../PortfolioTradeForm';
import { displayInfoToast } from '../../../../../Toast';
import { nonTradableTypes } from '../../../../../../screens/MyCash/components/Portfolio/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
} from '../../../../../Toast/constants';
import { AddToPortfolioButtonProps } from './typings';

const AddToPortfolioButton = ({
  listingId,
  instrumentType,
  type,
  iconName = 'IconPieChart',
  children,
  origin,
}: AddToPortfolioButtonProps) => {
  return (
    <>
      {listingId && !nonTradableTypes.includes(instrumentType) && (
        <Button
          size="small"
          aria-label="Portfolio"
          variant="secondary"
          iconTypeLeft={iconName}
          onClick={() => {
            !Auth0.getIdToken()
              ? displayInfoToast(
                  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
                  AUTHORIZATION_ERROR_ID,
                  {
                    text: 'Hier einloggen oder registrieren.',
                    onClick: () => Auth0.login(),
                  },
                )
              : selectPortfolioAndTrade({
                  instrumentKey: listingId,
                  type: type,
                  origin,
                });
          }}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default AddToPortfolioButton;
