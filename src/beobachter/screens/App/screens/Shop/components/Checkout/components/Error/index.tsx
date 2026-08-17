import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTealiumData } from '../../../../../../../../../shared/helpers/tealium/helper';
import withApolloScreenHandler from '../../../../../../../../shared/decorators/withApolloScreenHandler';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../../../shared/actions/route';
import Helmet from '../../../../../../components/Helmet';
import { ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE } from '../../../../../../../../../shared/constants/structuredData';
import styles from './styles.legacy.css';

const CheckoutError = () => {
  const dispatch = useDispatch();
  const setLoadingFinished = useCallback(() => {
    dispatch(setLoading(false));
    dispatch(
      setScreenReady(true, {
        pathname: location?.pathname,
        ...getTealiumData({
          object: {
            preferredUri: location.pathname,
            __typename: 'ShopCheckout',
            pageId: 'shop_checkout_error',
          },
        }),
      }),
    );
  }, [dispatch]);
  useEffect(() => {
    setLoadingFinished();
  }, [setLoadingFinished]);
  return (
    <div className={styles.Wrapper}>
      <Helmet
        title="Shop Checkout Error | Beobachter"
        meta={[
          {
            name: 'robots',
            content: 'max-image-preview:large',
          },
          {
            name: 'robots',
            content: ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
          },
        ]}
      />
      CheckoutError
    </div>
  );
};

export default withApolloScreenHandler(CheckoutError);
