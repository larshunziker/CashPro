import { Component } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-async-script-loader'. '/Users/bhs/code/work/rasch-stack/node_module */
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { safariVersion } from '../../../shared/helpers/deviceDetector';
import { getRCTrackingSource } from '../../../shared/helpers/getRCTrackingSource';
import handleWysiwygLink from '../../../shared/helpers/handleWysiwygLink';
import storageAvailable from '../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { getCookieByName, log, setCookie } from '../../../shared/helpers/utils';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';
import withNavigate, {
  WithNavigateProps,
} from '../../../shared/decorators/withNavigate';
import {
  SetPianoAccesGranted,
  SetPianoBrowserMetadata,
  SetPianoWebinarAccesGranted,
  setChatbotHiddenState,
  setPaywallDrawerVisibleState,
  setPianoAccesGranted,
  setPianoBrowserMetadata,
  setPianoWebinarAccesGranted,
} from '../../../shared/actions/piano';
import { Auth0 } from '../Auth0Provider';
import { dispatchHybridAppEvent } from '../HybridAppProvider';
import {
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../shared/constants/content';
import {
  PIANO_ABO_OVERVIEW_CONTAINER,
  PIANO_CHECKOUT_CSS_CLASS,
  PIANO_CONTAINER_ANIMATED,
  PIANO_CONTAINER_ARTICLE_ASIDE,
  PIANO_CONTAINER_LANDING_ASIDE,
  PIANO_CONTAINER_LOCKED,
  PIANO_CONTAINER_METERING,
  PIANO_CONTAINER_METERING_NO_SHADOW,
  PIANO_CONTAINER_RESTRICTED_DRAWER,
  PIANO_CONTAINER_SLIDE_DOWN_ANIMATED,
  PIANO_EVENT_CHECKOUT_START,
  PIANO_LOCAL_STORAGE_PARAMS,
  PIANO_PLACEHOLDER_ASIDE,
  PIANO_PLACEHOLDER_INLINED,
} from '../../../shared/constants/piano';
import { AUTH0_LOGIN_CASE_EMAIL_ONLY } from '../Auth0Provider/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variablesDefault.legacy.css'. '/Users/bhs/code/work/r */
import { ZINDEXES } from '../../assets/styles/variablesDefault.legacy.css';
import { LoginCase } from '../Auth0Provider/typings';

type PianoPropsInner = WithNavigateProps & {
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  pageMetadata: PianoPageMetadata;
  userMetadata: PianoUserMetadata;
  setPianoBrowserMetadata: SetPianoBrowserMetadata;
  setPianoAccesGranted: SetPianoAccesGranted;
  setPianoWebinarAccesGranted: SetPianoWebinarAccesGranted;
  setChatbotHiddenState: (isHidden: boolean) => void; // Updated name
  setPaywallDrawerVisibleState: (isVisible: boolean) => void;
  browserMetadata: PianoBrowserMetadata;
  screenReady: boolean;
  isCrawler: boolean;
  isPrintArticle: boolean;
  isHybridApp: boolean;
  isChatbotHidden?: boolean;
  isPaywallDrawerVisible?: boolean;
};

const pianoZIndex = parseInt(ZINDEXES.zIndexPianoOverlay, 10);
const pianoModalZIndex = pianoZIndex + 5;

export const dispatchCustomEvent = (
  eventName: string,
  eventInitDict?: EventInit,
) => {
  const customEventName = `RASCH-${eventName}`;
  const raschCustomEvent = new Event(customEventName, eventInitDict);

  document.dispatchEvent(raschCustomEvent);

  log(
    'PIANO',
    [`dispatchCustomEvent "${customEventName}" dispatched`],
    'green',
  );
};
export const RASCH_CUSTOM_EVENT_PREFIX = 'RASCH-CUSTOM-';
/* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
export const dispatchRaschCustomEvent = (eventName: string, conversion) => {
  const customEventName = `${RASCH_CUSTOM_EVENT_PREFIX}${eventName}`;

  const raschCustomEvent = new CustomEvent(customEventName, {
    detail: conversion,
  });

  document.dispatchEvent(raschCustomEvent);

  log(
    'PIANO',
    [`dispatchRaschCustomEvent "${customEventName}" dispatched`],
    'green',
  );
};

export class Piano extends Component<PianoPropsInner> {
  checkoutState = false;
  isInitialized = false;
  currentProps: PianoPropsInner | null = null;
  astFilePath = '';
  isAdblockerActive = undefined;
  disableCloseButtonForModal = false;

  constructor(props: PianoPropsInner) {
    super(props);
    this.currentProps = { ...props };
  }

  _adjustModalZIndex(event: string) {
    // set z-indexes to defined values
    const elements = document.getElementsByClassName(
      'tp-modal',
    ) as HTMLCollectionOf<HTMLElement>;

    if (event === PIANO_EVENT_CHECKOUT_START) {
      [...elements].forEach((element) => {
        element.style.zIndex = '' + (pianoModalZIndex + 20);
      });
    }
  }

  _hideSkeletonForInlinePaywall(conversion: Record<string, any>) {
    const paywallDisplayMode: string = conversion.displayMode;
    const paywallSelectorTag: HTMLElement = document.querySelector(
      conversion.containerSelector,
    );

    const iframeElement: HTMLCollectionOf<HTMLIFrameElement> =
      paywallSelectorTag.getElementsByTagName('iframe');

    const iframeLoadingListener = function (className: string) {
      iframeElement[0].addEventListener('load', () => {
        paywallSelectorTag.classList.remove(className);
      });
    };

    if (
      [...paywallSelectorTag.classList].some((className: string) =>
        className.includes(PIANO_PLACEHOLDER_ASIDE),
      )
    ) {
      iframeLoadingListener(PIANO_PLACEHOLDER_ASIDE);
    }

    if (paywallDisplayMode === 'inline') {
      iframeLoadingListener(PIANO_PLACEHOLDER_INLINED);
    }
  }

  _toggleCheckoutClass(isCheckout = true) {
    const element: HTMLElement | null =
      document.querySelector('.tp-iframe-wrapper');
    if (element && isCheckout) {
      element.classList.add(PIANO_CHECKOUT_CSS_CLASS);
      const modal: HTMLElement | null = document.querySelector('.tp-modal');
      if (modal) {
        modal.scrollTop = 0;
      }
    } else if (element && !isCheckout) {
      element.classList.remove(PIANO_CHECKOUT_CSS_CLASS);
    }
  }

  /**
   * Post into host window + Piano iframes under a container identifier
   * (e.g. `.piano-abo-overview`). Accepts a class name or a CSS selector.
   */
  _postToPianoFrames(
    message: Record<string, unknown>,
    containerIdentifier: string = PIANO_ABO_OVERVIEW_CONTAINER,
  ) {
    try {
      window.postMessage(message, window.location.origin);
    } catch (e) {
      /* ignore */
    }
    let pianoOrigin: string | undefined;
    try {
      pianoOrigin = __PIANO_ENDPOINT__
        ? new URL(__PIANO_ENDPOINT__).origin
        : undefined;
    } catch (e) {
      pianoOrigin = undefined;
    }
    if (!pianoOrigin || !containerIdentifier) {
      return;
    }

    const containerSelector =
      containerIdentifier.startsWith('.') || containerIdentifier.startsWith('#')
        ? containerIdentifier
        : `.${containerIdentifier}`;

    document.querySelectorAll(containerSelector).forEach((container) => {
      Array.from(container.querySelectorAll('iframe'))
        .filter((iframe) =>
          (iframe.getAttribute('src') || '').startsWith(pianoOrigin as string),
        )
        .forEach((iframe) => {
          try {
            iframe.contentWindow?.postMessage(message, pianoOrigin as string);
          } catch (e) {
            /* ignore */
          }
        });
    });
  }

  /**
   * Push subscription gids into Piano custom vars and notify Abo Overview.
   * hasAccess(rid) is unreliable with Piano ID Lite; templates read these instead.
   */
  _syncAboSubscriptions(
    subscriptions: string[],
    options?: { rid?: string | null; refresh?: boolean },
  ) {
    const gids = (subscriptions || []).filter(Boolean);
    gids.forEach((gid: string) => {
      window.tp.push(['setCustomVariable', `aboSub_${gid}`, 1]);
    });
    window.tp.push(['setCustomVariable', 'aboSubscriptions', gids.join(',')]);
    this._postToPianoFrames({
      type: 'piano-abo-overview-subscriptions',
      subscriptions: gids,
    });
    if (options?.refresh) {
      this._postToPianoFrames({
        type: 'piano-abo-overview-refresh',
        subscriptions: gids,
        rid: options.rid || null,
      });
    }
  }

  /**
   * After checkout: seed Abo Overview via resource id, then renew Auth0 and
   * re-sync until subscription metadata catches up (may lag behind Piano).
   */
  _refreshAboOverviewAfterCheckout(conversion: Record<string, any>) {
    const rid =
      conversion?.rid ||
      conversion?.resourceId ||
      conversion?.resource?.rid ||
      null;
    const baseline = this.props.userMetadata.subscriptions || [];

    this._syncAboSubscriptions(baseline, { rid, refresh: true });

    const renewAndSync = (attempt: number) => {
      Auth0.renewToken()
        .catch(() => {})
        .then(() => {
          window.setTimeout(() => {
            const latest = this.props.userMetadata.subscriptions || [];
            this._syncAboSubscriptions(latest, { rid, refresh: true });
            const gainedSubscription = latest.some(
              (gid: string) => baseline.indexOf(gid) === -1,
            );
            if (!gainedSubscription && attempt < 5) {
              window.setTimeout(() => renewAndSync(attempt + 1), 1500);
            }
          }, 400);
        });
    };
    renewAndSync(0);
  }

  async _getBrowserMetadata() {
    const isIncognitoMode = await this._detectIncognitoMode();
    this.props.setPianoBrowserMetadata({
      ...this.props.browserMetadata,
      browserMode: isIncognitoMode ? 'incognito' : 'normal',
    });
  }

  async _logSovendusConversion(conversion: Record<string, any>) {
    const sovReqTokenCookie = getCookieByName('sovReqToken');

    // if sovReqToken cookie exist and is paid term
    // call /track-piano-conversion
    if (
      conversion.chargeAmount &&
      conversion.chargeAmount > 0 &&
      sovReqTokenCookie
    ) {
      const apiParams = new URLSearchParams();
      apiParams.append('sovReqToken', sovReqTokenCookie);
      apiParams.append('user_token', conversion.user_token);
      apiParams.append('rid', conversion.rid);
      apiParams.append('uid', conversion.uid);

      const trackPianoConversionUrl = `/track-piano-conversion/?${apiParams.toString()}`;
      let response = await fetch(trackPianoConversionUrl);
      response = await response.json();

      // don't track tealium user hasn't piano access and sovendus conversion is not tracked
      // @ts-ignore
      if (!response || !response.access) {
        return null;
      }

      doHandleTealiumSovendus('sovendus_conversion', {
        event_category: 'sovendus',
        event_action: 'attributed',
        event_label: conversion?.termId || undefined,
      });
    }
  }

  _getExperienceTemplatePlaceholder(conversion: Record<string, any>) {
    const pianoEventShowTemplate = conversion.result.events
      .filter(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
        (event) =>
          event.eventType === 'showTemplate' &&
          (event.eventParams.containerSelector.includes(
            PIANO_CONTAINER_ARTICLE_ASIDE,
          ) ||
            event.eventParams.containerSelector.includes(
              PIANO_CONTAINER_LANDING_ASIDE,
            )),
      )
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      .map((event) => event.eventParams.containerSelector);

    const allPIanoArticleAside = document.querySelectorAll(
      `[class*=${PIANO_PLACEHOLDER_ASIDE}]`,
    );

    allPIanoArticleAside?.forEach((pianoAsideElement) => {
      const isInTemplate: boolean = pianoEventShowTemplate.some(
        (selector: string) => pianoAsideElement.matches(selector),
      );

      if (!isInTemplate) {
        pianoAsideElement.classList.remove(PIANO_PLACEHOLDER_ASIDE);
      }
    });
  }

  _showExperienceDebugLogs(conversion: Record<string, any>) {
    const experiences = new Map();

    /* @ts-ignore TODO: TS7006 ->  Parameter 'experience' implicitly has an 'any' type. */
    conversion.result.experiences.forEach((experience) => {
      experiences.set(experience.id, experience.title);
    });

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const events = conversion.result.events.map((event) => {
      return {
        eventType: event.eventType,
        moduleName: event.eventModuleParams.moduleName,
        experienceId: event.eventExecutionContext.experienceId,
      };
    });

    // eslint-disable-next-line no-console
    console.table(events, ['experienceId', 'moduleName', 'eventType']);
  }

  _initialize(): void {
    window.tp.push([
      'init',
      () => {
        // set z-indexes to defined values
        window.tp.push([
          'setZIndexes',
          {
            backdrop: pianoZIndex,
            modal: pianoModalZIndex,
            close: pianoModalZIndex + 1,
          },
        ]);

        window.tp.push([
          'setZone',
          (!__PIANO_FORCE_DISABLE__ && __PIANO_ENV__) || 'not enabled',
        ]);

        if (__PIANO_CXENSE_ID__) {
          window.tp.push(['setCxenseSiteId', `${__PIANO_CXENSE_ID__}`]);
        }

        // user login events
        window.tp.push([
          'addHandler',
          'loginRequired',
          this._onLoginRequired.bind(this),
        ]);

        window.tp.push([
          'addHandler',
          'checkoutComplete',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('checkoutComplete', conversion);
            dispatchCustomEvent('checkoutComplete', conversion);

            this.checkoutState = false;
            // Sync Abo Overview before experience.execute remounts templates
            this._refreshAboOverviewAfterCheckout(conversion);
            if (typeof window.tp.experience.execute === 'function') {
              window.tp.experience.execute();
            }
            this._logSovendusConversion(conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          'checkoutCustomEvent',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('checkoutCustomEvent', conversion);
            dispatchRaschCustomEvent('checkoutCustomEvent', conversion);

            switch (conversion.eventName) {
              case 'acceptBankingDisclaimer':
                setCookie('_pc_banking_disclaimer', 'accepted', 365, '/');
                this._cleanUpExperiences();
                break;
              case 'gotoHome':
                this.checkoutState = false;
                this.props.navigate('/');
                break;

              case 'loginWithoutCheckout':
                const loginCase: LoginCase =
                  conversion.params?.logincase ||
                  __PIANO_LOGIN_CASE__ ||
                  AUTH0_LOGIN_CASE_EMAIL_ONLY;
                const source = doGetRCTrackingSource(
                  'piano-overlay',
                  this.props.pageMetadata,
                  {
                    experienceId: conversion.params.experienceId,
                    eventName: conversion.eventName,
                  },
                );

                Auth0.login(loginCase, source);
                break;
              case 'openChatbot':
                dispatchRaschCustomEvent('openChatbot', conversion);
                break;
              case 'navigateTo':
                this.checkoutState = false;
                const targetUri: string = conversion.params?.targetUri;
                const openInNewTab = conversion.params?.openInNewTab === 'true';
                const notOpenInNewTab =
                  conversion.params?.openInNewTab === 'false';

                if (targetUri) {
                  if (openInNewTab) {
                    window.open(targetUri, '_blank');
                  } else if (notOpenInNewTab) {
                    this.props.navigate(targetUri);
                  } else {
                    handleWysiwygLink(targetUri, this.props.navigate);
                  }
                }
                break;

              case 'aboOverviewShowOffer': {
                const offerId = conversion.params?.offerId;
                if (!offerId || typeof window.tp?.offer?.show !== 'function') {
                  break;
                }
                const offerParams: {
                  offerId: string;
                  templateId?: string;
                  templateVariantId?: string;
                  displayMode: 'modal';
                  showCloseButton: boolean;
                } = {
                  offerId,
                  displayMode: 'modal',
                  showCloseButton: true,
                };
                if (conversion.params?.templateId) {
                  offerParams.templateId = conversion.params.templateId;
                }
                if (conversion.params?.templateVariantId) {
                  offerParams.templateVariantId =
                    conversion.params.templateVariantId;
                }
                window.tp.offer.show(offerParams);
                break;
              }

              case 'openNativeAppStore':
                dispatchHybridAppEvent('openstore', {});
                break;

              case 'openLandingPageTutorial':
                dispatchHybridAppEvent('open-landing-page-tutorial', {});
                break;

              case 'closeNotificationsPrompt':
              case 'cancelNotificationsPrompt':
                doHandleTealium(conversion.eventName, conversion.params);
                break;
              case 'newsletterSubscriptionClose':
                const newsLetterSubscription: HTMLElement | null =
                  document.getElementById(PIANO_CONTAINER_ANIMATED);
                if (newsLetterSubscription) {
                  newsLetterSubscription.classList.remove('bounce-in-bottom');
                }
                break;
              case 'closeWithSlideDownAnimation': // used by Specific Topics Overlay templates in BEO/HZ/SI
                const pianoContainer: HTMLElement | null =
                  document.getElementById(PIANO_CONTAINER_SLIDE_DOWN_ANIMATED);
                if (pianoContainer) {
                  pianoContainer.classList.add('slide-out-bottom');
                }
                setTimeout(() => {
                  if (typeof window.tp?.offer?.closeInline === 'function') {
                    window.tp.offer.closeInline(
                      `#${PIANO_CONTAINER_SLIDE_DOWN_ANIMATED}`,
                    );
                    if (pianoContainer) {
                      pianoContainer.classList.remove('slide-out-bottom');
                    }
                  }
                }, 300);
            }
          },
        ]);

        window.tp.push([
          'addHandler',
          'showTemplate',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('showTemplate', conversion);
            dispatchRaschCustomEvent('showTemplate', conversion);
            this._hideSkeletonForInlinePaywall(conversion);
            this._toggleViewportLock(conversion);
            this._performAnimation(conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          'showOffer',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('showOffer', conversion);
            dispatchCustomEvent('showOffer', conversion);
            this._hideSkeletonForInlinePaywall(conversion);
            this._toggleViewportLock(conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          'experienceExecutionFailed',
          () => {
            dispatchCustomEvent('experienceExecutionFailed');
            // cleanup if experience fails
            this._cleanUpExperiences();
            log('PIANO', 'experienceExecutionFailed', 'red');
          },
        ]);

        window.tp.push([
          'addHandler',
          'checkoutError',
          (errorData: any) => {
            doHandleTealium('checkoutError', errorData);
            dispatchCustomEvent('checkoutError', errorData);
            this._adjustModalZIndex('checkoutError');
            this.checkoutState = false;
            this._toggleCheckoutClass(false);
            log('PIANO', `checkoutError: ${JSON.stringify(errorData)}`, 'red');
          },
        ]);

        window.tp.push([
          'addHandler',
          'checkoutClose',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('checkoutClose', conversion);
            dispatchCustomEvent('checkoutClose', conversion);
            this._adjustModalZIndex('checkoutClose');
            this.checkoutState = false;
            this._clearViewportLock();
            this._toggleCheckoutClass(false);
            if (
              this.disableCloseButtonForModal &&
              conversion.state === 'close'
            ) {
              window.tp.experience.execute();
            }
          },
        ]);
        window.tp.push([
          'addHandler',
          'manualCreditRedeemed',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('manualCreditRedeemed', conversion);
            dispatchRaschCustomEvent('manualCreditRedeemed', conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          PIANO_EVENT_CHECKOUT_START,
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium(PIANO_EVENT_CHECKOUT_START, conversion);
            dispatchCustomEvent(PIANO_EVENT_CHECKOUT_START, conversion);
            dispatchRaschCustomEvent(PIANO_EVENT_CHECKOUT_START, conversion);
            this._adjustModalZIndex(PIANO_EVENT_CHECKOUT_START);
            this._toggleCheckoutClass(true);
          },
        ]);

        window.tp.push([
          'addHandler',
          'checkoutSelectTerm',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('checkoutSelectTerm', conversion);
            dispatchCustomEvent('checkoutSelectTerm', conversion);
            this._adjustModalZIndex(PIANO_EVENT_CHECKOUT_START);
            this._toggleCheckoutClass(true);
          },
        ]);

        window.tp.push([
          'addHandler',
          'checkoutStateChange',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('checkoutStateChange', conversion);
            dispatchCustomEvent('checkoutStateChange', conversion);
            if (conversion.stateName === 'offer') {
              this._toggleCheckoutClass(false);
            }
          },
        ]);

        window.tp.push([
          'addHandler',
          'meterActive',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('meterActive', conversion);
            dispatchCustomEvent('meterActive', conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          'setResponseVariable',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            log('PIANO', 'conversion ' + JSON.stringify(conversion));
            dispatchRaschCustomEvent('setResponseVariable', conversion);
            if (conversion?.responseVariables?.isAccessGranted) {
              if (
                [
                  RESTRICTION_STATUS_PAID,
                  RESTRICTION_STATUS_REGISTERED,
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
                ].includes(this.props?.pageMetadata?.restrictionStatus)
              ) {
                this.props.setPianoAccesGranted(true);
              }
            } else if (conversion?.responseVariables?.webinarAccessGranted) {
              this.props.setPianoWebinarAccesGranted(true);
            }

            if (!conversion?.responseVariables?.isChatbotHidden) {
              this.props.setChatbotHiddenState(false);
            } else {
              this.props.setChatbotHiddenState(true);
            }
          },
        ]);

        window.tp.push([
          'addHandler',
          'meterExpired',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            doHandleTealium('meterExpired', conversion);
            dispatchCustomEvent('meterExpired', conversion);
          },
        ]);

        window.tp.push([
          'addHandler',
          'experienceExecute',
          /* @ts-ignore TODO: TS7006 ->  Parameter 'conversion' implicitly has an 'any' type. */
          (conversion) => {
            dispatchCustomEvent('experienceExecute', conversion);
            const showOfferContainerSelectors: string[] =
              conversion.result.events
                .filter(
                  (event: { eventType: string }) =>
                    event.eventType === 'showOffer',
                )
                .map(
                  (event: { eventParams: { containerSelector: string } }) =>
                    event.eventParams.containerSelector,
                );
            this.disableCloseButtonForModal = conversion.result.events.some(
              (event: {
                eventType: string;
                eventParams: { showCloseButton: boolean; displayMode: string };
              }) =>
                event.eventType === 'showOffer' &&
                event.eventParams.displayMode === 'modal' &&
                !event.eventParams.showCloseButton,
            );

            if (
              showOfferContainerSelectors.includes(
                `#${PIANO_CONTAINER_RESTRICTED_DRAWER}`,
              )
            ) {
              this.props.setPaywallDrawerVisibleState(true);
              window.scroll(0, 0);
              this._addViewportLock();
            } else {
              this.props.setPaywallDrawerVisibleState(false);
            }

            if (document.cookie && document.cookie.indexOf('RASCHDEBUG') > -1) {
              this._showExperienceDebugLogs(conversion);
            }
            this._getExperienceTemplatePlaceholder(conversion);
          },
        ]);

        // init experience on first load
        window.tp.experience.init();
        this.isInitialized = true;
        log('PIANO', 'experience.init', 'green');
      },
    ]);
  }

  _onLoginRequired(params: Record<string, any>) {
    if (window.tp && window.tp.user && window.tp.user.isUserValid()) {
      log('PIANO', ['_onLoginRequired user is already valid!!!!'], 'red');
      return;
    }

    doHandleTealium('loginRequired', params);
    dispatchCustomEvent('loginRequired', params);

    // add params to local storage
    if (storageAvailable('localStorage')) {
      localStorage.setItem(
        PIANO_LOCAL_STORAGE_PARAMS,
        JSON.stringify(params || {}),
      );
    }
    let loginCase: LoginCase =
      (__PIANO_LOGIN_CASE__ as LoginCase) || AUTH0_LOGIN_CASE_EMAIL_ONLY;

    // is a offer modal for paid terms
    if (params && !params.showCloseButton) {
      loginCase =
        (__PIANO_LOGIN_CASE_FULLNAME_REQUIRED__ as LoginCase) ||
        AUTH0_LOGIN_CASE_EMAIL_ONLY;
    }

    if (!params?.experienceId) {
      log(
        'PIANO',
        ['_onLoginRequired params.experienceId is not defined'],
        'red',
      );
    }

    const source = doGetRCTrackingSource(
      'piano-overlay',
      this.props.pageMetadata,
      {
        experienceId: params.experienceId,
        eventName: 'loginRequired',
      },
    );

    Auth0.login(loginCase, source);
  }

  _cleanUpExperiences() {
    if (
      window.tp &&
      window.tp.offer &&
      typeof window.tp.offer.close === 'function' &&
      typeof window.tp.offer.closeInline === 'function'
    ) {
      window.tp.offer.close();
      window.tp.offer.closeInline(`#${PIANO_CONTAINER_ANIMATED}`);
      window.tp.offer.closeInline(`#${PIANO_CONTAINER_LOCKED}`);
      window.tp.offer.closeInline(`#${PIANO_CONTAINER_METERING}`);
      window.tp.offer.closeInline(`#${PIANO_CONTAINER_METERING_NO_SHADOW}`);
      window.tp.offer.closeInline(`#${PIANO_CONTAINER_SLIDE_DOWN_ANIMATED}`);
      window.tp.scrollDepth.clearMaxScrolledPosition();
    }

    this._clearViewportLock();
  }

  _addViewportLock() {
    const app: HTMLElement | null = document.getElementById('app');
    if (app) {
      disableBodyScroll(app);
    }
  }

  _clearViewportLock() {
    const app: HTMLElement | null = document.getElementById('app');
    if (app) {
      enableBodyScroll(app);
    }
  }

  _toggleViewportLock(params: Record<string, any>) {
    if (
      (params.displayMode === 'inline' &&
        params.containerSelector === `#${PIANO_CONTAINER_LOCKED}`) ||
      params.displayMode === 'modal'
    ) {
      this._addViewportLock();
    } else {
      this._clearViewportLock();
    }
  }

  _performAnimation(params: Record<string, any>) {
    if (params.containerSelector === `#${PIANO_CONTAINER_ANIMATED}`) {
      // we set a timeout here, to make sure that the piano template is loaded before we perform the animation
      setTimeout(() => {
        const newsLetterSubscription: HTMLElement | null =
          document.getElementById(PIANO_CONTAINER_ANIMATED);

        if (
          newsLetterSubscription &&
          !newsLetterSubscription.classList.contains('bounce-in-bottom')
        ) {
          newsLetterSubscription.classList.add('bounce-in-bottom');
        }
      }, 1000);
    }
  }

  async _detectIncognitoMode(): Promise<boolean> {
    return new Promise((resolve) => {
      // is in private mode
      const privateMode = () => resolve(true);

      // not in private mode
      const notPrivateMode = () => resolve(false);

      // Chrome & Opera adjusted to cope with this issue
      // https://stackoverflow.com/questions/2860879/detecting-if-a-browser-is-using-private-browsing-mode#targetText=Google%20is%20removing%20the%20ability,permanently%20in%20Chrome%2076%20onwards.&targetText=To%20anyone%20else%20coming%20across,mode%20through%20Javascript%20or%20CSS.
      const fs = window.webkitRequestFileSystem || window.RequestFileSystem;
      if (fs) {
        return (async () => {
          if ('storage' in navigator && 'estimate' in navigator.storage) {
            const { quota } = await navigator.storage.estimate();
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            if (quota < 120000000) {
              return privateMode();
            }

            return notPrivateMode();
          }

          return notPrivateMode();
        })();
      }

      // Firefox
      if (
        document.documentElement &&
        'MozAppearance' in document.documentElement.style
      ) {
        if (window.indexedDB === null) {
          return privateMode();
        }

        const db = window.indexedDB.open('test');
        db.onerror = privateMode;
        db.onsuccess = notPrivateMode;
        return void 0;
      }

      // Safari
      const safariVersionData: Record<string, any> = safariVersion();

      if (safariVersionData) {
        const version = parseInt(safariVersionData[1], 10);

        if (version < 11) {
          try {
            if (localStorage.length) {
              return notPrivateMode();
            }

            localStorage.setItem('x', '1');
            localStorage.removeItem('x');
            return notPrivateMode();
          } catch (_) {
            // Safari only enables cookie in private mode
            // if cookie is disabled, then all client side storage is disabled
            // if all client side storage is disabled, then there is no point
            // in using private mode
            if (window.navigator.cookieEnabled) {
              return privateMode();
            }

            return notPrivateMode();
          }
        }

        try {
          window.openDatabase(null, null, null, null);
          return notPrivateMode();
        } catch (_) {
          return privateMode();
        }
      }

      // IE10+ & Edge InPrivate
      // @ts-ignore
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        return privateMode();
      }

      // default navigation mode
      return notPrivateMode();
    });
  }

  // With an active adblocker we'll not be able to fetch this file correctly
  async _isAdScriptBlocked() {
    if (typeof this.isAdblockerActive === 'undefined') {
      const scripts = document.getElementsByTagName('script');
      // using a regex here to keep the file path dynamic
      //(version handling in url and ast.js files can also come from another host)
      const astFileSrc = [...scripts].filter((test) =>
        test.src.match(/acdn\.adnxs\.com\/.*ast\.js/),
      );
      this.astFilePath = astFileSrc[0]?.src || '';

      try {
        const atmResponse = await fetch(this.astFilePath);
        return atmResponse.status !== 200;
      } catch (error) {
        return true;
      }
    }
    if (!this.astFilePath) {
      return;
    }
  }

  componentDidMount() {
    // init tp on global scope
    window.tp = window.tp || [];

    // Does application use Piano ID?
    window.tp.push(['setUseTinypassAccounts', false]);
    window.tp.push(['setUsePianoIdUserProvider', false]);
    window.tp.push(['setUsePianoIdLiteUserProvider', true]);
    // Set Application ID
    window.tp.push(['setAid', __PIANO_AID__]);
    window.tp.push(['setDebug', false]);

    // Is application in sandbox?
    if (__PIANO_ENDPOINT__ === 'https://sandbox.tinypass.com/api/v3') {
      window.tp.push(['setSandbox', true]);
    }

    window.tp.push(['setEndpoint', __PIANO_ENDPOINT__]);

    // load browser data
    this._getBrowserMetadata();

    // Detects if page is in standalone (PWA installed) mode on iOS
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
    const isInStandaloneMode = global.navigator['standalone'];
    window.tp.push(['setCustomVariable', 'appInstalled', isInStandaloneMode]);
    window.tp.push([
      'setCustomVariable',
      'isIosDevice',
      // @ts-ignore
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    ]);
  }

  async componentDidUpdate() {
    log('PIANO', ['in component did update', this.props], 'green');
    if (this.props.isCrawler) {
      log('PIANO', 'blocked - isCrawler', 'red');
      return;
    }
    this.currentProps = { ...this.props };
    const {
      channelsHierarchy,
      contentType,
      gcid,
      publication,
      isNativeContent,
      publicationDate,
      restrictionStatus,
      section,
      tags,
      isPrintArticle,
      mainChannel,
      subType,
      webinarId,
      cliffhangerTitle,
      cliffhangerBulletpoints,
    } = this.props.pageMetadata;

    window.tp.push([
      'setCustomVariable',
      'restrictionStatus',
      restrictionStatus,
    ]);

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    channelsHierarchy.forEach((channelHierarchy, index) => {
      window.tp.push([
        'setCustomVariable',
        `channelLevel${index + 1}`,
        channelHierarchy,
      ]);
    });
    if (!channelsHierarchy || channelsHierarchy.length === 0) {
      window.tp.push(['setCustomVariable', `channelLevel1`, null]);
    }

    window.tp.push(['setCustomVariable', 'gcid', gcid]);

    window.tp.push([
      'setCustomVariable',
      'pagePath',
      global.location.pathname + global.location.search,
    ]);

    window.tp.push(['setCustomVariable', 'publication', publication]);

    window.tp.push(['setCustomVariable', 'contentType', contentType]);

    window.tp.push(['setCustomVariable', 'mainChannel', mainChannel]);

    window.tp.push(['setTags', tags]);

    window.tp.push(['setContentCreated', publicationDate]);
    window.tp.push(['setContentSection', section]);
    window.tp.push(['setContentIsNative', isNativeContent]);

    this.props.userMetadata.externalSubscription.forEach(
      (externalSub: Record<string, any>) => {
        window.tp.push([
          'setCustomVariable',
          `externalSub_${externalSub?.gid}`,
          1,
        ]);
      },
    );

    window.tp.push([
      'setCustomVariable',
      'externalSubscription',
      this.props.userMetadata.externalSubscription?.[0]?.gid || '',
    ]);

    // Subscription gids from Auth0 — Abo Overview (and similar) read these custom vars.
    this._syncAboSubscriptions(this.props.userMetadata.subscriptions || []);
    // Abo Overview debug panel (template iframe cannot read host cookies)
    const rmsDebugEnabled = !!(
      document.cookie && document.cookie.indexOf('RMSDEBUG') > -1
    );
    window.tp.push(['setCustomVariable', 'rmsDebug', rmsDebugEnabled ? 1 : 0]);
    this._postToPianoFrames({
      type: 'piano-abo-overview-debug',
      enabled: rmsDebugEnabled,
    });

    window.tp.push(['setCustomVariable', 'cliffhangerTitle', cliffhangerTitle]);

    window.tp.push([
      'setCustomVariable',
      'benefitsList',
      cliffhangerBulletpoints?.join(' | '),
    ]);

    const {
      browserMode,
      isPushNotificationsSupported,
      isPushNotificationsEnabled,
      notificationsPermission,
    } = this.props.browserMetadata;

    window.tp.push(['setCustomVariable', 'browserMode', browserMode]);

    window.tp.push([
      'setCustomVariable',
      'isPushNotificationsSupported',
      isPushNotificationsSupported,
    ]);

    window.tp.push([
      'setCustomVariable',
      'isPushNotificationsEnabled',
      isPushNotificationsEnabled,
    ]);

    window.tp.push([
      'setCustomVariable',
      'notificationsPermission',
      notificationsPermission,
    ]);

    window.tp.push(['setCustomVariable', 'isPrintArticle', isPrintArticle]);

    window.tp.push(['setCustomVariable', 'subType', subType]);

    if (webinarId) {
      window.tp.push(['setCustomVariable', 'webinarId', webinarId]);
    }

    if (this.props.isHybridApp) {
      window.tp.push([
        'setCustomVariable',
        'hybridApp',
        this.props.isHybridApp,
      ]);
    }

    window.tp.push([
      'setCustomVariable',
      'userAgent',
      global?.navigator?.userAgent,
    ]);

    if (this.props.userMetadata.idToken) {
      window.tp.push(['setExternalJWT', this.props.userMetadata.idToken]);
    }

    if (window.tp?.user && window.tp.user.isUserValid()) {
      let params: Record<string, any> | null;

      if (storageAvailable('localStorage')) {
        params = JSON.parse(
          localStorage.getItem(PIANO_LOCAL_STORAGE_PARAMS) || 'null',
        );
        // remove item after getting the value
        localStorage.removeItem(PIANO_LOCAL_STORAGE_PARAMS);
      } else {
        params = null;
      }

      // If params object is valid - start checkout
      if (params) {
        if (!this.isInitialized) {
          this._initialize();
        }
        this.checkoutState = true;
        doHandleTealium('startCheckout', params);
        window.tp.offer.startCheckout(params);
        log('PIANO', ['startCheckout', params], 'green');
        return;
      }
    }

    if (!this.isInitialized) {
      this._initialize();
      return;
    }

    this._cleanUpExperiences();

    if (window.tp?.experience) {
      // adblocked status
      /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'undefined'. */
      this.isAdblockerActive = await this._isAdScriptBlocked();

      window.tp.push([
        'setCustomVariable',
        'isAdblockerActive',
        this.isAdblockerActive,
      ]);

      if (typeof window.tp.experience.execute === 'function') {
        window.tp.experience.execute();
        log('PIANO', 'experience.execute', 'green');
      } else {
        log('PIANO', 'experience.execute failed', 'red');
      }
    } else {
      log('PIANO', 'experience failed', 'red');
    }
  }

  shouldComponentUpdate(nextProps: PianoPropsInner) {
    log('PIANO', ['in should update', this.props, nextProps], 'orange');

    // Piano not ready
    if (
      !window.tp ||
      this.checkoutState ||
      !nextProps.userMetadata.initialAuthRequest ||
      !nextProps.isScriptLoaded ||
      !nextProps.screenReady ||
      // we want to update only when we have correct metadata information
      nextProps.pageMetadata.notInitialized
    ) {
      log('PIANO', ['in should update - no'], 'red');
      return false;
    }

    if (!this.currentProps) {
      this.currentProps = JSON.parse(JSON.stringify(this.props));
    }

    // UserMetadata & PageMetadata or isAdblockerActive has changed
    if (
      JSON.stringify(nextProps.userMetadata) !==
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        JSON.stringify(this.currentProps.userMetadata) ||
      JSON.stringify(nextProps.pageMetadata) !==
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        JSON.stringify(this.currentProps.pageMetadata)
    ) {
      log('PIANO', ['in should update - yes'], 'green');
      return true;
    }

    // check screenReady & isScriptLoaded for SSR (locally screenReady would be sufficent)
    return (
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      this.currentProps.screenReady !== nextProps.screenReady ||
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      this.currentProps.isScriptLoaded !== nextProps.isScriptLoaded
    );
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render(): null {
    return null;
  }
}

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  pageMetadata: pianoStateSelector(state).pageMetadata,
  userMetadata: pianoStateSelector(state).userMetadata,
  browserMetadata: pianoStateSelector(state).browserMetadata,
  screenReady: locationStateSelector(state).screenReady,
  isCrawler: locationStateSelector(state).isCrawler,
  isHybridApp: locationStateSelector(state).isHybridApp,
  isChatbotHidden: pianoStateSelector(state).isChatbotHidden,
  isPaywallDrawerVisible: pianoStateSelector(state).isPaywallDrawerVisible,
});

