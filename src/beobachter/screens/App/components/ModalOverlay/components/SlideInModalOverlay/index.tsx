/* istanbul ignore file */

import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { setNavigationVisible as setNavigationVisibleAction } from '../../../../../../../shared/actions/navigation';
import { MODAL_ROOT_ID } from '../../../../../App/constants';
import styles from './styles.legacy.css';
import {
  ModalOverlayFactoryOptionsStyles,
  ModalOverlayProps,
} from '../../../../../../../common/components/ModalOverlay/typings';

const getStylesByProps = ({
  isLeftToRight = true,
}: ModalOverlayProps): ModalOverlayFactoryOptionsStyles => ({
  Wrapper: styles.Wrapper,
  FadeIn: isLeftToRight ? styles.FadeInLeft : styles.FadeInRight,
  FadeOut: isLeftToRight ? styles.FadeOutLeft : styles.FadeOutRight,
  BodyClass: styles.BodyClass,
});

const SlideInModalOverlay = modalOverlayFactory({
  styles: getStylesByProps,
  setNavigationVisibleAction,
  modalRootId: MODAL_ROOT_ID,
});

export default SlideInModalOverlay;
