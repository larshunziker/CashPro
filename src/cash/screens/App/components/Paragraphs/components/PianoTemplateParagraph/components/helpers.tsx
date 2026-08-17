import { displayErrorToast } from '../../../../Toast';
import { pianoOfferConfig } from '../config';

// TODO: move config switch to our env files so we don't need a if statement by __DOT_ENV__ here
export const showPianoOfferTemplate = (title: string) => {
  const templateId =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ anleger */
    pianoOfferConfig[__DOT_ENV__ === 'master' ? 'production' : 'sandbox'][
      title.toLowerCase()
    ].templateId;

  const offerId =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ anleger */
    pianoOfferConfig[__DOT_ENV__ === 'master' ? 'production' : 'sandbox'][
      title.toLowerCase()
    ].offerId;

  const templateVariantId =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ anleger */
    pianoOfferConfig[__DOT_ENV__ === 'master' ? 'production' : 'sandbox'][
      title.toLowerCase()
    ].variantId;

  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (global?.tp?.offer) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.tp.offer.show({
      templateId,
      offerId,
      templateVariantId,
      displayMode: 'modal',
    });
  }

  let modalWasAlreadyOpen = false;
  const targetNode = document.body;
  const config = { attributes: true, childList: false, subtree: false };

  const callback = () => {
    if (targetNode.classList.contains('tp-modal-open')) {
      modalWasAlreadyOpen = true;
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  // check if the modal is open after 3 seconds
  // if not, show an error toast to user that something is wrong
  setTimeout(() => {
    if (modalWasAlreadyOpen) {
      return;
    }

    const SUBSCRIPTION_BUY_ERROR_MESSAGE =
      'Beim Versuch ein Abos zu kaufen scheint ein Fehler aufgetreten zu sein. Falls Sie einen Ad Blocker oder andere Browser Plugins verwenden, deaktivieren Sie diese und versuchen Sie es erneut. Sollten Sie weiterhin Komplikationen haben, melden Sie sich bitte bei ';
    displayErrorToast(
      SUBSCRIPTION_BUY_ERROR_MESSAGE,
      'subscription-buy-error',
      {
        text: 'office@cash.ch',
        path: 'mailto:office@cash.ch',
      },
    );

    observer.disconnect();
  }, 3000);
};
