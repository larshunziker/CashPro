import { Component } from 'react';
import { connect } from 'react-redux';
import { removeEmptyKeysFromObject } from '../../../shared/helpers/objectUtils';
import { log } from '../../../shared/helpers/utils';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { viewportLabelSelector } from '../../../shared/selectors/windowStateSelector';
import { getAdmeiraNativeWebapp } from '../../../shared/helpers/ads';
import {
  ADMEIRA_PLATFORM_MOBILE,
  AD_FREE_SUBSCRIPTION_KEY,
  APP_NEXUS_CLASS_PREFIX,
} from '../../../shared/constants/ads';
import {
  BRANCH_CONTENT_TYPE,
  CHANNEL_CONTENT_TYPE,
  DOSSIER_CONTENT_TYPE,
  KEYWORD_CONTENT_TYPE,
  KEYWORD_SETTINGS_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  ORGANIZATION_CONTENT_TYPE,
  PAGE_CONTENT_TYPE,
  PERSON_CONTENT_TYPE,
  RANKING_CONTENT_TYPE,
  SPONSOR_CONTENT_TYPE,
} from '../../../shared/constants/content';
import { RC_EMAIL } from '../Auth0Provider/constants';
import { AppNexusProviderFactoryOptions } from './typings';

export type AppNexusProviderFactoryPropsInner = Pick<
  LocationState,
  'isRefetchingData'
> & {
  routePathname: string;
  viewportLabel: string;
  routeIsInitialPage: boolean;
  routeScreenReady: boolean;
  isHybridApp: boolean;
};

