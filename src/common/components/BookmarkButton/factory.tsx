import React, { ReactElement, memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import storageAvailable from '../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import bookmarkListStateSelector from '../../../shared/selectors/bookmarkListStateSelector';
import {
  addToBookmarks,
  removeFromBookmarks,
} from '../../../shared/actions/bookmarkList';
import {
  BookmarkButtonComponent,
  BookmarkButtonFactoryOptions,
  BookmarkButtonOptionsStyles,
  BookmarkButtonProps,
  BookmarkButtonToastService,
} from './typings';

type BookmarkButtonPropsInner = BookmarkButtonProps & {
  bookmarkListState: BookmarkListState;
  removeFromBookmarks: Function;
  addToBookmarks: Function;
  isAuthenticated: boolean;
};

type ClickHandlerOptions = {
  setIsActive: Function;
  setIsAnimating: Function;
  isActive: boolean;
  isAnimating: boolean;
  type: string;
  id: string;
  label: string;
  isAuthenticated: boolean;
  addToBookmarks: Function;
  removeFromBookmarks: Function;
  ToastService: BookmarkButtonToastService;
};

export const BOOKMARKLIST_ID_KEY = 'bookmarkList:id';
const isLocalStorageAvailable: boolean = storageAvailable('localStorage');

const clickHandler = ({
  setIsActive,
  setIsAnimating,
  isActive,
  id,
  isAuthenticated,
  addToBookmarks,
  removeFromBookmarks,
  ToastService,
}: ClickHandlerOptions) => {
  if (isAuthenticated) {
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
      removeFromBookmarks(id, ToastService, setIsActive);
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
      addToBookmarks(id, ToastService, setIsActive, setIsAnimating);
    }
  } else {
    // save the bookmark id in localstorage for automatic bookmark after login
    if (isLocalStorageAvailable) {
      global.localStorage.setItem(BOOKMARKLIST_ID_KEY, id);
    }

    ToastService && ToastService.displayAuthenticationInfoToast();

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

const BookmarkButtonFactory = ({
  styles: appStyles,
  Icon,
  addToBookmarksText,
  removeFromBookmarksText,
  bookmarkIconTypeInactive,
  bookmarkIconTypeActive,
  ToastService,
}: BookmarkButtonFactoryOptions): BookmarkButtonComponent => {
  const BookmarkButton = (props: BookmarkButtonPropsInner): ReactElement => {
    const {
      bookmarkListState,
      isAuthenticated = false,
      id,
      addToBookmarks,
      removeFromBookmarks,
    } = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const throttledClickHandlerRef = useRef<any>(null);
    const defaultStyles: BookmarkButtonOptionsStyles = {
      BookmarkButtonWrapper: '',
      Text: '',
      Icon: '',
      Animating: '',
    };

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
      if (bookmarkListState[id]) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [bookmarkListState, id]);

    useEffect(() => {
      // automatic bookmark after login
      if (isLocalStorageAvailable && isAuthenticated) {
        const bookmarkId = global.localStorage.getItem(BOOKMARKLIST_ID_KEY);

        if (bookmarkId === id) {
          global.localStorage.removeItem(BOOKMARKLIST_ID_KEY);

          throttledClickHandlerRef.current({
            setIsActive,
            setIsAnimating,
            isActive,
            id,
            isAuthenticated,
            addToBookmarks,
            removeFromBookmarks,
            ToastService,
          });

          setIsActive(true);
        }
      }
    }, [isActive, id, isAuthenticated, addToBookmarks, removeFromBookmarks]);

    const getStyles = () => {
      const styles: BookmarkButtonOptionsStyles =
        (typeof appStyles === 'function' && (appStyles as any)(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };

    const styles = getStyles();

    return (
      <button
        className={classNames(styles.BookmarkButtonWrapper)}
        onClick={() =>
          throttledClickHandlerRef.current({
            setIsActive,
            setIsAnimating,
            isActive,
            isAnimating,
            isAuthenticated,
            id,
            addToBookmarks,
            removeFromBookmarks,
            ToastService,
          })
        }
      >
        {Icon && (
          <Icon
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            type={isActive ? bookmarkIconTypeActive : bookmarkIconTypeInactive}
            addClass={classNames(styles.Icon, {
              [styles.Animating]: isAnimating,
            })}
          ></Icon>
        )}
        <span className={styles.Text}>
          {isActive ? removeFromBookmarksText : addToBookmarksText}
        </span>
      </button>
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
    prevProps: BookmarkButtonPropsInner,
    nextProps: BookmarkButtonPropsInner,
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

    return true;
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(memo(BookmarkButton, arePropsEqual));
};

export default BookmarkButtonFactory;
