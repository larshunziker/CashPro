import React, { MouseEvent, memo } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { getRCTrackingSource } from '../../../../../../../shared/helpers/getRCTrackingSource';
import {
  DEVICE_TYPE_ANDROID,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import isStyleDesignByChannel from '../../../../../../shared/helpers/isStyleDesignByChannel';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Img from '../../../Img';
import Logo from '../../../Logo';
import Navigation from '../../../Navigation';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import SVGIcon from '../../../SVGIcon';
import UtilityBar from '../../../UtilityBar';
import UtilityOverlay from '../../../UtilityBar/components/UtilityOverlay';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { AUTH0_LOGIN_CASE_GENERAL } from '../../../../../../../common/components/Auth0Provider/constants';
import {
  UTILITY_BAR_ORIGIN_HEADER,
  UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
} from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import {
  ADVERTISING_TYPE_LONGFORM,
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  PUBLICATION_SI,
  PUBLICATION_SY,
} from '../../../../../../../shared/constants/publications';
import { SVG_ICONS_TYPE_ARROW_BACK } from '../../../../../../../shared/constants/svgIcons';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../../../shared/constants/tracking';
import {
  MAIN_CHANNEL_BLOGS,
  MAIN_CHANNEL_SPECIALS,
  ROUTE_BLOGS,
  ROUTE_HOROSCOPE,
  ROUTE_PUZZLES,
  ROUTE_VIDEOS,
} from '../../../../../App/constants';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_CONFIG_NATIVE_ADVERTISING,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../screens/ArticlePage/constants';
import {
  UTILITYBAR_CONFIG_IMAGE_GALLERY,
  UTILITYBAR_OVERLAY_CONFIG_IMAGE_GALLERY,
} from '../../../../screens/ImageGalleryArticle/constants';
import {
  TYPE_NAVIGATION_MENU_DEFAULT,
  TYPE_NAVIGATION_MENU_USER,
} from '../../../Navigation/constants';
import {
  SVG_ICONS_TYPE_HAMBURGER,
  SVG_ICONS_TYPE_USER,
  SVG_ICONS_TYPE_USER_ACTIVE,
} from '../../../SVGIcon/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import puzzlesLogo from '../../../../assets/graphics/puzzles/puzzles-logo.svg';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { HeaderInnerProps } from './typings';

type HeaderInnerPropsInner = HeaderInnerProps & {
  routePathname: string;
  visibleNavigation: string;
  isAuthenticated: boolean;
  setNavigationVisible: (item: string) => void;
  activeMainChannel: ActiveMainChannel;
  activeContentType: string;
  pageMetadata: PianoPageMetadata;
};

export const MIN_AD_HEIGHT = 50; // min height of a real ad (other height changes are ignored)

/* @ts-ignore TODO: TS7031 ->  Binding element 'activeMainChannel' implicitly has an 'any' type. */
const PublicationLogo = ({ activeMainChannel }) => (
  <div className={styles.LogoWrapper}>
    <Logo
      publication={
        (isStyleDesignByChannel(activeMainChannel) && PUBLICATION_SY) ||
        PUBLICATION_SI
      }
    />
  </div>
);

const PublicationPuzzlesLogo = () => (
  <Img addClass={styles.LogoWrapper} alt="Rätsel" url={puzzlesLogo} />
);

const HeaderInner = ({
  setNavigationVisible,
  isCollapsed,
  hasStickiness = true,
  visibleNavigation,
  activeMainChannel,
  activeContentType,
  routePathname,
  isVisible,
  isAuthenticated,
  pageMetadata,
  isMarketingPageReducedHeader,
  isPuzzlePage,
  subtypeValue,
}: HeaderInnerPropsInner) => {
  const { isSSR } = useSSRContext();
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  let showBorder = false;

  let enabledUtilities = UTILITYBAR_CONFIG_ARTICLE;
  let enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_ARTICLE;

  if (activeContentType === NATIVE_ADVERTISING_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_NATIVE_ADVERTISING;
  }
  if (activeContentType === IMAGE_GALLERY_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_IMAGE_GALLERY;
    enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_IMAGE_GALLERY;
  }

  const isLandingPageWithBreadcrumbs =
    routePathname === `/${ROUTE_VIDEOS}` ||
    routePathname === `/${ROUTE_BLOGS}` ||
    routePathname === `/${ROUTE_HOROSCOPE}` ||
    activeMainChannel === MAIN_CHANNEL_SPECIALS ||
    activeMainChannel === MAIN_CHANNEL_BLOGS;

  if (
    activeContentType === LANDING_PAGE_CONTENT_TYPE &&
    !isLandingPageWithBreadcrumbs
  ) {
    if (isCollapsed) {
      showBorder = true;
    }
  } else {
    showBorder = true;
  }

  let isSocialBarVisible = [
    ARTICLE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    IMAGE_GALLERY_CONTENT_TYPE,
  ].includes(activeContentType);

  if (subtypeValue === ADVERTISING_TYPE_LONGFORM) {
    isSocialBarVisible = false;
  }

  const isPWABackButtonShown =
    (!isSSR &&
      !__TESTING__ &&
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
      (global?.navigator?.['standalone'] ||
        window.matchMedia('(display-mode: standalone)').matches) &&
      getMobileOperatingSystem() !== DEVICE_TYPE_ANDROID &&
      window.location.pathname !== '/') ||
    false;

  const navigateBack = () => {
    if (!isSSR) {
      if (global?.history?.state) {
        global.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

  routePathname === '/' && (pageMetadata.section = 'HOME');
  const source = getRCTrackingSource('direct', pageMetadata);

  return (
    <>
      <div
        className={classNames(
          TRACKING_CLASS_SITE_HEADER,
          getThemedClass('Wrapper'),
          {
            [styles.WrapperCollapsed]:
              !hasStickiness || isCollapsed || isMarketingPageReducedHeader,
            [styles.Fixed]: isCollapsed || isMarketingPageReducedHeader,
            [styles.WrapperBorder]: hasStickiness && (showBorder || !isVisible),
            [styles.MarketingPage]: isMarketingPageReducedHeader,
            [grid.GridCentered]: isMarketingPageReducedHeader,
          },
        )}
      >
        <div
          className={classNames(
            'container-wrapper',
            grid.Container,
            styles.ContainerWrapper,
          )}
        >
          <div className={helpers.PullOutSm}>
            <div
              className={classNames(getThemedClass('Header'), {
                [styles.MarketingPage]: isMarketingPageReducedHeader,
              })}
              data-testid="header-container"
            >
              {isPWABackButtonShown && (
                <div
                  key={`back-button-${activeMainChannel}`}
                  className={styles.BackButtonWrapper}
                  data-testid="header-back-button-wrapper"
                >
                  <button
                    className={classNames(
                      styles.MenuButton,
                      styles.Icon,
                      styles.BackButton,
                      grid.HideForPrint,
                    )}
                    onClick={() => navigateBack()}
                    aria-label="Zurück"
                  >
                    <SVGIcon type={SVG_ICONS_TYPE_ARROW_BACK} />
                  </button>
                </div>
              )}

              <div
                key={`header-logo-${activeMainChannel}`}
                className={classNames(getThemedClass('Logo'), {
                  [grid.HiddenMdDown]: isPWABackButtonShown,
                  [styles.MarketingPage]: isMarketingPageReducedHeader,
                })}
                data-testid="header-logo-wrapper"
              >
                {!isPuzzlePage ? (
                  <RefetchGqlDataLink path={'/'}>
                    <PublicationLogo activeMainChannel={activeMainChannel} />
                  </RefetchGqlDataLink>
                ) : (
                  <RefetchGqlDataLink path={`/${ROUTE_PUZZLES}`}>
                    <PublicationPuzzlesLogo />
                  </RefetchGqlDataLink>
                )}
              </div>

              {!isMarketingPageReducedHeader && (
                <>
                  <div
                    className={classNames(
                      getThemedClass('Navigation'),
                      grid.HiddenSmDown,
                    )}
                  >
                    <Navigation
                      isPuzzlePage={isPuzzlePage}
                      hasStickiness={hasStickiness}
                    />
                  </div>

                  <div className={getThemedClass('Icons')}>
                    {(!isSSR && isAuthenticated && (
                      <div
                        className={classNames(
                          'header-icon-profil',
                          styles.Icon,
                          styles.Link,
                          grid.HideForPrint,
                        )}
                        onClick={(event: MouseEvent) => {
                          event.preventDefault();
                          return setNavigationVisible(
                            TYPE_NAVIGATION_MENU_USER,
                          );
                        }}
                        role="link"
                        tabIndex={0}
                        onKeyDown={() => null}
                      >
                        <SVGIcon type={SVG_ICONS_TYPE_USER_ACTIVE} />
                        <span className={styles.IconText}>Profil</span>
                      </div>
                    )) || (
                      <div
                        className={classNames(
                          'header-icon-login',
                          styles.Icon,
                          styles.Link,
                          grid.HideForPrint,
                        )}
                        onClick={() =>
                          Auth0.login(AUTH0_LOGIN_CASE_GENERAL, source)
                        }
                        role="link"
                        tabIndex={0}
                        onKeyDown={() => null}
                      >
                        <SVGIcon type={SVG_ICONS_TYPE_USER} />
                        <span className={styles.IconText}>Login</span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setNavigationVisible(TYPE_NAVIGATION_MENU_DEFAULT);
                      }}
                      className={classNames(
                        'track-menu',
                        styles.Link,
                        styles.MenuButton,
                        styles.Icon,
                        grid.HideForPrint,
                      )}
                      data-track-action="open"
                      data-track-element="menu"
                      aria-label={
                        visibleNavigation === TYPE_NAVIGATION_MENU_DEFAULT
                          ? 'Menu schließen'
                          : 'Menu öffnen'
                      }
                    >
                      <SVGIcon type={SVG_ICONS_TYPE_HAMBURGER} />
                      <span className={styles.IconText}>Menu</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* isSocialBarVisible prevents the UtilityBar to be rendered on the LandingPage content type (fix for SI-1015) */}
      {!__TESTING__ && isSocialBarVisible && (
        <div
          className={classNames(
            'utility-bar-wrapper',
            styles.UtilityBarWrapper,
            {
              [styles.UtilityBarWrapperMove]:
                isSocialBarVisible && isCollapsed && !isVisible,
            },
          )}
        >
          <div className={grid.Container}>
            <UtilityBar
              enabledUtilities={enabledUtilities}
              origin={UTILITY_BAR_ORIGIN_HEADER}
            >
              {({ isOverlayVisible, toggleOverlayVisible }) => (
                <UtilityOverlay
                  isScrolledToCollapse={isCollapsed && !isVisible}
                  overlayTitle="Artikel teilen"
                  isOverlayVisible={isOverlayVisible}
                  toggleOverlayVisible={toggleOverlayVisible}
                  enabledUtilities={enabledOverlayUtilities}
                  origin={UTILITY_BAR_OVERLAY_ORIGIN_HEADER}
                />
              )}
            </UtilityBar>
          </div>
        </div>
      )}
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
  isAuthenticated: authStateSelector(state).isAuthenticated,
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
  activeContentType: settingsStateSelector(state).activeContentType,
  pageMetadata: pianoStateSelector(state).pageMetadata,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  memo(HeaderInner),
);
