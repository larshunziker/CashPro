import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import raf from 'raf';
import { SCROLL_BAR_WIDTH } from './constants';
import {
  TooltipComponent,
  TooltipFactoryOptions,
  TooltipFactoryOptionsStyles,
} from './typings';

const defaultStyles: TooltipFactoryOptionsStyles = {
  Wrapper: '',
  Button: '',
  ButtonOpen: '',
  ButtonText: '',
  ButtonTextOpen: '',
  ButtonTextClosed: '',
  TooltipWrapper: '',
  Tooltip: '',
  Content: '',
  Link: '',
  CloseIconWithin: '',
};

const moveTooltip = (ref: React.RefObject<HTMLParagraphElement>) => {
  if (ref.current) {
    const bounds = ref.current.getBoundingClientRect();
    const left = bounds.left;
    const right = bounds.right;
    const screenWidth = Math.min(window.outerWidth, window.innerWidth);
    if (left < 0) {
      ref.current.style.left = `${-left + SCROLL_BAR_WIDTH}px`;
      return;
    }
    if (right > screenWidth - SCROLL_BAR_WIDTH) {
      ref.current.style.left = `${screenWidth - right - SCROLL_BAR_WIDTH}px`;
      return;
    }
  }
};

const tooltipFactory = ({
  Link,
  styles: appStyles,
}: TooltipFactoryOptions<any>) => {
  const Tooltip: TooltipComponent = (props) => {
    const {
      content,
      link,
      children,
      openOnInit = false,
      closeWithClickOutside = true,
      onClose = () => {},
      TooltipIcon,
    } = props;
    const [isTooltipVisible, setTooltipVisible] = useState<boolean>(openOnInit);
    const contentRef = React.createRef<HTMLParagraphElement>();

    useEffect(() => {
      const handleClick = () => {
        setTooltipVisible(false);
        onClose?.();
      };

      if (isTooltipVisible && closeWithClickOutside) {
        raf(() => {
          document.body.addEventListener('click', handleClick, {
            once: true,
          });
        });
        moveTooltip(contentRef);
      }

      return () => {
        document.body.removeEventListener('click', handleClick);
      };
    }, [
      isTooltipVisible,
      contentRef,
      closeWithClickOutside,
      TooltipIcon,
      onClose,
    ]);

    if (!content) {
      return null;
    }

    const styles: TooltipFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div className={styles.Wrapper}>
        {children}
        {!!TooltipIcon && (
          <span
            className={classNames(styles.Button, {
              [styles.ButtonOpen]: isTooltipVisible,
            })}
          >
            {TooltipIcon}
          </span>
        )}
        {!TooltipIcon && (
          <Link
            onClick={(event) => {
              event.preventDefault();
              setTooltipVisible(!isTooltipVisible);
              onClose?.();
            }}
            className={classNames(styles.Button, {
              [styles.ButtonOpen]: isTooltipVisible,
            })}
          >
            <span
              className={classNames(styles.ButtonText, {
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.ButtonTextOpen]: isTooltipVisible,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.ButtonTextClosed]: !isTooltipVisible,
              })}
            />
          </Link>
        )}

        {isTooltipVisible && (
          <div className={styles.TooltipWrapper}>
            <div ref={contentRef} className={styles.Tooltip}>
              <p className={styles.Content}>
                <span dangerouslySetInnerHTML={{ __html: content }} />
                {!!TooltipIcon && (
                  <span
                    role="presentation"
                    onClick={(event) => {
                      event.preventDefault();
                      setTooltipVisible(!isTooltipVisible);
                      onClose?.();
                    }}
                    className={styles.CloseIconWithin}
                  />
                )}
                {link?.text && link?.path && (
                  <>
                    &nbsp;
                    <Link
                      className={styles.Link}
                      path={link.path}
                      label={link.text}
                    />
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  return Tooltip;
};

export default tooltipFactory;
