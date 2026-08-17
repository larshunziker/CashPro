/* istanbul ignore file */

import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { MODAL_ROOT_ID } from '../../../../../App/constants';
import styles from './styles.legacy.css';

const DefaultModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: styles.Wrapper,
    FadeIn: styles.FadeIn,
    FadeOut: styles.FadeOut,
    BodyClass: styles.BodyClass,
  },
  modalRootId: MODAL_ROOT_ID,
});

export default DefaultModalOverlay;
