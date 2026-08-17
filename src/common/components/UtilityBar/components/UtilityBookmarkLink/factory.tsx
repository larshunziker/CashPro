import React, { ReactElement, memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.merge'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.merg */
import merge from 'lodash.merge';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import storageAvailable from '../../../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import bookmarkListStateSelector from '../../../../../shared/selectors/bookmarkListStateSelector';
import {
  addToBookmarks,
  removeFromBookmarks,
} from '../../../../../shared/actions/bookmarkList';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import {
  addWebAppEventListener,
  dispatchHybridAppEvent,
  removeWebAppEventListener,
} from '../../../HybridAppProvider';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../shared/constants/utilitybar';
import { UtilityBarToastService } from '../../typings';
import {
  UtilityBookmarkLinkComponent,
  UtilityBookmarkLinkFactoryOptions,
  UtilityBookmarkLinkFactoryOptionsStyles,
  UtilityBookmarkLinkProps,
  UtilityBookmarkLinkToastService,
} from './typings';

//TODO: Remove hardcoded tranlations when TRANSLATION is implemented. (appAriaLabelMessage)

type UtilityBookmarkLinkPropsInner = UtilityBookmarkLinkProps & {
  bookmarkListState: BookmarkListState;
  removeFromBookmarks: Function;
  addToBookmarks: Function;
  isAuthenticated: boolean;
  trackingSource: string;
};

type ClickHandlerOptions = {
  setIsActive: Function;
  setIsAnimating: Function;
  isActive: boolean;
  isRestricted: boolean;
  isAnimating: boolean;
  type: string;
  id: string;
  label: string;
  isAuthenticated: boolean;
  addToBookmarks: Function;
  removeFromBookmarks: Function;
  toast: UtilityBookmarkLinkToastService & UtilityBarToastService;
};

export const BOOKMARKLIST_ID_KEY = 'bookmarkList:id';
const isLocalStorageAvailable: boolean = storageAvailable('localStorage');

const clickHandler = ({
  setIsActive,
  setIsAnimating,
  isActive,
  isRestricted,
  id,
  isAuthenticated,
  addToBookmarks,
  removeFromBookmarks,
  toast,
}: ClickHandlerOptions) => {
  if (isAuthenticated && !isRestricted) {
    if (isActive) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'bookmark_article',
          event_category: 'article_bookmarks',
          event_action: 'unbookmark',
          event_label: id,
        },
      });
      removeFromBookmarks(id, toast, setIsActive);
    } else {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'bookmark_article',
          event_category: 'article_bookmarks',
          event_action: 'bookmark',
          event_label: id,
        },
      });
      addToBookmarks(id, toast, setIsActive, setIsAnimating);
    }
  } else {
    // save the bookmark id in localstorage for automatic bookmark after login
    if (isLocalStorageAvailable) {
      global.localStorage.setItem(BOOKMARKLIST_ID_KEY, id);
    }

    if (toast) {
      if (isRestricted) {
        toast.displaySubscriptionOnlyInfoToast();
      } else {
        toast.displayAuthenticationInfoToast();
      }
    }

    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'bookmark_article',
        event_category: 'article_bookmarks',
        event_action: 'login_required',
        event_label: id,
      },
    });
  }
};

