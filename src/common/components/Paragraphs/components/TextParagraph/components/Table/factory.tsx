import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEXT_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  TextParagraphComponent,
  TextParagraphFactoryOptions,
  TextParagraphFactoryOptionsStyles,
} from '../../typings';

export default ({
  styles: appStyles,
  header: appHeader,
}: TextParagraphFactoryOptions): TextParagraphComponent => {
  const defaultStyles: TextParagraphFactoryOptionsStyles = {
    Wrapper: '',
    Header: '',
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const getStyles = (props): TextParagraphFactoryOptionsStyles => {
    const styles: TextParagraphFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return styles;
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'styles' implicitly has an 'any' type. */
  const getHeaderByProps = (props, styles) => {
    const defaultHeader = (
      <>
        {props?.textParagraph?.header && (
          <h2
            data-testid="textparagraph-table-header"
            className={styles.Header}
          >
            {props?.textParagraph?.header}
          </h2>
        )}
      </>
    );

    const header =
      (typeof appHeader === 'function' && appHeader(props, styles)) ||
      (typeof appHeader === 'string' && appHeader) ||
      defaultHeader;

    return header;
  };

  const TextParagraphTable: TextParagraphComponent = (props) => {
    const paragraphRef = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
    const [isScrolledToRight, setIsScrolledToRight] = useState(false);
    const { textParagraph, windowWidth } = props;

    useEffect(() => {
      if (paragraphRef?.current) {
        const containerWidth = paragraphRef.current.offsetWidth;

        if (
          [...paragraphRef.current.childNodes].some(
            (element: HTMLElement) =>
              element.nodeName === 'TABLE' &&
              element.offsetWidth > containerWidth,
          )
        ) {
          setIsOverflow(true);
        } else {
          setIsOverflow(false);
        }
      }
    }, [windowWidth]);

    if (!textParagraph?.header && !textParagraph?.text) {
      return null;
    }

    const styles: TextParagraphFactoryOptionsStyles = getStyles(props);

    const header = getHeaderByProps(props, styles);

    return (
      <div
        data-testid="textparagraph-table-outer-div"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_TEXT_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        {header || null}
        <div className={styles.InnerWrapper}>
          {(textParagraph?.text && (
            <div
              data-testid="textparagraph-table"
              ref={paragraphRef}
              dangerouslySetInnerHTML={{ __html: textParagraph.text }}
              className={classNames({
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.Overflow]: isOverflow,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.HideLeftShadow]: isOverflow && isScrolledToLeft,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.HideRightShadow]: isOverflow && isScrolledToRight,
              })}
              onScroll={
                isOverflow
                  ? /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
                    throttle((event) => {
                      const { scrollLeft, scrollWidth, offsetWidth } =
                        event.target;
                      setIsScrolledToLeft(scrollLeft <= 0);
                      setIsScrolledToRight(
                        scrollLeft + offsetWidth >= scrollWidth,
                      );
                    }, 100)
                  : null
              }
            />
          )) ||
            null}
        </div>
      </div>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    windowWidth: windowStateSelector(state).width,
  });

  return connect(mapStateToProps)(TextParagraphTable);
};
