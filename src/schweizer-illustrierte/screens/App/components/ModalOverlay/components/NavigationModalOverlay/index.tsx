/* istanbul ignore file */
import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { MODAL_ROOT_ID } from '../../../../constants';
import styles from './styles.legacy.css';

const NavigationModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: styles.Wrapper,
    FadeIn: styles.FadeIn,
    BodyClass: styles.BodyClass,
  },
  modalRootId: MODAL_ROOT_ID,
});

export default NavigationModalOverlay;
