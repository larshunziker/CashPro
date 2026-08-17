/* istanbul ignore file */
import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { MODAL_ROOT_ID } from '../../../../constants';
import styles from './styles.legacy.css';

const HoroscopeModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: styles.Wrapper,
    IsDifferentFlavour: styles.IsDifferentFlavour,
    FadeIn: styles.FadeIn,
    BodyClass: styles.BodyClass,
  },
  modalRootId: MODAL_ROOT_ID,
});

export default HoroscopeModalOverlay;
