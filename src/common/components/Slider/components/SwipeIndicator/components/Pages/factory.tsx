import React, { Component, ReactElement } from 'react';
import {
  SwipeIndicatorComponent,
  SwipeIndicatorFactoryOptions,
  SwipeIndicatorFactoryOptionsStyles,
  SwipeIndicatorProps,
} from './typings';

const defaultStyles: SwipeIndicatorFactoryOptionsStyles = {
  Indicator: '',
  Active: '',
  Separator: '',
  Highlight: '',
};

const SwipeIndicatorFactory = ({
  styles: appStyles,
}: SwipeIndicatorFactoryOptions<any>): SwipeIndicatorComponent => {
  class PagesFactory extends Component<SwipeIndicatorProps> {
    constructor(props: SwipeIndicatorProps) {
      super(props);
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
          className={styles.Indicator}
          data-testid={'swipe-indicator-wrapper'}
        >
          <span
            className={styles.Active}
            data-testid={'swipe-indicator-current'}
          >
            {this.props.activeIndex + 1}
          </span>
          <span className={styles.Separator}>/</span>
          <span
            className={styles.Highlight}
            data-testid={'swipe-indicator-total'}
          >
            {this.props.slideCount}
          </span>
        </div>
      );
    }
  }
  return PagesFactory;
};

export default SwipeIndicatorFactory;
