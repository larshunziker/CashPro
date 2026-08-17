/* istanbul ignore file */

import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { MODAL_ROOT_ID } from '../../../../constants';
import styles from './styles.legacy.css';

const SearchModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: styles.Wrapper,
    FadeIn: styles.FadeIn,
    FadeOut: styles.FadeOut,
    BodyClass: styles.BodyClass,
    CenteredOverlay: styles.CenteredOverlay,
  },
  modalRootId: MODAL_ROOT_ID,
});

export default SearchModalOverlay;
