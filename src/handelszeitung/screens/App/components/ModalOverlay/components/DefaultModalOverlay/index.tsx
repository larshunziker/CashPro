/* istanbul ignore file */
import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { setNavigationVisible as setNavigationVisibleAction } from '../../../.../../../../../../shared/actions/navigation';
import { MODAL_ROOT_ID } from '../../../../constants';
import styles from './styles.legacy.css';

const DefaultModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: styles.Wrapper,
    FadeIn: styles.FadeIn,
    FadeOut: styles.FadeOut,
    BodyClass: styles.BodyClass,
  },
  setNavigationVisibleAction,
  modalRootId: MODAL_ROOT_ID,
});

export default DefaultModalOverlay;
