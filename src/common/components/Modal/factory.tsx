import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line react/no-deprecated
import { render as domRender, unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import mapProps from 'recompose/mapProps';
import { ApolloProvider } from '@apollo/client';
import classNames from 'classnames';
import SSRContextProvider from '../SSRContext';
import ScrollableDropdownContent from '../ScrollableDrawerContent';
import useBottomDrawer from '../../hooks/useBottomDrawer';
import { configureClientStore } from '../../../cash/shared/configureStore';
import defaultStyles from './defaultStyles.legacy.css';
import { ModalFactoryOptions, ModalProps } from './typings';

const modalFactory = ({
  styles,
  Icon,
  ButtonWithLoading,
  targetId = 'rasch-confirm-alert',
  RaschProviders,
}: ModalFactoryOptions) => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'root' implicitly has type 'any' in some locations where its type cannot be determined. */
  let root = null;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const createElementReconfirm = (props) => {
    const divTarget = document.getElementById(props.targetId || targetId);
    if (divTarget && props.customUi) {
      const store = configureClientStore();
      const Root = () => (
        <Provider store={store}>
          <BrowserRouter>
            {/* @ts-ignore TODO: TS2604 ->  JSX element type 'RaschProviders' does not have any construct or call signatures. */}
            <RaschProviders ignoreToastProvider />
            {/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */}
            <ApolloProvider client={global.apolloClient}>
              <HelmetProvider>
                <SSRContextProvider>
                  <Modal {...props} />
                </SSRContextProvider>
              </HelmetProvider>
            </ApolloProvider>
          </BrowserRouter>
        </Provider>
      );
      domRender(<Root />, divTarget);
    } else if (divTarget && !props.customUi) {
      root = createRoot(divTarget);
      root.render(<Modal {...props} />);
    } else if (__DEVELOPMENT__) {
      // eslint-disable-next-line no-console
      console.error(
        `Modal: No element with id ${props.targetId || targetId} found.`,
      );
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const removeElementReconfirm = (props) => {
    const target = document.getElementById(props.targetId || targetId);
    if (target && !props.customUi) {
      /* @ts-ignore TODO: TS7005 ->  Variable 'root' implicitly has an 'any' type. */
      root.unmount(target);
    }
    if (target && props.customUi) {
      // remove the element from the DOM
      unmountComponentAtNode(target);
    }
  };

  const addBodyClass = () => {
    document.body.classList.add(defaultStyles.BodyClass);
  };

  const removeBodyClass = () => {
    document.body.classList.remove(defaultStyles.BodyClass);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const withMapProps: (props) => ModalProps = mapProps((props: ModalProps) => {
    const defaultProps: ModalProps = {
      fullPage: false,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'HTMLDivElement | undefined'. */
      overlay: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
      title: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
      content: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
      overlayClassName: null,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '((props */
      customUi: null,
      closeOnClickOutside: true,
      isCloseVisible: true,
      closeOnEscape: true,
      closeOnLocationChange: false,
      keyCodeForClose: [],
      afterClose: () => null,
      onClickOutside: () => null,
      onkeyPress: () => null,
      onKeypressEscape: () => null,
      type: 'modal',
      buttons: [
        {
          children: 'Abbrechen',
          onClick: () => null,
        },
        {
          children: 'Bestätigen',
          onClick: () => null,
        },
      ],
    };
    return { ...defaultProps, ...props };
  });

  const Modal = withMapProps(({ ...props }: ModalProps) => {
    const {
      title,
      hasStickyHeader = false,
      hasStickyFooter = false,
      content,
      customUi,
      closeOnClickOutside,
      closeOnEscape,
      closeOnLocationChange,
      keyCodeForClose,
      onkeyPress,
      onClickOutside,
      onKeypressEscape,
      buttons,
      hideDefaultButtons = false,
      isCloseVisible,
      type,
    }: ModalProps = props;
    let { overlay } = props;
    const isMobile = global.innerWidth < 760 && type === 'drawer';
    const contentRef = useRef(null);
    const drawerRef = useRef(overlay);
    const stickyHeaderRef = useRef(null);
    const stickyFooterRef = useRef(null);
    const stickyFooterModalRef = useRef(null);
    const defaultButtonGroupRef = useRef(null);
    const [stickyOffset, setStickyOffset] = useState(0);
    // useBottomDrawer hook is only used for mobile by isMobile rule
    useBottomDrawer({
      drawerRef,
      contentRef,
      isMobile,
      setIsOpen: () => close(),
    });

    /* @ts-ignore TODO: TS7006 ->  Parameter 'button' implicitly has an 'any' type. */
    const handleClickButton = (button) => {
      if (button.onClick) {
        button.onClick();
      }
      close();
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
    const handleClickOverlay = (e) => {
      const isClickOutside = e.target === overlay;

      if (closeOnClickOutside && isClickOutside) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        onClickOutside();
        close();
      }

      e.stopPropagation();
    };

    const close = useCallback(() => {
      removeBodyClass();
      if (type === 'drawer') {
        const element = document.getElementsByClassName(
          defaultStyles.DrawerBottom,
        );
        if (element && element[0]) {
          element[0].classList.remove(defaultStyles.Open);
        }
        setTimeout(() => {
          removeElementReconfirm(props);
        }, 300);
      } else {
        removeElementReconfirm(props);
      }
    }, [props, type]);

    const keyboard = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        const keyCode = event.keyCode;
        const isKeyCodeEscape = keyCode === 27;

        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        if (keyCodeForClose.includes(keyCode)) {
          close();
        }

        if (closeOnEscape && isKeyCodeEscape) {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          onKeypressEscape(event);
          close();
        }

        if (onkeyPress) {
          onkeyPress();
        }
      },
      [close, closeOnEscape, keyCodeForClose, onKeypressEscape, onkeyPress],
    );

    useEffect(() => {
      document.addEventListener('keydown', keyboard, false);
      return () => {
        document.removeEventListener('keydown', keyboard, false);
      };
    }, [keyboard]);

    const popStateListener = useCallback(() => {
      if (closeOnLocationChange) {
        close();
      }
    }, [close, closeOnLocationChange]);

    useEffect(() => {
      window.addEventListener('popstate', popStateListener);

      // Override push and replace history states to still track them
      // => the new portal of this factory here would not get such updates without it
      const originalPushState = window.history.pushState;
      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        popStateListener();
      };

      const originalReplaceState = window.history.replaceState;
      window.history.replaceState = function (...args) {
        if (args.length >= 2) {
          originalReplaceState.apply(window.history, args);
        }
        popStateListener();
      };

      return () => {
        window.removeEventListener('popstate', popStateListener);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }, [popStateListener]);

    useEffect(() => {
      if (type === 'drawer') {
        // get element by class name
        const element = document.getElementsByClassName(
          defaultStyles.DrawerBottom,
        );
        if (element && element[0]) {
          setTimeout(() => {
            element[0].classList.add(defaultStyles.Open);
          }, 0);
        }
      }

      return () => {
        const element = document.getElementsByClassName(
          defaultStyles.DrawerBottom,
        );
        if (element && element[0]) {
          element[0].classList.remove(defaultStyles.Open);
        }
      };
    }, [type]);

    // use effect to update the stickyOffset value to calculate the scrollableContent correctly
    // including the height of the sticky header and footer
    useEffect(() => {
      if (
        !stickyHeaderRef?.current &&
        !stickyFooterRef?.current &&
        !stickyFooterModalRef?.current &&
        !defaultButtonGroupRef?.current
      ) {
        return;
      }

      const nodes: any[] = [];
      if (stickyHeaderRef?.current) {
        nodes.push(stickyHeaderRef?.current);
      }
      if (stickyFooterRef?.current) {
        nodes.push(stickyFooterRef?.current);
      }
      if (stickyFooterModalRef?.current) {
        nodes.push(stickyFooterModalRef?.current);
      }
      if (defaultButtonGroupRef?.current) {
        nodes.push(defaultButtonGroupRef?.current);
      }

      /* @ts-ignore TODO: TS7005 ->  Variable 'nodes' implicitly has an 'any[]' type. */
      /* @ts-ignore TODO: TS2339 ->  Property 'length' does not exist on type 'never'. */
      if (!Array.isArray(nodes || !nodes.length)) {
        return;
      }

      const resizeObserver = new ResizeObserver((nodes) => {
        // Wile wrapping it in the requestAnimationFrame we can avoid this error - ResizeObserver loop limit exceeded
        // accoring to this article this error only appears in chrome and can be ignored
        // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        window.requestAnimationFrame(() => {
          if (!Array.isArray(nodes) || !nodes.length) {
            return;
          }
          let offsetValue = 0;
          nodes.forEach((node) => {
            if (node?.target) {
              //@ts-ignore
              offsetValue += node.target.offsetHeight;
            }
          });
          setStickyOffset(offsetValue);
        });
      });

      /* @ts-ignore TODO: TS7005 ->  Variable 'nodes' implicitly has an 'any[]' type. */
      nodes?.forEach((node) => {
        resizeObserver.observe(node);
      });
      // clean up
      return () => {
        /* @ts-ignore TODO: TS7005 ->  Variable 'nodes' implicitly has an 'any[]' type. */
        Array.isArray(nodes) &&
          nodes.length &&
          nodes.forEach((node) => {
            resizeObserver.unobserve(node);
          });
        resizeObserver.disconnect();
        setStickyOffset(0);
      };
    }, []);

    const buttonGroupJsx = (
      <div
        ref={defaultButtonGroupRef}
        className={classNames(defaultStyles.ButtonGroup, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.ButtonGroup]: !!styles.ButtonGroup,
          [defaultStyles.ButtonGroupScrollable]: !hasStickyFooter,
        })}
      >
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        {buttons.map((item, i) => (
          /* @ts-ignore TODO: TS2604 ->  JSX element type 'ButtonWithLoading' does not have any construct or call signatures. */
          <ButtonWithLoading
            key={i}
            {...item}
            onClick={() => handleClickButton(item)}
          >
            {item.children}
          </ButtonWithLoading>
        ))}
      </div>
    );

    return (
      <div
        role={'presentation'}
        className={classNames(defaultStyles.Overlay, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.Overlay]: !!styles.Overlay,
          [defaultStyles.FullPage]: props.fullPage,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.FullPage]: styles.FullPage && props.fullPage,
        })}
        /* @ts-ignore TODO: TS2322 ->  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement | undefined'. */
        /* @ts-ignore TODO: TS2322 ->  Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement | undefined'. */
        ref={(dom) => (overlay = dom)}
        onClick={(e) => handleClickOverlay(e)}
        onKeyDown={(e) => handleClickOverlay(e)}
      >
        {(type === 'modal' && customUi && customUi({ close })) || (
          <div
            /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
            ref={drawerRef}
            className={classNames(defaultStyles.Body, {
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.Body]: !!styles.Body,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.Body]: !!styles.Body,
              [defaultStyles.DrawerBottom]: type === 'drawer',
            })}
          >
            {isCloseVisible && (
              <div
                role={'button'}
                tabIndex={0}
                onKeyDown={close}
                onClick={close}
                className={classNames(defaultStyles.CloseIconWrapper, {
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles.CloseIconWrapper]: !!styles.CloseIconWrapper,
                  [defaultStyles.CloseIconWithStickyHeader]: hasStickyHeader,
                  [defaultStyles.DrawerBottom]: type === 'drawer',
                })}
              >
                {/* @ts-ignore TODO: TS2604 ->  JSX element type 'Icon' does not have any construct or call signatures. */}
                <Icon type={'IconXMark'} />
              </div>
            )}
            {/* Placeholder div for sticky header. can be filled dynamically using React Portal therefore it has an id */}
            <>
              {hasStickyHeader && (
                <>
                  <div
                    ref={stickyHeaderRef}
                    id="ModalStickyHeader"
                    className={defaultStyles.StickyHeaderWrapper}
                  >
                    {title && <p className={styles.Title}>{title}</p>}
                  </div>
                </>
              )}
            </>

            {(type === 'drawer' && customUi && (
              <div
                ref={contentRef}
                className={classNames({
                  [defaultStyles.ScrollableContentWrapper]: hasStickyHeader,
                })}
              >
                <ScrollableDropdownContent stickyOffset={stickyOffset}>
                  {!hasStickyHeader && title && (
                    <div
                      className={classNames(
                        styles.Title,
                        defaultStyles.TitleScrollable,
                      )}
                    >
                      {title}
                    </div>
                  )}
                  {customUi({
                    close,
                    /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'RefObject<HTMLDivElement>'. */
                    drawerRef,
                    hasStickyHeader,
                    hasStickyFooter,
                  })}
                  {!hasStickyFooter && buttons && !hideDefaultButtons && (
                    <>{buttonGroupJsx}</>
                  )}
                </ScrollableDropdownContent>
              </div>
            )) || (
              <>
                {content && (
                  <div
                    className={classNames(defaultStyles.Content, {
                      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                      [styles.Content]: !!styles.Content,
                    })}
                  >
                    <ScrollableDropdownContent stickyOffset={stickyOffset}>
                      {title && !hasStickyHeader && (
                        <div>
                          <p
                            className={classNames(
                              defaultStyles.Title,
                              defaultStyles.TitleScrollable,
                              {
                                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                                [styles.Title]: !!styles.Title,
                              },
                            )}
                          >
                            {title}
                          </p>
                        </div>
                      )}
                      <div className={defaultStyles.ContentWrapper}>
                        {content}
                      </div>
                      {buttons && !hasStickyFooter && <>{buttonGroupJsx}</>}
                    </ScrollableDropdownContent>
                  </div>
                )}
              </>
            )}
            {/* Placeholder div for sticky footer. can be filled dynamically using React Portal therefore it has an id */}
            {hasStickyFooter && (
              <>
                <div
                  ref={stickyFooterRef}
                  id="ModalStickyFooter"
                  className={defaultStyles.FooterWrapper}
                >
                  {(buttons && !hideDefaultButtons && <>{buttonGroupJsx}</>) ||
                    null}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }) as FC<ModalProps>;

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  return (props) => {
    createElementReconfirm(props);
    addBodyClass();
  };
};

export default modalFactory;
