import React, { ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';

type AirBnbIndicatorProps = {
  slideCount: number;
  activeIndex: number;
  addClass?: string;
  clearUpdateActiveIndex: (activeIndex: number, event: any) => void;
};

const BOBBEL_SCALE_BY_DISTANCE = ['1', '0.77', '0.55', '0'];
const BOBBEL_MARGIN = 200;

const distance = (index: number, activeIndex: number) => activeIndex - index;

const AirBnbIndicator: ComponentType<AirBnbIndicatorProps> = ({
  activeIndex,
  clearUpdateActiveIndex,
  slideCount,
  addClass,
}) => {
  if (!slideCount || slideCount === 0) {
    return null;
  }

  return (
    <div
      data-testid="swipeindicator-wrapper"
      className={classNames(styles.Wrapper, addClass)}
    >
      {[...Array(slideCount)].map((_: number, index): ReactElement | null =>
        index >= activeIndex - 3 && index <= activeIndex + 3 ? (
          <span
            data-testid="swipeindicator-swipeIndicator"
            key={`slide-indicator-item-${index}`}
            onClick={(e) => {
              clearUpdateActiveIndex(index, e);
            }}
            onKeyDown={(e) => {
              clearUpdateActiveIndex(index, e);
            }}
            className={classNames(styles.SwipeIndicator, {
              [styles.Active]: activeIndex === index,
            })}
            style={{
              transform: `translateX(${
                (BOBBEL_MARGIN * distance(index, activeIndex)) / -1
              }%) scale(${
                BOBBEL_SCALE_BY_DISTANCE[
                  Math.abs(distance(index, activeIndex))
                ] || 0
              })`,
            }}
            tabIndex={0}
            role="button"
          />
        ) : null,
      )}
    </div>
  );
};

export default AirBnbIndicator;
