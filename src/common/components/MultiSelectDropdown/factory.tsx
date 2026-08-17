import React, {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import useBottomDrawer from '../../hooks/useBottomDrawer';
import ScrollableDrawerContent from '../ScrollableDrawerContent';
import Link from '../Link';
import {
  SVG_ICONS_TYPE_LIST,
  SVG_ICONS_TYPE_LIST_ACTIVE,
} from '../../../shared/constants/svgIcons';
import scrollableContentStyles from '../ScrollableDrawerContent/styles.legacy.css';
import {
  MultiSelectDropdownFactoryOptions,
  MultiSelectDropdownOptions,
  MultiSelectDropdownProps,
} from './typings';

const MultiSelectDropdownFactory = ({
  Icon,
  styles,
  SVGIcon,
  customIcon = false,
  iconActive = SVG_ICONS_TYPE_LIST_ACTIVE,
  iconNotActive = SVG_ICONS_TYPE_LIST,
}: MultiSelectDropdownFactoryOptions) => {
  const MultiSelectDropdown = ({
    children,
    label,
    onSelect,
    defaultSelected = {},
  }: MultiSelectDropdownProps) => {
    const isMobile = global.innerWidth < 760;

    const contentRef = useRef(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [activeOptions, setActiveOptions] =
      useState<MultiSelectDropdownOptions>(defaultSelected);

    // useBottomDrawer hook is only used for mobile by isMobile rule
    useBottomDrawer({
      drawerRef: dropdownRef,
      contentRef,
      isMobile,
      setIsOpen,
    });

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

    useEffect(() => {
      if (isOpen) {
        setTimeout(
          () => document.addEventListener('click', handleOutsideClick),
          0,
        );
      }

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [handleOutsideClick, isMobile, isOpen]);

    const handleOptionClick = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      (item) => {
        const activeItems = {
          ...activeOptions,
        };

        if (!activeOptions?.[item.key]) {
          activeItems[item.key] = {
            label: item.props.label,
            itemsCount: item.props.itemsCount,
          };
        } else {
          delete activeItems[item.key];
        }

        setActiveOptions(activeItems);
        onSelect(activeItems);
      },
      [activeOptions, onSelect],
    );

    useEffect(() => {
      setActiveOptions(defaultSelected);
    }, [defaultSelected]);

    const handleClose = () => {
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

    const handleClearValues = () => {
      setActiveOptions({});
      onSelect({});
    };

    const handleOpen = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
      },
      [isOpen],
    );

    const activeOptionsLength = Object.keys(activeOptions).length;

    const selectedActiveOptionsItemsCount = Object.values(activeOptions).reduce(
      (curr, acc) => curr + acc.itemsCount,
      0,
    );

    const generateLabel = () => {
      if (!activeOptionsLength) {
        return label;
      }

      if (activeOptionsLength === 1) {
        return `${
          Object.values(activeOptions)[0].label
        } (${selectedActiveOptionsItemsCount})`;
      }

      return `${activeOptionsLength} Filter (${selectedActiveOptionsItemsCount})`;
    };

    const displayLabel = generateLabel();

    const renderChildren = (children: ReactElement[]) => {
      return Children.map(children, (child) => {
        return cloneElement(
          <div
            role="button"
            tabIndex={0}
            key={`multiselect-dropdown-option-${child.key}`}
            onKeyDown={(event) => {
              event.preventDefault();
              handleOptionClick(child);
            }}
            onClick={() => {
              handleOptionClick(child);
            }}
          />,
          {
            label: child.props.label,
            itemscount: child.props.itemsCount,
            className: classNames(
              child.props.className,
              styles.DropdownListItem,
              {
                /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
                [styles.Selected]: !!activeOptions?.[child.key],
              },
            ),
          },
          <>
            <input
              type="checkbox"
              className={styles.Checkbox}
              /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
              checked={!!activeOptions?.[child.key]}
              onChange={() => handleOptionClick(child)}
            />
            {child.props.children}
          </>,
        );
      });
    };

    return (
      <div
        className={classNames(styles.Wrapper)}
        data-testid="multiselect-dropdown-factory-wrapper"
      >
        <div className={styles.SelectButtonWrapper} ref={buttonRef}>
          <button className={styles.SelectButton} onClick={handleOpen}>
            {customIcon ? (
              /* @ts-ignore TODO: TS2604 ->  JSX element type 'SVGIcon' does not have any construct or call signatures. */
              <SVGIcon
                type={!activeOptionsLength ? iconNotActive : iconActive}
              />
            ) : (
              <Icon type={isOpen ? 'IconChevronUp' : 'IconChevronDown'} />
            )}
            <span>{displayLabel}</span>
          </button>

          {activeOptionsLength > 0 && (
            <button className={styles.ClearButton} onClick={handleClearValues}>
              <Icon type="IconXMark" />
            </button>
          )}
        </div>

        {isOpen && isMobile && (
          <BodyClassName className={styles.BodyClass}></BodyClassName>
        )}

        {isMobile && (
          <div
            data-testid="multiselect-dropdown-overlay-wrapper"
            className={classNames(styles.OverlayWrapper, {
              [styles.Open]: isOpen,
            })}
          />
        )}

        <div
          data-testid="multiselect-dropdown-options-wrapper"
          className={classNames(styles.OptionsWrapper, {
            [styles.Open]: isOpen,
          })}
          ref={dropdownRef}
        >
          <Link className={styles.CloseWrapper} onClick={handleClose}>
            <Icon type="IconXMark" />
          </Link>

          <div ref={contentRef}>
            <ScrollableDrawerContent>
              {renderChildren(children)}
            </ScrollableDrawerContent>
          </div>
        </div>
      </div>
    );
  };

  return memo(MultiSelectDropdown);
};

export default MultiSelectDropdownFactory;
