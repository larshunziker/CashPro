import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';
import { useHeightAnimation } from '../../../../../../../shared/hooks/useHeightAnimation';
import {
  TRACKING_CLASS_INFO_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  CollapsableBoxFactoryOptions,
  CollapsableBoxFactoryOptionsStyles,
  CollapsableBoxProps,
} from './typings';

const defaultStyles: CollapsableBoxFactoryOptionsStyles = {
  Wrapper: '',
  InnerWrapper: '',
  Container: '',
  Title: '',
  Content: '',
  ToggleWrapper: '',
  ColStyle: '',
};

const EXPAND_DURATION = 300;

const CollapsableBoxFactory = ({
  paragraphsRenderer: appParagraphsRenderer,
  Icon,
  IconTypes,
  styles: appStyles,
  showMoreMessage = 'Mehr anzeigen',
  showLessMessage = 'Weniger anzeigen',
  getTitle,
}: CollapsableBoxFactoryOptions) => {
  const CollapsableBox = (props: CollapsableBoxProps): ReactElement => {
    const { infoBoxParagraph, articleColStyle, children } = props;
    const { infoBox } = infoBoxParagraph;

    const [isCollapsed, setIsCollapsed] = useState(true);

    const { handleClick, contentRef, inlineStyles } =
      useHeightAnimation<HTMLDivElement>(!isCollapsed, EXPAND_DURATION);

    if (
      !infoBoxParagraph?.infoBox?.body ||
      infoBoxParagraph.infoBox.body.length < 1
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const paragraphsRenderer =
      (typeof appParagraphsRenderer === 'function' &&
        appParagraphsRenderer(props)) ||
      null;

    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const title = infoBox.title || getTitle?.(infoBox.body);

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_INFO_BOX_PARAGRAPH,
          styles.Wrapper,
          'infobox',
          {
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            collapsable: infoBox.isCollapsible,
          },
        )}
      >
        <div className={styles.InnerWrapper}>
          <div className={styles.ColStyle || articleColStyle}>
            <div className={styles.Container}>
              {title && <h2 className={styles.Title}>{title}</h2>}

              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
              {infoBox.isCollapsible && (
                <button
                  className={styles.ToggleWrapper}
                  onClick={() => {
                    setIsCollapsed((prevState) => !prevState);
                    handleClick();
                  }}
                >
                  {isCollapsed ? (
                    <Icon type={IconTypes.arrowDownIconType} />
                  ) : (
                    <Icon type={IconTypes.arrowUpIconType} />
                  )}

                  <span>{isCollapsed ? showMoreMessage : showLessMessage}</span>
                </button>
              )}

              <div
                className={classNames(styles.Content)}
                /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLDivElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
                ref={contentRef}
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                {...(infoBox.isCollapsible && {
                  'aria-hidden': isCollapsed ? 'true' : 'false',
                  style: inlineStyles,
                })}
              >
                {children || null}
                {paragraphsRenderer || null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return CollapsableBox;
};

export default CollapsableBoxFactory;
