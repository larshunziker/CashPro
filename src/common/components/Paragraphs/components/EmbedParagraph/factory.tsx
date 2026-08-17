import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import handleWysiwygLink from '../../../../../shared/helpers/handleWysiwygLink';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { checkConsentInCookie, setConsentOnLocalStorage } from './helpers';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import EmbedContactForm from './components/EmbedContact';
import EmbedDefault from './components/EmbedDefaultNew';
import { useSSRContext } from '../../../SSRContext';
import {
  TRACKING_CLASS_EMBED_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  EmbedParagraphFactoryOptions,
  EmbedParagraphFactoryOptionsStyles,
  EmbedParagraphProps,
} from './typings';

type EmbedParagraphPropsInner = EmbedParagraphProps;

const defaultStyles: EmbedParagraphFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  TitleWrapper: '',
};

const replaceScriptTags = (embedCode: string): string =>
  embedCode
    .replace(/<embeddedscript/gi, '<script')
    .replace(/<\/embeddedscript/gi, '</script');

/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
export const getEmbed = (embed: EmbedParagraph, origin) => {
  if (!embed || !embed?.embedCode) {
    return null;
  }

  if (embed.embedCode.indexOf('/kundenservice.ringieraxelspringer.ch') !== -1) {
    return <EmbedContactForm code={replaceScriptTags(embed.embedCode)} />;
  }
  return (
    <EmbedDefault
      code={replaceScriptTags(embed.embedCode)}
      autoAdjustHeight={embed.autoAdjustHeight}
      origin={origin}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      embedWidth={embed.embedWidth}
    />
  );
};

