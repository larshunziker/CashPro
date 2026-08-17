import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { getServiceUrl } from '../../../../../shared/helpers/serviceUrl';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import { log } from '../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { setBookmarkListData } from '../../../../../shared/actions/bookmarkList';
import {
  BookmarksProfileComponent,
  BookmarksProfileFactoryOptions,
  BookmarksProfileProps,
} from './typings';

type BookmarksProfilePropsInner = BookmarksProfileProps & {
  isAuthenticated: boolean;
  initialAuthRequest: boolean;
  setBookmarkListData: (res: any) => void;
};

const BookmarksProfileFactory = ({
  Helmet,
  styles,
  grid,
  titleText = 'Merkliste',
  loginText = 'Bitte melden Sie sich an, um die Merkliste zu verwalten',
  LoginForm,
  NoBookmarks,
  LoadingSpinner,
  BookmarkList,
  seoTitle,
  setLoading,
  setScreenReady,
}: BookmarksProfileFactoryOptions): BookmarksProfileComponent => {
  const BookmarksProfile = ({
    setBookmarkListData,
    isAuthenticated,
    initialAuthRequest,
    location,
    page,
  }: BookmarksProfilePropsInner) => {
    const dispatch = useDispatch();
    const [bookmarks, setBookmarks] = useState<BookmarkListState | any>({});
    const [isFetchingData, setIsFetchingData] = useState(true);
    const setLoadingFinished = useCallback(() => {
      if (setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(
            setScreenReady(true, {
              pathname: location?.pathname,
              ...getTealiumData({
                object: {
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  preferredUri: location.pathname,
                  __typename: 'Bookmarks',
                  pageId: 'bookmarks',
                },
              }),
            }),
          );
        });
      }
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    }, [dispatch, location.pathname]);
    useEffect(() => {
      if (isAuthenticated) {
        fetch(
          `${getServiceUrl(
            __BOOKMARKS_SERVICE_ENDPOINT__,
          )}/bookmarks?loadTeaserData=true`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Auth0.getIdToken()}`,
            },
          },
        )
          .then(async (res): Promise<void> => {
            if (res.status === 200) {
              const bookmarks = await res.json();

              setBookmarkListData(bookmarks);

              const items = Object.keys(bookmarks)
                .map((key) => ({
                  id: key,
                  ...bookmarks[key],
                }))
                .sort((a, b) => b.dateAdded - a.dateAdded);

              setBookmarks(items);
            }

            setTimeout(() => {
              setIsFetchingData(false);
            }, 1000);
          })
          .catch((error) => {
            log('bookmarkList fetch action', ['error catched:', error], 'red');
          });
      } else {
        setTimeout(() => {
          setIsFetchingData(false);
        }, 1000);
      }
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    }, [dispatch, isAuthenticated, location.pathname, setBookmarkListData]);

    useEffect(() => {
      if (!isFetchingData) {
        setLoadingFinished();
      }
    }, [setLoadingFinished, isFetchingData]);

    // this is needed because we are simulate pagination on this screen only
    useEffect(() => {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      if (page >= 1) {
        setLoadingFinished();
      }
    }, [setLoadingFinished, page]);
    let jsx = null;

    if (!isAuthenticated) {
      jsx = (
        <>
          {(!initialAuthRequest && (
            <div className={grid.Container}>
              <LoadingSpinner />
            </div>
          )) || (
            <div className={classNames(styles.LoginWrapper, grid.Container)}>
              <LoginForm message={loginText} isDefaultLoginCase />
            </div>
          )}
        </>
      );
    } else if (isFetchingData) {
      jsx = (
        <div className={grid.Container}>
          <LoadingSpinner />
        </div>
      );
    } else if (bookmarks && Array.isArray(bookmarks) && bookmarks.length > 0) {
      jsx = (
        <>
          <BookmarkList items={bookmarks} page={page} />
        </>
      );
    } else {
      jsx = (
        <div className={grid.Container}>
          <NoBookmarks />
        </div>
      );
    }

    return (
      <>
        <Helmet title={seoTitle || titleText} />
        <div className={styles.BookmarksProfileWrapper}>
          <div className={grid.Container}>
            <h2 className={styles.Title}>{titleText}</h2>
          </div>
          {jsx}
        </div>
      </>
    );
  };

  const mapDispatchToProps = {
    setBookmarkListData,
  };

  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
    initialAuthRequest: authStateSelector(state).initialAuthRequest,
  });

  return connect(mapStateToProps, mapDispatchToProps)(BookmarksProfile);
};

export default BookmarksProfileFactory;
