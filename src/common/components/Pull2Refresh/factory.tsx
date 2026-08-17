import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { PULL_2_REFRESH_CONTAINER } from './constants';
import basicStyles from './styles.legacy.css';
import { Pull2RefreshFactoryOptions, Pull2RefreshProps } from './typings';

type Pull2RefreshPropsInner = Pull2RefreshProps & {
  screenReady?: boolean;
};

const Pull2RefreshFactory = ({
  Icon,
  LoadingSpinner,
  styles,
}: Pull2RefreshFactoryOptions) => {
  const Pull2Refresh = ({
    screenReady,
  }: Pull2RefreshPropsInner): ReactElement => {
    const [startY, setStartY] = useState(0);
    const [deltaY, setDeltaY] = useState(0);
    const [spinnerActive, setSpinnerActive] = useState(false);
    const refreshDelta = 60;

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const touchStartHandler = (event) => {
      setStartY(event.touches[0].pageY);
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const touchMoveHandler = (event) => {
      const currentY: number = event.changedTouches[0].pageY;
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const isScrollPositionAtTop = document.scrollingElement.scrollTop <= 0;
      const isScrollingUp = currentY > startY;
      /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement | null' is not assignable to type 'HTMLElement'. */
      const element: HTMLElement = document.getElementById(
        PULL_2_REFRESH_CONTAINER,
      );

      if (screenReady && isScrollPositionAtTop && isScrollingUp) {
        setDeltaY(currentY - startY);
        element.style.height = `${
          deltaY <= refreshDelta ? deltaY : refreshDelta
        }px`;
      }
    };

    const touchEndHandler = async () => {
      if (deltaY >= refreshDelta) {
        setSpinnerActive(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000); /* just so the user knows that te app is being reloaded and not crashed */
      } else {
        /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement | null' is not assignable to type 'HTMLElement'. */
        const element: HTMLElement = document.getElementById(
          PULL_2_REFRESH_CONTAINER,
        );

        setDeltaY(0);
        element.style.removeProperty('height');
      }
    };

    useEffect(() => {
      const body: HTMLElement = document && document.body;
      body.addEventListener('touchstart', touchStartHandler, {
        passive: true,
      });
      body.addEventListener('touchmove', touchMoveHandler, { passive: true });
      body.addEventListener('touchend', touchEndHandler, { passive: true });

      return () => {
        body.removeEventListener('touchstart', touchStartHandler);
        body.removeEventListener('touchmove', touchMoveHandler);
        body.removeEventListener('touchend', touchEndHandler);
      };
    });

    return (
      <div
        className={classNames(basicStyles.Container, {
          [basicStyles.ContainerInit]: deltaY === 0,
        })}
        id={PULL_2_REFRESH_CONTAINER}
      >
        <div className={classNames(basicStyles.PulledContent)}>
          {!spinnerActive && screenReady && (
            <div className={styles.PullTip}>
              <div
                className={classNames(basicStyles.IconContainer, {
                  [basicStyles.Rotated]: deltaY >= refreshDelta,
                })}
              >
                <Icon type={'IconChevronDown'} />
              </div>
              <div>{deltaY >= refreshDelta ? 'Loslassen' : 'Neu laden'}</div>
            </div>
          )}
          {spinnerActive && (
            <div className={styles.PullTip}>
              <div className={styles.Spinner}>
                <LoadingSpinner width={15} height={15} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const mapStateToProps = (state: ReduxState) => ({
    screenReady: locationStateSelector(state).screenReady,
  });

  return connect(mapStateToProps)(Pull2Refresh);
};

export default Pull2RefreshFactory;
