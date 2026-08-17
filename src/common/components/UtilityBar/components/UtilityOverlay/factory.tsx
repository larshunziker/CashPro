import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import raf from 'raf';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import {
  UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
  UTILITY_BAR_ORIGIN_OVERLAY,
} from '../../../../../shared/constants/utilitybar';
import { UTILITY_BAR_OVERLAY_ORIGIN_HEADER } from './constants';
import {
  UtilityOverlayFactoryOptions,
  UtilityOverlayFactoryOptionsStyles,
  UtilityOverlayProps,
} from './typings';

const defaultStyles: UtilityOverlayFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  CloseButton: '',
  WrapperToggle: '',
  WrapperSticky: '',
  UtilityBarWrapper: '',
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const UtilityBarPortal = ({ className = '', children }) => {
  const mount = document.getElementById('utility-bar-overlay');
  const element = document.createElement('div');

  useEffect(() => {
    if (!mount) {
      return () => null;
    }
    mount.className = className;

    raf(() => {
      if (!mount.firstChild) {
        mount.appendChild(element);
      }
    });
    return () => {
      mount.className = '';
      raf(() => (mount.innerHTML = ''));
    };
  }, [element, mount, className]);

  return createPortal(children, element);
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const UtilityBarPortalWrapper = ({ children }) => {
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    setIsSsr(false);
  }, []);

  if (isSsr) return null;
  return <>{children}</>;
};

const UtilityOverlayFactory = ({
  UtilityBar,
  overlay: appOverlay,
  styles: appStyles,
}: UtilityOverlayFactoryOptions) => {
  const UtilityOverlay = (props: UtilityOverlayProps): ReactElement<any> => {
    const {
      overlayTitle,
      enabledUtilities,
      isOverlayVisible,
      toggleOverlayVisible,
      origin = '',
      isUsingPortal = false,
      isScrolledToCollapse = false,
      hasStickyness = true,
    } = props;
    // collapse header overlay ond scroll top again
    if (
      origin === UTILITY_BAR_OVERLAY_ORIGIN_HEADER &&
      isOverlayVisible &&
      !isScrolledToCollapse
    ) {
      toggleOverlayVisible(false);
    }

    const styles: UtilityOverlayFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const defaultOverlay = (
      <>
        {overlayTitle && (
          <p
            className={styles.Title}
            data-testid="utility-overlay-title-wrapper"
          >
            {overlayTitle}
          </p>
        )}
        <button
          className={styles.CloseButton}
          data-testid="utility-overlay-close-button"
          onClick={() => toggleOverlayVisible(false)}
          aria-label="Overlay schliessen"
        />
        {enabledUtilities &&
          Array.isArray(enabledUtilities) &&
          enabledUtilities.length > 0 &&
          isOverlayVisible && (
            <div className={styles.UtilityBarWrapper}>
              <UtilityBar
                shareUrl={props.shareUrl || ''}
                title={props.title || ''}
                shortTitle={props.shortTitle || ''}
                lead={props.lead || ''}
                socialMediaTitle={props.socialMediaTitle || ''}
                imageUrl={props.imageUrl || ''}
                enabledUtilities={enabledUtilities}
                origin={
                  (!hasStickyness && UTILITY_BAR_ORIGIN_INLINE_OVERLAY) ||
                  UTILITY_BAR_ORIGIN_OVERLAY
                }
              />
            </div>
          )}
      </>
    );

    const overlay: ReactElement =
      (typeof appOverlay === 'function' && appOverlay(props)) || defaultOverlay;

    if (isUsingPortal) {
      return (
        <TestFragment data-testid="utility-overlay-portal-wrapper">
          <UtilityBarPortalWrapper>
            <UtilityBarPortal
              className={classNames('utility-bar-overlay', styles.Wrapper, {
                [styles.WrapperSticky]: hasStickyness,
                [styles.WrapperToggle]: isOverlayVisible,
              })}
            >
              {overlay}
            </UtilityBarPortal>
          </UtilityBarPortalWrapper>
        </TestFragment>
      );
    }
    return (
      <div
        className={classNames('utility-bar-overlay', styles.Wrapper, {
          [styles.WrapperSticky]: hasStickyness,
          [styles.WrapperToggle]: isOverlayVisible,
        })}
        data-testid="utility-overlay-wrapper"
      >
        {overlay}
      </div>
    );
  };

  return UtilityOverlay;
};

export default UtilityOverlayFactory;
