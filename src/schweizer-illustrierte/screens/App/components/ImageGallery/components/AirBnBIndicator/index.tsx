import React, { ComponentType, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';

type AirBnbIndicatorProps = {
  slideCount: number;
  activeIndex: number;
  clearUpdateActiveIndex: (activeIndex: number, event: any) => void;
  secondaryTheme?: boolean;
  withBoxShadow?: boolean;
};

const ARIA_LABEL = 'Bild %s von';

const BOBBEL_SCALE_BY_DISTANCE = ['1', '0.75', '0.5', '0'];
const BOBBEL_MARGIN = 200;

const distance = (index: number, activeIndex: number) => activeIndex - index;

const AirBnbIndicator: ComponentType<AirBnbIndicatorProps> = ({
  activeIndex,
  clearUpdateActiveIndex,
  slideCount,
  secondaryTheme = false,
  withBoxShadow = true,
}) => {
  const activeMainChannel = useSelector(
    (state) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      settingsStateSelector(state).activeMainChannel as ActiveMainChannel,
  );

  if (!slideCount || slideCount === 0) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <div data-testid="swipeindicator-wrapper" className={styles.Wrapper}>
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
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [getThemedClass('Active')]: activeIndex === index,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [getThemedClass('SecondaryTheme')]: secondaryTheme,
              [styles.WithBoxShadow]: withBoxShadow,
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
            aria-label={`${ARIA_LABEL.replace(
              '%s',
              (index + 1).toString(),
            )} ${slideCount}`}
          />
        ) : null,
      )}
    </div>
  );
};

export default AirBnbIndicator;
