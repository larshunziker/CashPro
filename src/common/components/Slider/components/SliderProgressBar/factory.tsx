import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import {
  SliderProgressBarComponent,
  SliderProgressBarFactoryOptions,
  SliderProgressBarFactoryOptionsStyles,
  SliderProgressBarProps,
} from './typings';

type SliderProgressBarPropsInner = SliderProgressBarProps & {
  routePathname: string;
};

const defaultStyles: SliderProgressBarFactoryOptionsStyles = {
  Wrapper: '',
  ProgressBar: '',
};

const SliderProgressBarFactory = ({
  styles: appStyles,
}: SliderProgressBarFactoryOptions<any>): SliderProgressBarComponent => {
  const SliderProgressBarFactory = ({
    ...props
  }: SliderProgressBarPropsInner): ReactElement => {
    const { activeIndex, slideInterval, routePathname } = props;
    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div
        key={`progress-bar-${activeIndex}-${routePathname}`}
        data-testid="slider-progress-factory-wrapper"
        className={styles.Wrapper}
      >
        <div
          title={'ProgressBar'}
          data-testid="slider-progress-factory-progress-bar"
          className={styles.ProgressBar}
          style={{ animationDuration: `${slideInterval}ms` }}
        />
      </div>
    );
  };

  const mapStateToProps = (state: ReduxState) => ({
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
  });
  return connect(mapStateToProps)(SliderProgressBarFactory);
};

export default SliderProgressBarFactory;