export default ({
  styles: appStyles,
  EmbedConsentBlock,
}: EmbedParagraphFactoryOptions) => {
  const EmbedParagraph = (props: EmbedParagraphPropsInner) => {
    const { embedParagraph, origin } = props;
    const mutationObserverRef = useRef<MutationObserver>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>(null);
    const navigate = useStableNavigate();

    const getStyles = (): EmbedParagraphFactoryOptionsStyles => {
      const styles: EmbedParagraphFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    const { setRef, isInView, ref }: UseInViewResponse = useInView({
      rootMargin: '500px',
      triggerOnce: true,
    });
    const styles: EmbedParagraphFactoryOptionsStyles = getStyles();
    const { isSSR } = useSSRContext();

    const consent = checkConsentInCookie();
    const [hasConsent, setConsent] = useState(consent);

    const handelUpdateOneTrustEvent = useCallback((): void => {
      if (embedParagraph.disableCookieConsent) {
        return;
      }

      const updatedConsent = checkConsentInCookie();

      if (updatedConsent !== hasConsent) {
        setConsent(updatedConsent);
        setConsentOnLocalStorage(updatedConsent);
      }
    }, [embedParagraph.disableCookieConsent, hasConsent]);

    const unRegisterOneTrustEvent = useCallback((): void => {
      window.removeEventListener(
        'OneTrustGroupsUpdated',
        handelUpdateOneTrustEvent,
      );
    }, [handelUpdateOneTrustEvent]);

    const updateOnOneTrustEvent = useCallback((): void => {
      window.addEventListener(
        'OneTrustGroupsUpdated',
        handelUpdateOneTrustEvent,
      );
    }, [handelUpdateOneTrustEvent]);

    useEffect(() => {
      updateOnOneTrustEvent();
      return () => {
        unRegisterOneTrustEvent();
      };
    }, [unRegisterOneTrustEvent, updateOnOneTrustEvent]);

    /******* START:impression/click tracking *****/
    const getImpressionTrackingElements = useCallback(():
      | NodeListOf<Element>
      | undefined[] => {
      return ref?.querySelectorAll('.gtm-impression') || [];
    }, [ref]);

    const getClickTrackingElements = useCallback(():
      | NodeListOf<Element>
      | undefined[] => {
      return ref?.querySelectorAll('.gtm-click') || [];
    }, [ref]);

    const intersectionObserveCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      if (!entries || entries.length === 0) {
        return null;
      }

      if (entries[0].isIntersecting) {
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'integration_impression',
            track_element: entries[0].target,
          },
        });
        // the unobserve is necessary so that we only track the first time the element is in view
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        intersectionObserverRef.current.unobserve(entries[0]?.target);
      }
    };

    const trackingClickHandler = useCallback(
      (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        tealiumTrackEvent({
          type: 'link',
          payload: {
            event_name: 'integration_click',
            track_element: event.target,
          },
        });
        handleWysiwygLink(event, navigate);
      },
      [navigate],
    );

    const handleTrackingElement = useCallback(
      (element: HTMLAnchorElement) => {
        if (element.classList.contains('gtm-impression')) {
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          intersectionObserverRef.current.observe(element);
        } else if (element.classList.contains('gtm-click')) {
          element.removeEventListener('click', trackingClickHandler);
          element.addEventListener('click', trackingClickHandler);
        } else {
          return null;
        }
      },
      [trackingClickHandler],
    );

    const handleMutation = useCallback((): void => {
      if (!ref) {
        return;
      }

      // trigger mutation observer only once
      if (mutationObserverRef?.current) {
        mutationObserverRef.current.disconnect();
      }

      const clickTrackingElements = getClickTrackingElements();
      const impressionTrackingElements = getImpressionTrackingElements();
      if (
        clickTrackingElements?.length > 0 ||
        impressionTrackingElements?.length > 0
      ) {
        const allTrackingElements = [
          ...clickTrackingElements,
          ...impressionTrackingElements,
        ];
        allTrackingElements.forEach((element: HTMLAnchorElement) => {
          handleTrackingElement(element);
        });
      }
    }, [
      ref,
      getClickTrackingElements,
      getImpressionTrackingElements,
      handleTrackingElement,
    ]);

    const registerIntersectionObserver = useCallback((): void => {
      if (!ref || intersectionObserverRef.current) {
        return;
      }

      // create an intersection observer instance
      /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
      intersectionObserverRef.current = new IntersectionObserver(
        intersectionObserveCallback,
        { rootMargin: '0px', threshold: 0.8 },
      );
    }, [ref]);

    const registerMutationObserver = useCallback((): void => {
      if (!ref || mutationObserverRef?.current) {
        return;
      }
      /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
      mutationObserverRef.current = new MutationObserver(
        (mutations: Array<any>): void => {
          mutations.forEach((mutation: MutationRecord): void => {
            if (mutation?.addedNodes.length > 0) {
              handleMutation();
            }
          });
        },
      );

      const config = {
        subtree: true,
        attributes: true,
        childList: true,
      };
      mutationObserverRef.current.observe(ref, config);
    }, [ref, handleMutation]);

    useEffect(() => {
      // order matters here first register the intersection observer then the mutation observer
      registerIntersectionObserver();
      registerMutationObserver();

      return () => {
        if (intersectionObserverRef?.current) {
          intersectionObserverRef.current.disconnect();
        }

        if (mutationObserverRef?.current) {
          mutationObserverRef.current.disconnect();
        }
      };
    }, [registerMutationObserver, registerIntersectionObserver]);

    /******* END:impression/click tracking *****/

    if (!embedParagraph || !embedParagraph.embedCode) {
      return null;
    }

    // never render Embed's on SSR!
    // but render a div with the class embedded-paragraph on SSR for the right dimension of the EmbedParagraph
    return isSSR ? (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_EMBED_PARAGRAPH,
          styles.Wrapper,
        )}
      />
    ) : (
      (!embedParagraph.disableCookieConsent &&
        !hasConsent &&
        !document.location.search.includes('rasch_disable_cmp') && (
          <EmbedConsentBlock />
        )) || (
        <div
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_EMBED_PARAGRAPH,
            styles.Wrapper,
          )}
          data-testid="embed-paragraph-factory-wrapper"
          /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
          ref={setRef}
        >
          {embedParagraph.header && (
            <div
              data-testid="embed-paragraph-factory-header"
              className={styles.TitleWrapper}
            >
              <h5 className={styles.Title}>{embedParagraph.header}</h5>
            </div>
          )}
          {embedParagraph.disableLazyloading
            ? getEmbed(embedParagraph, origin)
            : (isInView && getEmbed(embedParagraph, origin)) || null}
        </div>
      )
    );
  };

  return EmbedParagraph;
};