export default ({
  mapViewportToAdViewport,
}: AppNexusProviderFactoryOptions) => {
  class AppNexusProviderFactory extends Component<
    AppNexusProviderFactoryPropsInner,
    any
  > {
    initAppNexus = () => {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      const channel = global?.Ads?.config?.channel || 'Ros';
      const platform = mapViewportToAdViewport(
        this.props.viewportLabel as ViewportLabel,
      );
      let publication = __APP_NAME__;
      const isHybridApp = this.props.isHybridApp;
      const nativeWebapp = getAdmeiraNativeWebapp(platform, isHybridApp);
      const targeting: Record<string, any> = removeEmptyKeysFromObject(
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global?.Ads?.config?.targeting || {},
        true,
      );

      log(
        'appnexus-provider',
        [
          'init tag manager with config:',
          '- platform: ' + platform,
          '- channel: ' + channel,
        ],
        'green',
      );
      if (targeting && targeting.keywords) {
        const keywords = Object.keys(targeting.keywords).map(function (index) {
          return targeting.keywords[index];
        });
        targeting.keywords = keywords;
      }

      if (targeting && targeting.publication) {
        publication = targeting.publication;
      }

      // force ads for tests
      if (document.cookie && document.cookie.indexOf('RASCHFORCEADS') > -1) {
        targeting.admforce = 'qa';
      }

      const rc_email = localStorage.getItem(RC_EMAIL);

      let oneId = '';

      if (rc_email) {
        try {
          const parsed = JSON.parse(rc_email);

          if (typeof parsed === 'string') {
            oneId = parsed;
          } else if (parsed && typeof parsed === 'object') {
            oneId = parsed.oneId?.oneId || parsed.oneId || '';
          }
        } catch {
          oneId = rc_email;
        }
      }

      try {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.admTagMan.q.push(() => {
          // appNexus init with current platform (Desktop/MobileWeb)
          // and channel: (channel/vertical/subVertical/section) such as /arbeit, /people, /unternehmen...
          // channel in targeting is used for the publication targeting on admeira jira/../AD-7
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.admTagMan.init({
            platform,
            channel,
            ...(oneId ? { oneId } : {}),
            targeting: {
              ...targeting,
              pagetype: this.getPageType(targeting.articletype),
              channel: publication,
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              olid: global?.olid,
              ...(nativeWebapp ? { native_webapp: nativeWebapp } : {}),
            },
          });
        });

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        if (nativeWebapp) {
          global.Ads.config.native_webapp = nativeWebapp;
        }
      } catch (error) {}
    };
    /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
    getPageType(type) {
      switch (type) {
        case LANDING_PAGE_CONTENT_TYPE:
        case DOSSIER_CONTENT_TYPE:
        case SPONSOR_CONTENT_TYPE:
        case KEYWORD_CONTENT_TYPE:
        case CHANNEL_CONTENT_TYPE:
        case BRANCH_CONTENT_TYPE:
        case KEYWORD_SETTINGS_CONTENT_TYPE:
        case ORGANIZATION_CONTENT_TYPE:
        case PAGE_CONTENT_TYPE:
        case PERSON_CONTENT_TYPE:
        case RANKING_CONTENT_TYPE:
          return 'overview';
        case 'NotFound':
          return 'notfound';
        default:
          return 'article';
      }
    }

    loadSlots = () => {
      log('appnexus-provider', 'loadSlots', 'green');
      try {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.Ads.tracking.callLoadSlot = Date.now();
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.admTagMan.q.push(() => {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.admTagMan.loadSlots();
        });
      } catch (error) {}
    };

    getSlots = () => {
      const platform = mapViewportToAdViewport(
        this.props.viewportLabel as ViewportLabel,
      );
      const slots = [...document.querySelectorAll('.ad-wrapper')];
      const deviceType =
        platform === ADMEIRA_PLATFORM_MOBILE ? 'mobile' : 'tabletDesktop';
      const filteredSlots = slots.filter((element) =>
        element.className.includes('ad-wrapper-' + deviceType),
      );

      /* @ts-ignore TODO: TS2322 ->  Type '({ excludeSizes */
      const slotsToRegister: AppNexusSlot[] = filteredSlots.map((elem) => {
        const slot = elem.querySelector('[data-slot-name]');

        if (!slot) {
          return null;
        }

        const slotName = slot?.getAttribute('data-slot-name');
        const slotId = slot?.id;
        const excludeSizes = slot?.getAttribute('data-slot-exclude-sizes');
        const targeting = JSON.parse(
          JSON.stringify(slot?.getAttribute('data-ad-tracking') || ''),
        );

        return {
          excludeSizes,
          targeting,
          deviceType,
          slot: slotName,
          container: slotId,
        };
      });

      if (Array.isArray(slotsToRegister) && slotsToRegister.length <= 0) {
        return;
      }

      // add WelcomeAd
      slotsToRegister.unshift({
        slot: 'top_special_1',
        container: 'top_special_1',
        deviceType,
      });

      return slotsToRegister;
    };

    registerSlots = () => {
      const slotsForRegistration = this.getSlots();

      if (!slotsForRegistration || slotsForRegistration.length <= 0) {
        return;
      }

      slotsForRegistration.forEach((item) => {
        if (!item) {
          return;
        }

        try {
          // appNexus function to push our slots
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.admTagMan.q.push(() => {
            // push slots to appNexus so they know what slot is in which container
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.admTagMan.registerSlot(item);
          });
        } catch (error) {}
      });

      log(
        'appnexus-provider',
        ['register slots', JSON.stringify(slotsForRegistration, null, 2)],
        'green',
      );
    };

    cleanUpSlots = () => {
      log('appnexus-provider', 'cleanUpSlots', 'green');

      // appNexus clean up divs
      const slots: any = Array.from(
        document.querySelectorAll(`[id^="${APP_NEXUS_CLASS_PREFIX}"]`),
      );

      slots.length > 0 &&
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        slots.map((item) => {
          if (item) {
            item.innerHTML = '';
            item.classList.remove('adm-loaded');
          }
        });
    };

    componentDidMount = () => {
      log('appnexus-provider', 'component did mount', 'green');
    };

    componentDidUpdate = () => {
      log('appnexus-provider', 'component did update', 'green');
      this.cleanUpSlots();
      this.initAppNexus();
      setTimeout(() => {
        if (
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.Ads?.config?.[AD_FREE_SUBSCRIPTION_KEY] &&
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          !global.Ads?.config?.isAdSuppressed
        ) {
          this.registerSlots();
          this.loadSlots();
        }
      }, 0);
    };

    componentWillUnmount = () => {
      log('appnexus-provider', 'component will unmount', 'green');
    };

    shouldComponentUpdate = (nextProps: AppNexusProviderFactoryPropsInner) => {
      log(
        'appnexus-provider',
        ['in should update', this.props, nextProps],
        'green',
      );

      // this update policy is needed to load all slots after user navigate
      // from a LP to LP or Article to Article because it does not unmount the component
      if (
        !nextProps.routeIsInitialPage &&
        !this.props.routeScreenReady &&
        nextProps.routeScreenReady &&
        this.props.routePathname === nextProps.routePathname
      ) {
        log('appnexus-provider', 'detected a route change', 'orange');
        return true;
      }

      const currentAdViewport = mapViewportToAdViewport(
        this.props.viewportLabel as ViewportLabel,
      );
      const nextAdViewport = mapViewportToAdViewport(
        nextProps.viewportLabel as ViewportLabel,
      );
      if (
        !this.props.routeIsInitialPage &&
        currentAdViewport !== nextAdViewport
      ) {
        log(
          'appnexus-provider',
          'should update because of ad viewport changed',
          'orange',
        );
        return true;
      }

      if (!this.props.routeScreenReady && nextProps.routeScreenReady) {
        log(
          'appnexus-provider',
          'should update because screenReady was set to true',
          'orange',
        );
        return true;
      }

      if (this.props.isRefetchingData && !nextProps.isRefetchingData) {
        log(
          'appnexus-provider',
          'should update because isRefetchingData was set to true',
          'orange',
        );
        return true;
      }

      log('appnexus-provider', 'update denied - global', 'green');
      return false;
    };

    render(): null {
      return null;
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isHybridApp: locationStateSelector(state).isHybridApp || false,
    isRefetchingData: locationStateSelector(state).isRefetchingData,
    routeScreenReady: locationStateSelector(state).screenReady,
    routeIsInitialPage: locationStateSelector(state).isInitialPage,
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
    viewportLabel: viewportLabelSelector(state),
  });

  return connect(mapStateToProps)(AppNexusProviderFactory);
};
