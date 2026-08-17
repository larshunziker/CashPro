import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect, useSelector } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { useSwipeable } from 'react-swipeable';
import { getRCTrackingSource } from '../../../shared/helpers/getRCTrackingSource';
import { convertUrl, openWebShareAPIDialog } from './helpers';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';
import TestFragment from '../../../shared/tests/components/TestFragment';
import {
  addWebAppEventListener,
  removeWebAppEventListener,
} from '../HybridAppProvider';
import {
  COMMENT_STATUS_CLOSED,
  COMMENT_STATUS_HIDDEN,
} from '../../../shared/constants/comments';
import {
  NATIVE_ADVERTISING_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../../../shared/constants/content';
import {
  EVENT_UTILITY_BAR_PLAYER,
  UTILITY_BAR_ORIGIN_OVERLAY,
  UTILITY_TYPE_BEYOND_WORDS,
  UTILITY_TYPE_BOOKMARKS,
  UTILITY_TYPE_COMMENTS,
  UTILITY_TYPE_GIFT,
  UTILITY_TYPE_SHARE,
} from '../../../shared/constants/utilitybar';
import {
  UtilityBarFactoryOptions,
  UtilityBarFactoryOptionsStyles,
  UtilityBarProps,
  UtilityBarToastService,
} from './typings';

const SCROLL_OFFSET = 16;

type UtilityBarPropsInner = UtilityBarProps & {
  headerContentType: string;
  routePathname: string;
  commentCount: number;
  headerArticleData: ArticleData;
  hasSubscriptions: boolean;
  pageMetadata: PianoPageMetadata;
};

const defaultStyles: UtilityBarFactoryOptionsStyles = {
  Wrapper: '',
};

const areCommentsHidden = (
  commentStatus = '',
  commentCount: number,
  headerContentType = '',
) =>
  (commentStatus === COMMENT_STATUS_CLOSED && commentCount <= 0) ||
  commentStatus === COMMENT_STATUS_HIDDEN ||
  headerContentType === NATIVE_ADVERTISING_CONTENT_TYPE;

const UtilityBarFactory = ({
  UtilityLink,
  UtilityBookmarkLink,
  UtilityGiftLink,
  availableUtilities: appAvailableUtilities,
  headerStateSelector,
  locationStateSelector,
  commentStateSelector,
  styles: appStyles,
  ToastService: appToastService,
}: UtilityBarFactoryOptions) => {
  const UtilityBar = (props: UtilityBarPropsInner): ReactElement | null => {
    const [isOverlayVisible, toggleOverlayVisible] = useState(false);
    const [isPlayerVisible, togglePlayerVisible] = useState(false);
    const [visibleId, setVisibleId] = useState('');
    const isOverlayVisibleRef = useRef(false);
    const visibleIdRef = useRef('');
    const scrollableLinks = useRef<HTMLDivElement>(null);
    const [isScrolledToLeft, setIsScrolledToLeft] = useState<boolean>(true);
    const [isScrolledToRight, setIsScrolledToRight] = useState<boolean>(false);
    const [swipeStart, setSwipeStart] = useState<number>(0);

    const isHybridApp = useSelector(
      (state) => locationStateSelector(state).isHybridApp,
    );
    visibleIdRef.current = visibleId;
    isOverlayVisibleRef.current = isOverlayVisible || isPlayerVisible;
    // this helper function is only here to add/remove listener on body as named function
    const toggleVisibility = () =>
      raf(() => {
        if (isOverlayVisibleRef.current && global.innerWidth > 759) {
          setVisibleId('');
          toggleOverlayVisible(false);
          togglePlayerVisible(false);
        }
      });

    useEffect(() => {
      if (isOverlayVisibleRef.current) {
        const mainElement = document.querySelector('main');

        if (mainElement) {
          mainElement.addEventListener('click', toggleVisibility, {
            once: true,
          });
        }
      }
    }, []);

    const styles: UtilityBarFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const {
      enabledUtilities,
      headerArticleData,
      headerContentType,
      routePathname,
      commentCount,
      children,
      origin,
      theme,
      shareUrl,
      title,
      shortTitle,
      lead,
      socialMediaTitle,
      imageUrl,
      hasSubscriptions = false,
      pageMetadata,
      hideIconLabel = false,
      shouldUseSwipeable = false,
    } = props;

    useEffect(() => {
      setVisibleId('');
      toggleOverlayVisible(false);
      togglePlayerVisible(false);
    }, [routePathname]);

    const source = getRCTrackingSource('bookmark', pageMetadata);

    /* @ts-ignore TODO: TS2322 ->  Type 'false | UtilityBarToastService' is not assignable to type 'UtilityBarToastService'. */
    const ToastService: UtilityBarToastService =
      (typeof appToastService === 'function' && appToastService({ source })) ||
      (typeof appToastService === 'object' && appToastService);

    const utilityTitle = title || headerArticleData?.title || '';
    const utilityShortTitle = shortTitle || headerArticleData?.shortTitle || '';
    const utilityLead = lead || headerArticleData?.lead || '';
    const utilitySocialMediaTitle =
      socialMediaTitle || headerArticleData?.socialMediaTitle || '';
    const utilityShareUrl =
      shareUrl || headerArticleData?.preferredUri || routePathname;
    const availableUtilities =
      (typeof appAvailableUtilities === 'function' &&
        appAvailableUtilities(props)) ||
      appAvailableUtilities;

    const isRestricted =
      [RESTRICTION_STATUS_PAID, RESTRICTION_STATUS_REGISTERED].includes(
        headerArticleData?.restrictionStatus,
      ) && !hasSubscriptions;

    const filteredItems =
      Array.isArray(availableUtilities) &&
      availableUtilities
        .filter(
          (item) =>
            // Item is enabled
            enabledUtilities &&
            enabledUtilities.indexOf(item.id) > -1 &&
            // Item is of type 'comment' and NOT hidden from view (closed w/o comments or hidden)
            !(
              item.id === UTILITY_TYPE_COMMENTS &&
              areCommentsHidden(
                headerArticleData?.commentStatus,
                commentCount,
                headerContentType,
              )
            ),
        )
        .sort(
          (a, b) =>
            enabledUtilities.indexOf(a.id) - enabledUtilities.indexOf(b.id),
        );
    let shareClickHandler: (event: CustomEvent) => void;
    filteredItems &&
      filteredItems.map((item) => {
        if (item.id === UTILITY_TYPE_SHARE) {
          shareClickHandler = (event: Event) =>
            openWebShareAPIDialog({
              event,
              title: utilityTitle,
              lead: utilityLead,
              url:
                (global?.location?.protocol &&
                  global?.location?.host &&
                  utilityShareUrl &&
                  `${global.location.protocol}//${global.location.host}${utilityShareUrl}`) ||
                global?.location?.href ||
                '',
              isHybridApp,
              fallback: () =>
                raf(() => {
                  if (!isOverlayVisible) {
                    setVisibleId(item.id);
                    toggleOverlayVisible(true);
                  } else {
                    if (isOverlayVisible) {
                      if (visibleId !== item.id) {
                        setVisibleId(item.id);
                        toggleOverlayVisible(true);
                      } else {
                        setVisibleId('');
                        toggleOverlayVisible(false);
                      }
                    }
                  }
                }),
            });
        }
      });
    useEffect(() => {
      if (shareClickHandler) {
        addWebAppEventListener('handle-share-click', shareClickHandler);
      }
      return () => {
        if (shareClickHandler) {
          removeWebAppEventListener('handle-share-click', shareClickHandler);
        }
      };
      // @ts-ignore
    }, [shareClickHandler]);

    useEffect(() => {
      if (scrollableLinks.current) {
        setIsScrolledToLeft(scrollableLinks.current.scrollLeft <= 0);
        setIsScrolledToRight(
          scrollableLinks.current.scrollLeft +
            scrollableLinks.current.offsetWidth >=
            scrollableLinks.current.scrollWidth - SCROLL_OFFSET,
        );
      }
    }, []);
    const handleScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollLeft, scrollWidth, offsetWidth } =
          event.target as HTMLElement;
        const isOnLeft = scrollLeft <= 0;
        const isOnRight =
          scrollLeft + offsetWidth >= scrollWidth - SCROLL_OFFSET;

        if (isScrolledToLeft !== isOnLeft) {
          setIsScrolledToLeft(isOnLeft);
        }

        if (isScrolledToRight !== isOnRight) {
          setIsScrolledToRight(isOnRight);
        }
      },
      [isScrolledToLeft, isScrolledToRight],
    );
    const handlers = useSwipeable(
      // use swipeable only if you want it
      !shouldUseSwipeable
        ? {}
        : {
            onSwiping: (eventData) => {
              if (!scrollableLinks.current) {
                return;
              }
              scrollableLinks.current.scrollLeft =
                swipeStart - eventData.deltaX;
            },
            onSwipeStart: () => {
              setSwipeStart(scrollableLinks?.current?.scrollLeft || 0);
              if (!scrollableLinks.current) {
                return;
              }
              scrollableLinks.current.style.pointerEvents = 'none';
            },
            onSwiped: () => {
              if (!scrollableLinks.current) {
                return;
              }
              scrollableLinks.current.style.pointerEvents = 'auto';
            },
            trackMouse: true,
            trackTouch: false,
            delta: 1,
          },
    );

    if (
      !enabledUtilities ||
      !Array.isArray(enabledUtilities) ||
      enabledUtilities.length <= 0
    ) {
      return null;
    }

    if (!filteredItems || filteredItems.length <= 0) {
      return <TestFragment data-testid="utility-bar-no-enabled-items" />;
    }

    return (
      <>
        <div
          className={classNames(styles.Wrapper, {
            ['utility-bar']: origin !== UTILITY_BAR_ORIGIN_OVERLAY,
          })}
          {...handlers}
          ref={(shouldUseSwipeable && scrollableLinks) || undefined}
          onScroll={(shouldUseSwipeable && handleScroll) || undefined}
        >
          {filteredItems.map((item) => {
            const url = convertUrl({
              url: item.url,
              shareUrl: utilityShareUrl,
              title: utilityTitle,
              shortTitle: utilityShortTitle,
              lead: utilityLead,
              socialMediaTitle: utilitySocialMediaTitle,
              additionalQueryParam: item.referrer,
              imageUrl,
              hasSponsoredContentPrefix:
                headerContentType === NATIVE_ADVERTISING_CONTENT_TYPE,
              isHybridApp,
            });

            if (item.id === UTILITY_TYPE_SHARE) {
              item.onClick = (event: Event) =>
                openWebShareAPIDialog({
                  event,
                  title: utilityTitle,
                  lead: utilityLead,
                  url:
                    (global?.location?.protocol &&
                      global?.location?.host &&
                      utilityShareUrl &&
                      `${global.location.protocol}//${global.location.host}${utilityShareUrl}`) ||
                    global?.location?.href ||
                    '',
                  isHybridApp,
                  fallback: () =>
                    raf(() => {
                      if (!isOverlayVisible) {
                        setVisibleId(item.id);
                        toggleOverlayVisible(true);
                      } else {
                        if (isOverlayVisible) {
                          if (visibleId !== item.id) {
                            setVisibleId(item.id);
                            toggleOverlayVisible(true);
                          } else {
                            setVisibleId('');
                            toggleOverlayVisible(false);
                          }
                        }
                      }
                    }),
                });
            }

            if (item.toggleCustomOverlay) {
              item.onClick = () => {
                raf(() => {
                  if (
                    visibleIdRef.current === item.id &&
                    isOverlayVisibleRef.current
                  ) {
                    setVisibleId('');
                    toggleOverlayVisible(false);
                  } else {
                    if (visibleIdRef.current && isOverlayVisibleRef.current) {
                      toggleOverlayVisible(false);
                    }
                    setVisibleId(item.id);
                    toggleOverlayVisible(true);
                  }
                });
              };
            }

            const itemProps = {
              item,
              url,
              origin,
              theme,
              isRestricted,
              hideIconLabel,
              toastService: ToastService || null,
              isActive:
                item.id === visibleIdRef.current && isOverlayVisibleRef.current,
              commentCount:
                (headerArticleData?.commentStatus !== COMMENT_STATUS_HIDDEN &&
                  item.id === UTILITY_TYPE_COMMENTS &&
                  commentCount > 0 &&
                  commentCount) ||
                null,
              articleId: headerArticleData?.id,
              createDate: headerArticleData?.createDate,
            };

            if (item.id === UTILITY_TYPE_BOOKMARKS && UtilityBookmarkLink) {
              return (
                <UtilityBookmarkLink
                  key={`utility-bar-${item.id}-${itemProps.isActive}-${item.iconType}-${headerArticleData?.gcid}`}
                  id={headerArticleData?.gcid}
                  item={item}
                  origin={origin}
                  theme={theme}
                  isRestricted={isRestricted}
                  toastService={ToastService}
                  trackingSource={source}
                  hideIconLabel={hideIconLabel}
                />
              );
            }

            if (item.id === UTILITY_TYPE_BEYOND_WORDS) {
              item.onClick = () => {
                const utilityBarWrapper = document.getElementsByClassName(
                  'utility-bar-wrapper',
                );

                utilityBarWrapper[utilityBarWrapper.length - 1]?.scrollIntoView(
                  { behavior: 'smooth' },
                );
                const event = new CustomEvent(EVENT_UTILITY_BAR_PLAYER);
                document.dispatchEvent(event);
              };
              return (
                <UtilityLink
                  key={`utility-bar-${item.id}-${itemProps.isActive}-${item.iconType}`}
                  {...itemProps}
                />
              );
            }
            if (item.id === UTILITY_TYPE_GIFT && UtilityGiftLink) {
              return (
                <UtilityGiftLink
                  key={`utility-bar-${item.id}-${itemProps.isActive}-${item.iconType}`}
                  hasSubscriptions={hasSubscriptions}
                  restrictionStatus={headerArticleData?.restrictionStatus}
                  {...itemProps}
                />
              );
            }
            if (typeof item.OverwriteUtilityLink === 'function') {
              return (
                <item.OverwriteUtilityLink
                  key={`utility-bar-${item.id}-${itemProps.isActive}-${item.iconType}`}
                  {...itemProps}
                />
              );
            }
            return (
              <UtilityLink
                key={`utility-bar-${item.id}-${itemProps.isActive}-${item.iconType}`}
                {...itemProps}
              />
            );
          })}
        </div>
        {children &&
          children({
            isOverlayVisible,
            toggleOverlayVisible,
            visibleId,
            isPlayerVisible,
          })}
      </>
    );
  };

  const mapStateToProps = (state: any) => ({
    headerArticleData: headerStateSelector(state).articleData,
    headerContentType: headerStateSelector(state).contentType,
    hasSubscriptions:
      (state.auth && authStateSelector(state).hasSubscriptions) ||
      (state.piano && pianoStateSelector(state).isAccessGranted) ||
      null,
    commentCount: (state.comment && commentStateSelector(state).count) || -1,
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
    pageMetadata: (state.piano && pianoStateSelector(state).pageMetadata) || {},
  });

  return connect(mapStateToProps)(UtilityBar);
};

export default UtilityBarFactory;
