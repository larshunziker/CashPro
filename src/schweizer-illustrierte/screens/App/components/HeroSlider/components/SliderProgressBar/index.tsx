import { connect } from 'react-redux';
import sliderProgressBarFactory from '../../../../../../../common/components/Slider/components/SliderProgressBar/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import styles from './styles.legacy.css';
import {
  SliderProgressBarFactoryOptionsStyles,
  SliderProgressBarProps,
} from '../../../../../../../common/components/Slider/components/SliderProgressBar/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type SliderProgressBarPropsInner = SliderProgressBarProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStylesByProps = ({
  activeMainChannel,
}: SliderProgressBarPropsInner): SliderProgressBarFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    ProgressBar: getThemedClass('ProgressBar'),
    Wrapper: styles.Wrapper,
  };
};

const mapStateToProps = (state: Record<string, any>) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const SliderProgressBar = connect(mapStateToProps)(
  sliderProgressBarFactory({
    styles: getStylesByProps,
  }),
);

export default SliderProgressBar;
