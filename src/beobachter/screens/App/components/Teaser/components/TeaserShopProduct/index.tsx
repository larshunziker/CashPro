/* istanbul ignore file */

import React, { memo, useCallback, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-async-script-loader'. '/Users/bhs/code/work/rasch-stack/node_module */
import scriptLoader from 'react-async-script-loader';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import { log } from '../../../../../../../shared/helpers/utils';
import { setLoading } from '../../../../../../shared/actions/route';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { displayErrorToast } from '../../../Toast';
import { STYLE_2X3_305 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { TeaserShopProductProps } from './typings';

/**
 * TODO: showUpdate is used now to flag Empfehlung label, we need a field for such lables on the products
 * we use now the teaser image to show a book gift, but we need a flag in BE if we have to show the teaser
 * otherwise we are showing the BEO fallback image
 *
 * 1. write tests when PoC is proved and we're ready to implement the final solution
 *
 */

type SAPProduct = Partial<Product> & {
  campaignnumber: string;
};

type PaymentMethods = 'invoice' | 'datatrans';

const TeaserShopProduct = ({
  title,
  gcid,
  number,
  description,
  price,
  pricePrefix,
  shortTitle,
  showUpdated,
  teaserImage,
}: TeaserShopProductProps) => {
  const dispatch = useDispatch();
  const [isDescriptionVisible, toggleDescription] = useState(false);
  const [isPaymentMethodVisible, togglePaymentMethod] = useState(false);
  const [hasConditionsAccepted, setConditionsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('invoice');

  const initShopTransactionDatatrans = async (product: SAPProduct) => {
    const params = new URLSearchParams();
    params.append('product', JSON.stringify(product));
    params.append('user', Auth0.getUserId());

    const datatransConfig: any = {
      currency: 'CHF',
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      amount: product.price * 100,
      paymentMethods: ['ECA', 'VIS', 'TWI'],
      redirect: {
        successUrl: `${global.location.origin}/checkout/success?type=datatrans`,
        cancelUrl: `${global.location.origin}/checkout/error?type=datatrans`,
        errorUrl: `${global.location.origin}/checkout/error?type=datatrans`,
      },
    };

    const syncingCall = await fetch(
      `${getServiceUrl(
        __COMMERCE_SERVICE_ENDPOINT__,
      )}/shop/init-transaction/datatrans`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product,
          datatrans: datatransConfig,
        }),
      },
    );

    return await syncingCall.json();
  };

  const initShopTransactionInvoice = async (product: SAPProduct) => {
    const params = new URLSearchParams();
    params.append('product', JSON.stringify(product));
    params.append('user', Auth0.getUserId());

    const syncingCall = await fetch(
      `${getServiceUrl(
        __COMMERCE_SERVICE_ENDPOINT__,
      )}/shop/init-transaction/invoice`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product,
        }),
      },
    );

    return await syncingCall.json();
  };

  const checkout = async (product: SAPProduct) => {
    if (!hasConditionsAccepted) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"ShopCheckoutError"' is not assignable to parameter of type 'null | undefined'. */
      displayErrorToast('Bitte AGB akzeptieren', null, 'ShopCheckoutError');
      return;
    }
    dispatch(setLoading(true));
    try {
      if (paymentMethod === 'invoice') {
        const shopTransactionInvoice =
          await initShopTransactionInvoice(product);
        dispatch(setLoading(false));
        if (!shopTransactionInvoice.refNum) {
          global.location.href = `${global.location.origin}/checkout/error?type=invoice`;
          return;
        } else {
          global.location.href = `${global.location.origin}/checkout/success?type=invoice`;
          return;
        }
      } else {
        const shopTransaction = await initShopTransactionDatatrans(product);
        dispatch(setLoading(false));
        if (!shopTransaction.transactionId) {
          throw new Error('Ooop something went wrong! Bitte erneut versuchen.');
        }
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.Datatrans.startPayment({
          transactionId: shopTransaction.transactionId,
        });
      }
    } catch (err) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"ShopCheckoutError"' is not assignable to parameter of type 'null | undefined'. */
      displayErrorToast(err.message, null, 'ShopCheckoutError');
      log('[TeaserShopProduct] subscribe error', err.message);
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const setPayment = useCallback((event) => {
    setPaymentMethod(event.target.value);
  }, []);

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.SpecialOfferWrapper]: showUpdated,
      })}
    >
      <div
        className={classNames(styles.InnerWrapper, {
          [styles.SpecialOfferInnerWrapper]: showUpdated,
        })}
      >
        {showUpdated && <div className={styles.SpecialOffer}>Empfehlung</div>}
        <div className={styles.Title}>{title}</div>
        {price && (
          <div className={styles.Price}>
            {pricePrefix && (
              <span className={styles.PricePrefix}>{pricePrefix}</span>
            )}
            {price}.&#8211;
          </div>
        )}
        <div className={styles.ShortTitle}>{shortTitle}</div>
        <Link
          onClick={(event: MouseEvent) => {
            event.preventDefault();
            togglePaymentMethod(true);
          }}
          className={classNames(styles.Button, {
            [styles.Hidden]: isPaymentMethodVisible,
          })}
        >
          abonnieren
        </Link>
        <div
          className={classNames(styles.PaymentMethodsWrapper, {
            [styles.Visible]: isPaymentMethodVisible,
          })}
        >
          Wählen Sie ihre Zahlungs methode aus:
          <div onChange={setPayment.bind(this)} className={styles.FormWrapper}>
            <label
              className={classNames(styles.Radio, {
                [styles.SpecialOfferWrapper]: showUpdated,
              })}
            >
              <input
                type="radio"
                value="invoice"
                defaultChecked
                name={`paymentMethod-${gcid}`}
              />
              <i>Rechnung</i>
            </label>
            <label
              className={classNames(styles.Radio, {
                [styles.SpecialOfferWrapper]: showUpdated,
              })}
            >
              <input
                type="radio"
                value="datatrans"
                name={`paymentMethod-${gcid}`}
              />
              <i>Karte</i>
            </label>
          </div>
          <div className={styles.FormWrapper}>
            <label
              className={classNames(styles.Checkbox, {
                [styles.SpecialOfferWrapper]: showUpdated,
              })}
            >
              <input
                onChange={(event) => {
                  setConditionsAccepted(event.target.checked);
                }}
                type="checkbox"
                value="conditions"
                name="conditions"
                checked={hasConditionsAccepted}
              />
              <i>Bestätigen Sie unsere AGBs</i>
            </label>
          </div>
          <Link
            onClick={(event: MouseEvent) => {
              event.preventDefault();

              if (Auth0.getUserId()) {
                checkout({
                  title,
                  gcid,
                  number,
                  price,
                  pricePrefix,
                  shortTitle,
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                  campaignnumber: number,
                });
              } else {
                // TODO: add pls login handling here
                displayErrorToast(
                  'Pleaser Login first',
                  null,
                  /* @ts-ignore TODO: TS2345 ->  Argument of type '"ShopCheckoutError"' is not assignable to parameter of type 'null | undefined'. */
                  'ShopCheckoutError',
                );
              }
            }}
            className={classNames(styles.Button, {
              [styles.Active]: hasConditionsAccepted,
            })}
          >
            jetzt Kaufen
          </Link>
        </div>
      </div>
      <div
        className={classNames(styles.DescriptionWrapper, {
          [styles.Visible]: isDescriptionVisible,
        })}
      >
        <div
          className={styles.RichTextWrapper}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | TrustedHTML'. */
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
        {showUpdated && teaserImage.image?.file?.relativeOriginPath && (
          <div className={styles.TeaserImage}>
            <Picture
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              relativeOrigin={teaserImage.image?.file?.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              alt={teaserImage.image?.file?.alt}
              style_320={STYLE_2X3_305}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              focalPointX={teaserImage.image?.file?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              focalPointY={teaserImage.image?.file?.focalPointY}
            />
          </div>
        )}
      </div>
      <Link
        onClick={() => {
          toggleDescription(!isDescriptionVisible);
        }}
        className={classNames(styles.ToggleDescription, {
          [styles.Visible]: isDescriptionVisible,
        })}
      ></Link>
    </div>
  );
};

export default scriptLoader(__DATATRANS_ENDPOINT__)(
  memo<TeaserShopProductProps>(TeaserShopProduct),
);
