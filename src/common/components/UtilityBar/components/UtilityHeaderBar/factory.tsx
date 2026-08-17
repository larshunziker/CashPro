import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../shared/helpers/utils';
import {
  UTILITY_BAR_ORIGIN_HEADER,
  UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
} from '../UtilityOverlay/constants';
import {
  UtilityHeaderBarFactoryOptions,
  UtilityHeaderBarProps,
} from './typings';

const UtilityHeaderBar = ({
  UtilityBar,
  UtilityOverlay,
  styles,
  truncateTitleLength,
  appOverlayTitle = 'Artikel teilen',
  appCurrentlyReadingMessage = 'Sie lesen:',
}: UtilityHeaderBarFactoryOptions) => {
  const UtilityHeaderBar = ({
    articleData,
    isScrolledToCollapse,
    isSocialBarVisible,
    enabledUtilities,
    enabledOverlayUtilities,
    showTitle = true,
    overlayTitle,
    isTopBar = false,
    hideIconLabel = false,
  }: UtilityHeaderBarProps): ReactElement<any> => {
    if (!isSocialBarVisible) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <div
        data-testid="utility-header-bar-wrapper"
        className={classNames(styles.Wrapper, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.HiddenForDesktop]: isTopBar,
          [styles.Move]: isScrolledToCollapse,
        })}
      >
        <div className={styles.ContentWrapper}>
          {showTitle && (
            <div className={styles.TitleWrapper}>
              {appCurrentlyReadingMessage}
              <div className={styles.Title}>{`${truncateByWord(
                articleData?.title || '',
                /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | undefined' is not assignable to parameter of type 'number'. */
                truncateTitleLength,
              )}`}</div>
            </div>
          )}

          {enabledUtilities &&
            Array.isArray(enabledUtilities) &&
            enabledUtilities.length > 0 && (
              <div className={styles.UtilityBarWrapper}>
                <UtilityBar
                  enabledUtilities={enabledUtilities}
                  origin={UTILITY_BAR_ORIGIN_HEADER}
                  hideIconLabel={hideIconLabel}
                >
                  {/* @ts-ignore TODO: TS2322 ->  Type '({ isOverlayVisible, toggleOverlayVisible, visibleId } */}
                  {({ isOverlayVisible, toggleOverlayVisible, visibleId }) =>
                    (enabledOverlayUtilities &&
                      Array.isArray(enabledOverlayUtilities) &&
                      enabledOverlayUtilities.length > 0 && (
                        <div className={styles.UtilityOverlayWrapper}>
                          {/* @ts-ignore TODO: TS2604 ->  JSX element type 'UtilityOverlay' does not have any construct or call signatures. */}
                          <UtilityOverlay
                            visibleId={visibleId}
                            isScrolledToCollapse={isScrolledToCollapse}
                            overlayTitle={overlayTitle || appOverlayTitle}
                            isOverlayVisible={isOverlayVisible}
                            toggleOverlayVisible={toggleOverlayVisible}
                            enabledUtilities={enabledOverlayUtilities}
                            isUsingPortal={true}
                            origin={UTILITY_BAR_OVERLAY_ORIGIN_HEADER}
                          />
                        </div>
                      )) ||
                    null
                  }
                </UtilityBar>
              </div>
            )}
        </div>
      </div>
    );
  };

  return UtilityHeaderBar;
};

export default UtilityHeaderBar;
