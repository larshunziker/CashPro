import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import TestFragment from '../../../shared/tests/components/TestFragment';
import Link from '../LinkLegacy';
import { ExpansionPanelFactoryOptions, ExpansionPanelProps } from './typings';

export type ExpansionPanelState = {
  isClosed: boolean;
  toggleExpand?: () => void;
};

const defaultStyles = {
  ExpansionPanel: '',
  IsOpen: '',
  Header: '',
  Title: '',
  BoldTitle: '',
  Spacer: '',
  Icon: '',
  ArrowIcon: '',
  Content: '',
  HeaderContentWrapper: '',
  LinkWrapper: '',
  ToggleWrapper: '',
  NotExpandable: '',
};

const getContentHeight = (scrollHeight: number, initialHeight: number) =>
  scrollHeight < initialHeight ? scrollHeight : initialHeight;

/* @ts-ignore TODO: TS7006 ->  Parameter 'appStyles' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStyles = (appStyles, props) =>
  (typeof appStyles === 'function' && appStyles(props)) ||
  (typeof appStyles === 'object' && appStyles) ||
  defaultStyles;

/* @ts-ignore TODO: TS7006 ->  Parameter 'appHeader' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
const getHeader = (appHeader, props, options) =>
  (typeof appHeader === 'function' && appHeader(props, options)) || null;

/* @ts-ignore TODO: TS7031 ->  Binding element 'header' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'styles' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'boldTitle' implicitly has an 'any' type. */
const HeaderComponent = ({ header, title, styles, boldTitle }) => (
  <>
    {(header && (
      <TestFragment data-testid="expansion-panel-header-component">
        {header}
      </TestFragment>
    )) || (
      <span
        className={classNames(styles.Title, {
          [styles.BoldTitle]: boldTitle,
        })}
        data-testid="expansion-panel-header-title"
      >
        {title}
      </span>
    )}
  </>
);

const ExpansionPanelFactory = ({
  header: appHeader,
  initialHeight = 0,
  styles: appStyles,
  checkIfContentFitsInHeight = false,
  footer: appFooter,
}: ExpansionPanelFactoryOptions) => {
  const ExpansionPanel = (props: PropsWithChildren<ExpansionPanelProps>) => {
    const [isClosed, setIsClosed] = useState(!props.isOpen);
    const [contentFitsInHeight, setContentFitsInHeight] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const {
      title,
      path,
      boldTitle,
      addClass = '',
      duration = 300,
      ariaLabel = 'Akkordeon öffnen',
      isHeaderLinkClickable = false,
      onLinkClick,
      isOpen,
      children,
      toggleOnChildrenClick = true,
    } = props;

    const styles = getStyles(appStyles, props);

    const inlineTransition = useMemo(
      () => ({
        transition: `height ${duration}ms ease-in-out`,
      }),
      [duration],
    );

    useEffect(() => {
      if (!contentRef.current) {
        return;
      }

      const { scrollHeight } = contentRef.current;
      contentRef.current.style.height = `${getContentHeight(
        scrollHeight,
        initialHeight,
      )}px`;
    }, []);

    useEffect(() => {
      if (isOpen) {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        contentRef.current.style.height = `auto`;
      }
    }, [isOpen]);

    const handleTriggerClick = (e: React.MouseEvent) => {
      if (contentFitsInHeight || e.metaKey || e.ctrlKey) {
        return;
      }

      setIsClosed(!isClosed);

      if (!contentRef.current) {
        return;
      }

      const { scrollHeight } = contentRef.current;
      contentRef.current.style.height = `${scrollHeight}px`;

      if (checkIfContentFitsInHeight) {
        contentRef.current.style.transition = `height ${duration}ms ease-in-out`;
      }

      if (isClosed) {
        /* We need to set the height to auto after the animation is done, so that the height can update automatically on window resize */
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.height = `auto`;
          }
        }, duration);
      } else {
        /* RequestAnimationFrame would have been a better solution here, but it won't work in Firefox. Thats why we need the setTimeout here */
        setTimeout(() => {
          if (contentRef.current) {
            const collapsedHeight =
              scrollHeight < initialHeight ? scrollHeight : initialHeight;

            contentRef.current.style.height = `${collapsedHeight}px`;
          }
        }, 50);
      }
    };

    const toggleExpand = throttle(handleTriggerClick, duration);

    const header = getHeader(appHeader, props, { isClosed, toggleExpand });
    const footer =
      (typeof appFooter === 'function' &&
        appFooter(props, { isClosed, toggleExpand })) ||
      null;

    if (!header && !title) {
      return null;
    }

    const headerProps = {
      header,
      title,
      boldTitle,
      styles,
    };

    if (isHeaderLinkClickable) {
      return (
        <section
          className={classNames(styles.ExpansionPanel, {
            [addClass]: !!addClass,
            [styles.IsOpen]: !isClosed,
            [styles.NotExpandable]: contentFitsInHeight,
          })}
        >
          {!contentFitsInHeight && (
            <div className={styles.Header}>
              <div className={styles.HeaderContentWrapper}>
                <Link
                  link={{ path }}
                  onClick={onLinkClick}
                  className={styles.LinkWrapper}
                  data-testid="menu-expansion-panel-factory-link"
                >
                  <HeaderComponent {...headerProps} />
                </Link>

                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                  className={styles.ToggleWrapper}
                  onClick={toggleExpand}
                  tabIndex={0}
                  role="button"
                  aria-label={ariaLabel}
                  data-testid="menu-expansion-panel-toggle"
                >
                  <div className={classNames(styles.Icon, styles.ArrowIcon)} />
                </div>
              </div>
            </div>
          )}
          <div
            ref={(element) => {
              contentRef.current = element;

              if (element && checkIfContentFitsInHeight) {
                setContentFitsInHeight(element.scrollHeight < initialHeight);
              }
            }}
            {...(!checkIfContentFitsInHeight && { style: inlineTransition })}
            className={styles.Content}
          >
            {children}
          </div>
          {footer}
        </section>
      );
    }

    return (
      <section
        className={classNames(styles.ExpansionPanel, {
          [addClass]: !!addClass,
          [styles.IsOpen]: !isClosed,
          [styles.NotExpandable]: contentFitsInHeight,
        })}
      >
        {!contentFitsInHeight && (
          /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
          <div
            className={styles.Header}
            onClick={toggleExpand}
            tabIndex={0}
            role="button"
            aria-label={ariaLabel}
          >
            <div className={styles.HeaderContentWrapper}>
              <HeaderComponent {...headerProps} />

              <div className={styles.Spacer} />
              <div className={classNames(styles.Icon, styles.ArrowIcon)} />
            </div>
          </div>
        )}

        <div
          ref={(element) => {
            contentRef.current = element;

            if (element && checkIfContentFitsInHeight) {
              setContentFitsInHeight(element.scrollHeight < initialHeight);
            }
          }}
          {...(!checkIfContentFitsInHeight && { style: inlineTransition })}
          className={styles.Content}
          onClick={(toggleOnChildrenClick && toggleExpand) || null}
          aria-hidden="true"
        >
          {children}
        </div>
        {footer}
      </section>
    );
  };

  return ExpansionPanel;
};

export default ExpansionPanelFactory;
