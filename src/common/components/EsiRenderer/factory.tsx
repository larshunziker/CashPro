import React, { Component, ContextType, createRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { compose } from 'redux';
import handleWysiwygLink from '../../../shared/helpers/handleWysiwygLink';
import { getServiceUrl } from '../../../shared/helpers/serviceUrl';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { hashString } from '../../../shared/helpers/utils';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import withNavigate from '../../../shared/decorators/withNavigate';
import EsiContext from './context';
import { displayErrorToast } from '../../../cash/screens/App/components/Toast';
import { EsiRendererProps } from './typings';

type EsiRendererPropsInner = EsiRendererProps &
  Pick<LocationState, 'isInitialPage'> &
  Pick<AuthState, 'subscriptions'> &
  Pick<LocationState, 'isHybridApp'>;

type EsiRendererState = {
  clientSideFetchedEsiTag: string;
};

const esiRendererFactory = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'ClientSideESI' implicitly has an 'any' type. */
  ClientSideESI,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'EsiSkeleton' implicitly has an 'any' type. */
  EsiSkeleton,
  errorMsg = '',
  suppressedOnHybridApp = [],
}) => {
  class EsiRenderer extends Component<EsiRendererPropsInner, EsiRendererState> {
    mutationObserver: MutationObserver;
    intersectionObserver: IntersectionObserver;
    wrapperElement: RefObject;
    static contextType = EsiContext;

    constructor(props: EsiRendererPropsInner) {
      super(props);
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutationObserver'. */
      this.mutationObserver = null;
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'IntersectionObserver'. */
      this.intersectionObserver = null;
      this.wrapperElement = createRef();

      this.state = {
        clientSideFetchedEsiTag: '',
      };
    }

    getRaschLinkElements = () =>
      this?.wrapperElement?.current?.querySelectorAll(`.rasch-link`) || [];
    getImpressionTrackingElements = () =>
      this?.wrapperElement?.current?.querySelectorAll(
        `.${this.props.publication || ''}-gtm-impression`,
      ) || [];
    getClickTrackingElements = () =>
      this?.wrapperElement?.current?.querySelectorAll(
        `.${this.props.publication || ''}-gtm-click`,
      ) || [];

    intertsectionObserveCallback = (entries: IntersectionObserverEntry[]) => {
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
        this.intersectionObserver.unobserve(entries[0]?.target);
      }
    };

    raschLinkClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      // @ts-ignore
      handleWysiwygLink(event, this.props.navigate);
    };

    trackingClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'integration_click',
          track_element: event.target,
        },
      });
      // @ts-ignore
      handleWysiwygLink(event, this.props.navigate);
    };

    handleTrackingElement = (element: HTMLElement) => {
      if (element.classList.contains('cash-gtm-impression')) {
        this.intersectionObserver.observe(element);
      } else if (element.classList.contains('cash-gtm-click')) {
        element.removeEventListener('click', this.trackingClickHandler);
        element.addEventListener('click', this.trackingClickHandler);
      } else {
        return null;
      }
    };

    removeListeners() {
      const raschLinkElements = this.getRaschLinkElements();
      const impressionTrackingElements = this.getImpressionTrackingElements();
      const clickTrackingElements = this.getClickTrackingElements();

      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }

      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
      }

      [...raschLinkElements].forEach((element: HTMLElement) => {
        element.removeEventListener('click', this.raschLinkClickHandler);
      });

      [...impressionTrackingElements, ...clickTrackingElements].forEach(
        (element: HTMLElement) => {
          element.removeEventListener('click', this.trackingClickHandler);
        },
      );
    }

    handleMutation() {
      if (!this.wrapperElement || !this.wrapperElement.current) {
        return;
      }

      // trigger mutation observer only once
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }

      const raschLinkElements = this.getRaschLinkElements();
      const clickTrackingElements = this.getClickTrackingElements();
      const impressionTrackingElements = this.getImpressionTrackingElements();

      const clickReloadWidget = this.wrapperElement.current.querySelectorAll(
        `.reload-esi-widget-button-click`,
      );

      /* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
      clickReloadWidget.forEach((element) => {
        element.onclick = () => this.fetchData(true);
      });

      if (clickTrackingElements || impressionTrackingElements) {
        const allTrackingElements = [
          ...clickTrackingElements,
          ...impressionTrackingElements,
        ];

        // handle in app navigation on .rasch-link elements
        raschLinkElements &&
          Array.from(raschLinkElements) &&
          raschLinkElements.length > 0 &&
          raschLinkElements.forEach((element: HTMLElement) => {
            if (
              !element.classList.contains(
                `.${this.props.publication || ''}-gtm-click`,
              )
            ) {
              element.removeEventListener('click', this.raschLinkClickHandler);
              element.addEventListener('click', this.raschLinkClickHandler);
            }
          });

        allTrackingElements.forEach((element) => {
          this.handleTrackingElement(element);
        });
      }
    }

    safeRegisterObserver() {
      const isIntersectionObserverSupported = 'IntersectionObserver' in global;
      if (!isIntersectionObserverSupported) {
        return;
      }

      // order matters here first register the intersection observer then the mutation observer
      this.registerIntersectionObserver();
      this.registerMutationObserver();
    }

    registerIntersectionObserver() {
      if (!this.wrapperElement.current || this.intersectionObserver) {
        return;
      }

      // create an intersection observer instance
      this.intersectionObserver = new IntersectionObserver(
        this.intertsectionObserveCallback,
        { rootMargin: '0px', threshold: 0.8 },
      );
    }

    registerMutationObserver() {
      if (!this.wrapperElement.current || this.mutationObserver) {
        return;
      }

      // call the mutation observer on initial page load when server and client hydration are the same
      // there is no mutation happening on the div thats why need to call the mutation observer
      if (
        this.wrapperElement.current.querySelectorAll('.esi_server')?.[0]
          ?.children.length > 0
      ) {
        this.handleMutation();
      }

      // create an mutation observer instance
      this.mutationObserver = new MutationObserver(
        (mutations: Array<any>): void => {
          mutations.forEach((mutation: MutationRecord): void => {
            if (mutation?.addedNodes.length > 0) {
              this.handleMutation();
            }
          });
        },
      );

      // configuration of the observer:
      const config = {
        subtree: true,
        attributes: true,
        childList: true,
      };

      // pass in the target node, as well as the observer options
      this.mutationObserver.observe(this.wrapperElement.current, config);
    }

    fetchData = (forceReload = false) => {
      if (
        forceReload ||
        !this.props.isInitialPage ||
        this.props.clientOnly ||
        __DEVELOPMENT__
      ) {
        fetch(getServiceUrl(this.props.esiSrc), {
          credentials: 'include',
        })
          .then((res) => {
            if (res.status > 399) {
              throw new Error(`Status code ${res.status}`);
            }
            return res;
          })
          .then((res) => res.text())
          .then((res) => {
            this.setState({ clientSideFetchedEsiTag: res });
          })
          .catch((err) => {
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            if (global.__ESI_ERROR_OCCURRED__ !== 'showOnce') {
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              global.__ESI_ERROR_OCCURRED__ = 'esiWidgetError';
              this.showErrorToast();
            }
            const logEsiError = document.createElement('script');
            logEsiError.innerHTML = `console.error('EsiWidgetError ${err}: esiSrc=${this.props.esiSrc}');`;
            document.body.appendChild(logEsiError);
            this.setState({
              clientSideFetchedEsiTag: `${
                !__TESTING__ && ReactDOMServer.renderToString(<EsiSkeleton />)
              }`,
            });
          });
      }
    };

    componentDidMount(): void {
      this.safeRegisterObserver();
      this.fetchData();
      this.showErrorToast();
    }

    componentWillUnmount() {
      this.removeListeners();
    }

    //This function takes the innerHtml from the server side render Esi widget
    // to stop the client from refetching the same data
    componentIsPrefilled = (): string => {
      const esiPrerender = document.getElementsByClassName(
        String(hashString(this.props.esiSrc)),
      );
      if (esiPrerender && esiPrerender.length) {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        return esiPrerender?.[0]?.firstElementChild?.innerHTML;
      }
      return '';
    };

    showErrorToast = () => {
      // Serverside toast works only if akamai is setup. Not on nginx or localhost.
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      if (global.__ESI_ERROR_OCCURRED__ === 'esiWidgetError') {
        displayErrorToast(errorMsg, 'esi-widget-error');
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.__ESI_ERROR_OCCURRED__ = 'showOnce';
      }
    };

    getEsiTag = (): string => {
      // CDN Timeout is 31 seconds
      const { timeout = 32000 } = this.context as ContextType<
        typeof EsiContext
      >;
      if (__SERVER__ || __TESTING__) {
        return `<esi:try>
                <esi:attempt>
                  <esi:include src="${getServiceUrl(
                    this.props.esiSrc,
                  )}" maxwait="${timeout}"></esi:include>
                </esi:attempt>
                <esi:except>
                  ${
                    !__TESTING__ &&
                    ReactDOMServer.renderToString(<EsiSkeleton />)
                  }
                  <div style="display: none">
                  <!--esi <esi_script>
                      if (window.__ESI_ERROR_OCCURRED__ !== 'showOnce') {
                        window.__ESI_ERROR_OCCURRED__ = 'showEsiError';
                      }
                      console.error('EsiWidgetError: esiSrc=${getServiceUrl(
                        this.props.esiSrc,
                      )}');
                    </esi_script> -->
                  </div>
                </esi:except>
              </esi:try>`;
      } else if (!this.props.clientOnly) {
        return this.componentIsPrefilled();
      }
      return '';
    };

    render() {
      const {
        esiSrc = '',
        clientOnly,
        subscriptions,
        isHybridApp,
      } = this.props;
      const { clientSideFetchedEsiTag } = this.state;

      const isSuppressedOnHybridpp = suppressedOnHybridApp.some((item) =>
        esiSrc.includes(item),
      );

      if (!esiSrc || (isSuppressedOnHybridpp && isHybridApp)) {
        return null;
      }

      const esiIncludeTag = this.getEsiTag();

      return (
        <div ref={this.wrapperElement} className={`${hashString(esiSrc)}`}>
          {/* handle SSR and hydration case */}

          {!clientSideFetchedEsiTag &&
            !clientOnly &&
            (!subscriptions || (subscriptions && subscriptions.length < 1)) && (
              <div
                className="esi_server"
                dangerouslySetInnerHTML={{ __html: esiIncludeTag }}
              />
            )}
          {(!clientSideFetchedEsiTag &&
            !clientOnly &&
            esiIncludeTag &&
            subscriptions &&
            subscriptions.length > 0 && (
              <ClientSideESI
                html={esiIncludeTag}
                esiSrc={getServiceUrl(this.props.esiSrc)}
                origin={this.props.origin}
                key={`client-side-esi-${esiIncludeTag}`}
              />
            )) ||
            null}
          {/* handle client side navigation */}
          {(clientSideFetchedEsiTag && (
            <ClientSideESI
              html={this.state.clientSideFetchedEsiTag}
              esiSrc={getServiceUrl(this.props.esiSrc)}
              origin={this.props.origin}
              key={`client-side-esi-${this.state.clientSideFetchedEsiTag}`}
            />
          )) ||
            null}
        </div>
      );
    }
  }
  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    subscriptions: authStateSelector(state).subscriptions,
    isInitialPage: locationStateSelector(state).isInitialPage,
    isHybridApp: locationStateSelector(state).isHybridApp,
  });
  return compose<any>(withNavigate, connect(mapStateToProps))(EsiRenderer);
};

export default esiRendererFactory;
