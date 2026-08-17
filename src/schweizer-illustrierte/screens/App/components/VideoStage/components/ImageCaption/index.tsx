import { connect } from 'react-redux';
import imageCaptionFactory from '../../../../../../../common/components/ImageCaption/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import styles from './styles.legacy.css';
import {
  GetImageCaptionFactoryStylesByProps,
  ImageCaptionProps,
} from '../../../../../../../common/components/ImageCaption/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type ImageCaptionPropsInner = ImageCaptionProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '(props */
export const getStyleByProps: GetImageCaptionFactoryStylesByProps<
  ImageCaptionPropsInner
> = (props) => {
  const { activeMainChannel } = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    Wrapper: getThemedClass('Wrapper'),
    Credit: getThemedClass('Credit'),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const ImageCaption = imageCaptionFactory({
  styles: getStyleByProps,
});

export default connect(mapStateToProps)(ImageCaption);
