/* istanbul ignore file */

import imageCaptionFactory from '../../../../../../../common/components/ImageCaption/factory';
import styles from './styles.legacy.css';

const ImageCaption = imageCaptionFactory({
  prefix: 'Quelle:',
  styles: {
    Wrapper: styles.Wrapper,
    CreditWrapper: styles.CreditWrapper,
    Credit: '',
  },
});

export default ImageCaption;
