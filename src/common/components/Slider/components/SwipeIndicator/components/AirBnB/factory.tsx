import React, {
  Component,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import generateGuid from '../../../../../../../shared/helpers/guid';
import {
  SwipeIndicatorComponent,
  SwipeIndicatorFactoryOptions,
  SwipeIndicatorFactoryOptionsStyles,
  SwipeIndicatorProps,
} from './typings';

const BOBBEL_SCALE_BY_DISTANCE = ['1', '0.75', '0.5', '0'];
const BOBBEL_MARGIN = 200;

const distance = (index: number, activeIndex: number) => activeIndex - index;

const defaultStyles: SwipeIndicatorFactoryOptionsStyles = {
  Wrapper: '',
  SwipeIndicator: '',
  Active: '',
};

const AirBnbIndicatorFactory = ({
  styles: appStyles,
  appAriaLabel = 'Bild %s von',
}: SwipeIndicatorFactoryOptions<any>): SwipeIndicatorComponent => {
  class AirBnbIndicator extends Component<SwipeIndicatorProps> {
    identicatorId: string;

    constructor(props: SwipeIndicatorProps) {
      super(props);
      this.identicatorId = generateGuid();
    }

    render(): ReactElement | null {
      if (
        !this.props ||
        !this.props.slideCount ||
        this.props.slideCount === 0
      ) {
        return null;
      }
      const styles =
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return (
        <div
          data-testid="swipeindicator-factory-wrapper"
          className={styles.Wrapper}
        >
          {[...Array(this.props.slideCount)].map(
            (_: number, index): ReactElement | null =>
              index >= this.props.activeIndex - 3 &&
              index <= this.props.activeIndex + 3 ? (
                <span
                  data-testid="swipeindicator-factory-swipeIndicator"
                  key={`slide-indicator-item-${this.identicatorId}-${index}`}
                  onClick={(e: MouseEvent) => {
                    this.props.clearUpdateActiveIndex(index, e);
                  }}
                  onKeyDown={(e: KeyboardEvent) => {
                    this.props.clearUpdateActiveIndex(index, e);
                  }}
                  className={classNames(styles.SwipeIndicator, {
                    [styles.Active]: this.props.activeIndex === index,
                  })}
                  style={{
                    transform: `translateX(${
                      (BOBBEL_MARGIN *
                        distance(index, this.props.activeIndex)) /
                      -1
                    }%) scale(${
                      BOBBEL_SCALE_BY_DISTANCE[
                        Math.abs(distance(index, this.props.activeIndex))
                      ] || 0
                    })`,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${appAriaLabel.replace(
                    '%s',
                    (index + 1).toString(),
                  )} ${this.props.slideCount}`}
                />
              ) : null,
          )}
        </div>
      );
    }
  }
  return AirBnbIndicator;
};

export default AirBnbIndicatorFactory;
