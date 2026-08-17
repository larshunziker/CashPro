import React, { memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import raf from 'raf';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import PrimaryMenu from './components/PrimaryMenu';
import SecondaryMenu from './components/SecondaryMenu';
import QuickAccessNavigation from './components/QuickAccessNavigation';
import styles from './styles.legacy.css';
import logo from 'graphics/logo.svg';
import { NavigationMenuProps } from './typings';

type NavigationMenuPropsInner = NavigationMenuProps & {
  locationStatePathname: string;
  setNavigationVisible: (visibleNavigation: string) => void;
  isAuthenticated: boolean;
  children: ReactNode;
  pageMetadata: PianoPageMetadata;
  setFocusSearchOnMount: (focusOnMount: boolean) => void;
};

const NavigationMenu = ({
  visibleNavigation,
  setNavigationVisible,
  navigationPrimaryMenu,
  navigationSecondaryMenu,
  navigationQuickAccessMenu,
  children,
  setFocusSearchOnMount,
}: NavigationMenuPropsInner) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeNavigation = useCallback(
    (event: KeyboardEvent) => {
      if (
        visibleNavigation === null ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.ctrlKey
      ) {
        return;
      }

      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      setNavigationVisible(null);
      setFocusSearchOnMount(false);
    },
    [setFocusSearchOnMount, setNavigationVisible, visibleNavigation],
  );

  const closeMenuHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event?.keyCode === 27) {
        closeNavigation(event);
      }
    },
    [closeNavigation],
  );

  const handleOutsideClick = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeNavigation(event);
      }
    },
    [closeNavigation],
  );

  useEffect(() => {
    global.addEventListener('keydown', closeMenuHandler);

    return () => {
      global.removeEventListener('keydown', closeMenuHandler);
    };
  }, [closeMenuHandler]);

  useEffect(() => {
    if (!visibleNavigation) {
      return;
    }

    raf(() => {
      window.addEventListener('click', handleOutsideClick);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    });
  }, [handleOutsideClick, visibleNavigation]);

  return (
    <div
      className={styles.NavigationMenuWrapper}
      data-testid="navigation-wrapper"
      ref={wrapperRef}
    >
      <div className={styles.NavigationHeader}>
        <RefetchGqlDataLink
          path="/"
          onClick={closeNavigation}
          className={styles.LogoWrapper}
        >
          <img className={styles.Logo} src={logo} alt="Beobachter" />
        </RefetchGqlDataLink>

        <button
          key={`user-close-button-${Math.random()}`}
          data-testid="navigation-close-button"
          onClick={() => {
            tealiumTrackEvent({
              type: 'link',
              payload: { event_name: 'menu_close' },
            });
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
            setNavigationVisible(null);
            setFocusSearchOnMount(false);
          }}
          className={styles.Icon}
        >
          <Icon type="IconXMark" />
        </button>
      </div>

      <div className={styles.Content}>
        {children}

        <TestFragment data-testid="navigation-menu-external-links">
          <QuickAccessNavigation menu={navigationQuickAccessMenu} />
        </TestFragment>

        <PrimaryMenu
          menu={navigationPrimaryMenu}
          closeNavigation={closeNavigation}
        />

        <SecondaryMenu
          menu={navigationSecondaryMenu}
          closeNavigation={closeNavigation}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  locationStatePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  isAuthenticated: authStateSelector(state).isAuthenticated,
  pageMetadata: pianoStateSelector(state).pageMetadata,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  memo(NavigationMenu, (props, nextProps) => {
    if (props.locationStatePathname !== nextProps.locationStatePathname) {
      // Always turn off navigation when this location changed.
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      props.setNavigationVisible(null);
      props.setFocusSearchOnMount(false);
    }

    if (nextProps.visibleNavigation === null) {
      return true;
    }

    return props.visibleNavigation !== nextProps.visibleNavigation;
  }),
);