const UtilityBookmarkLinkFactory = ({
  styles: appStyles,
  ToastService: appToastService,
  Link,
  SVGIcon,
  appAriaLabelMessage = 'Link zu',
}: UtilityBookmarkLinkFactoryOptions): UtilityBookmarkLinkComponent => {
  const UtilityBookmarkLink = (
    props: UtilityBookmarkLinkPropsInner,
  ): ReactElement => {
    const {
      bookmarkListState,
      isAuthenticated = false,
      isRestricted = false,
      id,
      addToBookmarks,
      removeFromBookmarks,
      item,
      origin,
      toastService,
      trackingSource = '',
      hideIconLabel = false,
    } = props;

    const ToastService =
      (typeof appToastService === 'function' &&
        appToastService({ trackingSource })) ||
      (typeof appToastService === 'object' && appToastService) ||
      {};
    const clickHandlerRef = useRef<any>(null);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const throttledClickHandlerRef = useRef<any>(null);
    const defaultStyles: UtilityBookmarkLinkFactoryOptionsStyles = {
      Link: '',
      Label: '',
      Icon: '',
      Animating: '',
    };
    const toast = merge(ToastService, toastService);

    useEffect(() => {
      throttledClickHandlerRef.current = throttle(clickHandler, 500, {
        trailing: false,
      });
    }, []);

    useEffect(() => {
      if (isAnimating) {
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    }, [isAnimating]);

    useEffect(() => {
      if (!id) return;
      if (bookmarkListState[id]) {
        setIsActive(true);
        dispatchHybridAppEvent('set-bookmark', {
          id,
          active: true,
        });
      } else {
        setIsActive(false);
        dispatchHybridAppEvent('set-bookmark', {
          id,
          active: false,
        });
      }
    }, [bookmarkListState, id]);

    useEffect(() => {
      // automatic bookmark after login
      if (isLocalStorageAvailable && isAuthenticated) {
        const bookmarkId = global.localStorage.getItem(BOOKMARKLIST_ID_KEY);

        if (bookmarkId === id) {
          global.localStorage.removeItem(BOOKMARKLIST_ID_KEY);

          // if we are on a paid article then we should add article to bookmarklist
          // if the user has a subscription only
          if (!isRestricted) {
            throttledClickHandlerRef.current({
              setIsActive,
              setIsAnimating,
              isActive,
              isRestricted,
              id,
              isAuthenticated,
              addToBookmarks,
              removeFromBookmarks,
              toast,
            });

            setIsActive(true);
          }
        }
      }
    }, [
      isActive,
      id,
      isAuthenticated,
      addToBookmarks,
      removeFromBookmarks,
      isRestricted,
      toast,
    ]);

    let onClick: { onClick: (event: MouseEvent) => void } | undefined;
    const styles: UtilityBookmarkLinkFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const throttledClickRef = useRef<any>(null);
    if (item?.onClick) {
      onClick = {
        onClick: item.onClick,
      };
    } else {
      throttledClickRef.current = {
        setIsActive,
        setIsAnimating,
        isActive,
        isRestricted,
        isAnimating,
        isAuthenticated,
        id,
        addToBookmarks,
        removeFromBookmarks,
        toast,
      };
      onClick = {
        onClick: () =>
          throttledClickHandlerRef.current(throttledClickRef.current),
      };
    }

    const trackingData = [
      {
        type: 'data-utility-button-type',
        value:
          (origin === UTILITY_BAR_ORIGIN_OVERLAY && 'share') || 'utility bar',
      },
      {
        type: 'data-utility-button-target',
        value: item?.iconLabel,
      },
    ];

    if (!clickHandlerRef.current) {
      clickHandlerRef.current = (event: any) => {
        if (onClick?.onClick) {
          onClick?.onClick(event);
        }
      };
    }

    useEffect(() => {
      if (clickHandlerRef.current) {
        addWebAppEventListener(
          'handle-bookmark-click',
          clickHandlerRef.current,
        );
      }

      return () => {
        removeWebAppEventListener(
          'handle-bookmark-click',
          clickHandlerRef.current,
        );
      };
    }, []);

    return (
      <TestFragment data-testid="utility-link-wrapper">
        <Link
          target={item?.targetType || '_self'}
          {...onClick}
          trackingData={trackingData}
          className={classNames('utility-button', styles.Link, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.Restricted]: isRestricted,
          })}
          aria-label={`${appAriaLabelMessage} ${
            isActive ? item?.iconLabel : item?.iconInactiveLabel
          }`}
        >
          <>
            {(item?.iconType || item?.iconInactiveType) && (
              <SVGIcon
                /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                type={isActive ? item.iconType : item.iconInactiveType}
                className={classNames(styles.Icon, {
                  [styles.Animating]: isAnimating,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.Active]: isActive,
                })}
              />
            )}
            {!hideIconLabel && (
              <p className={styles.Label}>
                {isActive ? item.iconLabel : item.iconInactiveLabel}
              </p>
            )}
          </>
        </Link>
      </TestFragment>
    );
  };

  const mapDispatchToProps: Record<string, any> = {
    addToBookmarks,
    removeFromBookmarks,
  };

  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    bookmarkListState: bookmarkListStateSelector(state),
    isAuthenticated: authStateSelector(state).isAuthenticated,
  });

  function arePropsEqual(
    prevProps: UtilityBookmarkLinkPropsInner,
    nextProps: UtilityBookmarkLinkPropsInner,
  ): boolean {
    if (
      !prevProps.bookmarkListState?.[nextProps.id] &&
      nextProps.bookmarkListState?.[nextProps.id]
    ) {
      return false;
    }

    if (
      prevProps.bookmarkListState?.[nextProps.id] &&
      !nextProps.bookmarkListState?.[nextProps.id]
    ) {
      return false;
    }

    if (prevProps.isAuthenticated !== nextProps.isAuthenticated) {
      return false;
    }

    if (prevProps.isRestricted !== nextProps.isRestricted) {
      return false;
    }

    return true;
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(memo(UtilityBookmarkLink, arePropsEqual));
};

export default UtilityBookmarkLinkFactory;
