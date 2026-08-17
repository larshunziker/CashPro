import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import Link from '../../../../../common/components/Link';
import SVGIcon from '../SVGIcon';
import {
  closeChatbot,
  openChatbot,
  resetBottomBarIframeOffset,
} from './aiaibotActions';
import { useAiaibot } from '../AIAIProvider/useAiaibot';
import useScrollDirection from './useScrollDirection';
import useVirtualKeyboardVisible from './useVirtualKeyboardVisible';
import useBottomBarIframeOffsetSync from './useBottomBarIframeOffsetSync';
import useBottomBarActiveIndicator, {
  BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID,
} from './useBottomBarActiveIndicator';
import useBottomBarConfig from './useBottomBarConfig';
import { getActiveNavItemId, isNavItemActive } from './navState';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { BOTTOM_BAR_ACTIVE_CLASS, BOTTOM_BAR_HEIGHT_PX } from './constants';
import styles from './styles.legacy.css';

export const BOTTOM_BAR_ID = 'bottom-bar';
const CHATBOT_LOADING_TEST_ID = 'bottom-bar-chatbot-loading-spinner';

const BottomBarInner = (): ReactElement | null => {
  const { getAiaibot } = useAiaibot();
  const isAiaibotInitialized = useSelector(
    (state: ReduxState) => state.chatbot?.isAiaibotInitialized || false,
  );
  const { isBottomBarActive, isLandscapeOrientation, navItems } =
    useBottomBarConfig();

  const { pathname } = useLocation();
  const scrollDirection = useScrollDirection();
  const isVirtualKeyboardVisible = useVirtualKeyboardVisible();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);
  const [shouldOpenChatbotWhenReady, setShouldOpenChatbotWhenReady] =
    useState(false);

  const handleChatbotOpened = useCallback(() => {
    setIsChatbotOpen(true);
    setIsChatbotLoading(false);
    setShouldOpenChatbotWhenReady(false);
  }, []);
  // Hide bar on scroll down, in landscape, and while the virtual keyboard is visible.
  const isHidden =
    scrollDirection === 'down' ||
    isVirtualKeyboardVisible ||
    isLandscapeOrientation;

  const openBottomBarChatbot = useCallback(
    (aiaibot: NonNullable<ReturnType<typeof getAiaibot>>) => {
      openChatbot(aiaibot, {
        bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
        isHidden,
      });
      handleChatbotOpened();
    },
    [handleChatbotOpened, isHidden],
  );

  useEffect(() => {
    if (!isAiaibotInitialized || !shouldOpenChatbotWhenReady) {
      return;
    }

    const aiaibot = getAiaibot();
    if (!aiaibot) {
      return;
    }

    openBottomBarChatbot(aiaibot);
  }, [
    getAiaibot,
    isAiaibotInitialized,
    openBottomBarChatbot,
    shouldOpenChatbotWhenReady,
  ]);

  const handleTrackElement = useCallback((action: string) => {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'element_click',
        element_name: BOTTOM_BAR_ID,
        element_action: action,
        element_position: BOTTOM_BAR_ID,
      },
    });
  }, []);

  const handleChatbotClick = useCallback(() => {
    if (isChatbotLoading) {
      return;
    }

    const aiaibot = getAiaibot();
    if (!aiaibot || !isAiaibotInitialized) {
      setIsChatbotLoading(true);
      setShouldOpenChatbotWhenReady(true);
      return;
    }

    // Use aiaibot.state.open as the source of truth — handles cases where the
    // chatbot was opened by an external trigger (not the BottomBar button).
    if (!aiaibot.state?.open) {
      openBottomBarChatbot(aiaibot);
      return;
    }

    closeChatbot(aiaibot);
    setIsChatbotOpen(false);
  }, [
    getAiaibot,
    isAiaibotInitialized,
    isChatbotLoading,
    openBottomBarChatbot,
  ]);

  useBottomBarIframeOffsetSync({
    getAiaibot,
    isBottomBarActive,
    isHidden,
    bottomBarHeightPx: BOTTOM_BAR_HEIGHT_PX,
    isChatbotOpen,
    setIsChatbotOpen,
  });

  useEffect(() => {
    if (isBottomBarActive) {
      if (!isHidden) {
        document.body.classList.add(BOTTOM_BAR_ACTIVE_CLASS);
      } else {
        document.body.classList.remove(BOTTOM_BAR_ACTIVE_CLASS);
      }
      return () => {
        document.body.classList.remove(BOTTOM_BAR_ACTIVE_CLASS);
        const aiaibot = getAiaibot();
        if (aiaibot?.state?.open) {
          resetBottomBarIframeOffset(aiaibot);
        }
      };
    }
    document.body.classList.remove(BOTTOM_BAR_ACTIVE_CLASS);
  }, [getAiaibot, isBottomBarActive, isHidden]);

  const activeNavItemId = useMemo(
    () => (navItems ? getActiveNavItemId(navItems, pathname) : null),
    [navItems, pathname],
  );

  const { navRef, setNavItemRef, indicatorState } = useBottomBarActiveIndicator(
    {
      activeNavItemId,
      isIndicatorVisible: activeNavItemId !== null && !isChatbotOpen,
    },
  );

  if (!isBottomBarActive) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className={`${styles.BottomBar}${isHidden ? ` ${styles.Hidden}` : ''}`}
      aria-label="Bottom navigation"
      data-testid={BOTTOM_BAR_ID}
    >
      <span
        className={`${styles.ActiveIndicator}${indicatorState.isVisible ? ` ${styles.ActiveIndicatorVisible}` : ''}`}
        aria-hidden="true"
        data-testid={BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID}
        style={{ transform: `translateX(${indicatorState.translateX}px)` }}
      />
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul className={styles.NavList} role="list">
        {navItems?.map((item) => {
          const isActive =
            isNavItemActive(item, pathname, navItems) && !isChatbotOpen;

          if (item.isAction) {
            // Chatbot FAB — central action button
            return (
              <li
                key={item.id}
                className={`${styles.NavItem} ${styles.NavItemAction}`}
              >
                <button
                  type="button"
                  className={`${styles.ChatbotButton}${isChatbotOpen && isAiaibotInitialized ? ` ${styles.ChatbotButtonActive}` : ''}`}
                  aria-label={item.label}
                  aria-busy={isChatbotLoading}
                  disabled={isChatbotLoading}
                  onClick={() => {
                    handleChatbotClick();
                    handleTrackElement(item.label);
                  }}
                >
                  <span className={styles.ChatbotIcon}>
                    {isChatbotLoading ? (
                      <span
                        className={styles.ChatbotSpinner}
                        data-testid={CHATBOT_LOADING_TEST_ID}
                        aria-hidden="true"
                      />
                    ) : (
                      <SVGIcon type={item.iconType} aria-hidden="true" />
                    )}
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li
              key={item.id}
              ref={(element) => {
                setNavItemRef(item.id, element);
              }}
              className={styles.NavItem}
            >
              <Link
                path={item.url}
                className={`${styles.NavLink}${isActive ? ` ${styles.NavLinkActive}` : ''}`}
                ariaLabel={item.label}
                title={item.label}
                onClick={() => handleTrackElement(item.label)}
              >
                <span className={styles.NavIcon}>
                  <SVGIcon type={item.iconType} aria-hidden="true" />
                </span>
                <span className={styles.NavLabel}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default function BottomBar(): ReactElement {
  return (
    <ClientSideOnly>
      <BottomBarInner />
    </ClientSideOnly>
  );
}
