import React, {
  Children,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import Link from '../Link';
import ScrollableDrawerContent from '../ScrollableDrawerContent';
import useBottomDrawer from '../../hooks/useBottomDrawer';
import scrollableContentStyles from '../ScrollableDrawerContent/styles.legacy.css';
import { DropdownFactoryOptions, DropdownProps } from './typings';

const DropdownFactory = ({
  Icon,
  ButtonWithLoading,
  styles,
}: DropdownFactoryOptions) => {
  const Dropdown = ({
    label,
    size = 'small',
    loading = false,
    variant = 'quaternary',
    iconTypeLeft,
    iconTypeRight,
    iconTypeRightActive,
    avoidUpdateOnButtonLabel = false,
    align = 'left',
    children,
    isDisabled,
    mobileFullWidth = false,
  }: DropdownProps) => {
    const isMobile = global.innerWidth < 760;
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    // useBottomDrawer hook is only used for mobile by isMobile rule
    useBottomDrawer({
      drawerRef: dropdownRef,
      contentRef,
      isMobile,
      setIsOpen,
    });

    const [mainContainerWidth, setMainContainerWidth] = useState(
      global.innerWidth,
    );

    const [alignment, setAlignment] = useState({
      align: align,
      position: {
        top: null,
      },
    });

    let initActiveItem = null;
    if (children) {
      if (Children.count(children) > 1) {
        Children.map(children, (child) => {
          if (child.props.initActive) {
            initActiveItem = child;
          }
        });
      } else if (Children.count(children) === 1) {
        if (Children.count(children.props.children) > 1) {
          Children.map(children.props.children, (child) => {
            if (child.props.initActive) {
              initActiveItem = child;
            }
          });
        } else if (Children.count(children) > 1 && avoidUpdateOnButtonLabel) {
          initActiveItem =
            Children.count(children) > 1 &&
            Array.isArray(children) &&
            children?.find((option) => option.props.initActive);
        }
      }
    }

    const [activeLabel, setActiveLabel] = useState(
      initActiveItem?.props.label || initActiveItem?.props?.children || label,
    );

    const dropdownLabel = (!avoidUpdateOnButtonLabel && activeLabel) || label;

    /* @ts-ignore TODO: TS7023 ->  'renderChildren' implicitly has return type 'any' because it does not have a return type annotation and is referenced d */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'children' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    const renderChildren = (children, props) => {
      if (
        (Children.count(children) === 0 || Children.count(children) === 1) &&
        typeof children === 'function'
      ) {
        return children(props);
      } else if (Children.count(children) === 1) {
        if (Children.count(children.props.children) !== 1) {
          return cloneElement(
            <children.type {...children.props}>
              {renderChildren(children.props.children, props)}
            </children.type>,
          );
        }
        return cloneElement(
          <div
            role="button"
            tabIndex={0}
            key={`dropdown-option-${children.key}`}
            onKeyDown={(event) => {
              event.preventDefault();
              props.handleOptionClick(children.key || null);
            }}
            onClick={() => {
              props.handleOptionClick(children.key || null);
            }}
          >
            {children}
          </div>,
          children.props,
        );
      } else if (Children.count(children) > 1) {
        return Children.map(children, (child: any, index): any => {
          if (typeof child.props.children === 'function') {
            return child.props.children({
              ...props,
              itemId: index,
              props: child.props,
              label: child.props.label,
              isActive: props?.activeLabel === child.props.label,
            });
          } else {
            return renderChildren(child, props);
          }
        });
      }
    };

    const handleOptionClick = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
      (key) => {
        let activeLabel = children?.[key];

        if (Children.count(children) > 1 && key) {
          Children.map(children, (child, index) => {
            if ((child.key && child.key === key) || (key && index === key)) {
              activeLabel = child;
            }
          });
        } else if (Children.count(children) === 1 && key) {
          if (Children.count(children.props.children) > 1) {
            Children.map(children.props.children, (child, index) => {
              if ((child.key && child.key === key) || (key && index === key)) {
                activeLabel = child;
              }
            });
          }
        }

        if (activeLabel) {
          setActiveLabel(
            activeLabel?.props?.label || activeLabel?.props?.children,
          );
        } else {
          setActiveLabel(null);
        }
        setIsOpen(false);
      },

      [children],
    );

    const handleOutsideClick = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        if (
          isOpen &&
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          !buttonRef.current.contains(event.target) &&
          /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      },
      [isOpen],
    );

    const getContainerWidth = () => {
      const mainElement = document.getElementById('main');
      let containerRect = null;
      if (mainElement) {
        containerRect =
          mainElement?.children?.[0] &&
          mainElement.children[0].getBoundingClientRect();
      }

      return (
        (containerRect && containerRect.width) ||
        window.innerWidth ||
        document.documentElement.clientWidth
      );
    };

    const handleResize = useCallback(() => {
      setMainContainerWidth(getContainerWidth());
    }, []);

    useEffect(() => {
      if (isOpen) {
        setTimeout(
          () => document.addEventListener('click', handleOutsideClick),
          0,
        );
      }
      if (!isMobile) {
        setAlignment({
          align: align,
          position: {
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'null'. */
            top:
              buttonRef.current &&
              buttonRef.current.getBoundingClientRect().height,
          },
        });
      }
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [handleOutsideClick, setAlignment, align, isMobile, isOpen]);

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
        handleResize();
      };
    }, [handleResize]);

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const handleClose = (event) => {
      event.preventDefault();
      setIsOpen(false);
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const scrollableContentElementRef = dropdownRef.current.querySelector(
        `.${scrollableContentStyles.ScrollableContentWrapper}`,
      ) as HTMLElement;

      if (
        scrollableContentElementRef &&
        scrollableContentElementRef.scrollTop !== 0
      ) {
        scrollableContentElementRef.scrollTop = 0;
      }
    };

    const isInViewportRight = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
      (element) => {
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 && rect.left >= 0 && rect.right <= mainContainerWidth
        );
      },
      [mainContainerWidth],
    );

    const handleOpen = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        event.preventDefault();
        if (!isMobile) {
          setTimeout(() => {
            const dropdownElement =
              event.target.parentNode.parentNode.querySelector(
                `.${styles.OptionsWrapper}`,
              ) as HTMLElement;
            if (dropdownElement && !isInViewportRight(dropdownElement)) {
              setAlignment({
                align: 'right',
                position: {
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'null'. */
                  top:
                    buttonRef.current &&
                    buttonRef.current.getBoundingClientRect().height,
                },
              });
            }
          }, 0);
        }
        setIsOpen(!isOpen);
      },
      [isInViewportRight, isMobile, isOpen],
    );

    return (
      <div
        className={classNames(styles.Wrapper, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.Disabled]: isDisabled,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.FullWidthOnMobile]: mobileFullWidth,
        })}
        data-testid="dropdown-factory-wrapper"
      >
        <div ref={buttonRef}>
          <ButtonWithLoading
            size={size}
            loading={loading}
            iconTypeLeft={iconTypeLeft}
            iconTypeRight={(isOpen && iconTypeRightActive) || iconTypeRight}
            variant={variant}
            ariaLabel={dropdownLabel}
            mobileFullWidth={mobileFullWidth}
            onClick={(e) => {
              handleOpen(e);
            }}
          >
            <span>{dropdownLabel}</span>
          </ButtonWithLoading>
        </div>
        {isOpen && isMobile && (
          <BodyClassName className={styles.BodyClass}></BodyClassName>
        )}
        {isMobile && (
          <div
            data-testid="dropdown-overlay-wrapper"
            className={classNames(styles.OverlayWrapper, {
              [styles.Open]: isOpen,
            })}
          ></div>
        )}
        <div
          data-testid="dropdown-options-wrapper"
          className={classNames(styles.OptionsWrapper, {
            [styles.Right]: !isMobile && alignment.align === 'right',
            [styles.Open]: isOpen,
          })}
          ref={dropdownRef}
          /* @ts-ignore TODO: TS2322 ->  Type '{ top */
          style={
            (!isMobile && {
              ...alignment.position,
            }) ||
            {}
          }
        >
          <Link className={styles.CloseWrapper} onClick={(e) => handleClose(e)}>
            <Icon type="IconXMark" />
          </Link>
          <div ref={contentRef}>
            <ScrollableDrawerContent>
              {renderChildren(children, {
                handleOptionClick,
                activeLabel,
                dropdownLabel,
                setActiveLabel,
                setIsOpen,
                label: children?.props?.label,
                isActive: activeLabel === children?.props?.label,
              })}
            </ScrollableDrawerContent>
          </div>
        </div>
      </div>
    );
  };

  return memo(Dropdown);
};

export default DropdownFactory;