const mapDispatchToProps: Record<string, any> = {
  setPianoBrowserMetadata,
  setPianoAccesGranted,
  setPianoWebinarAccesGranted,
  setChatbotHiddenState,
  setPaywallDrawerVisibleState,
};

const withStoreConnection = connect(mapStateToProps, mapDispatchToProps);

export const withScriptLoader: Function = scriptLoader(
  'https://cdn.tinypass.com/api/tinypass.min.js',
);

export default __PIANO_AID__ && __PIANO_ENDPOINT__
  ? compose<any, any>(
      withNavigate,
      withScriptLoader,
      withStoreConnection,
    )(Piano)
  : (): null => null;

type DoHandleTealium = (
  event: string,
  pianoParams: Record<string, any>,
) => void;

const doHandleTealium: DoHandleTealium = (event, pianoParams) => {
  tealiumTrackEvent({
    type: 'link',
    payload: {
      event_name: event,
      piano_params: pianoParams,
    },
  });
};

const doHandleTealiumSovendus: DoHandleTealium = (event, params) => {
  tealiumTrackEvent({
    type: 'link',
    payload: {
      event_name: event,
      ...params,
    },
  });
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'registrationCase' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'pageMetaData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'pianoProps' implicitly has an 'any' type. */
const doGetRCTrackingSource = (registrationCase, pageMetaData, pianoProps) =>
  getRCTrackingSource(registrationCase, pageMetaData, pianoProps);
